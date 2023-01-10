<template>
  <div class="container">
    <div class="map">
      <l-map
        ref="map"
        :zoom="zoom"
        :center="[this.lat, this.lon]"
        :minZoom="16"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-control-layers />

        <l-marker :lat-lng="[this.lat, this.lon]" :icon="icon">
          <l-popup ref="popup"> Você está aqui </l-popup></l-marker
        >

        <section v-if="this.business.length > 0">
          <section v-for="point in business" :key="point">
            <l-marker
              :lat-lng="[point.lat, point.long]"
              v-if="distanceBetweenPoints(point.lat, point.long)"
            >
              <l-popup ref="popup"> {{ point.nome }}</l-popup></l-marker
            >
          </section>
        </section>
      </l-map>
    </div>

    <div class="buttons">
      <button class="button" @click="scroll">Filtre sua busca</button>
      <button class="button" @click="centralize">Centralizar mapa</button>
    </div>
  </div>
</template>
<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LControlLayers,
} from '@vue-leaflet/vue-leaflet';

export default {
  name: 'MapComponent',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControlLayers,
  },
  props: {
    lat: Number,
    lon: Number,
    dist: Number,
    business: Array,
  },
  data() {
    return {
      zoom: 16,
      iconWidth: 25,
      iconHeight: 40,
      icon: L.icon({
        iconUrl:
          'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/128/Map-Marker-Push-Pin-1-Chartreuse-icon.png',
        iconSize: [35, 40],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94],
      }),
    };
  },
  computed: {
    transformDistance() {
      let distance = this.dist * 1000;
      return distance;
    },
  },
  methods: {
    scroll() {
      document.getElementById('search-section').scrollIntoView({
        behavior: 'smooth',
      });
    },
    centralize() {
      this.$refs.map.leafletObject.panTo([this.lat, this.lon]);
    },
    distanceBetweenPoints(lat, lon) {
      const center = L.latLng([this.lat, this.lon]);
      const point = L.latLng([lat, lon]);

      const distance = center.distanceTo(point) / 1000;

      return distance <= this.dist;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100%;
}

.map {
  height: 100%;
}

.buttons {
  position: absolute;
  z-index: 999;
  width: 20%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.button {
  background-color: #064801;
  opacity: 50%;
  color: #f2f6f9;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 35px;
  width: 150px;
  height: 50px;
  border: none;
  margin-bottom: 10px;
  margin-right: 10px;
  transition: 0.5s;

  &:hover {
    opacity: 100%;
    transition: 0.5s;
  }
}
</style>
