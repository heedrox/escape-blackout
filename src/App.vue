<template>
  <div id="app">
    <Desktop></Desktop>
  </div>
</template>

<script>
import Desktop from './components/Desktop.vue';

export default {
  name: 'App',
  components: {
    Desktop
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  background-color: #000;
  width: 100vw;
  height: 100vh;
}
#app {
  font-family: Consolas, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  background-color: #000;
  height: 95vh;
  width: 95vw;
  padding-left: 5vw;
  padding-top: 5vh;
  overflow: hidden;
}
</style>
