<template>
  <div id="app">
    <Header/>
    <Content msg="Content here"/>
  </div>
</template>

<script>
import Content from './content/Content.vue';
import Header from './header/Header.vue';

export default {
  name: 'app',
  components: {
    Header, Content,
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
