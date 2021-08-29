import os
import locale
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
        year = getattr(self, 'year', None)

        # parse all years
        if year is None:
            self.logger.info('Start parsing saved webpage files in directory %s...', self.data_dir)
            for subdir_year in reversed(os.listdir(self.data_dir)):
                self.logger.info('Start parsing year=%s...', subdir_year)
                data_dir_year = os.path.join(self.data_dir, subdir_year)
                for file in os.listdir(data_dir_year):
                    if file.endswith(".html"):
                        filepath = os.path.join(data_dir_year, file)
                        yield Request(
                            url=self._format_filepath_to_datauri(filepath),
                            meta={'stock_id': file, 'year': subdir_year},
                            callback=self.parse,
                        )
                self.logger.info('Completed parsing year=%s!', subdir_year)

        # parse only specified year
        else:
            data_dir_year = os.path.join(self.data_dir, year)
            self.logger.info('Year specified: %s. Parsing saved webpage files in directory %s...', year, data_dir_year)
            for file in os.listdir(data_dir_year):
                if file.endswith(".html"):
                    filepath = os.path.join(data_dir_year, file)
                    yield Request(
                        url=self._format_filepath_to_datauri(filepath),
                        meta={'stock_id': file, 'year': year},
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
        header = response.css('.header .zh::text').getall()
        item['stock_id'] = header[0].split()[0]
        item['year'] = int(header[-1][:4])

        # income values
        rows = response.css('tr')
        for subject in accounting_subjects:

            # income statement might be using alt names for the subject title
            # e.g., subject_names = ["Total operating revenue", "Total revenue"]
            subject_names = subject['eng_name'] if isinstance(subject['eng_name'], list) else [subject['eng_name']]
            for subject_name in subject_names:
                trs = [rr for rr in rows
                    if any([txt.strip() == subject_name
                            for txt in rr.css('.en::text').getall()])]

                if (len(trs) == 0) & (subject_names.index(subject_name) == len(subject_names)-1):
                    self.logger.info('For stock_id=%s, year=%d: Cannot parse subject \'%s\'.',
                                    item['stock_id'], item['year'], subject_names)
                else:
                    for tr in trs:
                        tds = [td.css('*::text').getall() for td in tr.css('td')]
                        value_current_year = tds[2]
                        if len(value_current_year) != 0:
                            item[subject['key']] = self._parse_numerical_value(value_current_year)
                            break
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