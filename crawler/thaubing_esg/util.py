FILENAME_COMPANY = 'company.csv'

def format_tax_code(tax_code):
    code = str(tax_code).zfill(8)
    return code

accounting_subjects = [
    {
      "key": "total_operating_revenue",
      "en_name": ["Total operating revenue", "Total revenue"],
      "zh_name": ["營業收入合計", "收入合計", "收益合計"],
    },
    {
      "key": "total_operating_costs",
      "en_name": ["Total operating costs", "Total costs"],
      "zh_name": ["營業成本合計", "支出合計"],
    },
    {
      "key": "total_operating_expenses",
      "en_name": ["Total operating expenses", "Total expenses", "Total expenditure and expense"],
      "zh_name": ["營業費用合計", "支出及費用合計"]
    },
    {
      "key": "net_operating_income",
      "en_name": "Net operating income (loss)",
      "zh_name": ["營業利益（損失）", "營業利益"]
    },
    {
      "key": "profit_or_loss",
      "en_name": "Profit (loss)",
      "zh_name": ["本期淨利（淨損）", "本期稅後淨利（淨損）"],
    },
    {
      "key": "total_comprehensive_income",
      "en_name": "Total comprehensive income",
      "zh_name": ["本期綜合損益總額", "綜合損益總額"],
    },
    {
      "key": "total_assets",
      "en_name": "Total assets",
      "zh_name": ["資產總計", "資產總額"],
     }
]

industry_code_switcher = {
     1: "水泥工業",
     2: "食品工業",
     3: "塑膠工業",
     4: "紡織纖維",
     5: "電機機械",
     6: "電器電纜",
    21: "化學工業",
    22: "生技醫療業",
     7: "化學生技醫療",
     8: "玻璃陶瓷",
     9: "造紙工業",
    10: "鋼鐵工業",
    11: "橡膠工業",
    12: "汽車工業",
    24: "半導體業",
    25: "電腦及週邊設備業",
    26: "光電業",
    27: "通信網路業",
    28: "電子零組件業",
    29: "電子通路業",
    30: "資訊服務業",
    31: "其他電子業",
    13: "電子工業",
    23: "油電燃氣業",
    14: "建材營造",
    15: "航運業",
    16: "觀光事業",
    17: "金融保險業",
    18: "貿易百貨",
    19: "綜合企業",
    20: "其他",
    32: "文化創意業",
    33: "農業科技業",
    34: "電子商務",
    80: "管理股票",
    91: "存託憑證"
}
