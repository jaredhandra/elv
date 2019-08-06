import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spotifyLogin: '',
    displayName: '',
    profileUrl: '',
    spotifyId: '',
    playlistInfo: {
      name: '',
      images: [],
      href: '',
      description: ''
    },
    tracks: []
  },
  mutations: {
    setSpotifyLogin (state, payload) {
      debugger
      state.spotifyLogin = payload
    },
    setUserInfo (state, payload) {
      state.displayName = payload.displayName
      state.profileUrl = payload.profile
      state.spotifyId = payload.id
    },
    setPlaylistInfo (state, payload) {
      state.playlistInfo.name = payload.name
      state.playlistInfo.images = payload.images
      state.playlistInfo.href = payload.href
      state.description = payload.description
    }
  },
  actions: {
    spotifyLogin ({ commit }) {
      axios.get('https://7qjcmqsnic.execute-api.us-east-1.amazonaws.com/beta/spotifyLogin')
        .then((response) => {
          const token = response.data.done.json.access_token
          if (token) {
            commit('setSpotifyLogin', token)
          }
        })
        .catch((response) => {
          console.log('fucking problem mate')
        })
    },
    getUserInfo ({ commit, state }) {
      debugger
      const config = {
        headers: {
          Authorization: `Basic ${state.spotifyLogin}`
        }
      }
      axios.get('https://api.spotify.com/v1/users/jaredhandra', config)
        .then((response) => {
          const userInfo = {
            displayName: response.data.display_name,
            id: response.data.id,
            profile: response.data.href
          }
          commit('setUserInfo', userInfo)
          debugger
          // this.dispatch('getPlaylistInfo', state.spotifyLogin)
        })
    },
    getPlaylistInfo ({ commit, state }, payload) {
      console.log(state.spotifyLogin)
      const playlistConfig = {
        headers: {
          Authorization: `Bearer${payload}`
        }
      }
      axios.get('https://api.spotify.com/v1/playlists/2pXKzmzb91RdzsISETs8jv', playlistConfig)
        .then((response) => {
          const payload = {
            name: response.data.name,
            images: response.data.images,
            href: response.data.href,
            description: response.data.description
          }
          commit('setPlaylistInfo', payload)
        })
    }
  }
})
