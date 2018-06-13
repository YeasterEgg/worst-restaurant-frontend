<template>
  <div class="hello">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import { getPlaces } from '../lib/places'

export default {
  name: 'HelloWorld',
  computed: {
    message() { return this.$store.state.message }
  },
  async created() {
    const query = window.location.pathname.split('/')[1] || ''
    const places = await getPlaces(query)
    console.log(places)
    this.$store.commit('setMessage', query)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
