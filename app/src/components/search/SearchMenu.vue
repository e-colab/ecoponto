<template>
  <div class="container" id="search-section">
    <div class="location-box">
      <search-item-location />
      <hr class="divider" />
      <search-item-distance />
    </div>
    <div class="search-box">
      <companies-list class="search-box__companies"/>
      <search-item-material />
      <hr class="divider" />
      <search-item-reason />
      <hr class="divider" />
      <search-item-quality />
    </div>
  </div>
</template>

<script>
import SearchItemLocation from './SearchItemLocation.vue';
import SearchItemDistance from './SearchItemDistance.vue';
import SearchItemMaterial from './SearchItemMaterial.vue';
import SearchItemReason from './SearchItemReason.vue';
import SearchItemQuality from './SearchItemQuality.vue';
import CompaniesList from './CompaniesList.vue'

export default {
  name: 'SearchMenu',
  components: {
    SearchItemLocation,
    SearchItemDistance,
    SearchItemMaterial,
    SearchItemReason,
    SearchItemQuality,
    CompaniesList,
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  background-color: #fef4ea;
  display: flex;
  justify-content: flex-start;
  gap: 50px;
  padding: 80px 40px 150px 40px;
}

.location-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  border: solid 1px #000000;
  border-radius: 15px;
  width: 25%;
  height: 50%;
}

.search-box {
  width: 100%;

  &__companies{
    width: 80%;
    margin-bottom: 40px;
  }
}

.divider {
  background-color: #000000;
  margin: 25px 0 25px 0;
}

@media only screen and (max-width: 950px) {
  .container {
    flex-direction: column;
  }

  .location-box {
    width: 100%;
  }
}
</style>
