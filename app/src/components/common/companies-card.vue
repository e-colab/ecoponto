<template>
    <div class="company-card">
        <div class="company-card__container-title">
            <h4 class="company-card__title">{{ company.empresanome }}</h4>
            <button class="company-card__button" @click="sendToMap">ver empresa no mapa</button>
        </div>
        <p class="company-card__telephone">({{ company.telefone }})</p>
        <p class="company-card__address">{{ company.endereco }}, {{ company.numeroendereco }} - {{ company.bairro }}, {{ company.cidade }}</p>
        <p class="company-card__material-title">Materiais:</p>
        <div v-for="material in company.materiais" :key="material">
            <ul class="company-card__material">
                <li><strong>Produto:</strong> {{ material.materialnome }}</li>
                <li><strong>Material:</strong> {{ material.descricao }}</li>
                <li><strong>Objetivo:</strong> {{ material.objetivo }}</li>
                <li><strong>Qualidade:</strong> {{ material.qualidade }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: 'companies-card',
    props: {
        company: {}
    },
    methods: {
        ...mapMutations(['setCompanyCoords']),
        sendToMap() {
            this.setCompanyCoords({lat: this.company.lat, lon: this.company.long})
        }
    }
}
</script>

<style lang="scss" scoped>
.company-card{
    background-color: #f0e3d5;
    padding: 20px;

    &__container-title{
        display: flex;
        gap: 10px;
    }
    &__title{
        color: #595959;
        margin: 0;
        font-size: 22px;
    }
    &__button{
        border-radius: 12px;
        border: 1px solid #595959;
        background-color: transparent;
        color: #595959;
        &:hover{
            border: 1px solid #064801;
            background-color: transparent;
            color: #064801;
            cursor: pointer;
        }
    }
    &__address, &__telephone, &__material-title {
        margin: 1px 0;
        color: #6d6d6d;
        font-size: 16px;
    }
    &__material-title{
        margin-top: 4px;
    }
    &__material{
        margin: 0 0 10px 0;
        color: #6d6d6d;
    }
}
</style>