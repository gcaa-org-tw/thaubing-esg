from pathlib import Path
import pandas as pd
from scrapy.exporters import CsvItemExporter
from .util import format_tax_code

DATA_DIR = Path(__file__).joinpath('../../../data').resolve()

class CompanyPipeline:
    filepath = DATA_DIR.joinpath('company.csv')

    def open_spider(self, spider):
        self.file = self.filepath.open(mode='wb')
        self.exporter = CsvItemExporter(self.file)

        self.company_abbr = pd.read_csv(str(DATA_DIR.joinpath('temp/company_abbr.csv').resolve()))
        self.company_abbr['tax_code'] = self.company_abbr['tax_code'].apply(format_tax_code)

        # specifies exported fields and order
        self.exporter.fields_to_export = [
            'stock_code', # joined from ./data/temp/company_abbr.csv
            'name',
            'name_abbr',  # joined from ./data/temp/company_abbr.csv
            'tax_code',
            'parent_tax_code',
            'amount_capital',
            'address',
            'ind_class_codes'

            # joined from ./data/temp/company_abbr.csv
            'industry_code',
            'industry',
            'company_type'
        ]

    def close_spider(self, spider):
        self.exporter.finish_exporting()
        self.file.close()

    def process_item(self, item, spider):
        item_abbr = self.company_abbr.loc[self.company_abbr['tax_code'] == format_tax_code(item['tax_code'])]
        if item_abbr.__len__() == 1:
            item_abbr = item_abbr.iloc[0]
            item['stock_code']    = item_abbr['stock_code']
            item['name_abbr']     = item_abbr['name_abbr']
            item['industry_code'] = item_abbr['industry_code']
            item['industry']      = item_abbr['industry']
            item['company_type']  = item_abbr['company_type']

        self.exporter.export_item(item)
        return item


class CompanyAbbrPipeline:
    filepath = DATA_DIR.joinpath('temp/company_abbr.csv')

    def open_spider(self, spider):
        self.file = self.filepath.open(mode='wb')
        self.exporter = CsvItemExporter(self.file)

        # specifies exported fields and order
        self.exporter.fields_to_export = [
            'stock_code',
            'name',
            'name_abbr',
            'tax_code',
            'industry_code',
            'industry',
            'company_type'
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
            self.filepath = DATA_DIR.joinpath('income/income-{}.csv'.format(spider.year))
        except:
            self.filepath = DATA_DIR.joinpath('income.csv')
        self.file = self.filepath.open(mode='wb')
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
        spider.logger.info('Sorting csv file by year and stock_id...')
        self._csv_sorting(self.filepath)

    def process_item(self, item, spider):
        self.exporter.export_item(item)
        return item

    def _csv_sorting(self, filepath: str):
        data = pd.read_csv(filepath)
        data.sort_values(['year', 'stock_code'], ascending=[False, True], inplace=True)
        data.to_csv(filepath, index=False)


class SalaryPipeline:

    def open_spider(self, spider):
        try:
            self.filepath = DATA_DIR.joinpath('salary/salary-{}.csv'.format(spider.year))
        except:
            self.filepath = DATA_DIR.joinpath('salary.csv')
        self.file = self.filepath.open(mode='wb')
        self.exporter = CsvItemExporter(self.file)

        # specifies exported fields and order
        self.exporter.fields_to_export = [
            'year',
            'stock_code',
            'industry_category',
            'nr_employee',
            'em_salary_total',
            'em_salary_avg',
            'em_salary_med',
            'eps',
            'ind_avg_em_salary_avg',
            'ind_avg_eps',
            'note_a',
            'note_b',
            'note_c',
            'notes',
        ]

    def close_spider(self, spider):
        self.exporter.finish_exporting()
        self.file.close()
        spider.logger.info('Sorting csv file by year and stock_id...')
        self._csv_sorting(self.filepath)

    def process_item(self, item, spider):
        self.exporter.export_item(item)
        return item

    def _csv_sorting(self, filepath: str):
        data = pd.read_csv(filepath)
        data.sort_values(['year', 'stock_code'], ascending=[False, True], inplace=True)
        data.to_csv(filepath, index=False)


class ShareholdingPipeline:

    def open_spider(self, spider):
        try:
            self.filepath = DATA_DIR.joinpath('shareholding/shareholding-{}.csv'.format(spider.year))
        except:
            self.filepath = DATA_DIR.joinpath('shareholding.csv')
        self.file = self.filepath.open(mode='wb')
        self.exporter = CsvItemExporter(self.file)

        # specifies exported fields and order
        self.exporter.fields_to_export = [
            'year',
            'stock_code',
            'title',
            'shareholder',
            'shareholding_initial',
            'shareholding_current',
            'pledge',
            'pledge_pp',
            'others_shareholding_total',
            'others_pledge',
            'others_pledge_pp'
        ]

    def close_spider(self, spider):
        self.exporter.finish_exporting()
        self.file.close()
        spider.logger.info('Sorting csv file by year and stock_code...')
        self._csv_sorting(self.filepath)

    def process_item(self, item, spider):
        self.exporter.export_item(item)
        return item

    def _csv_sorting(self, filepath: str):
        data = pd.read_csv(filepath)
        data.sort_values(['year', 'stock_code'], ascending=[False, True], inplace=True)
        data.to_csv(filepath, index=False)


class EpaPipeline:

    def open_spider(self, spider):
        self.filepath = DATA_DIR.joinpath(spider.dataset_id + '.csv')
        self.file = self.filepath.open(mode='wb')
        self.exporter = CsvItemExporter(self.file, encoding='utf-8-sig')

        # # specifies exported fields and order
        # self.exporter.fields_to_export = spider.fields_to_export

    def close_spider(self, spider):
        self.exporter.finish_exporting()
        self.file.close()
        # spider.logger.info('Drop dulicated rows...')
        # self._csv_drop_duplicates(spider, self.filepath)

    def process_item(self, item, spider):
        self.exporter.export_item(item)
        return item

    # def _csv_drop_duplicates(self, spider, filepath: str):
    #     data = pd.read_csv(filepath)
    #     spider.logger.debug('Before dropping: total number of rows = %s', len(data))
    #     data.drop_duplicates(inplace=True)
    #     spider.logger.debug('After dropping: total number of rows = %s', len(data))
    #     data.to_csv(filepath, index=False)
