<template>
    <page-wrapper>
        <img src="../assets/hero.png">
        <section class="main-content">
            <h1>ecolab empresas</h1>

            <div class="main-content__text">
                <p>
                    O ECOLAB EMPRESAS tem por objetivo intermediar a gestão responsável de materiais e resíduos entre empresas. Desenvolvido para atender às exigências da Política Nacional de Resíduos Sólidos (PNRS), nossa plataforma facilita a interação entre empresas, promovendo a reciclagem, a remanufatura e outras práticas sustentáveis. Buscamos impulsionar a Economia Circular ao oferecer um espaço para empresas destinarem e adquirirem materiais e resíduos por meio da Logística Reversa. 
                </p>

                <p>
                    Ao cadastrar sua empresa, você se une a uma comunidade comprometida com a promoção da circularidade de materiais, tornando-se parte ativa da transformação sustentável nos processos empresariais!
                </p>
            </div>
         </section>
         <section>
            <cards />
         </section>
        <section class="about">
            <Title title="Sobre nós"/>
            <p class="about-text">
                O E-Colab Empresas é uma plataforma web que assessora a <span class="about-text__highlight">gestão dos resíduos sólidos</span> promovendo a sua destinação adequada, incentivando a Economia Circular, através da Logística Reversa. O intuito é permitir o cadastro de empresas e facilitar a interação entre aquelas interessadas em comercializar (compra e venda), doar e/ou coletar os resíduos de produtos/matérias primas. 
            </p>

            <p class="about-text">
                Pertencentes ao <span class="about-text__highlight">Centro de Ciências em Gestão e Tecnologia</span> (CCGT) da Universidade Federal de São Carlos - campus Sorocaba, o grupo reúne pesquisadores e estudantes de diferentes formações e áreas de conhecimento, interessados em proteger o meio ambiente, a partir da disseminação da informação, de ações educativas e de orientação à comunidade em geral alinhadas aos objetivos de desenvolvimento sustentável da ONU. O nosso grupo tem como propósito específico o estudo e desenvolvimento de métodos e práticas para promover a Logística Reversa e a Economia Circular. 
            </p>

            <p class="about-text">
                Nosso projeto contribue, diretamente, com os seguintes ODS:
            </p>
            <div class="about-images">
                <img src="../assets/ods-11.png" />
                <img src="../assets/ods-12.png" />
                <img src="../assets/ods-15.png" />
            </div>
        </section>
    </page-wrapper>
</template>

<script>
import PageWrapper from './PageWrapper.vue';
import Title from '../components/common/title.vue';
import Cards from '../components/home/cards.vue'

export default {
    name: 'AboutPage',
    components: {
        PageWrapper,
        Title,
        Cards
    }
}
</script>

<style lang="scss" scoped>
.main-content{
    background-color: #fef4ea;

    h1 {
        text-transform: uppercase;
        text-align: center;
        margin-top: 100px;
    }

    p {
        text-align: center;
        padding: 0 50px;
    }

    &__text{
        max-width: 1300px;
        margin: 0 auto;
    }
}

.about{
    background-color: #fef4ea;
    min-height: 100vh;
    padding: 40px 80px;
    text-align: justify;

    &-text{
        font-size: 1.5em;
        letter-spacing: .03rem;
        color: #404040;
        margin-bottom: 15px;

        &__highlight{
            background-image:linear-gradient( to bottom, transparent 55%, #c3d2c1 35%);
        }
    }

    &-images{
        display: flex;
        justify-content: center;
        gap: 100px;
        margin-top: 40px;
        flex-wrap: wrap;
    }
}
</style>