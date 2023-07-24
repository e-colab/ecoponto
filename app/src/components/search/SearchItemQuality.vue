<template>
  <div class="search-quality">
    <p class="search-quality__title">Qualidade</p>

    <checkbox :list="getQualidade" @filtered="filteredItems"/>
  </div>
</template>

<script>
import checkbox from '../common/checkbox.vue';
import { mapGetters } from 'vuex'

export default {
  name: 'SearchItemQuality',
  data() {
    return {
      filter: [],
    };
  },
  components: {
    checkbox,
  },
  computed: {
    ...mapGetters(['getQualidade'])
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
  created(){
    this.$store.dispatch('getQualidade')
  }
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
