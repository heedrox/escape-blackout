<template>
  <div class="desktop">
    <desktop-icon class="app" :text="$t(AppsList.NETWORK.title)" :icon="AppsList.NETWORK.icon()"
    @click="clickDesktopIcon(AppsList.NETWORK)"></desktop-icon>
    <desktop-icon class="app" v-if="globalStatus['app-chat']" :text="$t(AppsList.CHAT.title)" :icon="AppsList.CHAT.icon()"
                  @click="clickDesktopIcon(AppsList.CHAT)"></desktop-icon>
    <desktop-icon class="app" v-if="globalStatus['puzzle'] >= 2" :text="$t(AppsList.FILE_EXPLORER.title)" :icon="AppsList.FILE_EXPLORER.icon()"
                  @click="clickDesktopIcon(AppsList.FILE_EXPLORER)"></desktop-icon>
    <desktop-icon class="app" v-if="playersTurn" :text="$t(AppsList.CHANGE_TURN.title)" :icon="AppsList.CHANGE_TURN.icon()"
                  data-test-id="desktop-change-turn-btn"  @click="clickChangeTurnBtn()"></desktop-icon>
    <desktop-window
        v-if="showDesktopWindow" :title="$t(selectedApp.title)" @close="closeDesktopIcon"
        :icon="selectedApp.icon()"
        :component="selectedApp.component">
    </desktop-window>
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
import AppsList from './AppsList';

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
      selectedApp: null,
      AppsList
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
      this.selectedApp = app;
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
