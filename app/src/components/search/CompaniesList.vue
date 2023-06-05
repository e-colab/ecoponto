<template>
    <div class="companies-list">
        <h3 class="companies-list__title">{{ companiesCount }} empresas encontradas.</h3>
        <div class="companies-list__container">
            <Companies v-for="company in teste" :company="company" :key="company" class="companies-list__card"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Companies from '../common/companies-card.vue'

const teste = [{
    empresanome: 'teste',
    endereco: 'testeee',
    numeroendereco: '12',
    bairro: 'jd bibs',
    cidade: 'sao paulo',
    telefone: '11-2392-2323',
    materiais: [
        {
            materialnome: 'teste2',
            descricao: 'descricaoteste',
            objetivo: 'testeobjetivo',
            qualidade: 'testequalid'
        }, {
            materialnome: 'teste2',
            descricao: 'descricaoteste',
            objetivo: 'testeobjetivo',
            qualidade: 'testequalid'
        }
    ]
},
{
    empresanome: 'teste',
    endereco: 'testeee',
    numeroendereco: '12',
    bairro: 'jd bibs',
    cidade: 'sao paulo',
    telefone: '11-2392-2323',
    materiais: [
        {
            materialnome: 'teste2',
            descricao: 'descricaoteste',
            objetivo: 'testeobjetivo',
            qualidade: 'testequalid'
        }
    ]
}
]

export default {
    name: 'companies-list',
    data(){
        return{
            teste,
        }
    },
    components: {
        Companies
    },
    computed: {
        ...mapGetters(['getCompanies']),
        companiesCount() {
            return this.getCompanies.length;
        }
    }
}
</script>

<style lang="scss" scoped>
.companies-list{
    border: solid 1px #000000;
    border-radius: 15px;
    padding: 5px 20px 5px 20px;
    height: 75px;
    transition: height 1s ease-in-out;
    
    &:hover{
        .companies-list__container{
            max-height: 400px;
            overflow: auto;
        }
        height:500px;
    }

    &__title{
        color: #595959;
    }

    &__container{
        overflow: hidden;
        max-height: 0;
        transition: max-height 1.5s;  
    }

    &__card{
       margin-bottom: 10px; 
       border-radius: 15px;
    }
}

</style>