# thaubing-esg

透明足跡PLUS—ESG檢測儀：我們與永續轉型的距離

- [📑 **HackMD筆記**](https://hackmd.io/@chengh/SkYHa65nO/) — 本專案相關討論紀錄

## DEV Getting started

### Crawler

- Requirement: Python 3.9+ and [pipenv](https://pipenv.pypa.io/en/latest/)

```bash
pip install --user pipenv       # install pipenv
pipenv install                  # install dependencies
```

Further instuctions can be found in directory .\crawler.

### Database setup

- Requirement: [Postgresql](https://www.postgresql.org/) 13+

```bash
psql -U postgres -c "\i sql/postgres_db_setup.sql"
```