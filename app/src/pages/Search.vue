<template>
  <page-wrapper class="search">
    <map-component
      class="search-map"
      :companies="filteredCompanies"
    />
    <SearchMenu class="search-menu" />
  </page-wrapper>
</template>

<script>
import PageWrapper from './PageWrapper.vue';
import SearchMenu from '../components/search/SearchMenu.vue';
import MapComponent from '../components/map/Map.vue';
import { mapGetters, mapMutations } from 'vuex';
import filterElements from '../js/filter-rules';

export default {
  name: 'SearchPage',
  components: {
    PageWrapper,
    SearchMenu,
    MapComponent,
  },
  data() {
    return {
      filteredCompanies: [],
      wereCoordsCalculated: 0,
    };
  },
  async mounted() {
    navigator.geolocation.getCurrentPosition(
      this.setGeolocationMutation,
      this.setGeolocationErrorMutation
    );
    this.$store.dispatch('getCompaniesFromDatabase')
  },
  computed: {
    ...mapGetters([
      'getFilteredReason',
      'getFilteredMaterial',
      'getFilteredQuality',
      'getDistance',
      'getCompanies'
    ]),
  },
  methods: {
    ...mapMutations([
    'setGeolocation', 'setGeolocationError'
    ]),
    setGeolocationMutation(position){
      this.setGeolocation(position)
      this.wereCoordsCalculated = 1
    },
    setGeolocationErrorMutation(position){
      this.setGeolocationError(position)
      this.wereCoordsCalculated = 1
    },
  },
  watch: {
    wereCoordsCalculated(){
        this.$store.dispatch('getLocationUsingCoords')
    },
    getFilteredReason() {
      const filteredCompanies = filterElements(
        this.getCompanies,
        this.getFilteredMaterial,
        this.getFilteredReason,
        this.getFilteredQuality,
      );
      this.filteredCompanies = [...filteredCompanies];
    },
    getFilteredMaterial() {
      const filteredCompanies = filterElements(
        this.getCompanies,
        this.getFilteredMaterial,
        this.getFilteredReason,
        this.getFilteredQuality,
      );
      this.filteredCompanies = [...filteredCompanies];
    },
    getFilteredQuality() {
      const filteredCompanies = filterElements(
        this.getCompanies,
        this.getFilteredMaterial,
        this.getFilteredReason,
        this.getFilteredQuality,
      );
      this.filteredCompanies = [...filteredCompanies];
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  position: relative;

  &-map {
    z-index: 0;
    height: 60vh;
  }
}
</style>
