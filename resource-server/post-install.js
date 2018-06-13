const colors = require('colors');
const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), '.samples.config.json');

function createConfigFile(sampleConfig) {
  if (!fs.existsSync(file)) {
    console.log('Creating default configuration file');
    fs.writeFileSync(file, JSON.stringify(sampleConfig, '\n', 2) + '\n');
  }
  console.log(colors.green(`\nSample project is ready to go!  Please add your configuration to ${file}, see the README for instructions.\n`));
};

const sampleConfig = {
  resourceServer: {
    port: 8000,
    oidc: {
      issuer: 'https://{yourOktaDomain}.com/oauth2/default'
    },
    assertClaims: {
      requests : {
        aud: "api://default",
        cid: "{clientID}",
        requests: "read"
      },
      schedule: {
        aud: "api://default",
        cid: "{clientID}",
        schedule: "read"
      }
    }
  }
};

createConfigFile(sampleConfig);