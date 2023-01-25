<template>
  <page-wrapper>
    <div class="register register-grid">
      <div class="teste">oi</div>
    </div>

    <div class="register">
      <Title title="Cadastre sua empresa" />

      <div class="register-wrapper">
        <span>Nome da empresa:</span>
        <input v-model="message" type="text" class="register-input" />
      </div>

      <div class="register-wrapper">
        <span>CNPJ:</span>
        <input v-model="cnpj" type="text" class="register-input" />
      </div>

      <div class="register-wrapper">
        <span>Telefone:</span>
        <input v-model="telefone" type="text" class="register-input" />
      </div>

      <div class="register-wrapper">
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

      <div class="register-wrapper">
        <span>Rua:</span>
        <input
          v-model="address.logradouro"
          :label="address.logradouro"
          type="text"
          :disabled="loading"
          class="register-input"
        />
      </div>

      <div class="register-wrapper">
        <span>Bairro:</span>
        <input
          v-model="address.bairro"
          :label="address.bairro"
          type="text"
          :disabled="loading"
          class="register-input"
        />
      </div>

      <div class="register-wrapper">
        <span>Cidade:</span>
        <input
          v-model="address.localidade"
          :label="address.localidade"
          type="text"
          :disabled="loading"
          class="register-input"
        />
      </div>

      <div class="register-wrapper">
        <span>Número:</span>
        <input v-model="numero" type="text" class="register-input" />
      </div>

      <div class="register-wrapper">
        <span>Funcionário Responsável:</span>
        <input v-model="func" type="text" class="register-input" />
      </div>

      <div class="register-wrapper">
        <span>E-mail:</span>
        <input v-model="email" type="text" class="register-input" />
      </div>
    </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from './PageWrapper.vue';
import Title from '../components/common/title.vue';

export default {
  name: 'RegisterPage',
  components: {
    PageWrapper,
    Title,
  },
  data() {
    return {
      message: '',
      cnpj: '',
      telefone: '',
      cep: '',
      rua: '',
      bairro: '',
      numero: '',
      cidade: '',
      func: '',
      email: '',
      address: {
        cep: '',
        logradouro: '',
        bairro: '',
        localidade: '',
      },
      loading: false,
    };
  },
  methods: {
    setAddress(address) {
      this.loading = true;
      this.address = { ...this.address, ...address };
      this.loading = false;
      console.log(this.address);
    },
    getAddress() {
      // fetch('https://viacep.com.br/ws/' + 18046340 + '/json/').then((data) => {
      //   this.address = { ...data };
      //   console.log(data);
      // });

      fetch('https://viacep.com.br/ws/' + this.address.cep + '/json/').then(
        (response) => {
          response.json().then((data) => this.setAddress(data));
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
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
    border: 1px solid;
    height: 40px;
    padding: 10px;
    width: 30%;
    margin-top: 7px;
  }

  &-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }
}

.teste {
  background-color: blue;
  grid-column-start: 1;
  grid-column-end: 3;
}
</style>
