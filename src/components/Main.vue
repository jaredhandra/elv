<template>
  <div id="main">
    <h1>Elvis</h1>
    <h3> {{ name }} </h3>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Main',
  computed: mapState({
    name: state => state.displayName
  }),
  created () {
    this.spotifyLogin()
    this.getUserInfo()
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
