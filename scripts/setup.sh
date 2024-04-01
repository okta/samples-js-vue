#!/bin/bash -xe

# Install required node version
export NVM_DIR="/root/.nvm"
setup_service node v16.20.2

# Revert the cache-min setting, since the internal cache does not apply to
# these repos (and causes problems in lookups)
npm config set cache-min 10
npm config set registry https://registry.yarnpkg.com

# Install dependences.
if ! npm install --ignore-scripts; then
  echo "npm install failed! Exiting..."
  exit ${FAILED_SETUP}
fi

# Run postinstall script
if ! npm run postinstall; then
  echo "npm postinstall failed! Exiting..."
  exit ${FAILED_SETUP}
fi
