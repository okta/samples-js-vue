<template>
  <div class="requests">
    <div class="page-Requests">
      <div class="AppBody">
		    <div class="Wrap">
          <!-- Start Requests -->
          <div
            class="AppointmentCard has-indicator"
            v-for="(request, index) in requests"
            :key="index"
          >
            <div class="AppointmentCard-time">{{request.time}}</div>
            <a class="AppointmentCard-menuToggle" href="#"></a>
            <div class="AppointmentCard-content">
              <div class="AppointmentCard-label">Patient Name</div>
              <div class="AppointmentCard-description">
                <strong>{{request.name}}</strong>
              </div> 
              <div class="AppointmentCard-label">Reason for Visit</div>
              <div class="AppointmentCard-description">
                <p>{{request.description}}</p>
              </div>
            </div>
            
            <div class="AppointmentCard-actions">
              <a class="Button--greenOutline" href="#">Suggest new time</a>
              <a class="Button--green" href="#">Confirm</a>
              <a class="Button--gray" href="#">Cancel</a>
            </div>
          </div>
          <!-- End Requests -->
		    </div>
      </div>
    </div>
	</div>
</template>

<script>
import axios from 'axios'
import sampleConfig from '../.samples.config'

export default {
  name: 'Requests',
  data () {
    return {
      requests: []
    }
  },
  created () { this.setup() },
  methods: {
    async setup () {
      const accessToken = await this.$auth.getAccessToken()
      await this.callApi(accessToken)
    },
    async callApi (accessToken) {
      try {
        // This will not work until Okta's /token endpoint is CORS enabled
        await axios.post(
          sampleConfig.oidc.issuer + '/v1/token',
          {
            client_id: sampleConfig.oidc.client_id,
            grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
            scopes: 'requests:read',
            audience: 'https://acmehealth.com',
            subject_token: accessToken,
            subject_token_type: 'urn:ietf:params:oauth:token-type:access_token'
          }
        )
        .then(function (response) {
          // Parse the response for a new token
          const newToken = response.data['access_token']
          this.getRequests(newToken)
        })
        .catch(function (error) {
          console.log(error)
        })
      } catch (e) {
        console.error(e)
      }
    },
    async getRequests (token) {
      try {
        const response = await axios.get(
          sampleConfig.resourceServer.requestsUrl,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        this.requests = response.data.requests
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
