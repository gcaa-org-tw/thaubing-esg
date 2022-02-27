import os
import requests, zipfile
from pathlib import Path
from tqdm import tqdm
from scrapy import Request
from scrapy.spiders import CSVFeedSpider
from ..items import CompanyItem

# 全國營業(稅籍)登記資料集 https://data.gov.tw/dataset/9400
BGMOPEN1_ZIP_URL = 'https://eip.fia.gov.tw/data/BGMOPEN1.zip'

# C大類 - 製造業 - 中類
MANUF_IND_CLASS_CODES = list(range(8, 34+1))

# 篩選資本額大於五億者
THRESHOLD_AMOUNT_CAPITAL = int(5e8)

class CompanySpider(CSVFeedSpider):
    name = 'company'
    custom_settings = {
        'ITEM_PIPELINES': {
            'thaubing_esg.pipelines.CompanyPipeline': 300
        },
    }

    def start_requests(self):
        csv = PrerunZipfileDownloader().start_download()
        request = Request(csv)
        return [request]

    def parse_row(self, response, row):
        if (self._is_in_manufacturing_ind(row) &
            self._is_amount_capital_above_threshold(row)):
            item = CompanyItem()
            item['name']            = row['營業人名稱']
            item['tax_code']        = row['統一編號']
            item['parent_tax_code'] = row['總機構統一編號']
            item['amount_capital']  = row['資本額']
            item['address']         = row['營業地址']
            item['ind_class_codes'] = self._parse_industrial_classification_codes(row)
            return item
        else:
            pass

    def _is_amount_capital_above_threshold(self, row):
        if not row['資本額']:
            return False
        else:
            return int(row['資本額']) >= THRESHOLD_AMOUNT_CAPITAL

    def _is_in_manufacturing_ind(self, row):
        # 中類 - get first two digits
        codes = [int(str(c)[:2]) for c in self._parse_industrial_classification_codes(row)]
        return any([code in MANUF_IND_CLASS_CODES for code in codes])

    def _parse_industrial_classification_codes(self, row):
        industrial_classification_codes = [
            row['行業代號'],
            row['行業代號1'],
            row['行業代號2'],
            row['行業代號3']
        ]
        return [str(code) for code in industrial_classification_codes if code]


class PrerunZipfileDownloader:
    ZIPFILE_NAME = 'BGMOPEN1.zip'
    data_path = Path(__file__).joinpath('../../../../data').resolve()
    temp_data_path = data_path.joinpath('temp').resolve()
    zipfile_path = temp_data_path.joinpath(ZIPFILE_NAME).resolve()

    def start_download(self):
        # if extracted csv already exists in temp, skip downloading
        if self.zipfile_path.exists():
            print('Zipfile already exists. Skip download.')
            pass
        else:
            # download zip file
            print('Start downloading BGMOPEN1.zip ...')
            response = requests.get(BGMOPEN1_ZIP_URL, stream=True)

            # dowload progress bar
            total_size_in_bytes= int(response.headers.get('content-length', 0))
            BLOCK_SIZE = 1024 #1 Kibibyte
            progress_bar = tqdm(total=total_size_in_bytes, unit='iB', unit_scale=True)
            with self.zipfile_path.open(mode='wb') as file:
                for data in response.iter_content(BLOCK_SIZE):
                    progress_bar.update(len(data))
                    file.write(data)
            progress_bar.close()
            print('Download completed. Extracting BGMOPEN1.zip ...')

        csv_filepath = self._extract_csv()
        return csv_filepath

    def _extract_csv(self):
        # extracting the zip file contents
        with zipfile.ZipFile(str(self.zipfile_path.as_posix()), 'r') as file:
            filename = file.infolist()[0].filename
            file.extractall(self.data_path.absolute())
        print('{} extracted from zipfile.'.format(filename))
        csv_filepath = self.data_path.joinpath(filename).resolve()
        return csv_filepath.as_uri()
