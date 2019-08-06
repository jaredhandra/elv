<template>
  <div id="main">
    <h2 :href="profileUrl">
      {{ name }}'s <b>{{ playlistName }}</b> playlist
    </h2>
    <h5>
      {{ playlistDescription }}
    </h5>
    <h5>
      {{ playlistCount }} total songs
    </h5>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Main',
  computed: mapState({
    name: state => state.displayName,
    profileUrl: state => state.profileUrl,
    playlistName: state => state.playlistInfo.name,
    playlistDescription: state => state.playlistInfo.description,
    playlistCount: state => state.tracks.length
  }),
  created () {
    this.spotifyLogin()
  },
  methods: {
    ...mapActions(['spotifyLogin', 'getUserInfo', 'getPlaylistInfo'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
