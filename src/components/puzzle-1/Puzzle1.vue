<template>
  <div>
    <puzzle-1-stage key="puzzle-stage1" v-if="myStage === 1" :initial-status="['XOO', 'OXX', 'XOO']" @complete="completeStage(1)"/>
    <puzzle-1-stage key="puzzle-stage2" v-if="myStage === 2" :initial-status="['XOXO', 'OXOX', 'XOXO', 'OXOX']" @complete="completeStage(2)"/>
    <puzzle-1-stage key="puzzle-stage3" v-if="myStage === 3" :initial-status="['XOXO', 'OXOX', 'XOXO', 'OXOX']" :block-handles="blockHandles"/>
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
    }
  }
};
</script>
