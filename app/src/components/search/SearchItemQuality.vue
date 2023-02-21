<template>
  <div class="search-quality">
    <p class="search-quality__title">Qualidade</p>

    <checkbox :list="QUALITY_TYPE_LIST" @filtered="filteredItems" />
  </div>
</template>

<script>
import checkbox from '../common/checkbox.vue';
import { QUALITY_TYPE_LIST } from '../../constants/quality-type';

export default {
  name: 'SearchItemQuality',
  data() {
    return {
      QUALITY_TYPE_LIST,
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
