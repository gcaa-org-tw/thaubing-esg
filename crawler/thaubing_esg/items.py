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


class FacilityItem(Item):
    EmsNo            = Field() # 管制編號
    FacilityName     = Field() # 事業名稱
    UniformNo        = Field() # 營利事業統一編號
    County           = Field() # 縣市
    Township         = Field() # 鄉鎮市區
    FacilityAddress  = Field() # 實際廠(場)地址
    IndustryAreaName = Field() # 所在工業區名稱
    IndustryID       = Field() # 行業別代碼
    IndustryName     = Field() # 行業別名稱
    TWD97TM2X        = Field() # 二度分帶X座標(TWD97)
    TWD97TM2Y        = Field() # 二度分帶Y座標(TWD97)
    WGS84Lon         = Field() # 經度(WGS84)
    WGS84Lat         = Field() # 緯度(WGS84)
    IsAir            = Field() # 是否空列管
    IsWater          = Field() # 是否水列管
    IsWaste          = Field() # 是否廢棄物列管
    IsToxic          = Field() # 是否毒化物列管
    IsSoil           = Field() # 是否土壤列管
    AirReleaseDate   = Field() # 空解列日期
    WaterReleaseDate = Field() # 水解列日期
    WasteReleaseDate = Field() # 廢解列日期
    ToxicReleaseDate = Field() # 毒解列日期
    SoilReleaseDate  = Field() # 土解列日期


class ViolationItem(Item):
    EMS_NO                = Field() # 管制事業編號
    FAC_NAME              = Field() # 事業名稱
    COUNTY_NAME           = Field() # 管轄縣市名稱
    DOCUMENT_NO           = Field() # 裁處書字號
    TRANSGRESS_DATE       = Field() # 違反時間
    TRANSGRESS_STATE      = Field() # 違反事實（不公開）
    TRANSGRESS_LAW        = Field() # 違反法令
    PENALTY_MONEY         = Field() # 裁處金額
    PENALTY_DATE          = Field() # 裁處時間
    ISPETITION            = Field() # 是否訴願
    PETITION_RESULTS      = Field() # 訴願結果
    APPEAL_OR_RESCIND     = Field() # 陳情或撤銷結果
    TRANSGRESS_TYPE       = Field() # 污染類別
    FAC_ADDRESS           = Field() # 公司（工廠）地址
    TRANSGRESS_NAME       = Field() # 違規人名稱
    OPENINFOR             = Field() # 違反事實
    LAWSUIT_DATE_1        = Field() # 訴願提出日期
    ILLEGAL_MONEY         = Field() # 不法利得
    TRACK_ILLEGAL_MONEY   = Field() # 水污追繳不法利得
    COUNTY_CODE           = Field() # 裁處機關代碼
    PETITION_AGENCY       = Field() # 審議機關
    FAC_UNIFORMNO         = Field() # 統一編號
    TRANSGRESS_ADDRESS    = Field() # 違反地址
    SUBJECT               = Field() # 主旨
    GIST_DEFINE           = Field() # 裁處理由及法令
    IMPROVE_DEADLINE      = Field() # 限改日期
    INSPECTION_CONDITION  = Field() # 複查稽查單稽查結果
    TRANSGRESS_CONTROL_ID = Field() # 違規人管制編號
    IS_IMPROVE            = Field() # 改善完妥與否
    INSPECTION_DATETIME_S = Field() # 複查稽查單稽查日期
    PENALTYKIND           = Field() # 其他處罰方式
    ISIMPORTANT           = Field() # 情節重大
    PAYMENTSTATE          = Field() # 罰鍰是否繳清
    ISREMINDER            = Field() # 是否進行催繳
    ISADMINCOURT          = Field() # 是否行政移送
    IsReduceMoney         = Field() # 是否減免罰鍰


class AirPollutantItem(Item):
    FacilityID          = Field(col_id=0) # 管制編號
    FacilityName        = Field(col_id=1) # 事業名稱
    ReportPeriod        = Field(col_id=2) # 申報時段
    Status              = Field(col_id=3) # 申報狀態
    VOCs                = Field() # 揮發性有機化合物
    TSP                 = Field() # 粒狀污染物
    SOx                 = Field() # 硫氧化物
    NOx                 = Field() # 氮氧化物
    Toluene             = Field() # 甲苯
    Xylene              = Field() # 二甲苯
    Benzene             = Field() # 苯
    Ethylbenzene        = Field() # 乙苯
    Styrene             = Field() # 苯乙烯
    Methylenechloride   = Field() # 二氯甲烷
    Dichloroethane11    = Field(colname='11Dichloroethane') # 1-1-二氯乙烷
    Dichloroethane12    = Field(colname='12Dichloroethane') # 1-2-二氯乙烷
    chloroform          = Field() # 三氯甲烷
    Trichloroethane     = Field(colname='111Trichloroethane') # 1-1-1-三氯乙烷
    CarbonTetrachloride = Field() # 四氯化碳
    Trichloroethylene   = Field() # 三氯乙烯
    Tetrachloroethylene = Field() # 四氯乙烯
    heavymetal          = Field() # 重金屬
    Dioxin              = Field() # 戴奧辛

class GhgItem(Item):
    App_year    = Field() # 監測年度
    companyno   = Field() # 事業編號
    companyname = Field() # 公私場所名稱
    scompanyno  = Field() # 工廠序號
    controlno   = Field() # 管制編號
    city        = Field() # 縣市
    town        = Field() # 鄉鎮市區
    companyaddr = Field() # 事業地址
    ccksicco1   = Field() # 行業別代碼
    Sicname1    = Field() # 行業別名稱
    CO2         = Field() # CO2排放量（公噸CO2e）
    CH4         = Field() # CH4排放量（公噸CO2e）
    N2O         = Field() # N2O排放量（公噸CO2e）
    HFCs        = Field() # HFCS排放量（公噸CO2e）
    PFCs        = Field() # PFCS排放量（公噸CO2e）
    SF6         = Field() # SF6排放量（公噸CO2e）
    nf3         = Field() # NF3排放量（公噸CO2e）
    Tot2        = Field() # 間接排放量（公噸CO2e）
    tot         = Field() # 排放總量（公噸CO2e）
    cause       = Field() # 自願揭露或法規規定
    Check_yn    = Field() # 是否經查證