from scrapy.spiders import CSVFeedSpider
from ..items import CompanyItem
from ..util import industry_code_switcher

class CompanyAbbrSpider(CSVFeedSpider):
    name = 'company_abbr'
    start_urls = [
        'https://mopsfin.twse.com.tw/opendata/t187ap03_L.csv', # 上市公司 https://data.gov.tw/dataset/18419
        'https://mopsfin.twse.com.tw/opendata/t187ap03_R.csv', # 興櫃公司 https://data.gov.tw/dataset/28568
        'https://mopsfin.twse.com.tw/opendata/t187ap03_P.csv', # 公開發行公司 https://data.gov.tw/dataset/28567
    ]
    custom_settings = {
        'ITEM_PIPELINES': {
            'thaubing_esg.pipelines.CompanyAbbrPipeline': 300
        },
    }

    def parse_row(self, response, row):
        item = CompanyItem()
        item['stock_code']    = row['公司代號']
        item['name']          = row['公司名稱']
        item['name_abbr']     = row['公司簡稱']
        item['tax_code']      = row['營利事業統一編號']
        item['industry_code'] = row['產業別']
        item['industry']     = self._parse_industry_code(row['產業別'])
        item['company_type'] = self._parse_company_type(response.url)
        return item

    def _parse_company_type(self, response_url):
        switcher = {
            't187ap03_L': '上市公司',
            't187ap03_R': '興櫃公司',
            't187ap03_P': '公開發行公司',
        }
        filename = response_url.split('/')[-1].split('.')[0]
        return switcher.get(filename, '不明公司類別')

    def _parse_industry_code(self, industry_code):
        return industry_code_switcher.get(int(industry_code), '')
