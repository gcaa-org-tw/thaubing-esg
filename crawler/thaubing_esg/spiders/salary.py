import os
import locale
from datetime import datetime
from scrapy import FormRequest
from scrapy.http.response.html import HtmlResponse
from scrapy.spiders import Spider
from six import class_types
from thaubing_esg.items import SalaryItem

locale.setlocale(locale.LC_ALL, 'en_US.UTF8')

class SalarySpider(Spider):
    name = 'salary'
    URL_ENDPOINT = 'https://mops.twse.com.tw/mops/web/t100sb15'
    custom_settings = {
        'ITEM_PIPELINES': {
            'thaubing_esg.pipelines.SalaryPipeline': 300
        },
    }

    def __init__(self, year=None):
        """
        Args:
            year ([type], optional): Specific year to scrape data from. Defaults to None.
        """
        latest_year = datetime.now().year - 1 # latest year available for reporting, i.e. the previous year
        oldest_year = 2018
        self.typeks = [
            'sii', # 上市
            'otc', # 上櫃
        ]
        # mapping of item key to the data type (`dtype`) and index of the td within tr (`id`)
        # In year 2019 onwards: 1. salary median value; 2. values of previous year are reported
        self.key_mapping_td = {
            "stock_code"             : { "id": { "new":  1, "old":  1 }, "dtype": None },
            "industry_category"      : { "id": { "new":  0, "old":  0 }, "dtype": None },
            "nr_employee"            : { "id": { "new":  4, "old":  4 }, "dtype": int },
            "em_salary_total"        : { "id": { "new":  3, "old":  3 }, "dtype": int },
            "em_salary_avg"          : { "id": { "new":  5, "old":  5 }, "dtype": int },
            "em_salary_med"          : { "id": { "new":  7, "old":  None }, "dtype": int },
            "eps"                    : { "id": { "new":  9, "old":  6 }, "dtype": float },
            "ind_avg_em_salary_avg"  : { "id": { "new": 10, "old":  7 }, "dtype": int },
            "ind_avg_eps"            : { "id": { "new": 11, "old":  8 }, "dtype": float },
            "note_a"                 : { "id": { "new": 12, "old":  9 }, "dtype": bool },
            "note_b"                 : { "id": { "new": 13, "old": 10 }, "dtype": bool },
            "note_c"                 : { "id": { "new": 14, "old": 11 }, "dtype": bool },
            "notes"                  : { "id": { "new": 15, "old": 12 }, "dtype": None },
        }

        # set year(s) to scrape for salary data
        if year is None:
            self.years = reversed(list(range(oldest_year, latest_year + 1)))
        else:
            if int(year) < oldest_year:
                self.logger.warning('Specified year not available. Use oldest available year %s instead.', oldest_year)
            self.year = int(year) if int(year) >= oldest_year else oldest_year
            self.years = [self.year]

    def start_requests(self):
        for year in self.years:
            for typek in self.typeks:
                yield FormRequest(
                    url=self.URL_ENDPOINT,
                    formdata=self._gen_formrequest_param(year, typek),
                    meta={'year': year, 'typek': typek},
                    callback=self.parse,
                )

    def _gen_formrequest_param(self, year: int, typek: str):
        return {
            'encodeURIComponent': '1',
            'step': '1',
            'firstin': '1',
            'TYPEK': typek, # sii=上市, otc=上櫃
            'RYEAR': str(year - 1911),
            'code': '', # empty string for all industries
        }

    def parse(self, response: HtmlResponse):
        year  = response.meta['year']
        typek = response.meta['typek']

        self.logger.debug('Start scraping salary data for year=%d...', year)

        # save .html raw webpage scraped
        filepath = self._gen_webpage_filepath(year, typek)
        with open(filepath, 'wb') as f:
            f.write(response.body)

        # parse data from page
        trs = [rr for rr in response.css('#table01 table').css('tr')
               if rr.css('th').get() is None]
        for row in trs:
            item = SalaryItem()
            item['year'] = year
            yield self.parse_row(item, row, year)

    def parse_row(self, item, row, year: int):
        tds = [dd for dd in row.css('td')]
        key_id = 'new' if year >= 2019 else 'old'
        for key, value in self.key_mapping_td.items():
            if value['id'][key_id] is None:
                item[key] = None
            else:
                raw_value = ''.join(tds[value['id'][key_id]].css('*::text').getall())
                item[key] = self._parse_scraped_value(value['dtype'], raw_value.strip())
        return item

    def _gen_webpage_filepath(self, year: int, typek: str) -> str:
        """Generate filepath for .html raw webpage scraped.

        Args:
            year (int): The reporting year.
            typek (str): The company type: sii=上市, otc=上櫃

        Returns:
            str: Normalized filepath.
        """
        rel_filepath = lambda year, typek: '../../../data/salary/webpages/{}-{}.html'.format(year, typek)
        filepath = os.path.normpath(os.path.join(os.path.dirname(__file__), rel_filepath(year, typek)))
        if not os.path.exists(os.path.dirname(filepath)):
            os.makedirs(os.path.dirname(filepath))
        return filepath

    def _parse_scraped_value(self, dtype, raw_value: str):
        if dtype == bool:
            return None if len(raw_value) == 0 else True
        elif dtype == int:
            return locale.atoi(raw_value) if len(raw_value) != 0 else None
        elif dtype == float:
            return locale.atof(raw_value) if len(raw_value) != 0 else None
        else:
            return raw_value