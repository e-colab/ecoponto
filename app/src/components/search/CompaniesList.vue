<template>
    <div class="companies-list" :class="{openAnimation: changeSize, closeAnimation: !changeSize}" @click="shouldChangeSize()">
        <div class="companies-list__header">
            <h3 class="companies-list__title">{{ companiesCount }} empresas encontradas</h3>
            <img :src="require(`../../assets/arrow.svg`)" class="companies-list__arrow" :class="{arrowDown: changeSize, arrowUp: !changeSize}"/>
        </div>
        <div class="companies-list__container" :class="{openCards: changeSize, closeCards: !changeSize}">
            <p v-if="noCompaniesFound">Nenhuma empresa encontrada. Faça uma nova busca.</p>
            <Companies v-for="company in teste" :company="company" :key="company" class="companies-list__card" v-else/>
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
            changeSize: false,
        }
    },
    components: {
        Companies
    },
    computed: {
        ...mapGetters(['getCompanies']),
        companiesCount() {
            return this.getCompanies.length;
        },
        noCompaniesFound(){
            return this.companiesCount == 0
        }
    },
    methods: {
        shouldChangeSize(){
            this.changeSize = !this.changeSize
            console.log(this.changeSize)
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
    cursor: pointer;

    &__header{
        display: flex;
        align-items: center;
    }

    &__title{
        color: #595959;
    }

    &__arrow{
        width: 30px;
        height: 30px;
    }

    &__container{
        overflow: auto;
    }

    &__card{
       margin-bottom: 10px; 
       border-radius: 15px;
    }
}

.openAnimation{
    height: 500px;
    animation-name: increaseDiv;
    animation-duration: 1s;
}

@keyframes increaseDiv {
  0%   {height: 75px;}
  100% {height: 500px;}
}

.closeAnimation{
    height: 75px;
    animation-name: decreaseDiv;
    animation-duration: 1s;
}

@keyframes decreaseDiv {
  0%   {height: 500px;}
  100% {height: 75px;}
}

.openCards{
    height: 400px;
    animation-name: increaseCardsDiv;
    animation-duration: 1s;
}

@keyframes increaseCardsDiv {
  0%   {height: 0px;}
  100% {height: 400px;}
}

.closeCards{
    height: 0;
    animation-name: decreaseCardsDiv;
    animation-duration: 1s;
}

@keyframes decreaseCardsDiv {
  0%   {height: 400px;}
  100% {height: 0px;}
}
.arrowDown{
    transform: rotate(180deg);
    animation-name: animationArrowDown;
    animation-duration: 1s;
}

@keyframes animationArrowDown{
    0%   {transform: rotate(0deg);}
    100%  {transform: rotate(180deg);}
}

.arrowUp{
    transform: rotate(0deg);
    animation-name: animationArrowUp;
    animation-duration: 1s;
}

@keyframes animationArrowUp{
    0%   {transform: rotate(180deg);}
    100%  {transform: rotate(0deg);}
}

// .companies-list{
//     border: solid 1px #000000;
//     border-radius: 15px;
//     padding: 5px 20px 5px 20px;
//     height: 75px;
//     transition: height 1s ease-in-out;
    
//     &:hover{
//         .companies-list__container{
//             max-height: 400px;
//             overflow: auto;
//         }
//         height:500px;
//     }

//     &__title{
//         color: #595959;
//     }

//     &__container{
//         overflow: hidden;
//         max-height: 0;
//         transition: max-height 1.5s;  
//     }

//     &__card{
//        margin-bottom: 10px; 
//        border-radius: 15px;
//     }
// }

</style>