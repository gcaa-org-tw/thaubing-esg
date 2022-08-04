#!/bin/bash

cd "`dirname $0`"
./reset.sh
node extractEnvironment.js
node extractSocial.js
node extractGov.js
node aggregateMetrics.js
node extractNetZeroRoadmap.js
