<template>
  <div>
    <puzzle-1-stage :initial-status="solveStatus"/>
  </div>
</template>
<script>
import Puzzle1Stage from './Puzzle1Stage';
import firebaseUtil from '../../lib/firebase/firebase-util';

export default {
  name: 'Puzzle1',
  components: { Puzzle1Stage, },
  computed: {
    solveStatus () {
      return this.puzzleStatus.stagePlayer1 === 2 ?
          ['XOXO', 'OXOX', 'XOXO', 'OXOX'] :
          ['XOO', 'OXX', 'XOO'];
    },
  },
  data() {
    return {
      puzzleStatus: { stagePlayer1: 1 },
    };
  },
  firestore() {
    return {
      puzzleStatus: firebaseUtil.doc('/puzzle-status/puzzle-1'),
    };
  },
};
</script>
