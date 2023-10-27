/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

/* eslint-disable no-console */

'use strict';

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

function cloneRepository(repository, directory, branch='master') {
  const dir = path.join(__dirname, '..', directory);
  if (fs.existsSync(dir)) {
    console.log(`${directory} is already cloned. Getting latest version...`);
    execSync(`cd ${directory} && git pull`)
    return;
  }

  let command = `git clone ${repository}`;
  if (branch) {
    command = `git clone --single-branch --branch ${branch} ${repository}`;
  }
  console.log(`Cloning repository ${directory}`);
  execSync(command);
}

function installDependencies(directory) {
  const dir = path.resolve(__dirname, '..', directory);
  execSync(`cd ${dir} && npm install`);
}

cloneRepository('https://github.com/okta/samples-nodejs-express-4.git', 'samples-nodejs-express-4');
execSync(`cd ${path.join(__dirname, '..', 'samples-nodejs-express-4')} && npm install --unsafe-perm`);
cloneRepository('https://github.com/okta/okta-oidc-tck.git', 'okta-oidc-tck', 'master');
installDependencies('okta-oidc-tck/e2e-tests');