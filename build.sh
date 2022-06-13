#!/usr/bin/env bash

echo "Building..."
docker build -t ct2-calculator .

echo "Extracting..."
docker container create --name extract ct2-calculator
docker container cp extract:/usr/src/dist ./dist
docker container rm extract
