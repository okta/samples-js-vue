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
  <div class="messages">
    <h1 class="ui header">
      <i
        aria-hidden="true"
        class="mail outline icon"
      >
      </i>
      My Messages
    </h1>
    <div
      v-if="failed"
      class="ui error message"
    >
      <div class="content">
        <div class="header">Failed to fetch messages. Please verify the following:</div>
        <ul class="list">
          <li class="content">You've downloaded one of our resource server examples, and it's running on port 8000.</li>
          <li class="content">Your resource server example is using the same Okta authorization server (issuer) that you have configured this Vue
            application to use.</li>
        </ul>
      </div>
    </div>

    <div v-if="messages.length">
      <p>This component makes a GET request to the resource server example, which must be running at
        <code>localhost:8000/api/messages</code>
      </p>
      <p>It attaches your current access token in the
        <code>Authorization</code> header on the request, and the resource server will attempt to authenticate this access token. If the token is valid
        the server will return a list of messages. If the token is not valid or the resource server is incorrectly configured,
        you will see a 401
        <code>Unauthorized response</code>.</p>
      <p>This route is protected with the
        <code>OktaAuthGuard</code> component, which will ensure that this page cannot be accessed until you have authenticated and have an access token
        in local storage.</p>
      <table class="ui table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(message, index) in messages"
            :key="index"
            :id="'message-' + index"
          >
            <td>{{message.date}}</td>
            <td>{{message.text}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import sampleConfig from '../config'

export default {
  name: 'Messages',
  data () {
    return {
      failed: false,
      messages: []
    }
  },
  async created () {
    try {
      const accessToken = await this.$auth.getAccessToken()
      const response = await axios.get(
        sampleConfig.resourceServer.messagesUrl,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      const messages = response.data.messages.map((message) => {
        let index = 1
        const date = new Date(message.date)
        const day = date.toLocaleDateString()
        const time = date.toLocaleTimeString()
        return {
          date: `${day} ${time}`,
          text: message.text,
          index: index++
        }
      })
      this.messages = messages
    } catch (e) {
      console.error(e)
      this.failed = true
    }
  }
}
</script>
