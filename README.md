# Vue Sample Applications for Okta

This repository contains several sample applications that demonstrate various Okta use-cases in your Vue application.

Each sample makes use of the [Okta Vue Library][].

Please find the sample that fits your use-case from the table below.

| Sample | Description |
|--------|-------------|
| [Okta-Hosted Login](/okta-hosted-login) | A Vue application that will redirect the user to the Okta-Hosted login page for authentication.  The user is redirected back to the Vue application after authenticating. |
| [Custom Login Page](/custom-login) | A Vue application that uses the Okta Sign-In Widget within the Vue application to authenticate the user. |

## Running E2E Tests locally

E2E Tests will be run against the Custom Login and Okta-Hosted Login servers.

In addition to running npm install in the root of the project (to install the dev dependencies for testing), you will also need to install the dependencies of each sample app. This can be performed via the `npm install` command:

```bash
# At project root
npm install
```

Next, setup the following environment variables:

```bash
export CLIENT_ID={yourAppClientId}
export OKTA_DOMAIN={yourOktaOrgDomain}
```

**NOTE:** Use only the domain part of your org url while setting `OKTA_DOMAIN` environment.

* E.g - If your org url is https://example.oktapreview.okta.com, your `OKTA_DOMAIN` should be `example.oktapreview`.

After setting up the environment variables, run a script to update the configuration:

```bash
sh scripts/setup-env.sh
```

Finally, update the following environment variables with a username & password of any user you want to use in your tests:

```bash
# The {userName} should be of the form "username@email.com"

export USERNAME={userName}
export PASSWORD={password}
```

To perform the E2E test, simply run:

```bash
npm test
```

[Okta Vue Library]: https://github.com/okta/okta-oidc-js/tree/master/packages/okta-vue
