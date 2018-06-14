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
      <div class="AppBody home">
		    <div class="Wrap home-body">
          <!-- Start Primary Access Token Info -->
          <div class="AppointmentCard home-token">
            <div class="AppointmentCard-time">Access Token Information</div>
            <div
              class="AppointmentCard-content"
              v-for="(claim, index) in claims"
              :key="index"
            >
              <div class="AppointmentCard-label smallflex">{{claim.claim}}</div>
              <div class="AppointmentCard-description">
                <strong>{{claim.value}}</strong>
              </div> 
            </div>
          </div>
          <!-- End Primary Access Token Info -->

          <!-- Start Schedule Access Token Info -->
          <div
            class="AppointmentCard home-token" 
            v-if="scheduleTokenClaims.length"
          >
            <div class="AppointmentCard-time">Schedule Token Information</div>
            <div
              class="AppointmentCard-content"
              v-for="(claim, index) in scheduleTokenClaims"
              :key="index"
            >
              <div class="AppointmentCard-label smallflex">{{claim.claim}}</div>
              <div class="AppointmentCard-description">
                <strong>{{claim.value}}</strong>
              </div> 
            </div>
          </div>
          <!-- End Requests Access Token Info -->

          <!-- Start Requests Access Token Info -->
          <div
            class="AppointmentCard home-token"
            v-if="requestsTokenClaims.length"
          >
            <div class="AppointmentCard-time">Requests Token Information</div>
            <div
              class="AppointmentCard-content"
              v-for="(claim, index) in requestsTokenClaims"
              :key="index"
            >
              <div class="AppointmentCard-label smallflex">{{claim.claim}}</div>
              <div class="AppointmentCard-description">
                <strong>{{claim.value}}</strong>
              </div> 
            </div>
          </div>
          <!-- End Requests Access Token Info -->
		    </div>
      </div>
    </div>
	</div>
</template>

<script>
import { decode, getAndReturnClaims } from '@/util'

export default {
  name: 'Profile',
  data () {
    return {
      claims: [],
      requestsTokenClaims: [],
      scheduleTokenClaims: []
    }
  },
  async created () {
    const accessToken = await this.$auth.getAccessToken()
    const decoded = decode(accessToken)
    this.claims = await Object.entries(decoded).map(entry => ({ claim: entry[0], value: entry[1] }))

    // Get Claims for all availabe tokens
    this.requestsTokenClaims = getAndReturnClaims('requestsToken')
    this.scheduleTokenClaims = getAndReturnClaims('scheduleToken')
  }
}
</script>
