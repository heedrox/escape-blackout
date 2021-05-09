<template>
  <div class="chess">
    <div class="chess-left">
      <div class="chess-board">
        <div v-for="(row) in anArrayOf(8)" :key="`row-${row}`" class="row">
          <div v-for="(col) in anArrayOf(8)" :key="`cell-${row}-${col}`"
               :class="getClasses(row, col)"
               :data-test-id="`cell-${row}-${col}`"
               @click="clickPiece(row, col)">
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
  filter: drop-shadow( 0px 0px 3px #fff )
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

.cell.piece-pb::before {
  background-image: url('./pieces/pb.png');
}
.cell.piece-tb::before {
  background-image: url('./pieces/tb.png');
}
.cell.piece-ab::before {
  background-image: url('./pieces/ab.png');
}
.cell.piece-rb::before {
  background-image: url('./pieces/rb.png');
}
.cell.piece-cb::before {
  background-image: url('./pieces/cb.png');
}
.cell.possible-movement {
  background-color: rgba(0,90,0,0.5);
  outline: solid 1px rgb(0,180,0);
}

.row:nth-child(odd) .cell.possible-movement:nth-child(even) {
  background-color: rgba(0,50,0,0.8)
}
.row:nth-child(even) .cell.possible-movement:nth-child(odd) {
  background-color: rgba(0,50,0,0.8)
}
</style>
<script>
import { POSSIBLE_MOVEMENTS, INITIAL_PIECES } from './chess-constants';
import GetPlayerNumber from '../../lib/get-num-player';

const byCell = (row, col) => (cell) => cell.row === row && cell.col === col;

const isWhitePiece = (row) => row >= 4;
const isBlackPiece = (row) => row < 4;

export default {
  name: 'Chess',
  mounted() {

  },
  data() {
    return {
      'pieceClicked': null
    }
  },
  methods: {
    anArrayOf(length) {
      return [ ...Array(length).keys() ]
    },
    getClasses(row, col) {
      const existantPiece = INITIAL_PIECES[`${row}-${col}`];
      return {
        'cell': true,
        [`piece-${existantPiece}`]: existantPiece !== undefined,
        'possible-movement': (this.pieceClicked) && this.isPossibleMovement(this.pieceClicked.clickedRow, this.pieceClicked.clickedCol, row, col)
      }
    },
    clickPiece(clickedRow, clickedCol) {
      if ((GetPlayerNumber.get() === 1 && isWhitePiece(clickedRow)) ||
          (GetPlayerNumber.get() === 2) && isBlackPiece(clickedRow)) {
        this.pieceClicked = {  clickedRow, clickedCol };
      }
    },
    isPossibleMovement(clickedRow, clickedCol, row, col) {
      const possibleMovements = POSSIBLE_MOVEMENTS[`${clickedRow}-${clickedCol}`]
      return possibleMovements ? possibleMovements.find(byCell(row, col)) !== undefined : false;
    }
  }
}

</script>
