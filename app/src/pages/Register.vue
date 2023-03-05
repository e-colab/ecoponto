<template>
  <page-wrapper>
    
    <div class="register ">
      <Title title="Cadastre sua empresa" />
      <div class="register-grid">
      <div class="register-wrapper full">
        <span>Nome da empresa:</span>
        <input v-model="name" type="text" class="register-input"/>
      </div>

      <div class="register-wrapper first-half">
        <span>CNPJ:</span>
        <input v-model="cnpj" type="text" class="register-input" v-mask="'##.###.###/####-##'"/>
      </div>

      <div class="register-wrapper second-half">
        <span>Telefone:</span>
        <input v-model="telefone" type="text" class="register-input" v-mask="['(##) ####-####', '(##) #####-####']"/>
      </div>

      <div class="register-wrapper first-third">
        <span>CEP:</span>
        <input
          v-model="address.cep"
          :label="address.cep"
          type="text"
          :disabled="loading"
          class="register-input"
          @focusout="getAddress"
        />
      </div>

      <div class="register-wrapper middle-half">
        <span>Rua:</span>
        <input
          v-model="address.logradouro"
          :label="address.logradouro"
          type="text"
          :disabled="loading"
          class="register-input"
        />
      </div>

      <div class="register-wrapper last-third">
        <span>Número:</span>
        <input v-model="address.numero" type="text" class="register-input" />
      </div>

      <div class="register-wrapper first-third">
        <span>Bairro:</span>
        <input
          v-model="address.bairro"
          :label="address.bairro"
          type="text"
          :disabled="loading"
          class="register-input"
        />
      </div>

      <div class="register-wrapper middle-half">
        <span>Cidade:</span>
        <input
          v-model="address.localidade"
          :label="address.localidade"
          type="text"
          :disabled="loading"
          class="register-input"
        />
      </div>

      <div class="register-wrapper last-third">
        <span>Estado:</span>
        <input
          v-model="address.uf"
          :label="address.uf"
          type="text"
          :disabled="loading"
          class="register-input"
        />
      </div>

      <div class="register-wrapper first-half">
        <span>Funcionário Responsável:</span>
        <input v-model="func" type="text" class="register-input" />
      </div>

      <div class="register-wrapper second-half">
        <span>E-mail:</span>
        <input v-model="email" type="text" class="register-input" />
      </div>

      <button class="register-cta first-third" :disable="disableButton" :class="{disabled: disableButton}" @click="registerBusinessActionCall">Cadastrar</button>
    </div>
  </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from './PageWrapper.vue';
import Title from '../components/common/title.vue';
import { isEmpty } from 'lodash'
import { mapActions } from 'vuex';

export default {
  name: 'RegisterPage',
  components: {
    PageWrapper,
    Title,
  },
  data() {
    return {
      name: '',
      cnpj: '',
      telefone: '',
      func: '',
      email: '',
      address: {
        cep: '',
        logradouro: '',
        bairro: '',
        localidade: '',
        numero: '',
        uf: ''
      },
      loading: false,
      isEmpty
    };
  },
  computed:{
    disableButton(){
      return (isEmpty(this.name) || isEmpty(this.cnpj) || isEmpty(this.telefone) || isEmpty(this.func) || isEmpty(this.email) || 
      isEmpty(this.address.cep) || isEmpty(this.address.logradouro) || isEmpty(this.address.bairro) || isEmpty(this.address.localidade) 
      || isEmpty(this.address.numero) || isEmpty(this.address.uf))
    },
  },
  methods: {
    ...mapActions(['registerBusiness']),
    setAddress(address) {
      this.loading = true;
      this.address = { ...this.address, ...address };
      this.loading = false;
      console.log(this.address);
    },
    getAddress() {
      this.loading = true;
      fetch('https://viacep.com.br/ws/' + this.address.cep + '/json/').then(
        (response) => {
          response.json().then((data) => this.setAddress(data));
        }
      );
      this.loading = false;
    },
    
    registerBusinessActionCall(){
      const payload = {
        cnpj: this.cnpj.replaceAll('.', '').replaceAll('/', '').replaceAll('-', ''),
        nome: this.name,
        email: this.email,
        telefone: this.telefone.replaceAll('(', '').replaceAll(')', '').replaceAll('-', ''),
        funcResponsavel: this.func,
        cep: this.address.cep,
        cidade: this.address.localidade,
        estado: this.address.uf,
        endereco: this.address.logradouro,
        bairro: this.address.bairro,
        numeroEndereco: this.address.numero,
      }
      console.log(payload)
      this.registerBusiness(payload)
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  color: #6D6D6D;
  min-height: 100vh;
  background-color: #fef4ea;
  padding: 40px 80px;

  &-wrapper {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }

  &-input {
    background-color: #fef4ea;
    border-radius: 10px;
    border: 1px #6D6D6D solid;
    height: 40px;
    padding: 10px;
    width: 100%;
    margin-top: 7px;
  }

  &-grid {
    width: 70%;
    display: grid;
    column-gap: 10px;
    row-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;

    @media only screen and (max-width: 950px){
      width: 100%;
    }
  }

  &-cta{
    max-width: 130px;
    height: 40px;
    background-color: #064801;
    color: #FFFFFF;
    border: none;
    border-radius: 15px;
    text-transform: uppercase;
    font-family: 'Roboto';
    cursor: pointer;
    align-self: flex-end;

    @media only screen and (max-width: 500px){
      max-width: 100%;
    }
  }

  @media only screen and (max-width: 950px){
    padding: 40px;
  }
}

.full{
  grid-column-start: 1;
  grid-column-end: 5;
}

.first-half{
  grid-column-start: 1;
  grid-column-end: 3;

  @media only screen and (max-width: 500px){
    grid-column-start: 1;
    grid-column-end: 5;
  }
}

.second-half{
  grid-column-start: 3;
  grid-column-end: 5;

  @media only screen and (max-width: 500px){
    grid-column-start: 1;
    grid-column-end: 5;
  }
}

.first-third{
  grid-column-start: 1;
  grid-column-end: 2;

  @media only screen and (max-width: 500px){
    grid-column-start: 1;
    grid-column-end: 5;
  }
}

.middle-half{
  grid-column-start: 2;
  grid-column-end: 4;

  @media only screen and (max-width: 500px){
    grid-column-start: 1;
    grid-column-end: 5;
  }
}

.last-third{
  grid-column-start: 4;
  grid-column-end: 5;

  @media only screen and (max-width: 500px){
    grid-column-start: 1;
    grid-column-end: 5;
  }
}

.disabled{
  cursor: not-allowed;
  opacity: 70%;
}

</style>
