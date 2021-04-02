<template>
  <div>
    <div class="panel">
      <div class="cell"></div>
      <div class="cell handle handle-1">-</div>
      <div class="cell handle handle-2">-</div>
      <div class="cell handle handle-3">-</div>
      <div class="cell handle handle-a" @click="clickHandle('a')">-</div>
      <div class="cell">X</div>
      <div class="cell">X</div>
      <div class="cell">X</div>
      <div class="cell handle handle-b">-</div>
      <div class="cell">X</div>
      <div class="cell success">O</div>
      <div class="cell">X</div>
      <div class="cell handle handle-c">-</div>
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
const invert = (str) => str.split('').map(invertLetter).join('');

export default {
  name: 'puzzle-1',
  data () {
    return {
      status: ['', '', ''],
    };
  },
  methods: {
    clickHandle(_) {
      this.status[0] = invert(this.status[0]);
    },
  },
};
</script>
