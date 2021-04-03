<template>
  <div>
    <div class="panel">
      <div class="cell"></div>
      <div class="cell handle handle-1" @click="clickHandle('col1')">-</div>
      <div class="cell handle handle-2" @click="clickHandle('col2')">-</div>
      <div class="cell handle handle-3" @click="clickHandle('col3')">-</div>
      <div class="cell handle handle-a" @click="clickHandle('row1')">-</div>
      <div class="cell">X</div>
      <div class="cell">X</div>
      <div class="cell">X</div>
      <div class="cell handle handle-b" @click="clickHandle('row2')">-</div>
      <div class="cell">X</div>
      <div class="cell success">O</div>
      <div class="cell">X</div>
      <div class="cell handle handle-c" @click="clickHandle('row3')">-</div>
      <div class="cell success">O</div>
      <div class="cell">X</div>
      <div class="cell">X</div>
    </div>
  </div>
</template>
<style>
.panel {
  border: solid 1px #999;
  width: 60vw;
  height: 70vh;
  margin-top: 8vh;
  margin-left: 18vw;
  display:flex;
  flex-wrap: wrap;
}
.panel .cell {
  min-width: 25%;
  text-align: center;
  outline: solid 1px #900;
  font-size: 7vh;
  padding-top: 5vh;
}

.panel .success {
  background-color: rgba(00, 99, 00, 0.2);
}
</style>
<script>

const invertLetter = letter => letter === 'X' ? 'O' : 'X';

const invertRow = (str) => str.split('').map(invertLetter).join('');
const invertOnlyOneRow = (numRow) => (row, idx) => idx === (numRow - 1) ? invertRow(row) : row;
const invertByRow = (status, numRow) => status.map(invertOnlyOneRow(numRow));

const invertOnlyOneLetter = numCol =>  (letter, idx) => idx === (numCol-1) ? invertLetter(letter) : letter;
const invertOneColInRow = numCol => (row) => row.split('').map(invertOnlyOneLetter(numCol)).join('')
const invertByCol = (status, numCol) => status.map(invertOneColInRow(numCol));


export default {
  name: 'puzzle-1',
  data () {
    return {
      status: ['XXX', 'XXX', 'XXX'],
    };
  },
  methods: {
    clickHandle(handle) {
      if (handle === 'row1') {
        this.status = invertByRow(this.status, 1);
      } else if (handle === 'row2') {
        this.status = invertByRow(this.status, 2);
      } else if (handle === 'row3') {
        this.status = invertByRow(this.status, 3);
      } else if (handle === 'col1') {
        this.status = invertByCol(this.status, 1);
      } else if (handle === 'col2') {
        this.status = invertByCol(this.status, 2);
      } else if (handle === 'col3') {
        this.status = invertByCol(this.status, 3);
      }
    },
  },
};
</script>
