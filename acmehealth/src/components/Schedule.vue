<template>
  <div class="schedule">
    <div class="page-Schedule has-sidebar">
      <div class="AppSidebar">
        <!-- Start Schedule Sidebar -->
        <div class="AppSidebar-widget ScheduleWidget">
          <h3 class="ScheduleWidget-title">June</h3>
          <ul class="ScheduleWidget-items">
            <li class="is-active">
              <a href="">
                <div class="ScheduleWidget-date">28</div>
                <div class="ScheduleWidget-label">Thursday</div>
                <div class="ScheduleWidget-action">3 appointments</div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="ScheduleWidget-date">29</div>
                <div class="ScheduleWidget-label">Friday</div>
                <div class="ScheduleWidget-action">9 appointments</div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="ScheduleWidget-date">30</div>
                <div class="ScheduleWidget-label">Saturday</div>
                <div class="ScheduleWidget-action">no appointments</div>
              </a>
            </li>
          </ul>
        </div>
        <!-- End Schedule Sidebar -->

        <!-- Start Schedule Widget -->
        <div class="AppSidebar-widget ScheduleWidget">
          <h3 class="ScheduleWidget-title">July</h3>
          
          <ul class="ScheduleWidget-items">
            <li>
              <a href="">
                <div class="ScheduleWidget-date">1</div>
                <div class="ScheduleWidget-label">Sunday</div>
                <div class="ScheduleWidget-action">no appointments</div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="ScheduleWidget-date">2</div>
                <div class="ScheduleWidget-label">Monday</div>
                <div class="ScheduleWidget-action">8 appointments</div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="ScheduleWidget-date">3</div>
                <div class="ScheduleWidget-label">Tuesday</div>
                <div class="ScheduleWidget-action">12 appointments</div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="ScheduleWidget-date">4</div>
                <div class="ScheduleWidget-label">Wednesday</div>
                <div class="ScheduleWidget-action">10 appointments</div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="ScheduleWidget-date">5</div>
                <div class="ScheduleWidget-label">Thursday</div>
                <div class="ScheduleWidget-action">9 appointments</div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="ScheduleWidget-date">6</div>
                <div class="ScheduleWidget-label">Friday</div>
                <div class="ScheduleWidget-action">12 appointments</div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="ScheduleWidget-date">7</div>
                <div class="ScheduleWidget-label">Saturday</div>
                <div class="ScheduleWidget-action">no appointments</div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="ScheduleWidget-date">8</div>
                <div class="ScheduleWidget-label">Sunday</div>
                <div class="ScheduleWidget-action">no appointments</div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="ScheduleWidget-date">9</div>
                <div class="ScheduleWidget-label">Monday</div>
                <div class="ScheduleWidget-action">3 appointments</div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="ScheduleWidget-date">10</div>
                <div class="ScheduleWidget-label">Tuesday</div>
                <div class="ScheduleWidget-action">6 appointments</div>
              </a>
            </li>
          </ul>
        </div>
        <!-- End Schedule Widget -->
      </div>
      <div class="AppBody">
        <div class="Wrap">
          <!-- Start Appointment Card -->
          <div
            class="AppointmentCard"
            v-for="(sched, index) in schedule"
            :key="index"
          >
            <div class="AppointmentCard-time">{{sched.time}}</div>
            <a class="AppointmentCard-menuToggle" href="#"></a>
            <div class="AppointmentCard-content">
              <div class="AppointmentCard-label">Patient Name</div>
              <div class="AppointmentCard-description">
                <strong>{{sched.name}}</strong>
              </div> 
              <div class="AppointmentCard-label">Reason for Visit</div>
              <div class="AppointmentCard-description">
                <p>{{sched.description}}</p>
              </div>
            </div>
          </div>
        </div>
	    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import sampleConfig from '../.samples.config'

export default {
  name: 'Schedule',
  data () {
    return {
      schedule: []
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
            scopes: 'schedule:read',
            audience: 'https://acmehealth.com',
            subject_token: accessToken,
            subject_token_type: 'urn:ietf:params:oauth:token-type:access_token'
          }
        )
        .then(function (response) {
          // Parse the response for a new token
          const newToken = response.data['access_token']
          this.getSchedule(newToken)
        })
        .catch(function (error) {
          console.log(error)
        })
      } catch (e) {
        console.error(e)
      }
    },
    async getSchedule (token) {
      try {
        const response = await axios.get(
          sampleConfig.resourceServer.scheduleUrl,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        this.schedule = response.data.schedule.map(item => {
          return {
            time: item.time.split('-')[1],
            name: item.name,
            description: item.description
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
