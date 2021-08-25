import os

from scrapy.exporters import CsvItemExporter

filepath = os.path.join(os.path.dirname(__file__), '../../data/company.csv')

class CompanyPipeline:
    def open_spider(self, spider):
        self.file = open(filepath, 'wb')
        self.exporter = CsvItemExporter(self.file)

    def close_spider(self, spider):
        self.exporter.finish_exporting()
        self.file.close()

    def process_item(self, item, spider):
        self.exporter.export_item(item)
        return item