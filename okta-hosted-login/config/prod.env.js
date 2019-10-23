'use strict'
// Support storing environment variables in a file named "testenv" at the project root
const path = require('path')
const dotenv = require('dotenv')
const fs = require('fs')

// Read environment variables from "testenv". Override environment vars if they are already set.
const TESTENV = path.resolve(__dirname, '..', '..', 'testenv')
if (fs.existsSync(TESTENV)) {
  const envConfig = dotenv.parse(fs.readFileSync(TESTENV))
  Object.keys(envConfig).forEach((k) => {
    process.env[k] = envConfig[k]
  })
}
process.env.CLIENT_ID = process.env.CLIENT_ID || process.env.SPA_CLIENT_ID;
process.env.OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;

// List of environment variables made available to the app
[
  'ISSUER',
  'CLIENT_ID',
  'OKTA_TESTING_DISABLEHTTPSCHECK'
].forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} must be set. See README.md`)
  }
  process.env[key] = JSON.stringify(process.env[key]) // ensure variable is a string
})

const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env

module.exports = {
  NODE_ENV: '"production"',
  CLIENT_ID,
  ISSUER,
  OKTA_TESTING_DISABLEHTTPSCHECK
}
