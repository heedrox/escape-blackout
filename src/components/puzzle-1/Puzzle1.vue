<template>
  <div>
    <puzzle-1-stage key="puzzleEasy" v-if="myStage === 1" :initial-status="['XOO', 'OXX', 'XOO']" @complete="completeStage(1)"/>
    <puzzle-1-stage key="puzzleMedium" v-if="myStage === 2" :initial-status="['XOXO', 'OXOX', 'XOXO', 'OXOX']" @complete="completeStage(2)"/>
    <puzzle-1-stage key="puzzleHard" v-if="myStage === 3" :initial-status="['XOXO', 'OXOX', 'XOXO', 'OXOX']" block-handles="COL"/>
  </div>
</template>
<script>
import Puzzle1Stage from './Puzzle1Stage';
import firebaseUtil from '../../lib/firebase/firebase-util';
import GetNumPlayer from '../../lib/get-num-player';

export default {
  name: 'Puzzle1',
  components: { Puzzle1Stage, },
  computed: {
    myStage () {
      const numPlayer = GetNumPlayer.get();
      if (this.puzzleStatus.notloaded) return null;
      const theStage =  this.puzzleStatus[`stagePlayer${numPlayer}`];
      return theStage ? theStage : 1;
    },
  },
  data() {
    return {
      puzzleStatus: { notloaded: true },
    };
  },
  firestore() {
    return {
      puzzleStatus: firebaseUtil.doc('/puzzle-status/puzzle-1'),
    };
  },
  methods: {
    completeStage(numStage) {
      this.$firestoreRefs.puzzleStatus.update( { stagePlayer1: numStage + 1 });
    }
  }
};
</script>
