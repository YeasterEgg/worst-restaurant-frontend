<template>
  <div class="w-100 h-50 h-100-short bg-bluetto mb3 ph3 relative flex flex-column items-center justify-center">
    <div v-if="loading" class="absolute centered o-30 lds-dual-ring z-999" />
    <div v-bind:class="{ 'o-50': loading }" class="w-100 h-100 flex flex-column justify-around items-center">
      <div class="z-2 f2 b pv2">Choose a place!</div>
      <div class="flex flex-column items-center">
        <vue-google-autocomplete
          id="map"
          ref="address"
          classname="f4 mb2"
          placeholder="Start typing"
          v-on:placechanged="getAddressData"
          types="(cities)"
        />
        <div
          class="z-2 f4 b pv2 ba pa2 pointer bg-beigino w-60 tc"
          v-on:click="startSearch"
          v-if="confirmPlace"
        >Search!</div>
        <div
          class="z-2 f4 b pv2 ba pa2 bg-beigino w-60 tc gray"
          v-else
        >Search!</div>
      </div>
      <div class="z-2 f5 b pv2">or</div>
      <div
        class="z-2 f4 b pv2 ba pa2 pointer bg-beigino"
        v-on:click="locateAndStartSearch"
      >Around me!</div>
    </div>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'

const wait = new Promise(res => setTimeout(res, 800))

export default {
  name: 'Modal',
  components: { VueGoogleAutocomplete },
  data: () => ({
    loading: false,
  }),
  async mounted() {
    const { location } = this.$store.state
    this.$refs.address.update(location)
    await wait
    this.$refs.address.focus()
  },
  methods: {
    getAddressData(res) {
      const { latitude, longitude, locality } = res
      this.$store.commit('setLocation', locality)
      this.$store.commit('setLatLng', { lat: latitude, lng: longitude })
    },
    async startSearch() {
      const { location } = this.$store.state
      window.history.pushState({}, location, `/${location}`)
      this.$store.commit('setReady', true)
    },
    async locateAndStartSearch() {
      this.loading = true
      const promise = new Promise((resolve, reject) => {
        if (!navigator || !navigator.geolocation) return reject()
        navigator.geolocation.getCurrentPosition(resolve)
      })
      const { coords: { latitude: lat, longitude: lng } } = await promise
      this.$store.commit('setLatLng', { lat, lng })
      this.$store.commit('setReady', true)
    },
  },
  computed: {
    confirmPlace() {
      const { location } = this.$store.state
      return location && location.length > 0
    }
  }
}
</script>
