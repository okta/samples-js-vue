#!/bin/bash
cp okta-hosted-login/util/default-config.js okta-hosted-login/src/.samples.config.js
cp custom-login/util/default-config.js custom-login/src/.samples.config.js

# The environment variables (OKTA_DOMAIN, CLIENT_ID) are set in the travis repository settings
sed -i -- "s/{yourOktaDomain}/$OKTA_DOMAIN/g" okta-hosted-login/src/.samples.config.js
sed -i -- "s/{clientId}/$CLIENT_ID/g" okta-hosted-login/src/.samples.config.js

sed -i -- "s/{yourOktaDomain}/$OKTA_DOMAIN/g" custom-login/src/.samples.config.js
sed -i -- "s/{clientId}/$CLIENT_ID/g" custom-login/src/.samples.config.js

# Clone the resource-server repo and update the environment
[ ! -d samples-nodejs-express-4/ ] && git clone https://github.com/okta/samples-nodejs-express-4.git

# Install Node JS sample dependencies
npm install --prefix samples-nodejs-express-4/

sed -i -- "s/{yourOktaDomain}/$OKTA_DOMAIN/g" samples-nodejs-express-4/.samples.config.json
sed -i -- "s/{clientId}/$CLIENT_ID/g" samples-nodejs-express-4/.samples.config.json
