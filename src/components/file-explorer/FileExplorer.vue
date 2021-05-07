<template>
  <div class="file-explorer">
    <div class="files-left">
      <div :class="{ 'file': true, 'selected': isSelected('cuadro-abstracto.jpg') }"  data-test-id="file" @click="selectFile('cuadro-abstracto.jpg')">{{ $t('files.painting') }}</div>
      <div v-if="playerNumber === 1" :class="{ 'file': true, 'selected': isSelected('chess-player1.jpg') }" data-test-id="file" @click="selectFile('chess-player1.jpg')">{{ $t('files.chess-player-1') }}</div>
      <div v-if="playerNumber === 2" :class="{ 'file': true, 'selected': isSelected('chess-player2.jpg') }" data-test-id="file" @click="selectFile('chess-player2.jpg')">{{ $t('files.chess-player-2') }}</div>
    </div>
    <div class="file-zoom">
      <img v-if="selectedFile" data-test-id="zoom-image" alt="image" :src="fullSelectedFile">
    </div>
  </div>
</template>
<style scoped="true">
.file-explorer {
  display: flex;
  height: 100%;
  align-items: stretch;
}
.files-left {
  padding: 2vh 1vw;
  width: 35vw;
  border-right: solid 1px #999999;
  height: 82.5vh;
  overflow-y: visible;
  overflow-x: hidden;
}

.file-zoom {
  width: 100%;
  height: 86.5vh;
  border: solid 1px #999999;
  display: flex;
  justify-content: center;
  align-content: center;
}

.file {
  padding: 1.3vh 0.5vw;
  margin-bottom: 0.5vw;
  font-size:0.9em;
  background-color: #222;
}

.file.selected {
  background-color: #999999;
  color: #000;
}

.file-zoom img {
  width: 90%;
  height: fit-content;
  max-height: 86vh;
  align-self: center;
}
</style>
<script>
import GetNumPlayer from '../../lib/get-num-player';

export default {
  name: 'FileExplorer',
  computed: {
    fullSelectedFile() {
      return require(`./files/${this.selectedFile}`);
    }
  },
  data() {
    return {
      playerNumber: GetNumPlayer.get(),
      selectedFile: null
    }
  },
  methods: {
    selectFile(file) {
      this.selectedFile = file;
    },
    isSelected(file) {
      return this.selectedFile === file;
    },
  }
}
</script>
