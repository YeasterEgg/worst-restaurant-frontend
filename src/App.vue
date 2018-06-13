<template>
  <div id="app">
    <Main />
  </div>
</template>

<script>
import Vuex from 'vuex'
import Vue from 'vue'
import Main from './components/Main.vue'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    message: '',
    radius: 10000,
  },
  mutations: {
    setMessage: (state, message) => { state.message = message },
    setRadius: (state, radius) => { state.radius = radius },
  }
})

export default {
  name: 'app',
  components: {
    Main
  },
  store,
}
</script>

<style>
#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
