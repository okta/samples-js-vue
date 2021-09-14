# Okta Vue + Custom Login Example

> Note: You're currently looking at sample applications that support Vue 3. If you are looking for samples for Vue 2, please checkout the [vue-2 branch](https://github.com/okta/samples-js-vue/tree/vue-2).

This example shows you how to use the [Okta Vue Library][] to log in a user to a Vue application.  The login is achieved with the [Okta Sign In Widget][], which gives you more control to customize the login experience within your app.

This example is built with the [Vue CLI][].

## Quick Start: Automatic Setup with Heroku

You need a [Heroku](https://signup.heroku.com/) account to follow these instructions.

You can create a free Okta Developer org and deploy this app directly to Heroku by clicking the purple button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

After you deploy the app, click on **View** on the result screen to navigate to the newly deployed app.

Open your browser's developer tools view and choose the **Network** tab.

Click **Profile (pkce)** at the top of the app. You are redirected to your Okta org to authenticate. BUT, you won't yet know the credentials.

Back on the result tab from the deployment, click on **Manage App**. This brings you to the Heroku dashboard for the app. Click **Settings** and then **Reveal Config Vars**. Here, you see values for `OKTA_ADMIN_EMAIL` and `OKTA_ADMIN_PASSWORD`. You can use these values to login to the app on the other tab.

After you login, you'll see an `ID Token`, `Access Token` and profile details.

## Prerequisites

Before running this sample, you will need the following:

* An Okta Developer Account, you can sign up for one at https://developer.okta.com/signup/.
* An Okta Application, configured for Singe-Page App (SPA) mode. This is done from the Okta Developer Console and you can find instructions [here][OIDC SPA Setup Instructions].  When following the wizard, use the default properties.  They are designed to work with our sample applications.


## Running This Example

To run this application, you first need to clone this repo and then enter into this directory:

```bash
git clone https://github.com/okta/samples-js-vue.git
cd samples-js-vue/custom-login
```

Then install dependencies:

```bash
npm install
```

Gather the following information from the Okta Developer Console:

- **Client Id** - The client ID of the SPA application that you created earlier. This can be found on the "General" tab of an application, or the list of applications.  This identifies the application that tokens will be minted for.
- **Issuer** - This is the URL of the authorization server that will perform authentication.  All Developer Accounts have a "default" authorization server.  The issuer is a combination of your Org URL (found in the upper right of the console home page) and `/oauth2/default`. For example, `https://dev-1234.oktapreview.com/oauth2/default`.

These values must exist as environment variables. They can be exported in the shell, or saved in a file named `testenv`, located in the parent directory (samples-js-vue). See [dotenv](https://www.npmjs.com/package/dotenv) for more details on this file format.

```ini
ISSUER=https://yourOktaDomain.com/oauth2/default
CLIENT_ID=123xxxxx123
```

> NOTE: If you are running the sample against an org that has [Okta's Identity
Engine](https://developer.okta.com/docs/concepts/ie-intro/) enabled, you will need to add the following environment variable to your `testenv` file 
> USE_INTERACTION_CODE=true

Now start the app server:

```
npm start
```

> **Note:** If you are on a windows machine, you might get an error related to `browserslist`.
> It is a [known issue](https://github.com/angular/angular-cli/issues/5075) on windows due to one of the dependencies we use. To resolve the issue, search for `browserslist` and `browserslist.cmd` files in your node_modules. Delete the files and start the app server again.

Now navigate to http://localhost:8080 in your browser.

If you see a home page that prompts you to login, then things are working!  Clicking the **Log in** button will render a custom login page component that uses the Okta Sign-In Widget to perform authentication.

You can login with the same account that you created when signing up for your Developer Org, or you can use a known username and password from your Okta Directory.

> **Note:** If you are currently using your Developer Console, you already have a Single Sign-On (SSO) session for your Org.  You will be automatically logged into your application as the same user that is using the Developer Console.  You may want to use an incognito tab to test the flow from a blank slate.


## Integrating The Resource Server

This sample contains the same "Messages" page that is included in the [Okta Hosted Login](/okta-hosted-login) sample, please refer to that sample for instructions on setting up the resource server.

[Vue CLI]: https://github.com/vuejs/vue-cli
[PKCE Flow]: https://developer.okta.com/docs/guides/implement-auth-code-pkce
[Okta Vue Library]: https://github.com/okta/okta-oidc-js/tree/master/packages/okta-vue
[OIDC SPA Setup Instructions]: https://developer.okta.com/docs/guides/sign-into-spa/vue/before-you-begin
[Okta Sign In Widget]: https://github.com/okta/okta-signin-widget
