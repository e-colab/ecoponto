<template>
  <div class="search-material">
    <p class="search-material__title">Materiais</p>

    <checkbox :list="getMaterials" @filtered="filteredItems"/>
  </div>
</template>

<script>
import checkbox from '../common/checkbox.vue';
import { MATERIAL_TYPE_LIST } from '../../constants/material-type';
import { mapGetters } from 'vuex'
 
export default {
  name: 'SearchItemMaterial',
  components: {
    checkbox,
  },
  data() {
    return {
      MATERIAL_TYPE_LIST,
      filter: [],
    };
  },
  computed: {
    ...mapGetters(['getMaterials'])
  },
  methods: {
    filteredItems(item) {
      this.filter = [...item];
    },
  },
  watch: {
    filter() {
      this.$store.commit('addFilteredMaterial', this.filter);
    },
  },
  created(){
    this.$store.dispatch('getMaterials')
  }
};
</script>

<style lang="scss" scoped>
.search {
  &-material {
    &__title {
      font-size: 18px;
      margin-bottom: 20px;
      color: #595959;
    }
  }
}
</style>
