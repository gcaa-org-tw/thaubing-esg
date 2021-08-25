import os

from scrapy.exporters import CsvItemExporter

filepath = os.path.join(os.path.dirname(__file__), '../../data/company.csv')

class CompanyPipeline:
    def open_spider(self, spider):
        self.file = open(filepath, 'wb')
        self.exporter = CsvItemExporter(self.file)

        # specifies exported fields and order
        self.exporter.fields_to_export = [
            'stock_id',
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