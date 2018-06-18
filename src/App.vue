<template>
  <div class="w-100 h-100 min-h-100 flex flex-column monospace items-center pv3">
    <Modal v-if="showModal" />
    <Restaurant v-else/>
    <Map />
  </div>
</template>

<script>
import Vuex from 'vuex'
import Vue from 'vue'
import Restaurant from './components/Restaurant.vue'
import Map from './components/Map.vue'
import Modal from './components/Modal.vue'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    worst: undefined,
    loading: false,
    location: window.location.pathname.split('/')[1],
    latLng: undefined,
    ready: false,
  },
  mutations: {
    setWorst: (state, worst) => { state.worst = worst },
    setLocation: (state, location) => { state.location = location },
    setLoading: (state, loading) => { state.loading = loading },
    setLatLng: (state, latLng) => { state.latLng = latLng },
    setReady: (state, ready) => { state.ready = ready }
  },
})

export default {
  name: 'app',
  components: {
    Restaurant,
    Map,
    Modal,
  },
  store,
  computed: {
    showModal() { return !this.$store.state.ready }
  },
}
</script>

<style scoped>
.monospace {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
