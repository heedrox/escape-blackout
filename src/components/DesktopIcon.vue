<template>
  <div class="desktop-icon">
    <img :src="icon" :alt="text"/>
    <div class="desktop-icon__text">{{ text }}</div>
  </div>
</template>
<style scoped>
.desktop-icon {
  text-align: center;
  width: 8vw;
}
img {
  width: 7vw;
  height: auto;
}
.desktop-icon__text {
  font-size: small;
}
</style>
<script>
export default {
  name: 'desktop-icon',
  props: {
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  }
};
</script>
