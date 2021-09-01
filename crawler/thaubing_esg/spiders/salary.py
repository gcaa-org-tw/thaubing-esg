import os
from datetime import datetime
from scrapy import FormRequest
from scrapy.http.response.html import HtmlResponse
from scrapy.spiders import Spider
from thaubing_esg.items import SalaryItem

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

        # set year(s) to scrape for salary data
        if year is None:
            self.years = reversed(list(range(oldest_year, int(year) + 1)))
        else:
            self.year = year
            self.years = [int(year)]

    def start_requests(self):
        for year in self.years:
            for typek in self.self.typeks:
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

        self.logger.info('Start scraping salary data for year=%d...', year)

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
        tds = [dd for dd in row.css("td")]
        item['industry_code'] = tds[0].css("*::text").get()
        item['stock_code']    = tds[1].css("*::text").get()
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