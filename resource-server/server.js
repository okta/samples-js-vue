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

const express = require('express');
const OktaJwtVerifier = require('@okta/jwt-verifier');
var cors = require('cors');

const sampleConfig = require('./.samples.config.json');

const scheduleJwtVerifier = new OktaJwtVerifier({
  issuer: sampleConfig.resourceServer.oidc.issuer,
  assertClaims: sampleConfig.resourceServer.assertClaims.schedule
});

const requestsJwtVerifier = new OktaJwtVerifier({
  issuer: sampleConfig.resourceServer.oidc.issuer,
  assertClaims: sampleConfig.resourceServer.assertClaims.requests
});

function scheduleAuthenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];

  return scheduleJwtVerifier.verifyAccessToken(accessToken)
    .then((jwt) => {
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
}

function requestsAuthenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];

  return requestsJwtVerifier.verifyAccessToken(accessToken)
    .then((jwt) => {
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
}

const app = express();

/**
 * For local testing only!  Enables CORS for all domains
 */
app.use(cors());

app.get('/api/requests', requestsAuthenticationRequired, (req, res) => {
  res.json({
    requests: [
      {
        time:  "July 9th, 2018 - 10:00 AM",
        name: 'Nick Young',
        description: "Stomach Ache... I think"
      },
      {
        time:  "July 9th, 2018 - 2:00 PM",
        name: 'JR Smith',
        description: "I don't remember."
      }
    ]
  });
});

app.get('/api/schedule', scheduleAuthenticationRequired, (req, res) => {
  res.json({
    schedule: [
      {
        time:  "June 29th, 2018 - 10:00 AM",
        name: 'LeBron James',
        description: "Broken hand."
      },
      {
        time:  "June 29th, 2018 - 2:00 PM",
        name: 'JR Smith',
        description: "Coach says I gotta come get my head looked at."
      },
      {
        time:  "June 29th, 2018 - 3:00 PM",
        name: 'Kevin Love',
        description: "Depression"
      }
    ]
  });
});

app.listen(sampleConfig.resourceServer.port, () => {
  console.log(`Resource Server Ready on port ${sampleConfig.resourceServer.port}`);
});
