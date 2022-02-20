FILENAME_COMPANY = 'company.csv'

# 公司登記資料-C製造業 https://data.gcis.nat.gov.tw/od/file?oid=[oid]
zip_urls = [
    { 'name': '台北市', 'oid': 'CDF178AC-A116-4CAA-8947-EEDB4B9D8C3D' },
    { 'name': '新北市', 'oid': '1EB303DD-E7A6-4EEB-9C34-B21A447D7D12' },
    { 'name': '桃園市', 'oid': '853CFBEE-524D-4DF2-B952-7ED84012807A' },
    { 'name': '台中市', 'oid': 'FC420109-8DF7-49F8-BD9F-BBB34289E7BD' },
    { 'name': '高雄市', 'oid': '705EA261-6BDA-4952-9D17-E348A8515AE4' },
    { 'name': '台南市', 'oid': '92A53D60-F849-40B3-B901-9CC7D6A91018' },
    { 'name': '南台灣排除六都', 'oid': '7345D509-0E7C-48DB-95F0-390925201990' },
    { 'name': '東台灣排除六都', 'oid': 'C08272DE-E4BB-4647-B993-C626351C1010' },
    { 'name': '中台灣排除六都', 'oid': '0D84DBC0-962E-48E7-9BE1-21549F0F38EB' },
    { 'name': '北台灣排除六都', 'oid': 'BF84A73E-99DD-4571-8B48-8D422C2193B0' },
]

# # 公司登記資料-C製造業
# # https://quality.data.gov.tw/dq_download_csv.php?nid=[nid]&md5_url=[md5_url]
# company_payload = [
#     { # 東台灣排除六都
#         "nid": 108385,
#         "md5_url": "1249a34c949b05a8645ac19fdeaef602"
#     },
#     { # 南台灣排除六都
#         "nid": 108367,
#         "md5_url": "4644850b293f8d9488df77f351bfe93c"
#     },
#     { # 北台灣排除六都
#         "nid": 108363,
#         "md5_url": "f0aa2c3f4349d5a5c5b21d1c57e1bc7c"
#     },
#     { # 中台灣排除六都
#         "nid": 108354,
#         "md5_url": "caac4cd079f4d68ef67d81c965e26c4f"
#     },
#     { # 台北市
#         "nid": 44692,
#         "md5_url": "f23b9d9a7cd3ae78c2ee85c2bde8b76f"
#     },
#     { # 新北市
#         "nid": 44676,
#         "md5_url": "04fc4827d5f245d8a4dc0eb3f3b7238e"
#     },
#     { # 桃園市
#         "nid": 45662,
#         "md5_url": "9b37980cf5276c8d92c98a5f4a972752"
#     },
#     { # 台中市
#         "nid": 45644,
#         "md5_url": "4ac4fd25720c78effbebc6007f2466cb"
#     },
#     { # 台南市
#         "nid": 54295,
#         "md5_url": "b856f96703cd9a8a41b0463ae36071ae"
#     },
#     { # 高雄市
#         "nid": 54294,
#         "md5_url": "b291804edb8a98df9c9cf5e9c1945827"
#     }
# ]


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

industry_code = [
    { "code":  1, "name": "水泥工業" },
    { "code":  2, "name": "食品工業" },
    { "code":  3, "name": "塑膠工業" },
    { "code":  4, "name": "紡織纖維" },
    { "code":  5, "name": "電機機械" },
    { "code":  6, "name": "電器電纜" },
    { "code": 21, "name": "化學工業" },
    { "code": 22, "name": "生技醫療業" },
    { "code":  7, "name": "化學生技醫療" },
    { "code":  8, "name": "玻璃陶瓷" },
    { "code":  9, "name": "造紙工業" },
    { "code": 10, "name": "鋼鐵工業" },
    { "code": 11, "name": "橡膠工業" },
    { "code": 12, "name": "汽車工業" },
    { "code": 24, "name": "半導體業" },
    { "code": 25, "name": "電腦及週邊設備業" },
    { "code": 26, "name": "光電業" },
    { "code": 27, "name": "通信網路業" },
    { "code": 28, "name": "電子零組件業" },
    { "code": 29, "name": "電子通路業" },
    { "code": 30, "name": "資訊服務業" },
    { "code": 31, "name": "其他電子業" },
    { "code": 13, "name": "電子工業" },
    { "code": 23, "name": "油電燃氣業" },
    { "code": 14, "name": "建材營造" },
    { "code": 15, "name": "航運業" },
    { "code": 16, "name": "觀光事業" },
    { "code": 17, "name": "金融保險業" },
    { "code": 18, "name": "貿易百貨" },
    { "code": 19, "name": "綜合企業" },
    { "code": 20, "name": "其他" },
    { "code": 91, "name": "存託憑證" }
]
