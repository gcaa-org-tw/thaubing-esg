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

    def __init__(self, year=None, NYEARS=5):
        """
        Args:
            year ([type], optional): Specific year to scrape data from. Defaults to None.
            NYEARS (int, optional): Number of years to scrape data, dated from the latest year. Defaults to 5.
        """
        latest_year = datetime.now().year - 1 # latest year available for reporting, i.e. the previous year
        oldest_year = latest_year - NYEARS
        self.typeks = [
            'sii', # 上市
            'otc', # 上櫃
        ]
        self.key_mapping_td = {
            # key : td index in tr
            "stock_code"             : { "id":  1, "dtype": None },
            "industry_category"      : { "id":  0, "dtype": None },
            "nr_employee"            : { "id":  4, "dtype": int },
            "em_salary_total"        : { "id":  3, "dtype": int },
            "em_salary_avg"          : { "id":  5, "dtype": int },
            "em_salary_med"          : { "id":  7, "dtype": int },
            "eps"                    : { "id":  9, "dtype": float },
            "ind_avg_em_salary_avg"  : { "id": 10, "dtype": int },
            "ind_avg_eps"            : { "id": 11, "dtype": float },
            "note_a"                 : { "id": 12, "dtype": bool },
            "note_b"                 : { "id": 13, "dtype": bool },
            "note_c"                 : { "id": 14, "dtype": bool },
            "notes"                  : { "id": 15, "dtype": None },
        }

        # set year(s) to scrape for salary data
        if year is None:
            self.years = reversed(list(range(oldest_year, latest_year + 1)))
        else:
            self.year = year
            self.years = [int(year)]

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
            yield self.parse_row(item, row)

    def parse_row(self, item, row):
        tds = [dd for dd in row.css('td')]
        for key, value in self.key_mapping_td.items():
            raw_value = ''.join(tds[value['id']].css('*::text').getall())
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
            return locale.atoi(raw_value) if not raw_value else None
        elif dtype == float:
            return locale.atof(raw_value) if not raw_value else None
        else:
            return raw_value