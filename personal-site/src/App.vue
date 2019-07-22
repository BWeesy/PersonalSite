<template>
  <div id="app">
    <Header/>
    <router-view />
  </div>
</template>

<script>

import Header from './header/Header.vue';

export default {
  name: 'app',
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import "shared/colour-palette.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-colour;
}
html,
body  {
  height: 100%;
  margin : 0px;
  background-color: $background_colour;
}
</style>
