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
    geolocation: {
      lat: 0,
      lon: 0
    },
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
      const lat = payload.coords.latitude
      const lon = payload.coords.longitude

      state.geolocation = {...lat, ...lon}
    },
    setGeolocationError: function (state, payload){
      if(payload){
        state.geolocation = {...'-23.5805924', ...'-47.524526'}
      }
    }
  },
  actions: {
    registerBusiness: function (_, payload) {
      console.log(payload)
      EmpresaService.postEmpresas(payload)
    },
    getLocationUsingCoords: function (state, payload){
      this.commit('setGeolocation', payload)

      const coords = `${state.geolocation.lat}, ${state.geolocation.lon}`;
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords}&key=${process.env.VUE_APP_GOOGLE_API_KEY}`
      )
        .then((responseText) => {
          return responseText.json();
        })
        .then((jsonData) => {
          console.log(jsonData);
          state.setLocation(jsonData.results[0].formatted_address);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getErrorLocationUsingCoords: function (state, payload){
      this.commit('setGeolocationError', payload)

      const coords = `${state.geolocation.lat}, ${state.geolocation.lon}`;
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords}&key=${process.env.VUE_APP_GOOGLE_API_KEY}`
      )
        .then((responseText) => {
          return responseText.json();
        })
        .then((jsonData) => {
          console.log(jsonData);
          state.setLocation(jsonData.results[0].formatted_address);
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
