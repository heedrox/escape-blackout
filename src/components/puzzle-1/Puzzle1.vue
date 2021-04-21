<template>
  <div class="puzzle1">
    <div v-if="!playersTurn" class="puzzle1-turn-overlay" data-test-id="turn-overlay" @click="clickOverlay()">
      <div v-if="showOverlayMessage">
        {{ $t('global.not-your-turn') }}
      </div>
    </div>
    <div v-if="showMessage && (myStage === 1)" class="puzzle1-message">
      <p class="typing">{{ $t('puzzle1.intro-message-1') }}</p>
      <input type="button" data-test-id="btn-message-ok" value="OK" @click="hideMessage()"/>
    </div>
    <puzzle-1-stage key="puzzle-stage1" v-if="!showMessage && (myStage === 1)" :initial-status="['XOO', 'OXX', 'XOO']" :persist-status="false" @complete="completeStage(1)"/>
    <div v-if="showMessage && (myStage === 2)">
      <p>{{ $t('puzzle1.intro-message-2') }}</p>
      <input type="button" data-test-id="btn-message-ok" value="OK" @click="hideMessage()"/>
    </div>
    <puzzle-1-stage key="puzzle-stage2" v-if="!showMessage && (myStage === 2)" :initial-status="['XOXO', 'OXOX', 'XOXO', 'OXOX']" :persist-status="false" @complete="completeStage(2)"/>
    <div v-if="showMessage && (myStage === 3)">
      <p>{{ $t('puzzle1.intro-message-3') }}</p>
      <input type="button" data-test-id="btn-message-ok" value="OK" @click="hideMessage()"/>
    </div>
    <puzzle-1-stage key="puzzle-stage3" v-if="!showMessage && (myStage === 3)" :initial-status="['XOXO', 'OXOX', 'XOXO', 'OXOX']" :block-handles="blockHandles" :persist-status="true"/>
  </div>
</template>
<style scoped>
.puzzle1-turn-overlay {
  height: 95vh;
  background-color: rgba(66,66,66,0.25);
  position: fixed;
  width: 95vw;
  top: 12vh;
}

.puzzle1-message {
  padding: 5vw;
}

.typing {
  position: relative;
  width: fit-content;
}

.typing::after {
   content: "|";
   position: absolute;
   right: 0;
   width: 100%;
   color: #009900;
   background: #000000;
   animation: typing 4s steps(21) forwards,
   caret 1s infinite;
}

@keyframes typing {
  to { width: 0 }
}
@keyframes caret {
  50% { color: transparent }
}
</style>
<script>
import Puzzle1Stage from './Puzzle1Stage';
import firebaseUtil from '../../lib/firebase/firebase-util';
import GetNumPlayer from '../../lib/get-num-player';

export default {
  name: 'Puzzle1',
  components: {Puzzle1Stage,},
  computed: {
    myStage() {
      const numPlayer = GetNumPlayer.get();
      if (this.puzzleStatus.notloaded) return null;
      const theStage = this.puzzleStatus[`stagePlayer${numPlayer}`];
      return theStage ? theStage : 1;
    },
    blockHandles() {
      return GetNumPlayer.get() === 1 ? 'COL' : 'ROW';
    },
    playersTurn() {
      return this.globalStatus.turn === GetNumPlayer.get()
    }
  },
  data() {
    return {
      puzzleStatus: { notloaded: true },
      globalStatus: {},
      showMessage: localStorage.getItem('puzzle1-hideMessage') !== 'hidden',
      showOverlayMessage: false,
    };
  },
  firestore() {
    return {
      puzzleStatus: firebaseUtil.doc('/puzzle-status/puzzle-1'),
      globalStatus: firebaseUtil.doc('/')
    };
  },
  methods: {
    completeStage(numStage) {
      const key = `stagePlayer${GetNumPlayer.get()}`;
      this.$firestoreRefs.puzzleStatus.update({[key]: numStage + 1});
      localStorage.removeItem('puzzle1-hideMessage');
      this.showMessage = true;
    },
    hideMessage() {
      this.showMessage = false;
      localStorage.setItem('puzzle1-hideMessage', 'hidden');
    },
    clickOverlay() {
      this.showOverlayMessage = true;
      setTimeout(() => {
        this.showOverlayMessage = false;
      }, 5000);
    }
  }
};
</script>
