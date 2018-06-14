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
import { callTokenEndpoint, callResourceApi } from '@/util'
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
      const newTokenResponse = await callTokenEndpoint(accessToken, 'requests:read')
      const newToken = newTokenResponse.data['access_token']
      console.log(newToken)
      const response = await callResourceApi(sampleConfig.resourceServer.requestsUrl, newToken)
      this.requests = response.data.requests
    }
  }
}
</script>
