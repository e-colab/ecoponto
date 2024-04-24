<template>
  <div class="card">
    <section class="card-content">
        <section class="card-content__wrapper">
            <p class="card-content__wrapper-number">1</p>
            <h2 class="card-content__wrapper-title">Bem-vindo ao Ecolab Empresas</h2>
        </section>
        
        <p class="card-content__text">Nosso objetivo é facilitar a interação entre empresas interessadas em comercializar, doar e/ou coletar os resíduos de produtos/matérias primas</p>
    </section>
  </div>
</template>

<script>
export default {
    name: 'home-cards'
}
</script>

<style lang="scss">
.card{
    max-width: 1300px;
    border: solid 1px black;
    border-radius: 20px;
    margin: 0 auto;
    padding: 40px 70px;

    &-content{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100px;

        &__wrapper{
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 40px;

            &-number{
                font-size: 64px;
                font-family: "Roboto Mono", monospace;
            }
            &-title{
                font-size: 40px;
                text-transform: uppercase;
                font-family: "Roboto Mono", monospace;
            }
        }       
        &__text{
            font-size: 20px;
            width: 50%;
        }
    }
}

</style>