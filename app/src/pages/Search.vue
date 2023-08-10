<template>
  <page-wrapper class="search">
    <map-component
      class="search-map"
    />
    <SearchMenu class="search-menu" />

    <InfoModal/>
  </page-wrapper>
</template>

<script>
import PageWrapper from './PageWrapper.vue';
import SearchMenu from '../components/search/SearchMenu.vue';
import MapComponent from '../components/map/Map.vue';
import { mapGetters, mapMutations } from 'vuex';
import InfoModal from '../components/search/InfoModal'
// import filterElements from '../js/filter-rules';

export default {
  name: 'SearchPage',
  components: {
    PageWrapper,
    SearchMenu,
    MapComponent,
    InfoModal
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
    'setGeolocation', 'setGeolocationError', 'setCompanies'
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
      this.$store.dispatch('getCompaniesFromDatabase')
    },
    getFilteredMaterial() {
      this.$store.dispatch('getCompaniesFromDatabase')
    },
    getFilteredQuality() {
      this.$store.dispatch('getCompaniesFromDatabase')
    },
    getDistance(){
      this.$store.dispatch('getCompaniesFromDatabase')
    },
    $route(){
      this.setCompanies([])
    }
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
