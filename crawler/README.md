# Crawler

## Requirement

- Python 3.7+ and [pipenv](https://pipenv.pypa.io/en/latest/)

Install the required dependencies by running,

```bash
pip install --user pipenv       # install pipenv
pipenv install                  # install dependencies
```

## How to run

In `scrapy.cfg`, set the project name one'd like to run to _default_,

```python
# scrapy.cfg

[settings]
default = [project_name].settings
company = company.settings
financial = financial.settings
...
```

Then run,

```bash
pipenv run scrapy crawl [spider_name] -a year=[year]
```

...where the optional argument `year` indicates the target year for financial report. If no argument is provided, by default, the latest year avialable is used.

## Projects

| Project | Spider | Description |
| ------- | ------ | ----------- |
| `company` | `company` | 公司基本資料 |
| `financial` | `financial` | 合併財務報表重要會計科目資料 |
