<template>
  <div class="desktop-window">
    <div class="desktop-window-toolbar">
      <div class="desktop-window-toolbar-title">{{ title }}</div>
      <div class="close-handler" @click="clickCloseHandler()">X</div>
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
  border: solid 1px #999;
  box-shadow: 2px 2px 2vw 1vw rgba(255, 255, 255, 0.4);
}

.desktop-window-toolbar {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 6vh;
  background-color: rgba(63, 63, 63, 0.9);
  padding-top: 2vh;
  border-bottom: solid 1px #999;
}

.desktop-window-toolbar > div {
  flex-grow: 1;
}

.close-handler {
  text-align: right;
  padding-right: 1vw;
}
</style>
<script>
export default {
  name: 'desktop-window',
  emits: [ 'close' ],
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    clickCloseHandler () {
      this.$emit('close');
    },
  },
};
</script>
