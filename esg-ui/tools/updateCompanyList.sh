#!/bin/bash

cd "`dirname $0`"
rm ../static/content/companyList.csv
node ./extractCompanyList.js

