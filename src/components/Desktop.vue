<template>
  <div>
    <desktop-icon text="Network" :icon="require('./puzzle-1/puzzle-1-icon.svg')"
    @click="clickDesktopIcon()"></desktop-icon>
    <desktop-window
        v-if="showDesktopWindow" title="Network" @close="closeDesktopIcon"
        :icon="require('./puzzle-1/puzzle-1-icon.svg')">
    </desktop-window>
    <input v-if="playersTurn" type="button" class="desktop-change-turn-btn" data-test-id="desktop-change-turn-btn" value="Change turn" @click="clickChangeTurnBtn()">
  </div>
</template>
<script>
import DesktopIcon from './DesktopIcon';
import DesktopWindow from './DesktopWindow';
import firebaseUtil from '../lib/firebase/firebase-util';
import GetNumPlayer from '../lib/get-num-player';

export default {
  name: 'desktop',
  components: { DesktopIcon, DesktopWindow },
  computed: {
    playersTurn() {
      return this.globalStatus.turn === GetNumPlayer.get()
    }
  },
  data () {
    return {
      showDesktopWindow: false,
      globalStatus: { },
    }
  },
  firestore() {
    return {
      globalStatus: firebaseUtil.doc('/')
    };
  },
  methods: {
    clickDesktopIcon () {
      this.showDesktopWindow = true;
    },
    closeDesktopIcon () {
      this.showDesktopWindow = false;
    },
    clickChangeTurnBtn () {
      const nextPlayer = GetNumPlayer.get() === 1 ? 2 : 1;
      this.$firestoreRefs.globalStatus.update( { turn: nextPlayer })
    }
  }
};
</script>
