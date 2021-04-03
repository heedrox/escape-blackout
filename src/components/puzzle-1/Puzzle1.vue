<template>
  <div>
    <div class="panel">
      <div class="cell"></div>
      <div class="cell handle handle-1" @click="clickHandle('col1')">-</div>
      <div class="cell handle handle-2" @click="clickHandle('col2')">-</div>
      <div class="cell handle handle-3" @click="clickHandle('col3')">-</div>
      <div v-if="numTransistors >= 4" class="cell handle handle-4" @click="clickHandle('col4')">-</div>
      <div class="cell handle handle-a" @click="clickHandle('row1')">-</div>
      <div class="cell transistor" :class="{ success : isSuccess(0, 0) }">{{ status[0][0] }}</div>
      <div class="cell transistor" :class="{ success : isSuccess(0, 1) }">{{ status[0][1] }}</div>
      <div class="cell transistor" :class="{ success : isSuccess(0, 2) }">{{ status[0][2] }}</div>
      <div v-if="numTransistors >= 4" class="cell transistor" :class="{ success : isSuccess(0, 3) }">{{ status[0][3] }}</div>
      <div class="cell handle handle-b" @click="clickHandle('row2')">-</div>
      <div class="cell transistor" :class="{ success : isSuccess(1, 0) }">{{ status[1][0] }}</div>
      <div class="cell transistor" :class="{ success : isSuccess(1, 1) }">{{ status[1][1] }}</div>
      <div class="cell transistor" :class="{ success : isSuccess(1, 2) }">{{ status[1][2] }}</div>
      <div v-if="numTransistors >= 4" class="cell transistor" :class="{ success : isSuccess(0, 3) }">{{ status[0][3] }}</div>
      <div class="cell handle handle-c" @click="clickHandle('row3')">-</div>
      <div class="cell transistor" :class="{ success : isSuccess(2, 0) }">{{ status[2][0] }}</div>
      <div class="cell transistor" :class="{ success : isSuccess(2, 1) }">{{ status[2][1] }}</div>
      <div class="cell transistor" :class="{ success : isSuccess(2, 2) }">{{ status[2][2] }}</div>
      <div v-if="numTransistors >= 4" class="cell transistor" :class="{ success : isSuccess(0, 3) }">{{ status[0][3] }}</div>
      <div v-if="numTransistors >= 4" class="cell handle handle-d" @click="clickHandle('row4')">-</div>
      <div v-if="numTransistors >= 4" class="cell transistor" :class="{ success : isSuccess(0, 3) }">{{ status[0][3] }}</div>
      <div v-if="numTransistors >= 4" class="cell transistor" :class="{ success : isSuccess(0, 3) }">{{ status[0][3] }}</div>
      <div v-if="numTransistors >= 4" class="cell transistor" :class="{ success : isSuccess(0, 3) }">{{ status[0][3] }}</div>
      <div v-if="numTransistors >= 4" class="cell transistor" :class="{ success : isSuccess(0, 3) }">{{ status[0][3] }}</div>

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
import Handlers from './Handlers';

export default {
  name: 'puzzle-1',
  props: {
    initialStatus: {
      type: Array,
      default: () => ['XXX', 'XXX', 'XXX'],
    },
  },
  computed: {
    numTransistors () {
      return this.initialStatus.length;
    },
  },
  data () {
    return {
      status: [],
    };
  },
  created() {
    this.status = this.initialStatus;
  },
  methods: {
    clickHandle(handle) {
      this.status = Handlers.execute(this.status, handle);
    },
    isSuccess(numRow, numCol) {
      return this.status[numRow].split('')[numCol] === 'O';
    }
  },
};
</script>
