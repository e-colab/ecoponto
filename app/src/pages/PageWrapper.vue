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
  &-header {
    height: 65px;
  }
  &-footer {
    height: 30vh;
  }
}
</style>
