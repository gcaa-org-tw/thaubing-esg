import os
from csv import DictReader
from scrapy.spiders import Spider
from scrapy import Request

URL_ENDPOINT = 'https://mops.twse.com.tw/server-java/t164sb01?step=1'
FILENAME_COMPANY = 'company.csv'

# load company codes scraped from spider "company"
filepath_company = os.path.join(os.path.dirname(__file__), '../../../data/{}'.format(FILENAME_COMPANY))
with open(filepath_company) as f:
    csv_reader = DictReader(f)
    stock_ids = [row['stock_id'] for row in csv_reader]

class FinancialSpider(Spider):
    name = 'financial'
    custom_settings = {
        'LOG_LEVEL': 'INFO'
    }

    def start_requests(self):
        for stock_id in stock_ids:

            yield Request(
                url=self._gen_request_url(stock_id),
                meta={'stock_id': stock_id},
                callback=self.parse,
            )

    def parse(self, response):
        self.logger.debug(response.url)
        filepath = self._gen_financial_webpage_filepath(response.meta['stock_id'])
        with open(filepath, 'wb') as f:
            f.write(response.body)

    def _gen_request_url(self, stock_id: str):
        return '{}&{}'.format(URL_ENDPOINT, self._gen_payload(stock_id))

    def _gen_payload(self, stock_id: str, year='2020', report_id='C'):
        return (
            "CO_ID={}&SYEAR={}&SSEASON=4&REPORT_ID={}".format(
                stock_id,
                year,
                report_id
            )
        )

    def _gen_financial_webpage_filepath(self, stock_id: str):
        filename = '{}.html'.format(stock_id)
        filepath = os.path.join(os.path.dirname(__file__), '../../../data/financial/webpages/{}'.format(filename))
        return filepath
