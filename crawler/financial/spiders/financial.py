from scrapy.spiders import CSVFeedSpider


class FinancialSpider(CSVFeedSpider):
    name = 'financial'
    start_urls = [
        'https://mopsfin.twse.com.tw/opendata/t187ap03_P.csv', # 公開發行公司 https://data.gov.tw/dataset/28567
    ]
    custom_settings = {
        'LOG_LEVEL': 'INFO'
    }

    def parse_row(self, response, row):
        pass
