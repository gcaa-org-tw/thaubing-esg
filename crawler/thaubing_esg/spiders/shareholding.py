import os
from csv import DictReader
from datetime import datetime
from scrapy import FormRequest
from scrapy.spiders import Spider
from scrapy.http.response.html import HtmlResponse
from thaubing_esg.util import FILENAME_COMPANY

class ShareholdingSpider(Spider):
    name = 'shareholding'
    URL_ENDPOINT = 'https://mops.twse.com.tw/mops/web/stapap1'

    def __init__(self, year=None):
        """
        Args:
            year ([type], optional): Specific year to scrape data from. Defaults to None.
        """
        latest_year = datetime.now().year - 1 # latest year available for reporting, i.e. the previous year
        years_interval = 5
        oldest_year = latest_year - years_interval

        # load company codes scraped from spider "company"
        filepath_company = os.path.join(os.path.dirname(__file__), '../../../data/{}'.format(FILENAME_COMPANY))
        with open(filepath_company, 'r', encoding='utf-8') as f:
            csv_reader = DictReader(f)
            self.stock_codes = [row['stock_code'] for row in csv_reader]

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
            for stock_code in self.stock_codes:
                yield FormRequest(
                    url=self.URL_ENDPOINT,
                    formdata=self._gen_formrequest_param(year, stock_code),
                    meta={'year': year, 'stock_code': stock_code},
                    callback=self.parse,
                )

    def _gen_formrequest_param(self, year: int, stock_code: str):
        return {
            'encodeURIComponent': '1',
            'step': '1',
            'firstin': '1',
            'off': '1',
            'keyword4': '',
            'code1': '',
            'TYPEK2': '',
            'checkbtn': '',
            'queryName': 'co_id',
            'inpuType': 'co_id',
            'TYPEK': 'all',
            'isnew': 'false',
            'co_id': stock_code,
            'year': str(year - 1911),
            'month': '12',
        }


    def parse(self, response: HtmlResponse):
        year  = response.meta['year']
        stock_code = response.meta['stock_code']

        # save .html raw webpage scraped
        filepath = self._gen_webpage_filepath(year, stock_code)
        with open(filepath, 'wb') as f:
            f.write(response.body)

        # # parse data from page
        # trs = [rr for rr in response.css('#table01 table').css('tr')
        #        if rr.css('th').get() is None]
        # for row in trs:
        #     item = SalaryItem()
        #     item['year'] = year
        #     yield self.parse_row(item, row, year)


    def _gen_webpage_filepath(self, year: int, stock_code: str) -> str:
        """Generate filepath for .html raw webpage scraped.

        Args:
            year (int): The reporting year.
            stock_code (str): The company code or id.

        Returns:
            str: Normalized filepath.
        """
        rel_filepath = lambda year, stock_code: '../../../data/shareholding/webpages/{}-{}.html'.format(year, stock_code)
        filepath = os.path.normpath(os.path.join(os.path.dirname(__file__), rel_filepath(year, stock_code)))
        if not os.path.exists(os.path.dirname(filepath)):
            os.makedirs(os.path.dirname(filepath))
        return filepath