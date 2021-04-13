<template>
  <div>
    <div :class="[ 'panel', `panel-${numTransistors}` ]" v-if="isLoaded">
      <div class="cell" :class="{ }"></div>
      <div class="cell handle handle-col1" @click="clickHandle('col1')"><span v-if="blockHandles!=='COL'">{{ handles['col1'] }}</span></div>
      <div class="cell handle handle-col2" @click="clickHandle('col2')"><span v-if="blockHandles!=='COL'">{{ handles['col2'] }}</span></div>
      <div class="cell handle handle-col3" @click="clickHandle('col3')"><span v-if="blockHandles!=='COL'">{{ handles['col3'] }}</span></div>
      <div v-if="numTransistors >= 4" class="cell handle handle-col4" @click="clickHandle('col4')"><span v-if="blockHandles!=='COL'">{{ handles['col4'] }}</span></div>
      <div class="cell handle handle-row1" @click="clickHandle('row1')"><span v-if="blockHandles!=='ROW'">{{ handles['row1'] }}</span></div>
      <div class="cell transistor" :class="{ success : isSuccess(0, 0) }">{{ status[0][0] }}</div>
      <div class="cell transistor" :class="{ success : isSuccess(0, 1) }">{{ status[0][1] }}</div>
      <div class="cell transistor" :class="{ success : isSuccess(0, 2) }">{{ status[0][2] }}</div>
      <div v-if="numTransistors >= 4" class="cell transistor" :class="{ success : isSuccess(0, 3) }">{{ status[0][3] }}</div>
      <div class="cell handle handle-row2" @click="clickHandle('row2')"><span v-if="blockHandles!=='ROW'">{{ handles['row2'] }}</span></div>
      <div class="cell transistor" :class="{ success : isSuccess(1, 0) }">{{ status[1][0] }}</div>
      <div class="cell transistor" :class="{ success : isSuccess(1, 1) }">{{ status[1][1] }}</div>
      <div class="cell transistor" :class="{ success : isSuccess(1, 2) }">{{ status[1][2] }}</div>
      <div v-if="numTransistors >= 4" class="cell transistor" :class="{ success : isSuccess(1, 3) }">{{ status[1][3] }}</div>
      <div class="cell handle handle-row3" @click="clickHandle('row3')"><span v-if="blockHandles!=='ROW'">{{ handles['row3'] }}</span></div>
      <div class="cell transistor" :class="{ success : isSuccess(2, 0) }">{{ status[2][0] }}</div>
      <div class="cell transistor" :class="{ success : isSuccess(2, 1) }">{{ status[2][1] }}</div>
      <div class="cell transistor" :class="{ success : isSuccess(2, 2) }">{{ status[2][2] }}</div>
      <div v-if="numTransistors >= 4" class="cell transistor" :class="{ success : isSuccess(2, 3) }">{{ status[2][3] }}</div>
      <div v-if="numTransistors >= 4" class="cell handle handle-row4" @click="clickHandle('row4')"><span v-if="blockHandles!=='ROW'">{{ handles['row4'] }}</span></div>
      <div v-if="numTransistors >= 4" class="cell transistor" :class="{ success : isSuccess(3, 0) }">{{ status[3][0] }}</div>
      <div v-if="numTransistors >= 4" class="cell transistor" :class="{ success : isSuccess(3, 1) }">{{ status[3][1] }}</div>
      <div v-if="numTransistors >= 4" class="cell transistor" :class="{ success : isSuccess(3, 2) }">{{ status[3][2] }}</div>
      <div v-if="numTransistors >= 4" class="cell transistor" :class="{ success : isSuccess(3, 3) }">{{ status[3][3] }}</div>

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
  display: flex;
  flex-wrap: wrap;
}

.panel .cell {
  text-align: center;
  outline: solid 1px #900;
  font-size: 7vh;
  padding-top: 5vh;
}

.panel-3 .cell {
  min-width: 25%;
}

.panel-4 .cell {
  min-width: 20%;
}

.panel .success {
  background-color: rgba(00, 99, 00, 0.2);
}
</style>
<script>
import Handlers from './Handlers';
import firebaseUtil from '../../lib/firebase/firebase-util';

export default {
  name: 'puzzle-1-stage',
  emits: ['success'],
  props: {
    initialStatus: {
      type: Array,
      default: () => ['XXX', 'XXX', 'XXX'],
    },
    blockHandles: {
      type: String,
      default: () => '',
    },
    persistStatus: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    numTransistors() {
      return this.initialStatus.length;
    },
    isLoaded() {
      return (typeof this.status !== 'undefined') && this.status.length > 0;
    },
  },
  data() {
    return {
      status: [],
      handles: {
        'row1': '-',
        'row2': '-',
        'row3': '-',
        'row4': '-',
        'col1': '-',
        'col2': '-',
        'col3': '-',
        'col4': '-',
      },
      puzzleStatus: {},
    };
  },
  firestore() {
    return {
      puzzleStatus: firebaseUtil.doc('/puzzle-status/puzzle-1'),
    }
  },
  created() {
    this.status = this.persistStatus ? this.puzzleStatus.commonStatus : this.initialStatus;
  },
  watch: {
    puzzleStatus() {
      if (this.puzzleStatus && this.puzzleStatus.commonStatus && this.persistStatus) {
        this.status = this.puzzleStatus.commonStatus;
      }
    },
  },
  methods: {
    clickHandle(handle) {
      if (this.blockHandles === '' || !handle.startsWith(this.blockHandles.toLowerCase())) {
        this.handles[handle] = this.handles[handle] === '-' ? '|' : '-';
        this.status = Handlers.execute(this.status, handle);
        if (this.isBoardCompleted()) {
          this.$emit('complete');
        }
        if (this.persistStatus) {
          this.$firestoreRefs.puzzleStatus.update({ commonStatus: this.status });
        }
      }
    },
    isSuccess(numRow, numCol) {
      if (typeof this.status === 'undefined') return false;
      if (typeof this.status[numRow] === 'undefined') return false;
      return this.status[numRow].split('')[numCol] === 'O';
    },
    isBoardCompleted() {
      const byNotCompletedRow = r => r.indexOf('X') >= 0;
      return !this.status.find(byNotCompletedRow);
    },
  },
};
</script>
