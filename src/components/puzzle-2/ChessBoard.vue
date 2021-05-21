<template>
  <div class="chess-board">
    <div v-for="(row) in anArrayOf(8)" :key="`row-${row}`" class="row">
      <div v-for="(col) in anArrayOf(8)" :key="`cell-${row}-${col}`"
           :class="getCellClasses(row, col)"
           :data-test-id="`cell-${row}-${col}`"
           @click="clickCell(row, col)">
      </div>
    </div>
  </div>
</template>
<style>
.chess-board {
  max-width: 80vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 3vh auto auto;
  border: solid 1px #999999;
}

.row {
  display: flex;
  flex-direction: row;
}

.cell {
  width: 10vh;
  height: 10vh;

}

.row:nth-child(odd) .cell:nth-child(even) {
  background-color: #000;
}

.row:nth-child(even) .cell:nth-child(odd) {
  background-color: #000;
}

.row:nth-child(even) .cell:nth-child(even) {
  background-color: #999;
}

.row:nth-child(odd) .cell:nth-child(odd) {
  background-color: #999;
}

.cell::before {
  content: '';
  background-size: cover;
  position: absolute;
  margin-left: -5vh;
  z-index: 10;
  width: 10vh;
  height: 10vh;
  filter: drop-shadow(0px 0px 2px #fff)
}

.cell.possible-movement {
  background-color: rgba(0, 90, 0, 0.5) !important;
  outline: solid 1px rgb(0, 180, 0) !important;
  z-index: 2;
}

.row:nth-child(odd) .cell.possible-movement:nth-child(even) {
  background-color: rgba(0, 50, 0, 0.8)
}

.row:nth-child(even) .cell.possible-movement:nth-child(odd) {
  background-color: rgba(0, 50, 0, 0.8)
}

</style>
<script>
import { POSSIBLE_MOVEMENTS } from './chess-constants';

const byCell = (row, col) => (cell) => cell.row === row && cell.col === col;

export default {
  name: 'ChessBoard',
  emits: [ 'clicked-cell' ],
  props: {
    piecesLocation: {
      type: Object,
      default: () => ({})
    },
    cellOrigin: {
      type: Object,
      default: () => ({})
    },
    cellTarget: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    getCellClasses(row, col) {
      const existantPiece = this.piecesLocation[`${row}-${col}`];
      return {
        'cell': true,
        [`piece-${existantPiece}`]: existantPiece !== undefined,
        'possible-movement': (this.cellOrigin) && (!this.cellTarget) && this.isPossibleMovement(this.cellOrigin.clickedRow, this.cellOrigin.clickedCol, row, col)
      }
    },
    anArrayOf(length) {
      return [...Array(length).keys()]
    },
    isPossibleMovement(clickedRow, clickedCol, row, col) {
      const possibleMovements = POSSIBLE_MOVEMENTS[`${clickedRow}-${clickedCol}`]
      return possibleMovements ? possibleMovements.find(byCell(row, col)) !== undefined : false;
    },
    clickCell(row, col) {
      this.$emit('clicked-cell', { clickedRow: row, clickedCol: col });
    }
  },
}
</script>
