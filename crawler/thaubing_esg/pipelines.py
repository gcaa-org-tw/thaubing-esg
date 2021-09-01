import os
import pandas as pd
from scrapy.exporters import CsvItemExporter

def gen_data_filepath(filename: str):
    filepath = os.path.normpath(os.path.join(os.path.dirname(__file__), '../../data/' + filename))
    filedir = os.path.dirname(filepath)
    if not os.path.exists(filedir):
        os.makedirs(filedir)
    return filepath

class CompanyPipeline:
    filepath = gen_data_filepath('company.csv')

    def open_spider(self, spider):
        self.file = open(self.filepath, 'wb')
        self.exporter = CsvItemExporter(self.file)

        # specifies exported fields and order
        self.exporter.fields_to_export = [
            'stock_code',
            'name',
            'name_abbr',
            'tax_code',
            'industry_code',
            'company_type',
        ]

    def close_spider(self, spider):
        self.exporter.finish_exporting()
        self.file.close()

    def process_item(self, item, spider):
        self.exporter.export_item(item)
        return item


class IncomePipeline:

    def open_spider(self, spider):
        try:
            self.filepath = gen_data_filepath('income/income-{}.csv'.format(spider.year))
        except:
            self.filepath = gen_data_filepath('income.csv')
        self.file = open(self.filepath, 'wb')
        self.exporter = CsvItemExporter(self.file)

        # specifies exported fields and order
        self.exporter.fields_to_export = [
            'year',
            'stock_code',
            'total_operating_revenue',
            'total_operating_costs',
            'total_operating_expenses',
            'net_operating_income',
            'profit_or_loss',
            'total_comprehensive_income',
            'total_assets',
        ]

    def close_spider(self, spider):
        self.exporter.finish_exporting()
        self.file.close()
        spider.logger.info('Sorting csv file by stock_id...')
        self._csv_sorting_by_stock_id(self.filepath)

    def process_item(self, item, spider):
        self.exporter.export_item(item)
        return item

    def _csv_sorting_by_stock_id(self, filepath: str):
        data = pd.read_csv(filepath)
        data.sort_values(['year', 'stock_code'], ascending=[False, True], inplace=True)
        data.to_csv(filepath, index=False)