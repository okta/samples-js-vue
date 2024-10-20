#!/bin/bash -x

source ${OKTA_HOME}/${REPO}/scripts/setup-e2e.sh

export TRAVIS=true
export DBUS_SESSION_BUS_ADDRESS=/dev/null

export TEST_SUITE_TYPE="junit"
export TEST_RESULT_FILE_DIR="${REPO}/build2/reports/junit"

export ORG_OIE_ENABLED=true # This flag ensures the TCK tests run OIE tests
export USE_INTERACTION_CODE=true # This flag ensures that the self hosted widget uses interact code flow
export ISSUER=https://oie-signin-widget.okta.com/oauth2/default
export CLIENT_ID=0oa8lrg7ojTsbJgRQ696
export USERNAME=george@acme.com
get_terminus_secret "/" PASSWORD PASSWORD
export DEFAULT_TIMEOUT_INTERVAL=45000

cd ${OKTA_HOME}/${REPO}

if ! run_tests; then
  echo "e2e tests failed! Exiting..."
  exit ${TEST_FAILURE}
fi

echo ${TEST_SUITE_TYPE} > ${TEST_SUITE_TYPE_FILE}
echo ${TEST_RESULT_FILE_DIR} > ${TEST_RESULT_FILE_DIR_FILE}
exit ${PUBLISH_TYPE_AND_RESULT_DIR}
