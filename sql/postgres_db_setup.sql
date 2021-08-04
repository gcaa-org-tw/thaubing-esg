\connect postgres

---------------------------------------------------------------------------------------
-- create database
---------------------------------------------------------------------------------------

-- This allows no new connection to be made to the database
UPDATE pg_database SET datallowconn = 'false' WHERE datname = 'thaubing_esg';

-- This closes all connections to the database. Should not be used lightly! (with great power comes great responsibility)
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'thaubing_esg';

-- This drops and recreates the suez database
DROP DATABASE IF EXISTS thaubing_esg;
CREATE DATABASE thaubing_esg;

\connect thaubing_esg

SET client_min_messages TO WARNING;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

---------------------------------------------------------------------------------------
-- user role setup
---------------------------------------------------------------------------------------

\echo '\n\t>>>>> Create thaubing_user...\n'

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_catalog.pg_roles  -- SELECT list can be empty for this
        WHERE  rolname = 'thaubing_user'
        ) THEN
        CREATE ROLE thaubing_user NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT LOGIN PASSWORD 'thaubingpassword';
    ELSE
        RAISE INFO '>>>>> Not creating role thaubing_user -- it already exists';
    END IF;
END
$$;

\echo '\n\t>>>>> Allow thaubing_user to connect to database thaubing_esg\n'
GRANT CONNECT ON DATABASE thaubing_esg TO thaubing_user;

---------------------------------------------------------------------------------------
-- schema setup : facility 工廠 / 列管事業單位資料
---------------------------------------------------------------------------------------
\echo '\n\t>>>>> Set up schema facility...\n'
CREATE SCHEMA facility;
COMMENT ON SCHEMA facility IS '工廠 / 列管事業單位資料';

--------------------------------------------------------------
-- facility.registries 環境保護許可管理系統(暨解除列管)對象基本資料
--------------------------------------------------------------

CREATE TABLE facility.registries (
	facility_id varchar NOT NULL, -- 管制編號
	facility_name varchar NOT NULL, -- 事業名稱
	tax_code varchar NULL, -- 營利事業統一編號
	address varchar NULL, -- 實際廠(場)地址
	industry_area_name varchar NULL, -- 所在工業區名稱
	industry_code int4 NULL, -- 行業別代碼
	twd97tm2x float4 NULL, -- 二度分帶X座標(TWD97)
	twd97tm2y float4 NULL, -- 二度分帶Y座標(TWD97)
	wgs84lon float4 NULL, -- 經度(WGS84)
	wgs84lat float4 NULL, -- 緯度(WGS84)
	registry_air bool NOT NULL, -- 是否空列管
	registry_water bool NOT NULL, -- 是否水列管
	registry_waste bool NOT NULL, -- 是否廢棄物列管
	regsitry_toxic bool NOT NULL, -- 是否毒化物列管
	registry_soil bool NOT NULL, -- 是否土壤列管
	registry_release_date_air date NULL, -- 空列管解除日期
	registry_release_date_water date NULL, -- 水列管解除日期
	registry_release_date_waste date NULL, -- 廢棄物列管解除日期
	regsitry_release_date_toxic date NULL, -- 毒化物列管解除日期
	registry_release_date_soil date NULL, -- 土壤列管解除日期
	CONSTRAINT registries_pk PRIMARY KEY (facility_id)
);
COMMENT ON TABLE facility.registries IS '環境保護許可管理系統(暨解除列管)對象基本資料';

COMMENT ON COLUMN facility.registries.facility_id IS '管制編號';
COMMENT ON COLUMN facility.registries.facility_name IS '事業名稱';
COMMENT ON COLUMN facility.registries.tax_code IS '營利事業統一編號';
COMMENT ON COLUMN facility.registries.address IS '實際廠(場)地址';
COMMENT ON COLUMN facility.registries.industry_area_name IS '所在工業區名稱';
COMMENT ON COLUMN facility.registries.industry_code IS '行業別代碼';
COMMENT ON COLUMN facility.registries.twd97tm2x IS '二度分帶X座標(TWD97)';
COMMENT ON COLUMN facility.registries.twd97tm2y IS '二度分帶Y座標(TWD97)';
COMMENT ON COLUMN facility.registries.wgs84lon IS '經度(WGS84)';
COMMENT ON COLUMN facility.registries.wgs84lat IS '緯度(WGS84)';
COMMENT ON COLUMN facility.registries.registry_air IS '是否空列管';
COMMENT ON COLUMN facility.registries.registry_water IS '是否水列管';
COMMENT ON COLUMN facility.registries.registry_waste IS '是否廢棄物列管';
COMMENT ON COLUMN facility.registries.regsitry_toxic IS '是否毒化物列管';
COMMENT ON COLUMN facility.registries.registry_soil IS '是否土壤列管';
COMMENT ON COLUMN facility.registries.registry_release_date_air IS '空列管解除日期';
COMMENT ON COLUMN facility.registries.registry_release_date_water IS '水列管解除日期';
COMMENT ON COLUMN facility.registries.registry_release_date_waste IS '廢棄物列管解除日期';
COMMENT ON COLUMN facility.registries.regsitry_release_date_toxic IS '毒化物列管解除日期';
COMMENT ON COLUMN facility.registries.registry_release_date_soil IS '土壤列管解除日期';

----------------------------------------------------------
-- facility.emissions_air_pollutant 各工廠空氣污染物排放資料
----------------------------------------------------------

CREATE TABLE facility.emissions_air_pollutant (
	facility_id varchar NOT NULL, -- 管制編號
	reporting_year int4 NOT NULL, -- 申報時段-年份
	reporting_season int4 NOT NULL, -- 申報時段-季度
	reporting_status varchar NULL, -- 申報狀態
	emissions_vocs float4 NULL, -- 揮發性有機化合物（公噸）
	emissions_tsp float4 NULL, -- 粒狀污染物（公噸）
	emissions_sox float4 NULL, -- 硫氧化物（公噸）
	emissions_nox float4 NULL, -- 氮氧化物（公噸）
	emissions_toluene float4 NULL, -- 甲苯（公噸）
	emissions_xylene float4 NULL, -- 二甲苯（公噸）
	emissions_benzene float4 NULL, -- 苯（公噸）
	emissions_ethylbenzene float4 NULL, -- 乙苯（公噸）
	emissions_styrene float4 NULL, -- 苯乙烯（公噸）
	emissions_methylene_chloride float4 NULL, -- 二氯甲烷（公噸）
	"emissions_1-1-dichloroethane" float4 NULL, -- 1-1-二氯乙烷（公噸）
	"emissions_1-2-dichloroethane" float4 NULL, -- 1-2-二氯乙烷（公噸）
	emissions_chloroform float4 NULL, -- 三氯甲烷（公噸）
	"emissions_1-1-1-trichloroethane" float4 NULL, -- 1-1-1-三氯乙烷（公噸）
	emissions_carbon_tetrachloride float4 NULL, -- 四氯化碳（公噸）
	emissions_trichloroethylene float4 NULL, -- 三氯乙烯（公噸）
	emissions_tetrachloroethylene float4 NULL, -- 四氯乙烯（公噸）
	emissions_heavy_metal float4 NULL, -- 重金屬（公噸）
	emissions_dioxin float4 NULL, -- 戴奧辛（公斤）
	CONSTRAINT emissions_air_pollutant_pk PRIMARY KEY (facility_id, reporting_year, reporting_season)
);
COMMENT ON TABLE facility.emissions_air_pollutant IS '各工廠空氣污染物排放資料';

COMMENT ON COLUMN facility.emissions_air_pollutant.facility_id IS '管制編號';
COMMENT ON COLUMN facility.emissions_air_pollutant.reporting_year IS '申報時段-年份';
COMMENT ON COLUMN facility.emissions_air_pollutant.reporting_season IS '申報時段-季度';
COMMENT ON COLUMN facility.emissions_air_pollutant.reporting_status IS '申報狀態';
COMMENT ON COLUMN facility.emissions_air_pollutant.emissions_vocs IS '揮發性有機化合物（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant.emissions_tsp IS '粒狀污染物（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant.emissions_sox IS '硫氧化物（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant.emissions_nox IS '氮氧化物（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant.emissions_toluene IS '甲苯（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant.emissions_xylene IS '二甲苯（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant.emissions_benzene IS '苯（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant.emissions_ethylbenzene IS '乙苯（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant.emissions_styrene IS '苯乙烯（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant.emissions_methylene_chloride IS '二氯甲烷（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant."emissions_1-1-dichloroethane" IS '1-1-二氯乙烷（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant."emissions_1-2-dichloroethane" IS '1-2-二氯乙烷（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant.emissions_chloroform IS '三氯甲烷（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant."emissions_1-1-1-trichloroethane" IS '1-1-1-三氯乙烷（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant.emissions_carbon_tetrachloride IS '四氯化碳（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant.emissions_trichloroethylene IS '三氯乙烯（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant.emissions_tetrachloroethylene IS '四氯乙烯（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant.emissions_heavy_metal IS '重金屬（公噸）';
COMMENT ON COLUMN facility.emissions_air_pollutant.emissions_dioxin IS '戴奧辛（公斤）';

ALTER TABLE facility.emissions_air_pollutant ADD CONSTRAINT emissions_air_pollutant_fk FOREIGN KEY (facility_id) REFERENCES facility.registries(facility_id);

-----------------------------------------
-- facility.emissions_ghg 溫室氣體年排放量
-----------------------------------------

CREATE TABLE facility.emissions_ghg (
	facility_id varchar NOT NULL, -- 管制編號
	reporting_year int4 NOT NULL, -- 監測年度
	is_self_disclosure bool NOT NULL, -- 是否為自願揭露（或法規規定）
	is_checked bool NOT NULL, -- 是否經查證
	tot2 float4 NULL, -- 間接排放量（公噸CO2e）
	tot float4 NULL, -- 排放總量（公噸CO2e）
	co2 float4 NULL, -- CO2排放量（公噸CO2e）
	ch4 float4 NULL, -- CH4排放量（公噸CO2e）
	n2o float4 NULL, -- N2O排放量（公噸CO2e）
	hfcs float4 NULL, -- HFCS排放量（公噸CO2e）
	pfcs float4 NULL, -- PFCS排放量（公噸CO2e）
	sf6 float4 NULL, -- SF6排放量（公噸CO2e）
	nf3 float4 NULL, -- NF3排放量（公噸CO2e）
	CONSTRAINT emissions_ghg_pk PRIMARY KEY (facility_id, reporting_year)
);
COMMENT ON TABLE facility.emissions_ghg IS '溫室氣體年排放量';

COMMENT ON COLUMN facility.emissions_ghg.facility_id IS '管制編號';
COMMENT ON COLUMN facility.emissions_ghg.reporting_year IS '監測年度';
COMMENT ON COLUMN facility.emissions_ghg.is_self_disclosure IS '是否為自願揭露（或法規規定）';
COMMENT ON COLUMN facility.emissions_ghg.is_checked IS '是否經查證';
COMMENT ON COLUMN facility.emissions_ghg.tot2 IS '間接排放量（公噸CO2e）';
COMMENT ON COLUMN facility.emissions_ghg.tot IS '排放總量（公噸CO2e）';
COMMENT ON COLUMN facility.emissions_ghg.co2 IS 'CO2排放量（公噸CO2e）';
COMMENT ON COLUMN facility.emissions_ghg.ch4 IS 'CH4排放量（公噸CO2e）';
COMMENT ON COLUMN facility.emissions_ghg.n2o IS 'N2O排放量（公噸CO2e）';
COMMENT ON COLUMN facility.emissions_ghg.hfcs IS 'HFCS排放量（公噸CO2e）';
COMMENT ON COLUMN facility.emissions_ghg.pfcs IS 'PFCS排放量（公噸CO2e）';
COMMENT ON COLUMN facility.emissions_ghg.sf6 IS 'SF6排放量（公噸CO2e）';
COMMENT ON COLUMN facility.emissions_ghg.nf3 IS 'NF3排放量（公噸CO2e）';

ALTER TABLE facility.emissions_ghg ADD CONSTRAINT emissions_ghg_fk FOREIGN KEY (facility_id) REFERENCES facility.registries(facility_id);

--------------------------------------
-- facility.violations 污染違規裁處紀錄
--------------------------------------

CREATE TABLE facility.violations (
	facility_id varchar NOT NULL, -- 管制事業編號
	document_no varchar NOT NULL, -- 裁處書字號
	date_violation date NOT NULL, -- 違反時間
	date_fined date NOT NULL, -- 裁處時間
	admin_county varchar NULL, -- 管轄縣市名稱
	vio_regulations varchar NULL, -- 違反法令
	vio_category varchar NULL, -- 污染類別
	vio_desc varchar NULL, -- 裁處理由及法令
    vio_unit_name varchar NULL, -- 違規人名稱
    vio_unit_id varchar NULL, -- 違規人管制編號
    vio_cause varchar NULL, -- 違反事實
    vio_address varchar NULL, -- 違反地址
	amount_fined int4 NOT NULL, -- 裁處金額
	is_significant bool NOT NULL, -- 是否情節重大
    is_petition bool NOT NULL, -- 是否訴願
    petition_date date NOT NULL, -- 訴願提出日期
    petition_results varchar NULL, --- 訴願結果
    appeal_or_rescind varchar NULL, --- 陳情或撤銷結果
    is_reminder bool NOT NULL, -- 是否進行催繳
    is_admin_court bool NOT NULL, -- 是否行政移送

    -- columns below are not yet included in the sql script
    -- ILLEGAL_MONEY -- 不法利得
    -- TRACK_ILLEGAL_MONEY -- 水污追繳不法利得
    -- PETITION_AGENCY -- 審議機關
    -- SUBJECT -- 主旨
    -- GIST_DEFINE -- 裁處理由及法令
    -- IMPROVE_DEADLINE -- 限改日期
    -- INSPECTION_CONDITION -- 複查稽查單稽查結果
    -- IS_IMPROVE -- 改善完妥與否
    -- INSPECTION_DATETIME_S -- 複查稽查單稽查日期
    -- PENALTYKIND -- 其他處罰方式
    -- ISIMPORTANT -- 情節重大
    -- PAYMENTSTATE -- 罰鍰是否繳清
    -- ISADMINCOURT -- 是否行政移送
    -- IsReduceMoney -- 是否減免罰鍰

	CONSTRAINT violations_pk PRIMARY KEY (document_no)
);
COMMENT ON TABLE facility.violations IS '污染違規裁處紀錄';

COMMENT ON COLUMN facility.violations.facility_id IS '管制事業編號';
COMMENT ON COLUMN facility.violations.document_no IS '裁處書字號';
COMMENT ON COLUMN facility.violations.date_violation IS '違反時間';
COMMENT ON COLUMN facility.violations.date_fined IS '裁處時間';
COMMENT ON COLUMN facility.violations.amount_fined IS '裁處金額';
COMMENT ON COLUMN facility.violations.admin_county IS '管轄縣市名稱';
COMMENT ON COLUMN facility.violations.vio_regulations IS '違反法令';
COMMENT ON COLUMN facility.violations.vio_category IS '污染類別';
COMMENT ON COLUMN facility.violations.vio_cause IS '違反事實';
COMMENT ON COLUMN facility.violations.vio_address IS '違反地址';
COMMENT ON COLUMN facility.violations.vio_desc IS '裁處理由及法令';
COMMENT ON COLUMN facility.violations.vio_unit_name IS '違規人名稱';
COMMENT ON COLUMN facility.violations.vio_unit_id IS '違規人管制編號';
COMMENT ON COLUMN facility.violations.is_significant IS '是否情節重大';
COMMENT ON COLUMN facility.violations.is_petition IS '是否訴願';
COMMENT ON COLUMN facility.violations.petition_date IS '訴願提出日期';
COMMENT ON COLUMN facility.violations.petition_results IS '訴願結果';
COMMENT ON COLUMN facility.violations.appeal_or_rescind IS '陳情或撤銷結果';
COMMENT ON COLUMN facility.violations.is_reminder IS '是否進行催繳';
COMMENT ON COLUMN facility.violations.is_admin_court IS '是否行政移送';

ALTER TABLE facility.violations ADD CONSTRAINT violations_fk FOREIGN KEY (facility_id) REFERENCES facility.registries(facility_id);

ALTER TABLE facility.registries OWNER TO thaubing_user;
ALTER TABLE facility.emissions_air_pollutant OWNER TO thaubing_user;
ALTER TABLE facility.emissions_ghg OWNER TO thaubing_user;
ALTER TABLE facility.violations OWNER TO thaubing_user;
GRANT ALL ON SCHEMA facility TO thaubing_user;

---------------------------------------------------------------------------------------
-- schema setup : company 公司資料
---------------------------------------------------------------------------------------
\echo '\n\t>>>>> Set up schema company...\n'
CREATE SCHEMA company;
COMMENT ON SCHEMA company IS '公司資料';

---------------------------------
-- company.registries 公司基本資料
---------------------------------

CREATE TABLE company.registries (
	company_code varchar NULL, -- 股票/證券代號
	company_name varchar NOT NULL, -- 公司名稱
	company_name_sub date NULL, -- 公司名稱簡稱
    company_type int4 NULL, -- 公司類型
	tax_code varchar NOT NULL UNIQUE, -- 統一編號
	industry_code int4 NULL, -- 產業別代號
	industry_codes varchar NULL, -- 行業代號串
	CONSTRAINT registries_pk PRIMARY KEY (company_code)
);
COMMENT ON TABLE company.registries IS '上市櫃公司基本資料';
    
COMMENT ON COLUMN company.registries.company_code IS '股票/證券代號';
COMMENT ON COLUMN company.registries.company_name IS '公司名稱';
COMMENT ON COLUMN company.registries.company_name_sub IS '公司名稱簡稱';
COMMENT ON COLUMN company.registries.company_type IS '公司類型';
COMMENT ON COLUMN company.registries.tax_code IS '統一編號';
COMMENT ON COLUMN company.registries.industry_code IS '產業別代號';
COMMENT ON COLUMN company.registries.industry_codes IS '行業代號串';

-----------------------------------
-- company.financials 公司營收資料
-----------------------------------

CREATE TABLE company.financials (
	company_code varchar NOT NULL, -- 股票/證券代號
	reporting_year varchar NOT NULL, -- 會計年度
	total_operating_revenue int4 NULL, -- 營業收入合計
    total_operating_costs int4 NULL, -- 營業成本合計
    total_operating_expenses int4 NULL, -- 營業費用合計
    net_operating_income int4 NULL, -- 營業利益（損失）
    profit_or_loss int4 NULL, -- 本期淨利（淨損）
    total_comprehensive_income int4 NULL, -- 本期綜合損益總額
    total_assets int4 NULL, -- 資產總計
	CONSTRAINT financials_pk PRIMARY KEY (company_code, reporting_year),
	CONSTRAINT financials_fk FOREIGN KEY (company_code) REFERENCES company.registries(company_code)
);
COMMENT ON TABLE company.financials IS '公司營收資料';

COMMENT ON COLUMN company.financials.company_code IS '股票/證券代號';
COMMENT ON COLUMN company.financials.reporting_year IS '會計年度';
COMMENT ON COLUMN company.financials.total_operating_revenue IS '營業收入合計';
COMMENT ON COLUMN company.financials.total_operating_costs IS '營業成本合計';
COMMENT ON COLUMN company.financials.total_operating_expenses IS '營業費用合計';
COMMENT ON COLUMN company.financials.net_operating_income IS '營業利益（損失）';
COMMENT ON COLUMN company.financials.profit_or_loss IS '本期淨利（淨損）';
COMMENT ON COLUMN company.financials.total_comprehensive_income IS '本期綜合損益總額';
COMMENT ON COLUMN company.financials.total_assets IS '資產總計';

-----------------------------------
-- company.industry_code 產業別代號
-----------------------------------

CREATE TABLE company.industry_code (
	industry_code int4 NOT NULL, -- 產業別代號
	industry_category varchar NOT NULL UNIQUE, -- 產業別名稱
	CONSTRAINT industry_code_pk PRIMARY KEY (industry_code)
);
COMMENT ON TABLE company.industry_code IS '產業別代號';

COMMENT ON COLUMN company.industry_code.industry_code IS '產業別代號';
COMMENT ON COLUMN company.industry_code.industry_category IS '產業別名稱';

ALTER TABLE company.registries ADD CONSTRAINT industry_code_fk FOREIGN KEY (industry_code) REFERENCES company.industry_code(industry_code);

--------------------------------
-- company.company_type 公司類型
--------------------------------

CREATE TABLE company.company_type (
	company_type int NOT NULL, -- 公司類型
	company_type_name varchar NOT NULL UNIQUE, -- 公司類型名稱
	CONSTRAINT company_type_pk PRIMARY KEY (company_type)
);
COMMENT ON TABLE company.company_type IS '公司類型';

COMMENT ON COLUMN company.company_type.company_type IS '公司類型代碼';
COMMENT ON COLUMN company.company_type.company_type_name IS '公司類型名稱（上市、興櫃或公開發行）';

ALTER TABLE company.registries ADD CONSTRAINT company_type_fk FOREIGN KEY (company_type) REFERENCES company.company_type(company_type);

--------------------------------
-- company.groups 集團關聯資料
--------------------------------

CREATE TABLE company.groups (
	company_code varchar NOT NULL, -- 股票/證券代號（母公司）
	reporting_year varchar NOT NULL, -- 會計年度
	subsidiary_name varchar NOT NULL, -- 子公司名稱
    location_code int NOT NULL, -- 所在地區代號
    investments int NOT NULL, -- 原始投資金額
    equity_nr_stocks int NOT NULL, -- 期末持股情形 - 股數
    equity_share float4 NOT NULL, -- 期末持股情形 - 比率
    equity_book_amount int NOT NULL, -- 期末持股情形 - 帳面金額
	CONSTRAINT company_code_pk PRIMARY KEY (company_code, reporting_year, subsidiary_name)
);
COMMENT ON TABLE company.groups IS '集團關聯資料';

COMMENT ON COLUMN company.groups.company_code IS '股票/證券代號（母公司）';
COMMENT ON COLUMN company.groups.reporting_year IS '會計年度';
COMMENT ON COLUMN company.groups.subsidiary_name IS '子公司名稱';
COMMENT ON COLUMN company.groups.location_code IS '所在地區代號';
COMMENT ON COLUMN company.groups.investments IS '原始投資金額';
COMMENT ON COLUMN company.groups.equity_nr_stocks IS '期末持股情形 - 股數';
COMMENT ON COLUMN company.groups.equity_share IS '期末持股情形 - 比率';
COMMENT ON COLUMN company.groups.equity_book_amount IS '期末持股情形 - 帳面金額';

ALTER TABLE company."groups" ADD CONSTRAINT groups_fk FOREIGN KEY (company_code) REFERENCES company.registries(company_code);

ALTER TABLE company.registries OWNER TO thaubing_user;
ALTER TABLE company.financials OWNER TO thaubing_user;
ALTER TABLE company.industry_code OWNER TO thaubing_user;
ALTER TABLE company.company_type OWNER TO thaubing_user;
ALTER TABLE company.groups OWNER TO thaubing_user;
GRANT ALL ON SCHEMA company TO thaubing_user;

---------------------------------------------------------------------------------------
-- schema setup : nuisances 公害陳情資料
---------------------------------------------------------------------------------------
\echo '\n\t>>>>> Set up schema nuisances...\n'
CREATE SCHEMA nuisances;
COMMENT ON SCHEMA nuisances IS '公害陳情資料';

GRANT ALL ON SCHEMA nuisances TO thaubing_user;

