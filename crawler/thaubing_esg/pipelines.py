import os
from scrapy.exporters import CsvItemExporter
import util
# from itemadapter import ItemAdapter

class CompanyPipeline:
    filepath = os.path.join(os.path.dirname(__file__), '../../data/company.csv')

    def open_spider(self, spider):
        self.file = open(self.filepath, 'wb')
        self.exporter = CsvItemExporter(self.file)

        # specifies exported fields and order
        self.exporter.fields_to_export = [
            'stock_code',
            'name',
            'name_abbr',
            'tax_code',
            'company_type',
        ]

    def close_spider(self, spider):
        self.exporter.finish_exporting()
        self.file.close()

    def process_item(self, item, spider):
        self.exporter.export_item(item)
        return item


class FinancialPipeline:
    pass
