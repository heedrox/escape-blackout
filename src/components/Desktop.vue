<template>
  <div>
    <desktop-icon text="Network" :icon="require('./puzzle-1/puzzle-1-icon.svg')"
    @click="clickDesktopIcon()"></desktop-icon>
    <desktop-window v-if="showDesktopWindow" title="Hola caracola" @close="closeDesktopIcon">
    </desktop-window>
    {{ showDesktopWindow }}
  </div>
</template>
<script>
import DesktopIcon from './DesktopIcon';
import DesktopWindow from './DesktopWindow';

export default {
  name: 'desktop',
  components: { DesktopIcon, DesktopWindow },
  data () {
    return {
      showDesktopWindow: false,
    }
  },
  methods: {
    clickDesktopIcon () {
      this.showDesktopWindow = true;
    },
    closeDesktopIcon () {
      this.showDesktopWindow = false;
    },
  }
};
</script>
