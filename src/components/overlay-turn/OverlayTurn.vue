<template>
  <div v-if="!playersTurn" class="puzzle1-turn-overlay" data-test-id="turn-overlay" @click="clickOverlay()">
    <div class="terminal-text" v-if="showOverlayMessage">
      {{ $t('global.not-your-turn') }}
    </div>
  </div>
</template>
<style>
.puzzle1-turn-overlay {
  height: 95vh;
  background-color: rgba(66,66,66,0.25);
  position: fixed;
  width: 95vw;
  top: 12vh;
  z-index: 100;
}

</style>
<script>
import GetNumPlayer from '../../lib/get-num-player';
import firebaseUtil from '../../lib/firebase/firebase-util';

export default {
  name: 'overlay-turn',
  data() {
    return {
      globalStatus: {},
      showOverlayMessage: false,
    };
  },
  computed: {
    playersTurn() {
      return this.globalStatus.turn === GetNumPlayer.get()
    }
  },
  firestore() {
    return {
      globalStatus: firebaseUtil.doc('/')
    };
  },
  methods: {
    clickOverlay() {
      this.showOverlayMessage = true;
      setTimeout(() => {
        this.showOverlayMessage = false;
      }, 5000);
    }
  }
}
</script>
