import os
import requests, zipfile
from io import BytesIO
from scrapy import Request
from scrapy.spiders import CSVFeedSpider
from ..items import CompanyItem
from ..util import industry_code_switcher, zip_urls

class CompanySpider(CSVFeedSpider):
    name = 'company'
    custom_settings = {
        'ITEM_PIPELINES': {
            'thaubing_esg.pipelines.CompanyPipeline': 300
        },
    }

    def start_requests(self):
        csv_filepaths = PrerunZipfileDownloader().start_download()
        requests = [Request(csv) for csv in csv_filepaths]

        return requests

    def parse_row(self, response, row):
        item = CompanyItem()
        item['stock_code']    = row['股票代號（金融監督管理委員會匯入）']
        item['name']          = row['公司名稱']
        item['tax_code']      = row['統一編號']
        item['industry_code'] = row['產業別（金融監督管理委員會匯入）']
        if item['industry_code'] != '':
            item['industry'] = self._parse_industry_code(item['industry_code'])
        return item

    def _parse_industry_code(self, industry_code):
        return industry_code_switcher.get(int(industry_code), '')


class PrerunZipfileDownloader:
    filepath = os.path.normpath(os.path.join(os.path.dirname(__file__), '../../../data/temp'))

    def start_download(self):
        csv_filepaths = []
        for zip_file in zip_urls:
            new_filename = zip_file['name'] + '.csv'
            csv_filepaths += [ 'file:///' + self._abspath_filename(new_filename) ]

            # if extracted csv already exists in temp, skip downloading
            if os.path.isfile(self._abspath_filename(new_filename)):
                continue

            print('Downloading starts for {} ...'.format(zip_file['name']))

            # download zip file
            url = 'https://data.gcis.nat.gov.tw/od/file?oid={}'.format(zip_file['oid'])
            req = requests.get(url)

            # extracting the zip file contents
            file = zipfile.ZipFile(BytesIO(req.content))
            raw_filename = file.infolist()[0].filename
            file.extractall(self.filepath)
            file.close()

            # rename csv
            os.rename(self._abspath_filename(raw_filename), self._abspath_filename(new_filename))

        print('Downloading completed.')
        return csv_filepaths

    def _abspath_filename (self, filename: str):
        return os.path.normpath(os.path.join(self.filepath, filename))
