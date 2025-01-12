#!/usr/bin/env bash
DIR="$( cd  "$( dirname $BASH_SOURCE[0])" && pwd )"

export PYTHONUNBUFFERED=1
export PYTHONPATH=${DIR}/../../python:${DIR}/..:.:$PYTHONPATH

START_SCRIPT="start_app.py"

python3 ${DIR}/${START_SCRIPT}