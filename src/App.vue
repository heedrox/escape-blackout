<template>
  <div id="app">
    <desktop-icon text="Network" :icon="require('./components/puzzle-1/puzzle-1-icon.svg')"></desktop-icon>
  </div>
</template>

<script>
import DesktopIcon from './components/DesktopIcon.vue';

export default {
  name: 'App',
  components: {
    DesktopIcon
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Consolas, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  background-color: #000;
  height: 100vh;
  width: 100vw;
  padding-left: 5vw;
  padding-top: 5vh;
  overflow: hidden;
}
</style>
