<template>
  <div class="page">
    <Header class="page-header" />
    <slot />
    <Footer class="page-footer" />
  </div>
</template>

<script>
import Header from '../components/common/header/Header';
import Footer from '../components/common/footer';

export default {
  name: 'page-wrapper',
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &-header {
    height: 65px;
    @media only screen and (max-width: 910px){
      height: 220px;
    }
  }
  &-footer {
    height: 30vh;
    margin-top: auto;
  }
}
</style>
