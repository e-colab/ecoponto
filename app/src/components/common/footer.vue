<template>
    <footer class="footer">
        <div class="footer-content">
            <p class="footer-content__email footer-content__subtext">e-colab@ufscar.br</p>
            <p class="footer-content__university">Universidade Federal de São Carlos</p>
            <p class="footer-content__address footer-content__subtext">Rod. João Leme dos Santos KM 110 - SP-264</p>
            <p class="footer-content__cep footer-content__subtext">18052-780, Sorocaba, Brasil</p>
        </div>
    </footer>
</template>

<script>
export default {
    name: "common-footer"
}
</script>

<style lang="scss" scoped>
.footer{
    height: 100%;
    background-color: #042C00;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    text-align: center;

   &-content{
    
    &__email{
        margin-bottom: 40px;
    }
    &__university{
        margin-bottom: 10px;
    }
    &__address, &__cep{
        margin-top: 2px;
        margin-bottom: 0;
    }

    &__subtext{
        color: #DEDEDE;
    }
   }
}
</style>