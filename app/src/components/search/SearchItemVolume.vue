<template>
  <div>
    <p class="search-volume__title">Volume</p>
    <input v-model="value" class="search-volume__input" @change="setVolume" />
    <select v-model="measure" class="search-volume__select" @change="setVolume">
      <option>kg</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SearchItemVolume',
  data() {
    return {
      value: '',
      measure: '',
    };
  },
  methods: {
    setVolume() {
      const payload = { value: this.value, measure: this.measure };
      this.$store.commit('setFilteredVolume', payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-volume {
  &__title {
    font-size: 18px;
    margin: 0 0 20px 0;
    color: #595959;
  }
  &__input {
    background-color: #fef4ea;
    border: 1px solid black;
    border-radius: 20px;
    width: 90px;
    height: 30px;
    text-align: center;
    margin-right: 10px;
  }
  &__select {
    background-color: #fef4ea;
    border-radius: 20px;
    width: 60px;
    height: 30px;
    border: 1px solid black;
    text-align: center;
  }
}
</style>
