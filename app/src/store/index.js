import { createStore } from 'vuex';
import EmpresaService from '../service/EmpresaService';
import MaterialService from '../../src/service/MaterialService';
import LocalizacaoService from '@/service/LocalizacaoService';
import CategoriaService from '../service/CategoriaService'
import ObjetivoService from '../service/ObjetivoService'
import QualidadeService from '../service/QualidadeService'

export default createStore({
  state: {
    companies: [],
    filteredReason: [],
    filteredMaterial: [],
    filteredQuality: [],
    filteredVolume: {},
    distance: 10,
    location: '',
    address: {},
    geolocationLat: 0,
    geolocationLon: 0,
    shouldDisableCheckbox: false,
    companyRegistry: 0,
    companyMaterialRegistry: {},
    companyMaterialRegistryStatus: '',
    materials: [],
    companyCoords: {},
  },
  getters: {
    getCompanies: function (state) {
      return state.companies;
    },
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
    },
    getShouldDisableCheckbox: function (state){
      return state.shouldDisableCheckbox
    },
    getCompanyRegistry: function (state) {
      return state.companyRegistry
    },
    getCompanyMaterialRegistry: function (state){
      return state.companyMaterialRegistry
    },
    getCompanyMaterialRegistryStatus: function (state){
      return state.companyMaterialRegistryStatus
    },
    getMaterials: function(state){
      return state.materials
    },
    getQualidade: function(state){
      return state.qualidades
    },
    getObjetivo: function(state){
      return state.objetivos
    },
    getCompanyCoords: function(state){
      return state.companyCoords
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
    },
    setCompanies: function (state, payload) {
      state.companies = [...payload]
    },
    setDisableCheckbox: function (state) {
      state.shouldDisableCheckbox = !state.shouldDisableCheckbox
    },
    setCompanyRegistry: function (state, payload) {
      state.companyRegistry = payload
    },
    setCompanyMaterialRegistry: function (state, payload) {
      state.companyMaterialRegistry = {...payload}
    },
    setCompanyMaterialRegistryStatus: function (state, payload) {
      state.companyMaterialRegistryStatus = payload
    },
    setMaterials: function (state, payload){
      state.materials = payload
    },
    setObjetivos: function (state, payload){
      state.objetivos = payload
    },
    setQualidades: function (state, payload){
      state.qualidades = payload
    },
    setCompanyCoords: function (state, payload){
      state.companyCoords = payload
    }
  },
  actions: {
    changeAddress: function({commit}, payload) {
      LocalizacaoService.alterarLocal(payload).then(data => {commit('setGeolocation', data)})
    },
    registerBusiness: function ({commit}, payload) {
      EmpresaService.postEmpresas(payload).then(data => commit('setCompanyRegistry', data))
    },
     findBusiness: function ({commit}, payload) {
      EmpresaService.getEmpresa(payload).then(data => commit('setCompanyMaterialRegistry', data))
    },
    registerMaterial: function ({commit}, payload) {
      MaterialService.postMateriais(payload).then(data => commit('setCompanyMaterialRegistryStatus', data))
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
     async getCompaniesFromDatabase({commit, state}) {
      commit('setDisableCheckbox')
       await MaterialService.getMateriais({
        categoria: [...state.filteredMaterial],
        qualidade: [...state.filteredQuality],
        objetivo: [...state.filteredReason],
        distancia: state.distance,
        lat: state.geolocationLat,
        lon: state.geolocationLon
      })
      .then((data) => {
        commit('setCompanies', data)
      })
      .catch((err) => {
        console.log('ERRO = ', err);
      });
      setTimeout(()=>{
        commit('setDisableCheckbox')
      }, 250)
      
    },
    async getMaterials({commit}) {
      await CategoriaService.getCategorias().then((data)=>{
        commit('setMaterials', data)
      }).catch((err) => {
        console.log('ERRO = ', err);
      });
    },
    async getObjetivo({commit}) {
      await ObjetivoService.getObjetivos().then((data)=>{
        commit('setObjetivos', data)
      }).catch((err) => {
        console.log('ERRO = ', err);
      });
    },
    async getQualidade({commit}) {
      await QualidadeService.getQualidades().then((data)=>{
        commit('setQualidades', data)
      }).catch((err) => {
        console.log('ERRO = ', err);
      });
    },
  }
});
