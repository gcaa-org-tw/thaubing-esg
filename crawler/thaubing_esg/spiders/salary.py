import os
from datetime import datetime
from scrapy import FormRequest
from scrapy.spiders import Spider

class SalarySpider(Spider):
    name = 'salary'
    URL_ENDPOINT = 'https://mops.twse.com.tw/mops/web/t100sb15'

    NYEARS = 5 # number of years to scrape
    latest_year = datetime.now().year - 1 # latest year available for reporting, i.e. the previous year
    oldest_year = latest_year - NYEARS

    typeks = [
        'sii', # 上市
        'otc', # 上櫃
    ]

    def __init__(self, year=latest_year):
        # set year to scrape for salary data
        self.years = reversed(list(range(self.oldest_year, int(year) + 1)))

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

    def parse(self, response):
        year  = response.meta['year']
        typek = response.meta['typek']

        self.logger.info('Start scraping salary data for year=%d...', year)

        # save .html raw webpage scraped
        filepath = self._gen_webpage_filepath(year, typek)
        with open(filepath, 'wb') as f:
            f.write(response.body)

        # parse data from page
        # item = self._parse_page(response)
        # return item

    def _parse_page(self, response):
        pass

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