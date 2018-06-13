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

<template>
  <div class="profile">
    <div class="page-Requests">
      <div class="AppBody">
		    <div class="Wrap">
          <!-- Start Requests -->
          <div class="AppointmentCard has-indicator">
            <div class="AppointmentCard-time">Token Information</div>
            <a class="AppointmentCard-menuToggle" href="#"></a>
            <div
              class="AppointmentCard-content"
              v-for="(claim, index) in claims"
              :key="index"
            >
              <div class="AppointmentCard-label">{{claim.claim}}</div>
              <div class="AppointmentCard-description">
                <strong>{{claim.value}}</strong>
              </div> 
            </div>
          </div>
          <!-- End Requests -->
		    </div>
      </div>
    </div>
	</div>
</template>

<script>
import util from '@/util'

export default {
  name: 'Profile',
  data () {
    return {
      claims: []
    }
  },
  async created () {
    const accessToken = await this.$auth.getAccessToken()
    const decoded = util.decode(accessToken)
    this.claims = await Object.entries(decoded).map(entry => ({ claim: entry[0], value: entry[1] }))
  }
}
</script>
