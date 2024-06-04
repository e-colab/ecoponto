<template>
  <page-wrapper class="background-color">
    <img src="../assets/hero.png" />
    <section class="main-content">
      <h1>ecolab empresas</h1>

      <article class="main-content__text">
        <p>
          O ECOLAB EMPRESAS tem por objetivo intermediar a gestão responsável de
          materiais e resíduos entre empresas. Desenvolvido para atender às
          exigências da Política Nacional de Resíduos Sólidos (PNRS), nossa
          plataforma facilita a interação entre empresas, promovendo a
          reciclagem, a remanufatura e outras práticas sustentáveis. Buscamos
          impulsionar a Economia Circular ao oferecer um espaço para empresas
          destinarem e adquirirem materiais e resíduos por meio da Logística
          Reversa.
        </p>

        <p>
          Ao cadastrar sua empresa, você se une a uma comunidade comprometida
          com a promoção da circularidade de materiais, tornando-se parte ativa
          da transformação sustentável nos processos empresariais!
        </p>
      </article>
    </section>

    <section class="background-color card-wrapper">
      <cards />
    </section>

    <div class="cta-wrapper">
      <button class="cta-button" @click="redirect">
        Encontre as empresas parceiras
      </button>
    </div>

    <!-- <section class="info-content">
      <article class="info-content__card-wrapper">
        <info-card />
        <info-card />
        <info-card />
      </article>
    </section> -->

    <section class="about">
      <Title title="Sobre nós" />
      <article class="about-text">
        O E-Colab Empresas é uma plataforma web que assessora a
        <span class="about-text__highlight">gestão dos resíduos sólidos</span>
        promovendo a sua destinação adequada, incentivando a Economia Circular,
        através da Logística Reversa. O intuito é permitir o cadastro de
        empresas e facilitar a interação entre aquelas interessadas em
        comercializar (compra e venda), doar e/ou coletar os resíduos de
        produtos/matérias primas.
      </article>

      <article class="about-text">
        Pertencentes ao
        <span class="about-text__highlight"
          >Centro de Ciências em Gestão e Tecnologia</span
        >
        (CCGT) da Universidade Federal de São Carlos - campus Sorocaba, o grupo
        reúne pesquisadores e estudantes de diferentes formações e áreas de
        conhecimento, interessados em proteger o meio ambiente, a partir da
        disseminação da informação, de ações educativas e de orientação à
        comunidade em geral alinhadas aos objetivos de desenvolvimento
        sustentável da ONU. O nosso grupo tem como propósito específico o estudo
        e desenvolvimento de métodos e práticas para promover a Logística
        Reversa e a Economia Circular.
      </article>

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
import PageWrapper from "./PageWrapper.vue";
import Title from "../components/common/title.vue";
import Cards from "../components/common/cards.vue";
// import InfoCard from "../components/common/info-card.vue";

export default {
  name: "AboutPage",
  components: {
    PageWrapper,
    Title,
    Cards,
    // InfoCard,
  },
  methods: {
    redirect() {
      this.$router.push("/search");
    },
  },
};
</script>

<style lang="scss" scoped>
:root {
  --cta-bg-color: #376c33;
  --main-bg-color: #f9f9f9;
  --highlight-color: #c3d2c1;
  --text-color: #404040;
  --main-font: "Roboto", sans-serif;
}

.main-content {
  h1 {
    text-transform: uppercase;
    text-align: center;
    margin-top: 100px;
  }

  p {
    text-align: center;
    padding: 0 50px;
  }

  &__text {
    max-width: 1300px;
    margin: 0 auto 120px auto;
  }
}

.card-wrapper {
  padding: 0 15px;
}

.cta {
  &-wrapper {
    margin: 124px auto;
    border: 0.4px solid black;
    border-radius: 20px;
    pointer-events: none;
  }
  &-button {
    background-color: var(--cta-bg-color, #376c33);
    color: white;
    max-width: 700px;
    height: 200px;
    font-family: var(--main-font);
    font-size: 40px;
    border-radius: 20px;
    margin: 39px 56px;
    padding: 0 20px;
    border: none;
    transition: 0.5s;
    pointer-events: auto;
    font-weight: bold;

    &:hover {
      cursor: pointer;
      transition: 0.5s;
      opacity: 80%;
    }
  }
}

.info-content {
  background-color: var(--cta-bg-color, #376c33);
  padding: 100px 20px;

  &__card-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-around;

    @media only screen and (max-width: 950px) {
      flex-direction: column;
      gap: 20px;
    }
  }
}

.about {
  min-height: 100vh;
  padding: 40px 80px;
  text-align: justify;

  &-text {
    padding-top: 10px;
    font-size: 1.5em;
    letter-spacing: 0.03rem;
    color: var(--text-color);
    margin-bottom: 15px;

    &__highlight {
      background-image: linear-gradient(
        to bottom,
        transparent 55%,
        var(--highlight-color) 35%
      );
    }
  }

  &-images {
    display: flex;
    justify-content: center;
    gap: 100px;
    margin-top: 40px;
    flex-wrap: wrap;
  }
}

.background-color {
  background-color: var(--main-bg-color);
}
</style>
