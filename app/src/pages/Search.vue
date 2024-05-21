<template>
  <section class="search">
    <Header class="search-header" />
    <section class="search-content">
      <map-component class="search-map" />
      <SearchMenu class="search-menu" />
    </section>
  </section>
  <!-- <page-wrapper class="search"> -->

  <!-- </page-wrapper> -->
</template>

<script>
// import PageWrapper from "./PageWrapper.vue";
import Header from "@/components/common/header/Header.vue";
import SearchMenu from "../components/search/SearchMenu.vue";
import MapComponent from "../components/map/Map.vue";
import { mapGetters, mapMutations } from "vuex";
// import filterElements from '../js/filter-rules';

export default {
  name: "SearchPage",
  components: {
    // PageWrapper,
    SearchMenu,
    MapComponent,
    Header,
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
      "getFilteredReason",
      "getFilteredMaterial",
      "getFilteredQuality",
      "getDistance",
      "getCompanies",
    ]),
  },
  methods: {
    ...mapMutations(["setGeolocation", "setGeolocationError", "setCompanies"]),
    setGeolocationMutation(position) {
      this.setGeolocation(position);
      this.wereCoordsCalculated = 1;
    },
    setGeolocationErrorMutation(position) {
      this.setGeolocationError(position);
      this.wereCoordsCalculated = 1;
    },
  },
  watch: {
    wereCoordsCalculated() {
      this.$store.dispatch("getLocationUsingCoords");
    },
    getFilteredReason() {
      this.$store.dispatch("getCompaniesFromDatabase");
    },
    getFilteredMaterial() {
      this.$store.dispatch("getCompaniesFromDatabase");
    },
    getFilteredQuality() {
      this.$store.dispatch("getCompaniesFromDatabase");
    },
    getDistance() {
      this.$store.dispatch("getCompaniesFromDatabase");
    },
    $route() {
      this.setCompanies([]);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;

  &-header {
    height: 65px;
    @media only screen and (max-width: 910px) {
      height: 220px;
    }
  }

  &-content {
    position: relative;
    flex-grow: 1;
  }

  &-menu {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 400px;
  }

  &-map {
    z-index: 0;
    height: 100%;
  }
}
</style>
