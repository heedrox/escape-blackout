<template>
  <div>
    <div data-test-id="file">{{ $t('files.painting') }}</div>
    <div v-if="playerNumber === 1" data-test-id="file" @click="selectFile('chess-player1.jpg')">{{ $t('files.chess-player-1') }}</div>
    <div v-if="playerNumber === 2" data-test-id="file" @click="selectFile('chess-player2.jpg')">{{ $t('files.chess-player-2') }}</div>
    <img v-if="selectedFile" data-test-id="zoom-image" alt="image" :src="selectedFile">
  </div>
</template>
<script>
import GetNumPlayer from '../../lib/get-num-player';

export default {
  name: 'FileExplorer',
  data() {
    return {
      playerNumber: GetNumPlayer.get(),
      selectedFile: null
    }
  },
  methods: {
    selectFile(file) {
      this.selectedFile = `./files/${file}`;
    }
  }
}
</script>
