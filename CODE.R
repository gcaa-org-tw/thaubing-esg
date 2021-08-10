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
  url01 <- paste0("https://data.epa.gov.tw/api/v1/ems_s_01?offset=" ,a[i], "000&limit=1000&api_key=8829d459-5d78-48c2-ad70-0da20335ddac&sort=EmsNo")
  temp01a <- fromJSON(url01)
  ems_p01a <- as.data.frame(temp01a[["records"]])
  ems_s_01 <- rbind(ems_s_01, ems_p01a)
}

#抓取"列管事業污染源裁處資料"
ems_s_46 <- list()
for (i in 0:125) {
  url46 <- paste0("https://data.epa.gov.tw/api/v1/ems_s_46?offset=" ,a[i], "000&limit=1000&api_key=8829d459-5d78-48c2-ad70-0da20335ddac&sort=EMS_NO")
  temp46a <- fromJSON(url46)
  ems_p46a <- as.data.frame(temp46a[["records"]])
  ems_s_46 <- rbind(ems_s_46, ems_p46a)
}

#抓取"溫室氣體年排放量"
ghg_p_01 <- list()
for (i in 0:3) {
  urlg01 <- paste0("https://data.epa.gov.tw/api/v1/ghg_p_01?offset=" ,a[i], "000&limit=1000&api_key=8829d459-5d78-48c2-ad70-0da20335ddac&sort=companyno")
  tempg01a <- fromJSON(urlg01)
  ems_pg01a <- as.data.frame(tempg01a[["records"]])
  ghg_p_01 <- rbind(ghg_p_01, ems_pg01a)
}

#抓取"各工廠空氣污染物排放資料"
ems_s_08 <- list()
for (i in 0:800) {
  url08 <- paste0("https://data.epa.gov.tw/api/v1/ems_s_08?offset=" ,a[i], "000&limit=1000&api_key=8829d459-5d78-48c2-ad70-0da20335ddac&sort=FacilityID")
  temp08a <- fromJSON(url08)
  ems_p08a <- as.data.frame(temp08a[["records"]])
  ems_s_08 <- rbind(ems_s_08, ems_p08a)
}