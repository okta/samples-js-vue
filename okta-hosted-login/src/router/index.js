import Vue from 'vue'
import Router from 'vue-router'
import 'semantic-ui-css/semantic.min.css'

import Auth from '@okta/okta-vue'

import HomeComponent from '@/components/Home'
import ProfileComponent from '@/components/Profile'
import MessagesComponent from '@/components/Messages'

import sampleConfig from '@/.samples.config'

Vue.use(Router)
Vue.use(Auth, sampleConfig.oidc)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomeComponent },
    { path: '/implicit/callback', component: Auth.handleCallback() },
    { path: '/profile', component: ProfileComponent, meta: { requiresAuth: true } },
    { path: '/messages', component: MessagesComponent, meta: { requiresAuth: true } }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
