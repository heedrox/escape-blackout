<template>
  <div class="puzzle1">
    <div v-if="!playersTurn" class="puzzle1-turn-overlay" data-test-id="turn-overlay" @click="clickOverlay()">
      <div class="terminal-text" v-if="showOverlayMessage">
        {{ $t('global.not-your-turn') }}
      </div>
    </div>
    <div v-if="showMessage && (myStage === 1)" class="terminal-text">
      <p class="typing">{{ $t('puzzle1.intro-message-1') }}</p>
      <input class="terminal-button terminal-text" type="button" data-test-id="btn-message-ok" value="OK" @click="hideMessage()"/>
    </div>
    <puzzle-1-stage key="puzzle-stage1" v-if="!showMessage && (myStage === 1)" :initial-status="['XOO', 'OXX', 'XOO']" :persist-status="false" @complete="completeStage(1)"/>
    <div v-if="showMessage && (myStage === 2)"  class="terminal-text">
      <p>{{ $t('puzzle1.intro-message-2') }}</p>
      <input type="button" class="terminal-button terminal-text" data-test-id="btn-message-ok" value="OK" @click="hideMessage()"/>
    </div>
    <puzzle-1-stage key="puzzle-stage2" v-if="!showMessage && (myStage === 2)" :initial-status="['XOXO', 'OXOX', 'XOXO', 'OXOX']" :persist-status="false" @complete="completeStage(2)"/>
    <div v-if="showMessage && (myStage === 3)"  class="terminal-text">
      <p>{{ $t('puzzle1.intro-message-3') }}</p>
      <input class="terminal-button terminal-text" type="button" data-test-id="btn-message-ok" value="OK" @click="hideMessage()" />
    </div>
    <puzzle-1-stage key="puzzle-stage3" v-if="!showMessage && (myStage === 3)" :initial-status="['XOXO', 'OXOX', 'XOXO', 'OXOX']" :block-handles="blockHandles" :persist-status="true" @complete="completeStage(3) "/>
  </div>
</template>
<style scoped>
.puzzle1-turn-overlay {
  height: 95vh;
  background-color: rgba(66,66,66,0.25);
  position: fixed;
  width: 95vw;
  top: 12vh;
  z-index: 100;
}


.typing {
  position: relative;
  width: fit-content;

}

.terminal-text{
  padding: 5vw;
  font: 1.2rem Inconsolata, monospace;
  text-shadow: 0 0 20px #c8c8c8;
}

.typing::after {
   content: "|";
   position: absolute;
   right: 0;
   width: 100%;
   color: #009900;
   background: #000;
   animation: typing 4s steps(21) forwards,
   caret 1s infinite;
}


.terminal-button {
  padding: 0.3rem 1.3rem;
  background: transparent;
  border: none;
  color: #fff;
}

.terminal-button:hover {
  border-bottom: 1px solid #009900;
  box-shadow: 0 0 5px #5cf15c;
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
import Puzzle1MessagePersistor from './Puzzle1MessagePersistor';

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
      showMessage: !Puzzle1MessagePersistor.isSetHidden(),
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
      if (numStage < 3) {
        if (numStage === 2) {
          this.$firestoreRefs.globalStatus.update({ 'app-chat': true})
        }
        this.increaseStage(numStage);
        Puzzle1MessagePersistor.clear();
        this.showMessage = true;
      } else {
        this.$firestoreRefs.globalStatus.update({ puzzle: 2})
      }
    },
    increaseStage(numStage) {
      const key = `stagePlayer${GetNumPlayer.get()}`;
      this.$firestoreRefs.puzzleStatus.update({[key]: numStage + 1});
    },
    hideMessage() {
      this.showMessage = false;
      Puzzle1MessagePersistor.setHidden();
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
