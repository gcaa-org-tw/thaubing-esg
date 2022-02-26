import os
import requests, zipfile
from io import BytesIO
from scrapy import Request
from scrapy.spiders import CSVFeedSpider
from ..items import CompanyItem
from ..util import industry_code_switcher, zip_urls

# 全國營業(稅籍)登記資料集 https://data.gov.tw/dataset/9400
BGMOPEN1_ZIP_URL = 'https://eip.fia.gov.tw/data/BGMOPEN1.zip'

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
        # download zip file
        req = requests.get(BGMOPEN1_ZIP_URL)

        # extracting the zip file contents
        file = zipfile.ZipFile(BytesIO(req.content))
        filename = file.infolist()[0].filename
        file.extractall(self.filepath)
        file.close()

        print('Downloading completed.')
        csv_filepath += 'file:///' + self._abspath_filename(filename)
        return csv_filepath

    def _abspath_filename (self, filename: str):
        return os.path.normpath(os.path.join(self.filepath, filename))
