<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import 'style/universal.css';
#app {
  height: 100vh;
}
@font-face{
  font-family: 'Roboto';
  src: local("Roboto-Regular"), url(./fonts/Roboto-Regular.ttf)
}
</style>
