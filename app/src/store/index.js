import { createStore } from 'vuex';
import EmpresaService from '../service/EmpresaService';

export default createStore({
  state: {
    filteredReason: [],
    filteredMaterial: [],
    filteredQuality: [],
    filteredVolume: {},
    distance: 10,
    location: '',
    address: {},
    geolocationLat: 0,
    geolocationLon: 0
  },
  getters: {
    getFilteredReason: function (state) {
      return state.filteredReason;
    },
    getFilteredMaterial: function (state) {
      return state.filteredMaterial;
    },
    getFilteredQuality: function (state) {
      return state.filteredQuality;
    },
    getFilteredVolume: function (state) {
      return state.filteredVolume;
    },
    getDistance: function (state) {
      return state.distance;
    },
    getLocation: function (state) {
      return state.location;
    },
    getGeolocationLat: function (state){
      return state.geolocationLat
    },
    getGeolocationLon: function (state){
      return state.geolocationLon
    }
  },
  mutations: {
    addFilteredReason: function (state, payload) {
      state.filteredReason = [...payload];
    },
    addFilteredMaterial: function (state, payload) {
      state.filteredMaterial = [...payload];
    },
    addFilteredQuality: function (state, payload) {
      state.filteredQuality = [...payload];
    },
    setFilteredVolume: function (state, payload) {
      state.filteredVolume = { ...payload };
    },
    setDistance: function (state, payload) {
      state.distance = payload;
    },
    setLocation: function (state, payload) {
      state.location = payload;
    },
    setGeolocation: function (state, payload) {
      state.geolocationLat = payload.coords.latitude
      state.geolocationLon = payload.coords.longitude      
    },
    setGeolocationError: function (state){
      state.geolocationLat = '-23.5805924'
      state.geolocationLon = '-47.524526'
    }
  },
  actions: {
    registerBusiness: function (_, payload) {
      EmpresaService.postEmpresas(payload)
    },
     getLocationUsingCoords: function ({state, commit}){
      const coords = `${state.geolocationLat}, ${state.geolocationLon}`;

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords}&key=${process.env.VUE_APP_GOOGLE_API_KEY}`
      )
        .then((responseText) => {
          return responseText.json();
        })
        .then((jsonData) => {
          commit('setLocation', jsonData.results[0].formatted_address);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getErrorLocationUsingCoords: function ({state, commit}){
      const coords = `${state.geolocationLat}, ${state.geolocationLon}`;
      
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords}&key=${process.env.VUE_APP_GOOGLE_API_KEY}`
      )
        .then((responseText) => {
          return responseText.json();
        })
        .then((jsonData) => {
          console.log(jsonData);
          commit.setLocation(jsonData.results[0].formatted_address);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // fetchCurrentLocation: function (state) {
    //   const coords = `${state.geolocation.lat}, ${state.geolocation.lon}`;
    //   fetch(
    //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords}&key=${process.env.VUE_APP_GOOGLE_API_KEY}`
    //   )
    //     .then((responseText) => {
    //       return responseText.json();
    //     })
    //     .then((jsonData) => {
    //       console.log(jsonData);
    //       state.setLocation(jsonData.results[0].formatted_address);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  }
});
