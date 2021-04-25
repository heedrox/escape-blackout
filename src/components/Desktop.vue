<template>
  <div class="desktop">
    <desktop-icon class="app" text="Network" :icon="require('./puzzle-1/puzzle-1-icon.svg')"
    @click="clickDesktopIcon('network')"></desktop-icon>
    <desktop-window
        v-if="showDesktopWindow" :title="windowTitle" @close="closeDesktopIcon"
        :icon="require('./puzzle-1/puzzle-1-icon.svg')">
    </desktop-window>
    <desktop-icon class="app" v-if="globalStatus['app-chat']" :text="$t('apps.chat')" :icon="require('./puzzle-2/puzzle-2-icon.svg')"
                  @click="clickDesktopIcon('chat')"></desktop-icon>
    <input v-if="playersTurn" type="button" class="desktop-change-turn-btn" data-test-id="desktop-change-turn-btn" value="Change turn" @click="clickChangeTurnBtn()">
  </div>
</template>
<style>
.desktop {
  display: flex;
}
.desktop .app {
  margin-right: 3vw;
}
</style>
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
      windowTitle: '',
    }
  },
  firestore() {
    return {
      globalStatus: firebaseUtil.doc('/')
    };
  },
  methods: {
    clickDesktopIcon (app) {
      this.showDesktopWindow = true;
      this.windowTitle = this.$t(`apps.${app}`);
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
