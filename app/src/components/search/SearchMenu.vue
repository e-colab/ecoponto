<template>
  <div class="container">
    <section>
      <h1 class="search-box__title">Busque por</h1>
      <hr class="divider" />
    </section>
    <div class="search-box">
      <search-item-material />
      <hr class="divider" />
      <search-item-reason />
      <hr class="divider" />
      <search-item-quality />
      <companies-list class="search-box__companies" />
    </div>
  </div>
</template>

<script>
import SearchItemMaterial from "./SearchItemMaterial.vue";
import SearchItemReason from "./SearchItemReason.vue";
import SearchItemQuality from "./SearchItemQuality.vue";
import CompaniesList from "./CompaniesList.vue";

export default {
  name: "SearchMenu",
  components: {
    SearchItemMaterial,
    SearchItemReason,
    SearchItemQuality,
    CompaniesList,
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

.search-box {
  width: 100%;
  padding: 0 40px;

  &__title {
    text-align: center;
    font-size: 1.5rem;
  }

  &__companies {
    width: 80%;
    margin: 40px 0;
  }
}

.divider {
  background-color: #000000;
  margin: 25px 0 25px 0;
}

@media only screen and (max-width: 950px) {
  .container {
    flex-direction: column;
  }

  .location-box {
    width: 100%;
  }
}
</style>
