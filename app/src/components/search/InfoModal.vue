<template>
      <vue-modal v-show="isModalVisible" @close="closeModal"> 
        <template #content>
            <section class="modal-section" v-if="sectionNumber === 1">
                <img :src="require(`../images/empresas.png`)" class="modal-img">
                <h1 class="modal-title">Bem vindo ao E-Colab Empresas!</h1>
                <p class="modal-paragraph">Nosso objetivo é facilitar a interação entre empresas interessadas em comercializar, doar e/ou coletar os resíduos de produtos/matérias primas</p>
            </section>
            <section class="modal-section" v-if="sectionNumber === 2">
                <img :src="require(`../images/empresas.png`)" class="modal-img">
                <h1 class="modal-title">Como achar as empresas?</h1>
                <p class="modal-paragraph">Na página <strong>Buscar</strong> basta utilizar os filtros de distância, material, objetivo e qualidade para buscar pelas empresas.</p>
                <p class="modal-paragraph">O mapa exibe os pins com as informações das empresas. Também é possível acessar essas informações através da lista de empresas, logo abaixo do mapa.</p>
            </section>
            <section class="modal-section" v-if="sectionNumber === 3">
                <img :src="require(`../images/empresas.png`)" class="modal-img">
                <h1 class="modal-title">Como cadastrar minha empresa?</h1>
                <p class="modal-paragraph">Na página <strong>Área da empresa</strong> basta inserir o CNPJ da sua empresa. Caso ela ainda não esteja cadastrada, você será redirecionado para a página de cadastro. </p>
            </section>
            <section class="modal-section" v-if="sectionNumber === 4">
                <img :src="require(`../images/empresas.png`)" class="modal-img">
                <h1 class="modal-title">Como cadastrar materiais?</h1>
                <p class="modal-paragraph">Na página <strong>Área da empresa</strong> basta inserir o CNPJ da sua empresa. Caso ela esteja cadastrada, você será redirecionado para a página de cadastro de materiais. 
</p>
            </section>
          <p class="modal-section__number">{{ sectionNumber }} de 4</p>
        </template>
        <template #button>
            <button @click="nextSection" class="modal-btn" :disabled="disableButton" :class="{disabled: disableButton}">Próximo</button>
        </template>
      </vue-modal>
  </template>
  
  <script>
  import VueModal from '../common/modal';
  
  export default {
    name: 'InfoModal',
    components: {
      VueModal,
    },
    data() {
      return {
        isModalVisible: true,
        sectionNumber: 1,
      };
    },
    computed: {
        disableButton() {
            return this.sectionNumber === 4;
        }
    },
    methods: {
      closeModal() {
        this.isModalVisible = false;
      },
      nextSection(){
        this.sectionNumber++
      }
    },
  };
  </script>
  
  <style lang="scss" scoped>
.modal{
    &-section{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__number{
            margin-top: 50px;
            text-align: center;
        }
    }
    &-title{
        margin-top: 0;
    }
    &-img{
        width: 100px;
        height: 60px;
        margin-right: 15px;
    }
    &-paragraph{
        text-align: center;
        margin: 0 0 10px 0;
    }
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

.disabled{
    opacity: 0.6;
    &:hover{
        cursor: not-allowed;
    }
}
  </style>
  