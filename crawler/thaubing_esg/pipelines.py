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

        self.company_abbr = pd.read_csv(gen_data_filepath('temp/company_abbr.csv'))

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
        # for items that has stock_code, assign its name_abbr and company_type
        if item['stock_code'] != '':
            try:
                item_abbr = self.company_abbr.loc[self.company_abbr['stock_code'] == item['stock_code']].iloc[0]
                item['name_abbr'] = item_abbr.loc['name_abbr']
                item['company_type'] = item_abbr.loc['company_type']
            except:
                spider.logger.debug('No name_abbr and/or company_type found for stock_code={}'.format(item['stock_code']))
        self.exporter.export_item(item)
        return item


class CompanyAbbrPipeline:
    filepath = gen_data_filepath('temp/company_abbr.csv')

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
            self.filepath = gen_data_filepath('salary/salary-{}.csv'.format(spider.year))
        except:
            self.filepath = gen_data_filepath('salary.csv')
        self.file = open(self.filepath, 'wb')
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
            self.filepath = gen_data_filepath('shareholding/shareholding-{}.csv'.format(spider.year))
        except:
            self.filepath = gen_data_filepath('shareholding.csv')
        self.file = open(self.filepath, 'wb')
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
        self.filepath = gen_data_filepath(spider.dataset_id + '.csv')
        self.file = open(self.filepath, 'wb')
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
