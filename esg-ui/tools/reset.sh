#!/bin/bash

cd "`dirname $0`"/../static/content
rm -f overview/bau.csv
# temp workaround to keep manual data
mv industry/*-net-zero-commitment.csv ./
rm -f industry/*
mv *-net-zero-commitment.csv ./industry

mv company/*-net-zero-commitment.csv ./
rm -f company/*
mv *-net-zero-commitment.csv ./company
