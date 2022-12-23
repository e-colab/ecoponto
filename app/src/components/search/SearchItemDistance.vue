<template>
  <div class="search-distance">
    <p class="search-distance__title">Distância</p>
    <vue3-slider
      v-model="distance"
      track-color="#c3d2c1"
      color="#264b23"
      class="slider"
    />
    <p class="search-distance__value">{{ distance }} km</p>
  </div>
</template>

<script>
import slider from 'vue3-slider';
export default {
  name: 'SearchItemDistance',
  components: {
    'vue3-slider': slider,
  },
  data() {
    return {
      distance: 10,
    };
  },
  watch: {
    distance() {
      this.$store.commit('setDistance', this.distance);
    },
  },
};
</script>

<style lang="scss">
.search-distance {
  display: flex;
  align-items: center;
  flex-direction: column;
  &__title {
    font-size: 15px;
    margin-top: 0;
    color: #595959;
  }
  &__value {
    font-size: 13px;
  }
}

.slider {
  width: 70%;
}
</style>
