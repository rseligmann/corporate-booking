#!/usr/bin/env bash
DIR="$( cd  "$( dirname $BASH_SOURCE[0])" && pwd )"

export PYTHONUNBUFFERED=1
export PYTHONPATH=${DIR}/../libraries/python:.:$PYTHONPATH

python3 ${DIR}/test_admin_crud.py