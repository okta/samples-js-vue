# Okta Vue + Custom Login Example

This example shows you how to use the [Okta Vue Library][] to log in a user to a Vue application.  The login is achieved with the [Okta Sign In Widget][], which gives you more control to customize the login experience within your app.

This example is built with the [Vue CLI][].

## Prerequisites

Before running this sample, you will need the following:

* An Okta Developer Account, you can sign up for one at https://developer.okta.com/signup/.
* An Okta Application, configured for Singe-Page App (SPA) mode.  This is done from the Okta Developer Console and you can find instructions [here][OIDC SPA Setup Instructions].  When following the wizard, use the default properties.  They are designed to work with our sample applications.


## Running This Example

To run this application, you first need to clone this repo and then enter into this directory:

```bash
git clone git@github.com:okta/samples-js-vue.git
cd samples-js-vue/custom-login
```

Then install dependencies:

```bash
npm install
```

Now you need to gather the following information from the Okta Developer Console:

- **Client ID** - The client ID of the SPA application that you created earlier.  This can be found on the "General" tab of an application, or the list of applications.  This identifies the application that tokens will be minted for.
- **Issuer** - This is the URL of the authorization server that will perform authentication.  All Developer Accounts have a "default" authorization server.  The issuer is a combination of your Org URL (found in the upper right of the console home page) and `/oauth2/default`.  For example, `https://dev-1234.oktapreview.com/oauth2/default`.

Now place these values into the file `src/.samples.config.js` that was created for you in this project:

```javascript
export default {
  oidc: {
    clientId: '{clientId}',
    issuer: 'https://{yourOktaDomain}.com/oauth2/default',
    redirectUri: 'http://localhost:8080/implicit/callback',
    scope: 'openid profile email',
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};

```

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
[Okta Vue Library]: https://github.com/okta/okta-oidc-js/tree/master/packages/okta-vue
[OIDC SPA Setup Instructions]: https://developer.okta.com/authentication-guide/implementing-authentication/implicit#1-setting-up-your-application
[Okta Sign In Widget]: https://github.com/okta/okta-signin-widget
