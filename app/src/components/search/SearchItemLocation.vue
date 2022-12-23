<template>
  <div class="search-location">
    <img src="../../assets/map-pin-point.svg" class="search-location__icon" />
    <p class="search-location__text">Você está em</p>
    <h2 class="search-location__title">{{ transformLocation }}</h2>
    <!-- <button class="search-location__button" @click="showModal">alterar</button> -->
    <!-- <vue-modal v-show="isModalVisible" @close="closeModal"></vue-modal> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import VueModal from '../common/modal.vue'

export default {
  name: 'SearchItemLocation',
  components: {
    // VueModal
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  computed: {
    ...mapGetters(['getLocation']),
    transformLocation() {
      const location = this.getLocation;

      if (location.length > 0) {
        let result = /^([^,])+/.exec(location);

        return result[0];
      }
      return location;
    },
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-location {
  display: flex;
  align-items: center;
  flex-direction: column;

  &__icon {
    height: 15px;
    width: 15px;
  }

  &__text {
    font-size: 12px;
    color: #6d6d6d;
    margin: 5px;
  }

  &__title {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 15px;
    color: #595959;
    text-align: center;
  }

  &__button {
    font-size: 13px;
    cursor: pointer;
    color: #6d6d6d;
    text-decoration: none;
    border: none;
    background-color: transparent;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
