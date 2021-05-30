<template>
  <ul class="chess-movements-list">
    <li v-for="movement in movements" :key="JSON.stringify(movement)" data-test-id="chess-movement">
      <span data-test-id="chess-movement-0-left-piece" :class="classesForMovementPiece(movement)"></span>
      <span data-test-id="chess-movement-0-left-text" class="movement-cells white">{{ textForMovement(movement) }}</span>
      <span class="movement-separator"></span>
    </li>
    <!--<li data-test-id="chess-movement"><span data-test-id="chess-movement-0-left-piece" class="movement-piece piece-ab"></span> <span  data-test-id="chess-movement-0-left-text" class="movement-cells white">A3 B2</span> <span
        class="movement-separator"></span> <span data-test-id="chess-movement-0-right-piece"  class="movement-piece piece-an"></span> <span
        class="movement-cells black" data-test-id="chess-movement-0-right-text">A3 B2</span></li>
    <li><span class="movement-piece piece-ab"></span> <span class="movement-cells black">A3 B2</span> <span
        class="movement-separator"></span> <span class="movement-piece piece-pn"></span> <span
        class="movement-cells white">A3 B2</span></li>
    <li><span class="movement-piece piece-ab"></span> <span class="movement-cells white">A3 B2</span> <span
        class="movement-separator"></span> <span class="movement-piece piece-tn"></span> <span
        class="movement-cells black">A3 B2</span></li>
    <li><span class="movement-piece piece-ab"></span> <span class="movement-cells black">A3 B2</span> <span
        class="movement-separator"></span> <span class="movement-piece piece-dn"></span> <span
        class="movement-cells white">A3 B2</span></li>
    <li><span class="movement-piece piece-ab"></span> <span class="movement-cells white">A3 B2</span> <span
        class="movement-separator"></span> <span class="movement-piece piece-an"></span> <span
        class="movement-cells black">A3 B2</span></li>
        -->
  </ul>
</template>
<style>
ul.chess-movements-list {
  list-style-type: none;
  padding-inline: 0;
  white-space: nowrap;
  margin: 3vw 3vw 3vw 0;
  font-size: 2vw;
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
  filter: drop-shadow(0px 0px 1px #fff)
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
  text-shadow: -1px 0 #00990055, 0 1px #00990055, 1px 0 #00990055, 0 -1px #00990055, 0px 0px 2vh white;
}
</style>
<script>

const COL_NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const ROW_NAMES = ['8', '7', '6', '5', '4', '3', '2', '1'];
const textForRow = (row) => ROW_NAMES[row];
const textForCol = (col) => COL_NAMES[col];
const textForCell = (cell) => `${textForCol(cell.col)}${textForRow(cell.row)}`;

export default {
  name: 'ChessMovementList',
  props: {
    movements: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    classesForMovementPiece: (movement) => ['movement-piece', `piece-${movement.piece}`],
    textForMovement: (movement) => textForCell(movement.cellTarget)
  },
};
</script>
