/*!
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

import Vue from 'vue'
import Router from 'vue-router'
import 'semantic-ui-css/semantic.min.css'

import Auth from '@okta/okta-vue'

import HomeComponent from '@/components/Home'
import LoginComponent from '@/components/Login'
import ProfileComponent from '@/components/Profile'
import MessagesComponent from '@/components/Messages'

import sampleConfig from '@/config'

Vue.use(Router)
Vue.use(Auth, sampleConfig.oidc)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomeComponent
    },
    {
      path: '/login',
      component: LoginComponent
    },
    {
      path: '/login/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/profile',
      component: ProfileComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/messages',
      component: MessagesComponent,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

const onAuthRequired = async (to, from, next) => {
  if (from.matched.some(record => record.meta.requiresAuth) && !(await Vue.prototype.$auth.isAuthenticated())) {
    // Navigate to custom login page
    next({ path: '/login' })
  } else {
    next()
  }
}

router.beforeEach(onAuthRequired)

export default router
