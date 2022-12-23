import { createStore } from 'vuex';

export default createStore({
  state: {
    filteredReason: [],
    filteredMaterial: [],
    filteredQuality: [],
    filteredVolume: {},
    distance: 10,
    location: '',
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
  },
});
