import Spotify from 'spotify-web-api-node'
import VueSpotify from 'vue-spotify'

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import constants from '../constants'
import 'skeleton-css/css/skeleton.css'
import 'skeleton-css/css/normalize.css'

Vue.config.productionTip = false

Vue.use(VueSpotify, new Spotify({
  clientId: constants.keys.clientId,
  clientSecret: constants.keys.clientSecret
}))

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
