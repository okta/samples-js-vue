import axios from 'axios'
import qs from 'qs'
import sampleConfig from './.samples.config'

const decode = function (token) {
  if (!token) {
    return
  }
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}

const callTokenEndpoint = async function (token, scope) {
  try {
    // This will work only if Okta's /token endpoint is CORS enabled
    return await axios.post(
      sampleConfig.oidc.issuer + '/v1/token',
      qs.stringify({
        client_id: sampleConfig.oidc.clientId,
        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
        scope: scope,
        audience: 'https://acmehealth.com',
        subject_token: token,
        subject_token_type: 'urn:ietf:params:oauth:token-type:access_token'
      }),
      {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
    )
  } catch (e) {
    console.error(e)
  }
}

const callResourceApi = async function (url, token) {
  return axios.get(
    url,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

const setStorage = function (key, value) {
  localStorage.setItem(key, value)
}

const getAndReturnClaims = function (key) {
  const token = localStorage.getItem(key)
  if (token) {
    const decoded = decode(token)
    return Object.entries(decoded).map(entry => ({ claim: entry[0], value: entry[1] }))
  } else {
    return []
  }
}

export { decode, callTokenEndpoint, callResourceApi, setStorage, getAndReturnClaims }
