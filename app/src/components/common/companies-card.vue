<template>
    <div class="company-card">
        <h4 class="company-card__title">{{ company.empresanome }}</h4>
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
export default {
    name: 'companies-card',
    props: {
        company: {}
    }
}
</script>

<style lang="scss" scoped>
.company-card{
    background-color: #f0e3d5;
    padding: 20px;

    &__title{
        color: #595959;
        margin: 0;
        font-size: 22px;
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