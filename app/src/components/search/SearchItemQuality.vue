<template>
  <div class="search-quality">
    <p class="search-quality__title">Qualidade</p>

    <checkbox :reasons="reasons" @filtered="filteredItems" />
  </div>
</template>

<script>
import checkbox from '../common/checkbox.vue';

export default {
  name: 'SearchItemQuality',
  data() {
    return {
      reasons: [
        { value: 'Prensado', id: 'pressed' },
        { value: 'Limpo', id: 'clean' },
        { value: 'Inteiro', id: 'whole' },
        { value: 'Cacos', id: 'shards' },
        { value: 'Unidade', id: 'unit' },
        { value: 'Triturado', id: 'crushed' },
      ],
      filter: [],
    };
  },
  components: {
    checkbox,
  },
  methods: {
    filteredItems(item) {
      this.filter = [...item];
    },
  },
  watch: {
    filter() {
      this.$store.commit('addFilteredQuality', this.filter);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-quality {
  &__title {
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 20px;
    color: #595959;
  }
}
</style>
