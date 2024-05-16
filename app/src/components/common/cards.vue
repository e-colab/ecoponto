<template>
  <div class="card" v-for="(card, index) in cardContent" :key="card.title">
    <section class="card-content">
      <div class="card-content__wrapper">
        <p class="card-content__wrapper-number">{{ index + 1 }}</p>
        <h2 class="card-content__wrapper-title">
          {{ card.title }}
        </h2>
      </div>

      <p class="card-content__text">
        {{ card.text }}
      </p>
    </section>
  </div>
</template>

<script>
import { CARD_CONTENT } from "../../constants/card-content.js";

export default {
  name: "home-cards",
  data() {
    return {
      cardContent: CARD_CONTENT,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  max-width: 1300px;
  border: solid 1px black;
  border-radius: 20px;
  margin: 0 auto 22px auto;
  padding: 40px 70px;
  height: auto;

  @media only screen and (max-width: 950px) {
    padding: 20px 35px;
  }

  &-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 35px;

    @media only screen and (max-width: 950px) {
      flex-direction: column;
      gap: 0;
    }

    &__wrapper {
      flex: 1;
      width: 50%;
      display: flex;
      align-items: center;
      gap: 40px;

      @media only screen and (max-width: 950px) {
        gap: 20px;
      }

      &-number {
        font-size: 64px;
        font-family: "Roboto Mono", monospace;
        @media only screen and (max-width: 950px) {
          font-size: 30px;
        }
      }
      &-title {
        font-size: 40px;
        text-transform: uppercase;
        font-family: "Roboto Mono", monospace;

        @media only screen and (max-width: 950px) {
          font-size: 25px;
        }
      }
    }
    &__text {
      font-size: 20px;
      flex: 1;

      @media only screen and (max-width: 950px) {
        text-align: justify;
      }
    }
  }
}
</style>
