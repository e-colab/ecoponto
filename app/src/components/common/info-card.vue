<template>
  <div class="info-card">
    <p>123.000</p>
    <p>lorem ipsum</p>
  </div>
</template>

<script>
export default {
  name: "InfoCard",
};
</script>

<style lang="scss" scoped>
.info-card {
  background-color: #1a4c1680;
  border: none;
  border-radius: 20px;
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding: 12px;

  p {
    margin: 0;
    color: white;
  }

  p:first-child {
    font-size: 3rem;
    font-weight: bold;
  }

  p:last-child {
    font-size: 1.5rem;
  }
}
</style>
