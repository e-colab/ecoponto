<template>
  <div class="search-reasons">
    <p class="search-reasons__title">Objetivo</p>

    <checkbox :reasons="reasons" @filtered="filteredItems" />
  </div>
</template>

<script>
import checkbox from '../common/checkbox.vue';

export default {
  name: 'SearchItemReason',
  data() {
    return {
      filter: [],
      reasons: [
        { value: 'Comprar', id: 'buy' },
        { value: 'Vender', id: 'sell' },
        { value: 'Doar', id: 'donate' },
        { value: 'Coletar', id: 'colect' },
      ],
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
      this.$store.commit('addFilteredReason', this.filter);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  &-reasons {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    &__title {
      font-size: 18px;
      margin-top: 0;
      margin-bottom: 20px;
      color: #595959;
    }

    &__reason {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;

      &-item {
        border: 1px solid #064801;
        padding: 3px 8px;
        border-radius: 30px;
        text-align: center;
        margin-right: 5px;
        color: #595959;

        &:hover {
          cursor: pointer;
          transition: 0.5s;
          opacity: 70%;
        }
      }

      &-input {
        visibility: hidden;
        position: absolute;
        right: 0;
      }
    }
  }
}

.selected {
  background-color: #064801;
  color: white;
}
</style>
