<template>
  <page-wrapper class="search">
    <map-component
      :lat="lat"
      :lon="lon"
      class="search-map"
      :dist="getDistance"
      :business="filteredBusiness"
    />
    <SearchMenu class="search-menu" />
  </page-wrapper>
</template>

<script>
import PageWrapper from './PageWrapper.vue';
import SearchMenu from '../components/search/SearchMenu.vue';
import MapComponent from '../components/map/Map.vue';
import { mapGetters } from 'vuex';
// import { business } from '../js/business-data';
import filterElements from '../js/rulesUpdated';
// import getList from '../service/business'
import MaterialService from '../../src/service/MaterialService';

export default {
  name: 'SearchPage',
  components: {
    PageWrapper,
    SearchMenu,
    MapComponent,
  },
  data() {
    return {
      lat: 0,
      lon: 0,
      address: '',
      // filteredBusiness: business,
      filteredBusiness: [],
      business: [],
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
      .then((data) => {
        this.filteredBusiness = data;
        console.log('filteredBusiness = ', this.filteredBusiness);
      })
      .catch((err) => {
        console.log('ERRO = ', err);
      });
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
    this.getData();
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
    async getData() {
      const aux = await MaterialService.getMateriais();
      this.business = aux;
    },
  },
  watch: {
    filteredBusiness() {
      if (this.filteredBusiness.length === 0) {
        setTimeout(() => {
          alert(
            'Sem resultados para sua busca. Tente outra combinação de filtros!'
          );
        }, '500');
      }
    },
    getFilteredReason() {
      console.log('objetivo: ', this.getFilteredReason);
      let teste = filterElements(
        this.business,
        this.getFilteredMaterial,
        this.getFilteredReason,
        this.getFilteredQuality,
        this.getFilteredVolume
      );
      console.log(teste);
      this.filteredBusiness = [...teste];
      console.log(this.filteredBusiness);
    },
    getFilteredMaterial() {
      console.log('material: ', this.getFilteredMaterial);
      console.log('business: ', this.business);
      let teste = filterElements(
        this.business,
        this.getFilteredMaterial,
        this.getFilteredReason,
        this.getFilteredQuality,
        this.getFilteredVolume
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
        this.getFilteredQuality,
        this.getFilteredVolume
      );
      this.filteredBusiness = [...teste];
      console.log(this.filteredBusiness);
    },
    getDistance() {
      console.log('distancia: ', this.getDistance);
    },
    getFilteredVolume() {
      console.log('volume: ', this.getFilteredVolume);
      let teste = filterElements(
        this.business,
        this.getFilteredMaterial,
        this.getFilteredReason,
        this.getFilteredQuality,
        this.getFilteredVolume
      );
      this.filteredBusiness = [...teste];
      console.log(this.filteredBusiness);
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
          console.log(jsonData);
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
  position: relative;

  &-map {
    z-index: 0;
    height: 60vh;
  }
}
</style>
