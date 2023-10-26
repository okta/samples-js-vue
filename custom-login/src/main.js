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
import { createApp } from 'vue'
import { OktaAuth } from '@okta/okta-auth-js'
import OktaVue from '@okta/okta-vue'
import './polyfills'
import App from './App.vue'
import router from './router'

import 'fomantic-ui-css/semantic.min.css'

import sampleConfig from './config'

const oktaAuth = new OktaAuth(sampleConfig.oidc)

const app = createApp(App)
  .use(router)
  .use(OktaVue, {
    oktaAuth,
    onAuthRequired: () => {
      app.onAuthRequired(oktaAuth);
    },
    onAuthResume: () => {
      router.push('/login')
    },
  })
  .mount('#app')
