import os
from csv import DictReader
from datetime import datetime
from scrapy.spiders import Spider
from scrapy import Request

URL_ENDPOINT = 'https://mops.twse.com.tw/server-java/t164sb01?step=1'
FILENAME_COMPANY = 'company.csv'

# load company codes scraped from spider "company"
filepath_company = os.path.join(os.path.dirname(__file__), '../../../data/{}'.format(FILENAME_COMPANY))
with open(filepath_company, 'r', encoding='utf-8') as f:
    csv_reader = DictReader(f)
    stock_ids = [row['stock_id'] for row in csv_reader]

# latest year available for financial report, i.e. the previous year
latest_year = datetime.now().year - 1

class FinancialSpider(Spider):
    name = 'financial'

    def start_requests(self):
        year = int(getattr(self, 'year', str(latest_year)))
        self.logger.info('Start scraping financial data for year=%d...', year)

        # create directory for the year if not exists
        dir_year = os.path.join(os.path.dirname(__file__), '../../../data/financial/webpages/{}'.format(year))
        if not os.path.exists(dir_year):
            os.makedirs(dir_year)

        for stock_id in stock_ids:
            yield Request(
                url=self._gen_request_url(stock_id, year=year),
                meta={'stock_id': stock_id, 'year': year, 'report_id': 'C'},
                callback=self.parse,
            )

    def parse(self, response):
        self.logger.debug('Parsing %s ...', response.url)
        stock_id = response.meta['stock_id']
        year = response.meta['year']
        filepath = self._gen_financial_webpage_filepath(stock_id, year)
        with open(filepath, 'wb') as f:
            f.write(response.body)

        # check if the saved webpage comes with content, or if the payload is not applicable
        file_size_check = self._check_empty_webpage_by_filesize(year, filepath)

        # n/a: the given stock_id + year has no income statement
        if file_size_check == 1:
            os.remove(filepath)
            if response.meta['report_id'] == 'C':
                self.logger.debug('Cannot find financial report report_id=C for stock_id=%s. Try report report_id=A.', stock_id)
                yield Request(
                    url=self._gen_request_url(stock_id, report_id='A'),
                    meta={'stock_id': stock_id, 'year': year, 'report_id': 'A'},
                    callback=self.parse,
                )
            else:
                self.logger.info("Cannot find financial report for stock_id=%s", stock_id)

        # overrun
        elif file_size_check == 2:
            os.remove(filepath)
            self.logger.info("Scrapy overrun when scraping stock_id=%s, report_id=%s. Retry...", stock_id, response.meta['report_id'])
            yield Request(response.url, meta=response.meta, callback=self.parse, dont_filter=True)

    def _gen_request_url(self, stock_id: str, year=latest_year, report_id='C'):
        return '{}&{}'.format(URL_ENDPOINT, self._gen_payload(stock_id, year, report_id))

    def _gen_payload(self, stock_id: str, year=latest_year, report_id='C'):
        return (
            "CO_ID={}&SYEAR={}&SSEASON=4&REPORT_ID={}".format(
                stock_id,
                year,
                report_id
            )
        )

    def _gen_financial_webpage_filepath(self, stock_id: str, year: int):
        filename = '{}.html'.format(stock_id)
        filepath = os.path.join(os.path.dirname(__file__), '../../../data/financial/webpages/{}/{}'.format(year, filename))
        return filepath

    def _is_new_xbrl_format_statement(self, year: int):
        if year <= 2018:
            return False
        else:
            return True

    def _check_empty_webpage_by_filesize(self, year: int, filepath: str):
        '''Check if webpage is empty by accessing the saved webpage filesize: 0=Ok; 1=N/A; 2=Overrun.'''
        # new xbrl format: n/a=  97 bytes, overrun=496 bytes
        # old xbrl format: n/a=2816 bytes, overrun=496 bytes
        switch = {
            1: { # n/a
                True:  (lambda b: b < 100),
                False: (lambda b: 1e3 < b < 1e5),
            },
            2: { # overrun
                True:  (lambda b: 100 < b < 1e5),
                False: (lambda b: b < 1e3),
            },
        }

        file_size = os.path.getsize(filepath)
        is_new_xbrl = self._is_new_xbrl_format_statement(year)

        status = [ key for key, value in list(switch.items()) if value[is_new_xbrl](file_size) ]
        [status] = [0] if len(status) == 0 else status

        return status