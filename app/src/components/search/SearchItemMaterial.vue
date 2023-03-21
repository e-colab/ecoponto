<template>
  <div class="search-material">
    <p class="search-material__title">Materiais</p>

    <checkbox :list="MATERIAL_TYPE_LIST" @filtered="filteredItems" :shouldDisable="disabled"/>
  </div>
</template>

<script>
import checkbox from '../common/checkbox.vue';
import { MATERIAL_TYPE_LIST } from '../../constants/material-type';

export default {
  name: 'SearchItemMaterial',
  components: {
    checkbox,
  },
  data() {
    return {
      MATERIAL_TYPE_LIST,
      filter: [],
      disabled: false,
    };
  },
  methods: {
    filteredItems(item) {
      this.filter = [...item];
    },
  },
  watch: {
    filter() {
      this.disabled = true;
      this.$store.commit('addFilteredMaterial', this.filter);
      setTimeout(()=>{
        console.log('oi')
        this.disabled = false
      },1000)
      
    },
  },
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
