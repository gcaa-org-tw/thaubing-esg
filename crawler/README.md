# Crawler

In `scrapy.cfg`, set the project name one'd like to run to default,

```python
[settings]
default = [project_name].settings
company = company.settings
financial = financial.settings
...
```

Then run,

```bash
pipenv run scrapy crawl [spider_name]
```

| project | spider | description |
| ------- | ------ | ----------- |
| `company` | `company` | 公司基本資料 |
| `financial` | `financial` | 合併財務報表重要會計科目資料 |
