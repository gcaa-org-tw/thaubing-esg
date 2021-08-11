library(readxl)
library(writexl)
library(dplyr)
library(tidyr)
library(jsonlite)
library(RCurl)
library(XML)
library(httr)

setwd("C:/Users/柯乾庸/Documents/GCAA/thaubing/20210810總統盃資料預抓")

a <- 0:1000

#抓取"環境保護許可管理系統(暨解除列管)對象基本資料"
ems_s_01 <- list()
for (i in 0:325) {
  url01 <- paste0("https://data.epa.gov.tw/api/v1/ems_s_01?offset=" ,a[i], "000&limit=1000&api_key=EPA&sort=EmsNo")
  temp01a <- fromJSON(url01)
  ems_s01a <- as.data.frame(temp01a[["records"]])
  ems_s_01 <- rbind(ems_s_01, ems_s01a)
}

#抓取"列管事業污染源裁處資料"
ems_p_46 <- list()
for (i in 0:125) {
  url46 <- paste0("https://data.epa.gov.tw/api/v1/ems_p_46?offset=" ,a[i], "000&limit=1000&api_key=EPA&sort=EMS_NO")
  temp46a <- fromJSON(url46)
  ems_p46a <- as.data.frame(temp46a[["records"]])
  ems_p_46 <- rbind(ems_p_46, ems_p46a)
}

#抓取"溫室氣體年排放量"
ghg_p_01 <- list()
for (i in 0:3) {
  urlg01 <- paste0("https://data.epa.gov.tw/api/v1/ghg_p_01?offset=" ,a[i], "000&limit=1000&api_key=EPA&sort=companyno")
  tempg01a <- fromJSON(urlg01)
  ems_g01a <- as.data.frame(tempg01a[["records"]])
  ghg_p_01 <- rbind(ghg_p_01, ems_g01a)
}

#抓取"各工廠空氣污染物排放資料"
ems_p_08 <- list()
for (i in 0:580) {
  url08 <- paste0("https://data.epa.gov.tw/api/v1/ems_p_08?offset=" ,a[i], "000&limit=1000&api_key=EPA&sort=FacilityID")
  temp08a <- fromJSON(url08)
  ems_p08a <- as.data.frame(temp08a[["records"]])
  ems_p_08 <- rbind(ems_p_08, ems_p08a)
}

#比對所有欄位移除重複值
ems_s_01_T <- ems_s_01[!duplicated(ems_s_01, fromLast=TRUE), ]
ems_p_46_T <- ems_p_46[!duplicated(ems_p_46, fromLast=TRUE), ]
ghg_p_01_T <- ghg_p_01[!duplicated(ghg_p_01, fromLast=TRUE), ]
ems_p_08_T <- ems_p_08[!duplicated(ems_p_08, fromLast=TRUE), ]

write_json(ems_s_01_T, "ems_s_01_T.json")
write_json(ems_p_46_T, "ems_p_46_T.json")
write_json(ghg_p_01_T, "ghg_p_01_T.json")
write_json(ems_p_08_T, "ems_p_08_T.json")
write_xlsx(ems_p_46_T, "ems_p_46_T.xlsx")

#重讀資料
ems_s_01_T <- fromJSON("ems_s_01_T.json")
ems_p_46_T <- fromJSON("ems_p_46_T.json")
ghg_p_01_T <- fromJSON("ghg_p_01_T.json")
ems_p_08_T <- fromJSON("ems_p_08_T.json")

#轉換大小寫
ems_s_01_T$EmsNo <- toupper(ems_s_01_T$EmsNo)
ems_p_46_T$EMS_NO <- toupper(ems_p_46_T$EMS_NO)
ghg_p_01_T$controlno <- toupper(ghg_p_01_T$controlno)
ems_p_08_T$FacilityID <- toupper(ems_p_08_T$FacilityID)

#比對是否有在大表內
comp0101 <- list()
comp0108 <- list()
comp0146 <- list()
comp0101 <- merge(ghg_p_01_T, ems_s_01_T, by.x = "controlno", by.y = "EmsNo")
comp0108 <- merge(ems_p_08_T, ems_s_01_T, by.x = "FacilityID", by.y = "EmsNo")
comp0146 <- merge(ems_p_46_T, ems_s_01_T, by.x = "EMS_NO", by.y = "EmsNo")
#比對後，溫室沒有缺值，裁處、空污皆有缺值

#保留全部資料，另存缺值
comp0108M <- merge(ems_p_08_T, ems_s_01_T, by.x = "FacilityID", by.y = "EmsNo", all.x = "TRUE")
comp0146M <- merge(ems_p_46_T, ems_s_01_T, by.x = "EMS_NO", by.y = "EmsNo", all.x = "TRUE")

#抓取缺值
comp0108M_NA <- comp0108M %>%
  filter(is.na(County))
comp0146M_NA <- comp0146M %>%
  filter(is.na(County))

write_xlsx(comp0108M_NA, "比對空污排放V基本資料缺值.xlsx")
write_xlsx(comp0146M_NA, "比對違規裁處V基本資料缺值.xlsx")
