#!/bin/bash -x

source ${OKTA_HOME}/${REPO}/scripts/setup.sh

setup_service xvfb start
setup_service java 1.8.222
setup_service google-chrome-stable 87.0.4280.66-1

yum -y install lsof

cd ${OKTA_HOME}/${REPO}

function run_tests() {
  # npm run pretest
  create_log_group "Pretest"
  npm i -D protractor
  node ./scripts/update-se-drivers.js
  node ./scripts/setup-env.js
  finish_log_group $?

  create_log_group "Okta Hosted E2E"
  # npm run test:okta-hosted-login
  ./node_modules/.bin/protractor okta-oidc-tck/e2e-tests/okta-hosted-login/conf.js
  finish_log_group $?

  kill -s TERM $(lsof -t -i:8080 -sTCP:LISTEN)
  kill -s TERM $(lsof -t -i:8000 -sTCP:LISTEN)

  create_log_group "Custom Login E2E"
  # npm run test:custom-login
  ./node_modules/.bin/protractor okta-oidc-tck/e2e-tests/custom-login/conf.js
  finish_log_group $?
}