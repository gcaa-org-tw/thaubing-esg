import os
import locale
from csv import DictReader
from datetime import datetime
from scrapy import FormRequest
from scrapy.spiders import Spider
from scrapy.http.response.html import HtmlResponse
from thaubing_esg.util import FILENAME_COMPANY
from thaubing_esg.items import ShareholdingItem

locale.setlocale(locale.LC_ALL, 'en_US.UTF8')

class ShareholdingSpider(Spider):
    name = 'shareholding'
    URL_ENDPOINT = 'https://mops.twse.com.tw/mops/web/stapap1'
    custom_settings = {
        'ITEM_PIPELINES': {
            'thaubing_esg.pipelines.ShareholdingPipeline': 300
        },
    }

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

        self.key_mapping_td = {
            'title':                     { 'id': 0, 'func': lambda v: v },
            'shareholder':               { 'id': 1, 'func': lambda v: v },
            'shareholding_initial':      { 'id': 2, 'func': self._parse_shareholding_nr },
            'shareholding_current':      { 'id': 3, 'func': self._parse_shareholding_nr },
            'pledge':                    { 'id': 4, 'func': self._parse_shareholding_nr },
            'pledge_pp':                 { 'id': 5, 'func': self._parse_shareholding_pp },
            'others_shareholding_total': { 'id': 6, 'func': self._parse_shareholding_nr },
            'others_pledge':             { 'id': 7, 'func': self._parse_shareholding_nr },
            'others_pledge_pp':          { 'id': 8, 'func': self._parse_shareholding_pp },
        }

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

        # parse data from page
        trs = [rr for rr in response.css('#table01 table.hasBorder').css('tr:not(.tblHead)')
               if rr.css('th').get() is None]
        for row in trs:
            item = ShareholdingItem()
            item['year'] = year
            item['stock_code'] = stock_code
            yield self.parse_row(item, row)

    def parse_row(self, item, row):
        tds = [dd for dd in row.css('td')]
        for key, value in self.key_mapping_td.items():
            raw_value = ''.join(tds[value['id']].css('*::text').getall())
            parse_func = value['func']
            item[key] = parse_func(raw_value.strip())
        return item

    def _gen_webpage_filepath(self, year: int, stock_code: str) -> str:
        """Generate filepath for .html raw webpage scraped.

        Args:
            year (int): The reporting year.
            stock_code (str): The company code or id.

        Returns:
            str: Normalized filepath.
        """
        rel_filepath = lambda year, stock_code: '../../../data/shareholding/webpages/{}/{}.html'.format(year, stock_code)
        filepath = os.path.normpath(os.path.join(os.path.dirname(__file__), rel_filepath(year, stock_code)))
        if not os.path.exists(os.path.dirname(filepath)):
            os.makedirs(os.path.dirname(filepath))
        return filepath

    def _parse_shareholding_nr(self, raw_value: str):
        return locale.atoi(raw_value) if len(raw_value) != 0 else None

    def _parse_shareholding_pp(self, raw_value: str):
        return (locale.atof(raw_value.strip('%'))/100.) if len(raw_value) != 0 else None