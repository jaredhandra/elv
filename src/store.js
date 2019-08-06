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
      description: '',
      count: 0,
      offsetCount: 0,
      totalCount: 0
    },
    tracks: []
  },
  mutations: {
    setSpotifyLogin (state, payload) {
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
      state.playlistInfo.description = payload.description
      state.playlistInfo.count = payload.count
    },
    setTracks (state, payload) {
      payload.forEach((track) => {
        state.tracks.push(track)
      })
    }
  },
  actions: {
    spotifyLogin ({ commit }) {
      axios.get('https://7qjcmqsnic.execute-api.us-east-1.amazonaws.com/beta/spotifyLogin')
        .then((response) => {
          const token = response.data.done.json.access_token
          if (token) {
            commit('setSpotifyLogin', token)
            this.dispatch('getUserInfo', token)
          }
        })
        .catch((response) => {
          console.log('fucking problem mate')
        })
    },
    getUserInfo ({ commit, state }) {
      const config = {
        headers: {
          Authorization: `Bearer ${state.spotifyLogin}`
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
          this.dispatch('getPlaylistInfo', state.spotifyLogin)
        })
    },
    getPlaylistInfo ({ commit }, payload) {
      const playlistConfig = {
        headers: {
          Authorization: `Bearer ${payload}`
        }
      }
      axios.get('https://api.spotify.com/v1/playlists/2pXKzmzb91RdzsISETs8jv', playlistConfig)
        .then((response) => {
          const payload = {
            name: response.data.name,
            images: response.data.images,
            href: response.data.href,
            description: response.data.description,
            count: response.data.tracks.total
          }
          commit('setPlaylistInfo', payload)
          this.dispatch('getPlaylistTracks')
        })
    },
    getPlaylistTracks ({ commit, state }) {
      const playlistConfig = {
        headers: {
          Authorization: `Bearer ${state.spotifyLogin}`
        },
        params: {
          limit: 100,
          offset: state.playlistInfo.offsetCount
        }
      }
      axios.get('https://api.spotify.com/v1/playlists/2pXKzmzb91RdzsISETs8jv/tracks', playlistConfig)
        .then((response) => {
          commit('setTracks', response.data.items)
          if (state.playlistInfo.totalCount < state.playlistInfo.count) {
            state.playlistInfo.totalCount += 100
            state.playlistInfo.offsetCount += 100
            this.dispatch('getPlaylistTracks')
          }
        })
    }

  }
})
