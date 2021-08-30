from scrapy import Field, Item


class CompanyItem(Item):
    stock_code   = Field() # 公司代號(股票代號)
    name         = Field() # 公司名稱
    name_abbr    = Field() # 公司簡稱
    tax_code     = Field() # 營利事業統一編號
    company_type = Field() # 上市, 興櫃, 或公開發行


class FinancialItem(Item):
    # name = Field()
    pass
