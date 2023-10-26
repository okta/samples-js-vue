import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import './env'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': process.env,
    //'__VUE_OPTIONS_API__': false, // enable for okta-vue 5.7+
  }
})
