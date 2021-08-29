from scrapy import Field, Item


class CompanyItem(Item):
    stock_code   = Field() # 公司代號(股票代號)
    name         = Field() # 公司名稱
    name_abbr    = Field() # 公司簡稱
    tax_code     = Field() # 營利事業統一編號
    company_type = Field() # 上市, 興櫃, 或公開發行


class IncomeItem(Item):
    stock_code                 = Field() # 公司代號(股票代號)
    year                       = Field() # 財務報表會計年度
    total_operating_revenue    = Field() # 營業收入合計
    total_operating_costs      = Field() # 營業成本合計
    total_operating_expenses   = Field() # 營業費用合計
    net_operating_income       = Field() # 營業利益（損失）
    profit_or_loss             = Field() # 本期淨利（淨損）
    total_comprehensive_income = Field() # 本期綜合損益總額
    total_assets               = Field() # 資產總計