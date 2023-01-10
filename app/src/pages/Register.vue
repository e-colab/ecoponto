<template>
  <page-wrapper>
    <div class="register">
      <h2 class="register-title">Cadastre sua empresa</h2>
      <hr class="register-divider" />
    </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from './PageWrapper.vue';

export default {
  name: 'RegisterPage',
  components: {
    PageWrapper,
  },
};
</script>

<style lang="scss" scoped>
.register {
  min-height: 100vh;
  background-color: #fef4ea;
  padding: 40px 60px;

  &-title {
    font-weight: normal;
    color: #595959;
    margin-bottom: 12px;
  }
  &-divider {
    width: 105px;
    margin: 0;
  }
}
</style>
