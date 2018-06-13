<template>
<div class="page-Login">
	<div class="AppBody">
		<div class="Wrap">
			<h1 class="AppLogo--stacked"><a href="./">AcmeHealth</a></h1>
      <div class="FormField">
        <input type="text" placeholder="Username" v-model="username">
      </div>
      <div class="FormField">
        <input type="password" placeholder="Password" v-model="password" v-on:keyup.enter="signIn">
      </div>
      <div class="FormField--checkbox">
        <input type="checkbox" name="remember_me" id="remember_me">
        <label for="remember_me">Remember Me</label>
      </div>
      <div class="FormField--submit">
        <p>
          <button class="Button--large Button--white" v-on:click="signIn">Sign in</button>
        </p>
        <ul>
          <li><a href="">Need Help?</a></li>
        </ul>
      </div>
		</div>
	</div>
</div>
</template>

<script>
import OktaAuth from '@okta/okta-auth-js'
import sampleConfig from '../.samples.config'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      const authJS = new OktaAuth({
        url: sampleConfig.oidc.issuer.split('/oauth2/')[0],
        clientId: sampleConfig.oidc.clientId
      })

      authJS.signIn({
        username: this.username,
        password: this.password
      })
      .then(res =>
        this.$auth.loginRedirect('/', {
          sessionToken: res.sessionToken,
          scopes: sampleConfig.oidc.scope.split(' ')
        })
      )
      .catch(err => console.error(`Found an error: ${err}`))
    }
  }
}
</script>
