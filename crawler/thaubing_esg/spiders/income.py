import os
from thaubing_esg.pipelines import IncomePipeline
from scrapy import Request
from scrapy.spiders import Spider
from ..items import IncomeItem

class IncomeSpider(Spider):
    name = 'income'
    data_dir = os.path.normpath(os.path.join(os.path.dirname(__file__), '../../../data/financial/webpages'))
    custom_settings = {
        'ITEM_PIPELINES': {
            'thaubing_esg.IncomePipeline': 300
        },
    }

    def start_requests(self):
        year = getattr(self, 'year', None)

        # parse all years
        if year is None:
            self.logger.info('Start parsing saved webpage files in directory %s...', self.data_dir)
            for subdir_year in reversed(os.listdir(self.data_dir)):
                self.logger.info('Start parsing year=%s...', subdir_year)
                data_dir_year = os.path.join(self.data_dir, subdir_year)
                for file in os.listdir(data_dir_year):
                    if file.endswith(".html"):
                        filepath = os.path.join(data_dir_year, file)
                        yield Request(
                            url=self._format_filepath_to_datauri(filepath),
                            meta={'stock_id': file, 'year': subdir_year},
                            callback=self.parse,
                        )
                self.logger.info('Completed parsing year=%s!', subdir_year)

        # parse only specified year
        else:
            data_dir_year = os.path.join(self.data_dir, year)
            self.logger.info('Year specified: %s. Parsing saved webpage files in directory %s...', year, data_dir_year)
            for file in os.listdir(data_dir_year):
                if file.endswith(".html"):
                    filepath = os.path.join(data_dir_year, file)
                    yield Request(
                        url=self._format_filepath_to_datauri(filepath),
                        meta={'stock_id': file, 'year': year},
                        callback=self.parse,
                    )

    def parse(self, response):
        item = IncomeItem()
        pass

    def _format_filepath_to_datauri(self, filepath: str):
        return ('file:///' + os.path.normpath(filepath))
