#!/bin/bash -x

setup_service python 3.11
source ${OKTA_HOME}/${REPO}/scripts/setup.sh

cd ${OKTA_HOME}/${REPO}

create_log_group "Synk Scan"
dependency_scan
finish_log_group $?
