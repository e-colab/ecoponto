<template>
  <section>
    <h2 class="title">Cadastre sua empresa</h2>
    <hr class="divider" />
  </section>
</template>

<script>
export default {
  name: 'common-title',
  props: {
    title: {
      type: String,
      Required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-weight: normal;
  color: #595959;
  margin-bottom: 12px;
}
.divider {
  width: 105px;
  margin: 0;
}
</style>
