from scrapy import Field, Item


class CompanyItem(Item):
    stock_code    = Field() # 公司代號(股票代號)
    name          = Field() # 公司名稱
    name_abbr     = Field() # 公司簡稱
    tax_code      = Field() # 營利事業統一編號
    industry_code = Field() # 產業別代號
    company_type  = Field() # 上市, 興櫃, 或公開發行


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


class SalaryItem(Item):
    # 非擔任主管職務之全時員工資訊-2018年開始申報適用
    # 員工薪資中位數-2019年開始申報適用
    year                  = Field() # 年度
    stock_code            = Field() # 公司代號
    industry_category     = Field() # 產業類別
    nr_employee           = Field() # 非擔任主管職務之全時員工資訊-員工人數年度平均(人)
    em_salary_total       = Field() # 非擔任主管職務之全時員工資訊-員工薪資總額(仟元)
    em_salary_avg         = Field() # 非擔任主管職務之全時員工資訊-員工薪資平均數(仟元/人)
    em_salary_med         = Field() # 非擔任主管職務之全時員工資訊-員工薪資中位數(仟元/人)
    eps                   = Field() # 每股盈餘(元/股)
    ind_avg_em_salary_avg = Field() # 同業公司資訊-員工薪資平均數(仟元/人)
    ind_avg_eps           = Field() # 同業公司資訊-平均每股盈餘(元/股)
    note_a                = Field() # 薪資統計情形-非經理人之全時員工薪資平均數未達50萬元
    note_b                = Field() # 薪資統計情形-公司EPS獲利表現較同業為佳，惟非經理人之全時員工薪資平均數低於同業水準
    note_c                = Field() # 薪資統計情形-公司EPS較前一年度成長，惟非經理人之全時員工薪資平均數較前一年度減少
    notes                 = Field() # 薪資統計情形-公司經營績效與員工薪酬之關聯性及合理性說明