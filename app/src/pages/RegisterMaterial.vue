<template>
      <page-wrapper>
        <div class="register-material__container">
            <Title title="Cadastro de materiais" />

            <div class="register-material__company-container" v-if="shouldShowCompanyIDInput">
                <span>Qual o CNPJ da sua empresa? </span>
                <input v-model="companyID" type="text" class="register-material__company-input" v-mask="'##.###.###/####-##'"/>
                <button class="register-material__company-cta" @click="findBusinessActionCall">Enviar</button>
            </div>

            <div class="register-material__company-container" v-if="!companyFound && companySearch">
                <span>A empresa não foi encontrada na nossa base de dados. <router-link to="/register" class="register-material__company-register">Faça seu cadastro!</router-link>
                </span>
            </div>

            <section v-if="companyFound && getCompanyMaterialRegistryStatus !== 'OK'">
                <div class="register-material__company-container">
                    <span>Olá {{ companyName }}! Preencha o formulário e cadastre seus materiais</span>
                </div>

                <div v-for="(newMaterial ,index) in materialRegistry" :key="index" class="register-material__registry-container">
                    <div class="register-material__registry-inputs-container">
                        <div class="register-material__registry-input-container">
                            <span>Nome do produto</span>
                            <input v-model="newMaterial.name" type="text" class="register-material__registry-input"/>
                        </div>

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
                    </div>
                    <div class="register-material__registry-inputs-container">
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
                    <button @click="removeMaterialRegistry" v-if="index != 0" class="register-material__registry-remove">remover material</button>
                    <hr class="register-material__registry-divider"/>
                </div>
                
                <button class="register-material__company-cta register-material__cta-material" @click="saveMaterialRegistry">Salvar materiais</button>
                <button class="register-material__add-material register-material__cta-material" @click="addMaterialRegistry">Adicionar material</button>
            </section>

            <section v-if="getCompanyMaterialRegistryStatus === 'OK'" class="register-material__company-container">Materiais cadastrados com sucesso!</section>
        </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from './PageWrapper.vue';
import Title from '../components/common/title.vue';
import { MATERIAL_TYPE_LIST } from '../constants/material-type';
import { REASON_TYPE_LIST } from '../constants/reason-type'
import { QUALITY_TYPE_LIST } from '../constants/quality-type'
import { mapActions, mapGetters, mapMutations } from 'vuex';

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
                {
                    name: '',
                    material: '',
                    objective: '',
                    quality: '',  
                }
            ],
            companySearch: false,
        }
    },
    computed: {
        ...mapGetters(['getCompanyMaterialRegistry', 'getCompanyMaterialRegistryStatus']),
        shouldShowCompanyIDInput(){
            return Object.keys(this.getCompanyMaterialRegistry).length === 0
        },
        companyFound(){
            return Object.keys(this.getCompanyMaterialRegistry).length > 0
        },
        companyName(){
            return this.getCompanyMaterialRegistry[0].nome
        },
    },
    methods: {
        ...mapActions(['findBusiness', 'registerMaterial']),
        ...mapMutations(['setCompanyMaterialRegistry', 'setCompanyMaterialRegistryStatus']),

        addMaterialRegistry(){
            this.materialRegistry.push({
                name: '',
                material: '',
                objective: '',
                quality: '',
            })
        },
        removeMaterialRegistry(){
            this.materialRegistry.pop()
        },
        saveMaterialRegistry(){
            // this.materialRegistry = this.materialRegistry.map(obj => ({...obj, companyID: this.companyID}))
            console.log('aqui', {...this.materialRegistry, companyID: this.getCompanyMaterialRegistry[0].cnpj})
            this.registerMaterial([{...this.materialRegistry, companyID: this.getCompanyMaterialRegistry[0].cnpj}])
        },
        findBusinessActionCall(){
            const payload = {
                cnpj: this.companyID.replaceAll('.', '').replaceAll('/', '').replaceAll('-', '')
            }
            this.findBusiness(payload)
            this.companySearch = true
        }
    },
    watch: {
        $route(){
            this.setCompanyMaterialRegistry({})
            this.setCompanyMaterialRegistryStatus('')
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

        @media only screen and (max-width: 650px){
            padding: 40px 20px;
        }
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

            @media only screen and (max-width: 650px){
                width: 100%;
            }
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
            margin: 0px auto 30px auto;
            flex-direction: column;
            width: 80%;

            @media only screen and (max-width: 650px){
                width: 100%;
            }
        }
        &-inputs-container{
            display: flex;
            gap: 10px;

            @media only screen and (max-width: 650px){
                flex-direction: column;
            }
        }
        &-input-container{
            display: flex;
            flex-direction: column;
            width: 50%;

            @media only screen and (max-width: 650px){
                width: 100%;
            }
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
        &-divider{
            width: 80%;
            background-color: gray;
            opacity: 50%;
            margin: 30px auto 30px auto;
        }
        &-remove{
            // background-color: #a1b295;
            background-color: #bfd1b2;
            padding: 10px;
            width: 150px;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            margin: 20px auto 0 auto;
            color: #383838;
            &:hover{
                text-decoration: underline;
            }
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