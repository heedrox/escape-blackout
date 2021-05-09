<template>
  <div class="chess">
    <div class="chess-left">
      <div class="chess-board">
        <div v-for="(row) in anArrayOf(8)" :key="`row-${row}`" class="row">
          <div v-for="(col) in anArrayOf(8)" :key="`cell-${row}-${col}`" :class="getClasses(row, col)" :data-test-id="`cell-${row}-${col}`">
          </div>
        </div>
      </div>
    </div>
    <div class="chess-movements">
      movements
    </div>
  </div>
</template>
<style scoped>
.chess {
  display: flex;
}
.chess-board {
  width: 70vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.row {
  display: flex;
  flex-direction: row;
}

.cell {
  width: 10vh;
  height: 10vh;

}

.chess-left {
  text-align: center;
  width: 70vw;
}

.chess-board {
  max-width: 80vh;
  background-color: #999;
  margin: 3vh auto auto;
  border: solid 1px #999999;
}
.row:nth-child(odd) .cell:nth-child(even) {
  background-color: #000;
}
.row:nth-child(even) .cell:nth-child(odd) {
  background-color: #000;
}

.cell::before {
  content: '';
  background-size: cover;
  position: absolute;
  margin-left: -5vh;
  z-index: 10;
  width: 10vh;
  height: 10vh;
}

.cell.piece-ab::before {
  background-image: url('./pieces/ab.png');
}

.cell.piece-tb::before {
  background-image: url('./pieces/tb.png');
}

.cell.piece-tn::before {
  background-image: url('./pieces/tn.png');
}

.cell.piece-dn::before {
  background-image: url('./pieces/dn.png');
}

.cell.piece-rn::before {
  background-image: url('./pieces/rn.png');
}

.cell.piece-an::before {
  background-image: url('./pieces/an.png');
}

.cell.piece-pn::before {
  background-image: url('./pieces/pn.png');
}

.cell.movement {
  background-color: rgba(0,90,0,0.5)
}

.row:nth-child(odd) .cell.movement:nth-child(even) {
  background-color: rgba(0,50,0,0.8)
}
.row:nth-child(even) .cell.movement:nth-child(odd) {
  background-color: rgba(0,50,0,0.8)
}
</style>
<script>

const INITIAL_PIECES = {
  '0-0': 'piece-tn',
  '0-3': 'piece-dn',
  '0-4': 'piece-rn',
  '1-1': 'piece-an',
  '1-7': 'piece-an',
  '3-0': 'piece-pn',
  '3-3': 'piece-pn',
};

export default {
  name: 'Chess',
  mounted() {

  },
  methods: {
    anArrayOf(length) {
      return [ ...Array(length).keys() ]
    },
    getClasses(row, col) {
      const existantPiece = INITIAL_PIECES[`${row}-${col}`];
      return existantPiece ? ['cell', existantPiece] : ['cell'];
    }
  }
}
</script>
