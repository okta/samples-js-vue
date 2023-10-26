// Read environment variables from "testenv" in the repository root. Override environment vars if they are already set.
import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'

const TESTENV = path.resolve(__dirname, '..', 'testenv');
if (fs.existsSync(TESTENV)) {
  const envConfig = dotenv.parse(fs.readFileSync(TESTENV));
  Object.keys(envConfig).forEach((k) => {
    process.env[k] = envConfig[k];
  });
}
process.env.CLIENT_ID = process.env.CLIENT_ID || process.env.SPA_CLIENT_ID;
