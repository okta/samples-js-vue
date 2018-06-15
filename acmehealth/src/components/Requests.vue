<template>
  <div class="requests">
    <div class="page-Requests">
      <div class="AppBody">
		    <div class="Wrap" v-if="requests.length">
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

        <div class="Wrap" v-if="!requests.length">
          <!-- Start Error Message -->
          <div class="AppointmentCard has-indicator">
            <div class="AppointmentCard-time">Notice</div>
            <a class="AppointmentCard-menuToggle" href="#"></a>
            <div class="AppointmentCard-content">
              <div class="AppointmentCard-label">Error</div>
              <div class="AppointmentCard-description">
                <strong>{{error.name}}</strong>
              </div> 
              <div class="AppointmentCard-label">Reason</div>
              <div class="AppointmentCard-description">
                <p>{{error.description}}</p>
              </div>
            </div>
          </div>
          <!-- End Error Message -->
		    </div>
      </div>
    </div>
	</div>
</template>

<script>
import { callTokenEndpoint, callResourceApi, setStorage } from '@/util'
import sampleConfig from '../.samples.config'

export default {
  name: 'Requests',
  data () {
    return {
      error: {},
      requests: []
    }
  },
  created () { this.setup() },
  methods: {
    async setup () {
      const accessToken = await this.$auth.getAccessToken()
      try {
        const newTokenResponse = await callTokenEndpoint(accessToken, 'requests:read')
        const newToken = newTokenResponse.data['access_token']

        // Store new token into separate storage
        setStorage('requestsToken', newToken)

        const response = await callResourceApi(sampleConfig.resourceServer.requestsUrl, newToken)
        this.requests = response.data.requests
      } catch (e) {
        this.error = {
          name: e.name,
          description: e.message
        }
        if (e.response && e.response.data) {
          this.error.description = e.response.data
        }
      }
    }
  }
}
</script>
