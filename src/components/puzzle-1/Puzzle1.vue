<template>
  <div>
    <puzzle-1-stage :initial-status="solveStatus"/>
  </div>
</template>
<script>
import Puzzle1Stage from './Puzzle1Stage';

export default {
  name: 'Puzzle1',
  components: { Puzzle1Stage, },
  computed: {
    solveStatus () {
      return this.stage === 2 ?
          ['XOXO', 'OXOX', 'XOXO', 'OXOX'] :
          ['XOO', 'OXX', 'XOO'];
    },
  },
  data() {
    return {
      stage: 1,
    };
  },
};
</script>
