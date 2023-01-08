<template>
  <div class="search">
    <Header class="search-header" />
    <!-- <map-component :lat="-23.58" :lon="-47.52" class="search-map"/> -->
    <map-component
      :lat="lat"
      :lon="lon"
      class="search-map"
      :dist="getDistance"
      :business="filteredBusiness"
    />
    <SearchMenu class="search-menu" />
    <Footer class="search-footer" />
  </div>
</template>

<script>
import Header from '../components/common/header/Header';
import SearchMenu from '../components/search/SearchMenu.vue';
import MapComponent from '../components/map/Map.vue';
import Footer from '../components/common/footer';
import { mapGetters } from 'vuex';
// import { business } from '../js/business-data';
import filterElements from '../js/rules';
// import getList from '../service/business'
import MaterialService from '../../src/service/MaterialService';

export default {
  name: 'SearchPage',
  components: {
    Header,
    SearchMenu,
    MapComponent,
    Footer,
  },
  data() {
    return {
      lat: 0,
      lon: 0,
      address: '',
      // filteredBusiness: business,
      filteredBusiness: []
    };
  },
  mounted() {
    // const list = await getList()
    // console.log("aqui ", list)
    navigator.geolocation.getCurrentPosition(
      this.setPosition,
      this.positionError
    );
    // this.filteredBusiness = MaterialService.getMateriais()
    MaterialService.getMateriais()
    .then(data => {
      this.filteredBusiness = data
      console.log('filteredBusiness = ', this.filteredBusiness)
    })
    .catch(err => {
      console.log('ERRO = ', err)
    })
  },
  computed: {
    ...mapGetters([
      'getFilteredReason',
      'getFilteredMaterial',
      'getFilteredQuality',
      'getDistance',
      'getFilteredVolume',
    ]),
    // business() {
    //   return MaterialService.getMateriais()
    // }
  },
  created() {
    MaterialService.getMateriais()
    .then(data => {
      this.business = data
    })
  },
  methods: {
    setPosition(position) {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      return;
    },
    positionError(error) {
      if (error) {
        this.lat = '-23.5805924';
        this.lon = '-47.524526';
      }
    },
    setAddress(address) {
      this.$store.commit('setLocation', address);
    },
  },
  watch: {
    getFilteredReason() {
      console.log('objetivo: ', this.getFilteredReason);
      let teste = filterElements(
        this.business,
        this.getFilteredMaterial,
        this.getFilteredReason,
        this.getFilteredQuality
      );
      console.log(teste)
      this.filteredBusiness = [...teste];
      console.log(this.filteredBusiness);
    },
    getFilteredMaterial() {
      console.log('material: ', this.getFilteredMaterial);
      console.log('business: ', this.business)
      let teste = filterElements(
        this.business,
        this.getFilteredMaterial,
        this.getFilteredReason,
        this.getFilteredQuality
      );
      this.filteredBusiness = [...teste];
      console.log(this.filteredBusiness);
    },
    getFilteredQuality() {
      console.log('qualidade: ', this.getFilteredQuality);
      let teste = filterElements(
        this.business,
        this.getFilteredMaterial,
        this.getFilteredReason,
        this.getFilteredQuality
      );
      this.filteredBusiness = [...teste];
      console.log(this.filteredBusiness);
    },
    getDistance() {
      console.log('distancia: ', this.getDistance);
    },
    getFilteredVolume() {
      console.log('volume: ', this.getFilteredVolume);
    },
    lat() {
      const coords = `${this.lat}, ${this.lon}`;
      
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords}&key=${process.env.VUE_APP_GOOGLE_API_KEY}`

        )
        .then((responseText) => {
          return responseText.json();
        })
        .then((jsonData) => {
          console.log(jsonData)
          this.setAddress(jsonData.results[0].formatted_address);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: grid;
  // height: 100vh;
  // grid-template-columns: 1fr;
  // grid-template-rows: 1fr 6fr 10fr 3fr;
  // grid-template-areas:
  // "header"
  // "map"
  // "menu"
  // "footer";

  position: relative;

  &-header {
    height: 65px;
  }

  &-map {
    z-index: 0;
  }

  // &-menu{
  //     grid-area: "menu";
  // }
  &-footer {
    height: 30vh;
  }
}
</style>
