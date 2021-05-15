<template>
  <div class="chess">
    <div class="chess-left">
      <div class="chess-board">
        <div v-for="(row) in anArrayOf(8)" :key="`row-${row}`" class="row">
          <div v-for="(col) in anArrayOf(8)" :key="`cell-${row}-${col}`"
               :class="getClasses(row, col)"
               :data-test-id="`cell-${row}-${col}`"
               @click="clickCell(row, col)">
          </div>
        </div>
      </div>
    </div>
    <div class="chess-movements">
      <ul class="chess-movements-list">
        <li><span class="movement-piece piece-ab"></span> <span class="movement-cells white">A3 B2</span> <span class="movement-separator"></span> <span class="movement-piece piece-an"></span> <span class="movement-cells black">A3 B2</span></li>
        <li><span class="movement-piece piece-ab"></span> <span class="movement-cells black">A3 B2</span> <span class="movement-separator"></span> <span class="movement-piece piece-pn"></span> <span class="movement-cells white">A3 B2</span></li>
        <li><span class="movement-piece piece-ab"></span> <span class="movement-cells white">A3 B2</span> <span class="movement-separator"></span> <span class="movement-piece piece-tn"></span> <span class="movement-cells black">A3 B2</span></li>
        <li><span class="movement-piece piece-ab"></span> <span class="movement-cells black">A3 B2</span> <span class="movement-separator"></span> <span class="movement-piece piece-dn"></span> <span class="movement-cells white">A3 B2</span></li>
        <li><span class="movement-piece piece-ab"></span> <span class="movement-cells white">A3 B2</span> <span class="movement-separator"></span> <span class="movement-piece piece-an"></span> <span class="movement-cells black">A3 B2</span></li>
      </ul>
      <div class="chess-movements-alert" >
        <p>¿Confirmar movimiento?</p>
        <input type="button" class="chess-movements-alert-button" value="Sí" />
        <input type="button" class="chess-movements-alert-button" value="No" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.chess {
  display: flex;
}
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

.chess-left {
  text-align: center;
  width: 65vw;
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
  filter: drop-shadow( 0px 0px 2px #fff )
}

.piece-ab::before {
  background-image: url('./pieces/ab.png');
}

.piece-tb::before {
  background-image: url('./pieces/tb.png');
}

.piece-tn::before {
  background-image: url('./pieces/tn.png');
}

.piece-dn::before {
  background-image: url('./pieces/dn.png');
}

.piece-rn::before {
  background-image: url('./pieces/rn.png');
}

.piece-an::before {
  background-image: url('./pieces/an.png');
}

.piece-pn::before {
  background-image: url('./pieces/pn.png');
}

.piece-pb::before {
  background-image: url('./pieces/pb.png');
}
.piece-tb::before {
  background-image: url('./pieces/tb.png');
}
.piece-ab::before {
  background-image: url('./pieces/ab.png');
}
.piece-rb::before {
  background-image: url('./pieces/rb.png');
}
.piece-cb::before {
  background-image: url('./pieces/cb.png');
}
.cell.possible-movement {
  background-color: rgba(0,90,0,0.5) !important;
  outline: solid 1px rgb(0,180,0) !important;
  z-index: 2;
}

.row:nth-child(odd) .cell.possible-movement:nth-child(even) {
  background-color: rgba(0,50,0,0.8)
}
.row:nth-child(even) .cell.possible-movement:nth-child(odd) {
  background-color: rgba(0,50,0,0.8)
}

.chess-movements {
  width: 35vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.chess-movements-alert {
  border: solid 1px #009900;
  border-radius: 1vw;
  margin: 3vw 3vw 3vw 0;
  text-align: center;
  padding: 2vw;
  box-shadow: 0 0 5px #5cf15c;
  background-color: #0099001f;
}

.chess-movements-alert p {
  white-space: nowrap;
  font-size:2vw;
}
.chess-movements-alert-button {
  color: white;
  padding: 0.3rem 1.3rem;
  background: transparent;
  border: 1px solid #00990055;
  border-radius: 1vw;
  margin-left: 1vw;
  margin-right: 1vw;
  font-size:2vw;
}

.chess-movements-alert-button:hover {
  border-bottom: 1px solid #009900;
  box-shadow: 0 0 5px #5cf15c;
}

ul.chess-movements-list {
  list-style-type: none;
  padding-inline:  0;
  white-space: nowrap;
  margin: 3vw 3vw 3vw 0;
  font-size:2vw;
}
.movement-piece {
  width: 3vw;
  height: 3vw;
  display: inline-block;
  position: relative;
  top: 1vh;
}


.movement-piece::before {
  content: '';
  background-size: cover;
  position: absolute;
  z-index: 10;
  width: 3vw;
  height: 3vw;
  filter: drop-shadow( 0px 0px 1px #fff )
}

.movement-separator {
  color: #009900;
}

.movement-separator::after {
  content: '->';
}

.movement-cells.white {
  color: white;
}

.movement-cells.black {
  color: black;
  font-weight: bold;
  text-shadow: -1px 0  #00990055, 0 1px  #00990055, 1px 0  #00990055, 0 -1px  #00990055, 0px 0px 2vh white;
}

@media (orientation: portrait) {
  .chess {
    flex-direction: column-reverse;
  }
}
</style>
<script>
import { POSSIBLE_MOVEMENTS, INITIAL_PIECES, PIECES } from './chess-constants';
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
      piecesLocation: INITIAL_PIECES,
      'pieceClicked': null
    }
  },
  methods: {
    anArrayOf(length) {
      return [ ...Array(length).keys() ]
    },
    getClasses(row, col) {
      const existantPiece = this.piecesLocation[`${row}-${col}`];
      return {
        'cell': true,
        [`piece-${existantPiece}`]: existantPiece !== undefined,
        'possible-movement': (this.pieceClicked) && this.isPossibleMovement(this.pieceClicked.clickedRow, this.pieceClicked.clickedCol, row, col)
      }
    },
    clickCell(clickedRow, clickedCol) {
      if ((this.pieceClicked && this.pieceClicked.clickedRow === 0 && this.pieceClicked.clickedCol === 3) && (clickedRow === 2 && clickedCol === 3)) {
        this.piecesLocation['0-3'] = undefined;
        this.piecesLocation['2-3'] = PIECES.BLACK_QUEEN;
      }
      if (this.piecesLocation[`${clickedRow}-${clickedCol}`] !== undefined) {
        if ((GetPlayerNumber.get() === 1 && isWhitePiece(clickedRow)) ||
            (GetPlayerNumber.get() === 2) && isBlackPiece(clickedRow)) {
          this.pieceClicked = {  clickedRow, clickedCol };
        }
      }
    },
    isPossibleMovement(clickedRow, clickedCol, row, col) {
      const possibleMovements = POSSIBLE_MOVEMENTS[`${clickedRow}-${clickedCol}`]
      return possibleMovements ? possibleMovements.find(byCell(row, col)) !== undefined : false;
    }
  }
}

</script>
