<template>
  <div class="desktop-window">
    <div class="desktop-window__title">{{ title }}</div>
    <div class="close-handler" @click="clickCloseHandler()">X</div>
  </div>
</template>
<style scoped>
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
