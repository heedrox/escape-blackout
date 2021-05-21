<template>
  <ul class="chess-movements-list">
    <li><span class="movement-piece piece-ab"></span> <span class="movement-cells white">A3 B2</span> <span
        class="movement-separator"></span> <span class="movement-piece piece-an"></span> <span
        class="movement-cells black">A3 B2</span></li>
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
export default {
  name: 'ChessMovementList'
}
</script>
