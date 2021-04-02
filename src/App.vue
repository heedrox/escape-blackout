<template>
  <div id="app">
    <Desktop v-if="state === 'LOGGED_IN'"></Desktop>
    <div v-if="state === 'ERROR'">Se encontró un error haciendo login :(</div>
  </div>
</template>

<script>
import Desktop from './components/Desktop.vue';
import firebaseUtil from './lib/firebase/firebase-util';

const STATES = {
  INIT: 'INIT',
  LOGGED_IN: 'LOGGED_IN',
  ERROR: 'ERROR',
};

export default {
  name: 'App',
  components: {
    Desktop
  },
  data () {
    return {
      state: STATES.INIT,
    };
  },
  async created() {
    try {
      await firebaseUtil.login();
      this.state = STATES.LOGGED_IN;
    } catch (error) {
      this.state = STATES.ERROR;
    }
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
