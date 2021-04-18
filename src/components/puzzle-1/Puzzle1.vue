<template>
  <div>
    <div v-if="showMessage && (myStage === 1)">
      <p>Te doy la bienvenida.</p>
      <input type="button" data-test-id="btn-message-ok" value="OK" @click="hideMessage()"/>
    </div>
    <puzzle-1-stage key="puzzle-stage1" v-if="!showMessage && (myStage === 1)" :initial-status="['XOO', 'OXX', 'XOO']" :persist-status="false" @complete="completeStage(1)"/>
    <div v-if="showMessage && (myStage === 2)">
      <p>Muy bien, ¿eres capaz de enfrentarte a algo más complejo?.</p>
      <input type="button" data-test-id="btn-message-ok" value="OK" @click="hideMessage()"/>
    </div>
    <puzzle-1-stage key="puzzle-stage2" v-if="!showMessage && (myStage === 2)" :initial-status="['XOXO', 'OXOX', 'XOXO', 'OXOX']" :persist-status="false" @complete="completeStage(2)"/>
    <div v-if="showMessage && (myStage === 3)">
      <p>Nada grandioso se ha conseguido solo. Te he descargado la app de chat. ¿Quién habrá al otro lado?</p>
      <input type="button" data-test-id="btn-message-ok" value="OK" @click="hideMessage()"/>
    </div>
    <puzzle-1-stage key="puzzle-stage3" v-if="!showMessage && (myStage === 3)" :initial-status="['XOXO', 'OXOX', 'XOXO', 'OXOX']" :block-handles="blockHandles" :persist-status="true"/>
  </div>
</template>
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
    }
  },
  data() {
    return {
      puzzleStatus: {notloaded: true},
      showMessage: localStorage.getItem('puzzle1-hideMessage') !== 'hidden',
    };
  },
  firestore() {
    return {
      puzzleStatus: firebaseUtil.doc('/puzzle-status/puzzle-1'),
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
    }
  }
};
</script>
