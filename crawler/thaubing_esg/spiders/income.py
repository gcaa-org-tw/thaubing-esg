import os
import locale
import re
import typing
from scrapy import Request
from scrapy.spiders import Spider
from ..items import IncomeItem
from ..util import accounting_subjects

locale.setlocale(locale.LC_ALL, 'en_US.UTF8')

class IncomeSpider(Spider):
    name = 'income'
    data_dir = os.path.normpath(os.path.join(os.path.dirname(__file__), '../../../data/financial/webpages'))
    custom_settings = {
        'ITEM_PIPELINES': {
            'thaubing_esg.pipelines.IncomePipeline': 300
        },
    }

    def start_requests(self):
        self.year = getattr(self, 'year', None)

        # parse all years
        if self.year is None:
            self.logger.info('Start parsing saved webpage files in directory %s...', self.data_dir)
            for subdir_year in reversed(os.listdir(self.data_dir)):
                self.logger.info('Start parsing year=%s...', subdir_year)
                data_dir_year = os.path.join(self.data_dir, subdir_year)
                for file in os.listdir(data_dir_year):
                    if file.endswith(".html"):
                        filepath = os.path.join(data_dir_year, file)
                        yield Request(
                            url=self._format_filepath_to_datauri(filepath),
                            meta={'stock_code': file, 'year': int(subdir_year)},
                            callback=self.parse,
                        )
                self.logger.info('Completed parsing year=%s!', subdir_year)

        # parse only specified year
        else:
            data_dir_year = os.path.join(self.data_dir, self.year)
            self.logger.info('Year specified: %s. Parsing saved webpage files in directory %s...', self.year, data_dir_year)
            for file in os.listdir(data_dir_year):
                if file.endswith(".html"):
                    filepath = os.path.join(data_dir_year, file)
                    yield Request(
                        url=self._format_filepath_to_datauri(filepath),
                        meta={'stock_code': file.rstrip('.html'), 'year': int(self.year)},
                        callback=self.parse,
                    )

    def parse(self, response):
        item = IncomeItem()
        if int(response.meta['year']) <= 2018:
            item = self._parse_xbrl_old_format(item, response)
        else:
            item = self._parse_xbrl(item, response)
        return item

    def _parse_xbrl(self, item, response):
        # general info
        title = response.css('title::text').get()
        regex = r'\s*(\S+)\s([1-3][0-9]{3})Q.*'
        match = re.search(regex, title)

        item['stock_code'] = match.group(1)
        item['year'] = int(match.group(2))
        meta = response.meta

        # check if meta aligns
        if meta['stock_code'] != match.group(1):
            self.logger.warning('STOCK_CODE MISMATCH: meta=%s, webpage=%s', meta['stock_code'], match.group(1))
            return item

        if meta['year'] != int(match.group(2)):
            self.logger.warning('YEAR MISMATCH for stock_code=%s: meta=%s, webpage=%s',
                                meta['stock_code'], meta['year'], int(match.group(2)))
            return item

        # parse income values
        rows = response.css('tr')
        for subject in accounting_subjects:

            # income statement might be using alt names for the subject title
            # e.g., subject_names = ["Total operating revenue", "Total revenue"]
            # see util.py for accounting_subjects
            alt_subject_names = subject['eng_name'] if isinstance(subject['eng_name'], list) else [subject['eng_name']]
            for name in alt_subject_names:
                trs = [rr for rr in rows
                       if any([txt.strip() == name for txt in rr.css('.en::text').getall()])]
                if len(trs) != 0:
                    for tr in trs:
                        tds = [td.css('*::text').getall() for td in tr.css('td')]
                        value_current_year = tds[2]
                        if len(value_current_year) != 0:
                            item[subject['key']] = self._parse_numerical_value(value_current_year)
                            break

                # break for loop if value found for the subject
                if subject['key'] in item.keys():
                    break

                # no value found for all subject names
                if alt_subject_names.index(name) == len(alt_subject_names)-1:
                    self.logger.debug('For stock_code=%s, year=%d: Cannot parse subject \'%s\'.',
                                      item['stock_code'], item['year'], alt_subject_names)

        return item

    def _parse_xbrl_old_format(self, item, response):
        return item

    def _format_filepath_to_datauri(self, filepath: str):
        return ('file:///' + os.path.normpath(filepath))

    def _parse_numerical_value(self, td: typing.Union[str, list[str]]):
        str_values = td if isinstance(td, str) else ''.join(td).strip()
        if str_values.startswith('('):
            return (-locale.atoi(str_values.lstrip('(').rstrip(')')))
        else:
            return locale.atoi(str_values)