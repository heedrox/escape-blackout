<template>
  <div class="desktop-window">
    <div class="desktop-window-toolbar">
      <div class="desktop-window-toolbar-icon">
        <img :src="icon" :alt="title" />
      </div>
      <div class="desktop-window-toolbar-title">{{ title }}</div>
      <div class="close-handler" @click="clickCloseHandler()">X</div>
    </div>
    <div class="desktop-window-body">
      <puzzle-1 :initial-status="[ 'XXXX', 'XXXX', 'XXXX', 'XXXX' ]"/>
    </div>
  </div>
</template>
<style scoped>
.desktop-window {
  position: fixed;
  top: 2.5vh;
  left: 2.5vw;
  width: 95vw;
  height: 95vh;
  background-color: #000;
  border: solid 2px #999;
  border-radius: 3px;
  box-shadow: 2px 2px 2vw 1vw rgba(255, 255, 255, 0.4);
}

.desktop-window-toolbar {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 6vh;
  background-color: rgba(63, 63, 63, 0.9);
  padding-top: 2vh;
  border-bottom: solid 2px #999;
}

.desktop-window-toolbar-icon {
  width: 5vw;
  width: max(5vw, 6vh);
}

.desktop-window-toolbar-title {
  flex: 1 1 0;
  line-height: 1.4;
  font-size: 4vh;
}

.desktop-window-toolbar-icon img {
  height: 4.75vh;
  padding-left: 1vw;
}

.close-handler {
  text-align: right;
  padding-right: 1vw;
  flex: 1 1 0;
  font-weight: bold;
}
</style>
<script>
import Puzzle1 from './puzzle-1/Puzzle1'

export default {
  name: 'desktop-window',
  emits: [ 'close' ],
  components: { Puzzle1 },
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'x'
    },
  },
  methods: {
    clickCloseHandler () {
      this.$emit('close');
    },
  },
};
</script>
