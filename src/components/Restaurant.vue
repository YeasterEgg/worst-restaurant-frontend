<template>
  <div class="w-100 h-50 flex flex-column items-center bg-bluetto mb3 ph3 relative">
    <div v-if="loading" class="absolute centered o-30 lds-dual-ring z-0" />
    <div class="z-2 f1 b pv2">Be brave!</div>
    <div class="z-2 f3 pv2">Try eating at:</div>
    <div class="z-2 f3 pv2 flex flex-column items-center w-100">
      <a :href="worstHref" target="_blank" class="tc text">
        {{worstName}}
      </a>
      <hr class="w-90"/>
      <div class="tc">{{worstAddress}}</div>
    </div>
    <a href="https://www.yelp.com" target="_blank" >
      <img src="/yelp.png" class="w-10-ns w-20 bottom-1 right-1 absolute" />
    </a>
  </div>
</template>

<script>
import { getPlaces, getCoords } from '../lib/places'

export default {
  name: 'Restaurant',
  computed: {
    worstName() {
      const { worst } = this.$store.state
      return worst === undefined ? 'Searching...' : worst.name
    },
    worstAddress() {
      const { worst } = this.$store.state
      return worst && worst.location.formatted_address
    },
    worstHref() {
      const { worst } = this.$store.state
      return worst === undefined ? undefined : worst.url
    },
    loading() {
      const { loading } = this.$store.state
      return loading
    }
  },
  async mounted() {
    this.$store.commit('setLoading', true)
    const { latLng } = this.$store.state
    const decoder = new TextDecoder('utf-8')
    const stream = new WritableStream({
      write: data => {
        const decodedData = decoder.decode(data)
        const results = decodedData.split('\n').map(row => {
          try { return JSON.parse(row) }
          catch (err) { return false }
        }).filter(v => v)
        const worst = results[0]
        this.$store.commit('setWorst', worst)
      },
      close: () => {
        this.$store.commit('setLoading', false)
      }
    })
    getPlaces(latLng, stream)
  },
}
</script>
<style scoped>
  .centered {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
</style>
