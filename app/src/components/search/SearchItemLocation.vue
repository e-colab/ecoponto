<template>
  <div class="search-location">
    <img src="../../assets/map-pin-point.svg" class="search-location__icon" />
    <p class="search-location__text">Você está em</p>
    <h2 class="search-location__title">{{ transformLocation }}</h2>
    <button class="search-location__button" @click="showModal">alterar</button>
    <vue-modal v-show="isModalVisible" @close="closeModal">
      <template #content>
        <p>Alterar localização</p>

        <div class="search-location__input-container">
          <span>Digite o CEP</span>
          <div>
            <input class="search-location__input" v-mask="'#####-###'" type="text" v-model="cep"/>
            <button class="search-location__input-cta" @click="getAddress">buscar</button>
          </div>
        </div>

        <div class="search-location__show-location">
          <p v-if="isAddress">{{ address.logradouro }} - {{ address.bairro }}, {{ address.localidade }}</p>
        </div>
      </template>

      <template #button>
        <button class="search-location__change-btn" :disabled="!isAddress" :class="{disabled: !isAddress}">Aplicar</button>
      </template>
     
      
    </vue-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueModal from '../common/modal.vue'

export default {
  name: 'SearchItemLocation',
  components: {
    VueModal,
  },
  data() {
    return {
      isModalVisible: false,
      cep: '',
      address: {
        uf: ''
      },
    };
  },
  computed: {
    ...mapGetters(['getLocation']),
    transformLocation() {
      const location = this.getLocation;

      if (location.length > 0) {
        let result = /^([^,])+/.exec(location);

        return result[0];
      }
      return location;
    },
    isAddress(){
      return this.address.uf.length > 0
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    setAddress(address){
      this.address = { ...this.address, ...address };
    },
    getAddress(){
          fetch('https://viacep.com.br/ws/' + this.cep + '/json/').then(
            (response) => {
              response.json().then((data) => this.setAddress(data));
              }
            );
    }
  },
};
</script>

<style lang="scss" scoped>
.search-location {
  display: flex;
  align-items: center;
  flex-direction: column;

  &__icon {
    height: 15px;
    width: 15px;
  }

  &__text {
    font-size: 12px;
    color: #6d6d6d;
    margin: 5px;
  }

  &__title {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 15px;
    color: #595959;
    text-align: center;
  }

  &__button {
    font-size: 13px;
    cursor: pointer;
    color: #6d6d6d;
    text-decoration: none;
    border: none;
    background-color: transparent;
    &:hover {
      text-decoration: underline;
    }
  }

  &__input{
    background-color: #fef4ea;
    border-radius: 10px;
    border: 1px #6D6D6D solid;
    height: 40px;
    padding: 10px;
    width: 40%;
    min-width: 215px;
    margin-top: 5px;

    &-container{
      display: flex;
      flex-direction: column;
    }

    &-cta{
      margin-left: 5px;
      background-color: transparent;
      border: none;
      &:hover{
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  &__change{
    &-btn{
      color: #fef4ea;
      background: #064801;
      border: none;
      border-radius: 10px;
      text-transform: uppercase;
      padding: 5px;
      width: 50%;

    &:hover{
      cursor: pointer;
    }
    }
  }

  &__show-location{
    width: 100%;
    background-color: #f0e3d5;
    margin: 10px 0 10px 0;
    height: 100%;
    border: 1px dashed #ccb49b;
    text-align: center;
    padding: 15px;
  }
}

.disabled{
  cursor: not-allowed !important;
  opacity: 80%;
}
</style>
