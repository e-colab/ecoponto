<template>
    <header class="header">
        <div class="header-container">
            <img :src="require(`../../images/empresas.png`)" class="header-img" alt="Logo do site: texto Ecolab empresas na cor verde">
            <Links />
        </div>
    </header>
</template>

<script>
import Links from './links.vue'

export default {
    name: 'common-header',
    components:{
        Links
    },
}
</script>

<style scoped lang="scss">
.header{
    height: 100%;
    background-color: #376C33;

    &-container{
        height:100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin: 0 25px 0 25px;

        @media only screen and (max-width: 910px){
            flex-direction: column;
            margin: 0;
        }
    }

    &-img{
        width: 9vw;
        min-width: 80px;
        max-width: 120px;
        height: auto;
    }
}
</style>