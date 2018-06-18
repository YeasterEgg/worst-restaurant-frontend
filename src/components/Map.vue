<template>
  <div class="w-100 h-50 flex flex-column items-center">
    <div id="mapboxMap" class="w-100 h-100"></div>
    {{JSON.stringify(center)}}
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
const MAPBOX_KEY = 'pk.eyJ1IjoieWVhc3RlcmVnZyIsImEiOiJjamY5dTY2bGwxbzhjMnhtbWtuOWF5a2k1In0.QVys4EgiR2BCfvabF5wVsg'

export default {
  name: 'Map',
  computed: {
    accessToken() { return MAPBOX_KEY },
    center() {
      if (!this.$store.state.worst && !this.$store.state.latLng) return
      if (!this.map) return
      if (!this.$store.state.worst) {
        const { lat, lng } = this.$store.state.latLng
        this.map.flyTo({ center: [lng, lat], zoom: 14 })
      } else {
        const { coordinates } = this.$store.state.worst
        const { latitude, longitude } = coordinates
        this.map.flyTo({ center: [longitude, latitude], zoom: 14 })
      }
    }
  },
  mounted() {
    mapboxgl.accessToken = MAPBOX_KEY
    this.map = new mapboxgl.Map({
      container: 'mapboxMap',
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 14,
      center: [9.1900, 45.4642],
    })
  },
}
</script>
