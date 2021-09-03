from scrapy import Request
from scrapy.spiders import Spider
from ..items import AirPollutantItem, FacilityItem, GhgItem, ViolationItem

class EpaSpider(Spider):
    name = 'epa'
    API_KEY = '9be7b239-557b-4c10-9775-78cadfc555e9' # using a public key for now
    LIMIT = 1000 # interval
    custom_settings = {
        'ITEM_PIPELINES': {
            'thaubing_esg.pipelines.EpaPipeline': 300
        },
    }

    def __init__(self, dataset_id: str):
        self.dataset_id = dataset_id
        self.base_url = 'https://data.epa.gov.tw/api/v1/{}'.format(dataset_id)
        self.item_class = self._get_item_class_by_dataset_id(dataset_id)
        self.fields_to_export = self._get_item_fields_to_export(self.item_class)

    def start_requests(self):
        yield Request(
            url=self._gen_request_url(),
            meta={'offset': 0},
            callback=self.parse_item,
        )

    def parse_item(self, response):
        res = response.json()
        key_mapping = self._get_item_key_val_mapping(self.item_class)
        for row in res['records']:
            item = self.item_class()
            for field in self.fields_to_export:
                item[field] = row[key_mapping[field]]
            yield item

        # scrapy next page
        if res['total'] - res['offset'] >= res['limit']:
            next_offset = res['_links']['next'].split("&offset=")[1]
            next_url = self._gen_request_url(offset=next_offset)
            yield response.follow(next_url, callback=self.parse_item)
        else:
            self.logger.info('Completed scraping epa dataset_id=%s, total=%s!', self.dataset_id, res['total'])

    def _gen_request_url(self, offset=0):
        return (
            '{}?format=json&api_key={}&offset={}&limit={}'.format(
                self.base_url,
                self.API_KEY,
                offset,
                self.LIMIT
            ))

    def _get_item_fields_to_export(self, item_class):
        fields = [{'key': key, 'order': para.get('col_id', 100)}
                  for key, para in item_class.fields.items()]
        fields_to_export = [field['key'] for field in sorted(fields, key=lambda field: field['order'])]
        return fields_to_export

    def _get_item_key_val_mapping(self, item_class):
        colnames = { key: para.get('colname', key)
                     for key, para in item_class.fields.items() }
        return colnames

    def _get_item_class_by_dataset_id(self, dataset_id: str):
        switch = {
            'ems_s_01': FacilityItem,     # 環境保護許可管理系統(暨解除列管)對象基本資料
            'ems_p_46': ViolationItem,    # 列管事業污染源裁處資料
            'ems_p_08': AirPollutantItem, # 各工廠空氣污染物排放資料
            'ghg_p_01': GhgItem,          # 溫室氣體年排放量
        }
        return switch.get(dataset_id)
