<template>
      <page-wrapper>
        <div class="register-material__container">
            <Title title="Cadastro de materiais" />

            <div class="register-material__company-container" v-if="shouldShowCompanyIDInput">
                <span>Qual o código da sua empresa? </span>
                <input v-model="companyID" type="text" class="register-material__company-input"/>
                <button class="register-material__company-cta">Enviar</button>
            </div>

            <div class="register-material__company-container" v-if="companyNotFound">
                <span>A empresa não foi encontrada na nossa base de dados. <router-link to="/register" class="register-material__company-register">Faça seu cadastro!</router-link>
                </span>
            </div>

            <section v-if="companyFound">
                <div class="register-material__company-container">
                    <span>Olá {{ nome_da_empresa }}! Preencha o formulário e cadastre seus materiais</span>
                </div>

                <div v-for="(newMaterial ,index) in materialRegistry" :key="index" class="register-material__registry-container">
                    <div class="register-material__registry-input-container">
                        <span>Material</span>
                        <select
                            v-model="newMaterial.material"
                            class="register-material__registry-input"
                        >
                        <option disabled value="">Selecione uma opção</option>
                        <option v-for="materialType in MATERIAL_TYPE_LIST" :key="materialType" :value="materialType.value">{{ materialType.value }}</option>
                        </select>
                    </div>

                    <div class="register-material__registry-input-container">
                        <span>Objetivo</span>
                        <select
                            v-model="newMaterial.objective"
                            class="register-material__registry-input"
                        >
                        <option disabled value="">Selecione uma opção</option>
                        <option v-for="materialObjective in REASON_TYPE_LIST " :key="materialObjective" :value="materialObjective.value">{{ materialObjective.value }}</option>
                        </select>
                    </div>

                    <div class="register-material__registry-input-container">
                        <span>Qualidade</span>
                        <select
                            v-model="newMaterial.quality"
                            class="register-material__registry-input"
                        >
                        <option disabled value="">Selecione uma opção</option>
                        <option v-for="materialQuality in QUALITY_TYPE_LIST " :key="materialQuality" :value="materialQuality.value">{{ materialQuality.value }}</option>
                        </select>
                    </div>
                </div>
                
                <button class="register-material__company-cta register-material__cta-material" >Salvar materiais</button>
                <button class="register-material__add-material register-material__cta-material" @click="addMaterialRegistry">Adicionar material</button>
            </section>
        </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from './PageWrapper.vue';
import Title from '../components/common/title.vue';
import { MATERIAL_TYPE_LIST } from '../constants/material-type';
import { REASON_TYPE_LIST } from '../constants/reason-type'
import { QUALITY_TYPE_LIST } from '../constants/quality-type'

export default {
    name: 'RegisterMaterialPage',
    components:{
        Title,
        PageWrapper
    },
    data(){
        return{
            companyID: '',
            MATERIAL_TYPE_LIST,
            REASON_TYPE_LIST,
            QUALITY_TYPE_LIST,
            materialRegistry:[
                { material: '',
                  objective: '',
                  quality: '',  
                }
            ]
        }
    },
    computed: {
        shouldShowCompanyIDInput(){
            return true
        },
        companyNotFound(){
            return true
        },
        companyFound(){
            return true
        }
    },
    methods: {
        addMaterialRegistry(){
            this.materialRegistry.push({
                material: '',
                objective: '',
                quality: ''
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.register-material{
    &__container{
        color: #6D6D6D;
        min-height: 100vh;
        background-color: #fef4ea;
        padding: 40px 80px;
    }
    &__company{
        &-container{
            width: 100%;
            margin: 50px 0 50px 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        &-input{
            width: 37%;
            min-width: 100px;
            height: 40px;
            background-color: #fef4ea;
            border-radius: 10px;
            border: 1px #6D6D6D solid;
            padding: 10px;
            margin: 7px 0 10px 0;
        }

        &-cta{
            width: 150px;
            height: 40px;
            background-color: #064801;
            color: #FFFFFF;
            border: none;
            border-radius: 15px;
            text-transform: uppercase;
            font-family: 'Roboto';
            cursor: pointer;

            &:hover{
                opacity: 70%;
            }
        }

        &-register{
            color: #064801;
            cursor: pointer;
            font-weight: bold;
        }
    }
    &__registry{
        &-container{
            display: flex;
            gap: 10px;
            margin: 0 0 30px 0;
        }
        &-input-container{
            display: flex;
            flex-direction: column;
            width: 33%;
        }
        &-input{
            height: 40px;
            background-color: #fef4ea;
            border-radius: 10px;
            border: 1px #6D6D6D solid;
            padding: 10px;
            margin: 7px 0 0 0;
            width: 100%;
        }
    }
    &__cta-material{
        margin: 15px 0 0 7px;
        float: right;
    }
    &__add-material{
        border: none;
        height: 40px;
        background-color: transparent;
        color: #064801;
        text-transform: uppercase;
        cursor: pointer;
        text-decoration: underline;
        font-weight: bold;
        &:hover{
            opacity: 70%;
        }
    }
}
</style>