<template>
  <div>
    <div class="text terminal-text" v-for="(msg, idx) in messages" :key="`message-${idx}`" data-test-id="message-0">
      {{msg.player}}> {{ msg.message }}
    </div>
    <form @submit.prevent="sendMessage" v-if="playersTurn">
      <input class="input-message terminal-text" placeholder=">" type="text" data-test-id="input-text" v-model="messageSent"/>
      <input class="terminal-button  terminal-text" type="submit" data-test-id="input-submit" value="INTRO">
    </form>
  </div>
</template>
<style scoped>
.text {
  margin: 0.6rem 0.5rem 0 1rem;
  color: white;
}

.terminal-button {
  color: white;
  padding: 0.3rem 1.3rem;
  background: transparent;
  border: none;
}

.terminal-button:hover {
  border-bottom: 1px solid #009900;
  box-shadow: 0 0 5px #5cf15c;
}

.input-message {
  background: transparent;
  border: none;
  margin: 2rem 1rem 1rem 1rem;
  color: white;
  outline: none;
}

.terminal-text{
  font: 1.2rem Inconsolata, monospace;
  text-shadow: 0 0 20px #c8c8c8;
}

.input-message:focus, .input-message:active {
  outline: none;
}

</style>
<script>
import firebaseUtil from '../../lib/firebase/firebase-util';
import GetNumPlayer from '../../lib/get-num-player';

export default {
  name: 'chat',
  computed: {
    playersTurn() {
      return this.globalStatus.turn === GetNumPlayer.get()
    }
  },
  data() {
   return {
     globalStatus: { loaded: false },
     messages: [],
     messageSent: ''
   };
  },
  firestore() {
    return {
      messages: firebaseUtil.collection('/chat', { field: "timestamp", direction: "asc"}),
      globalStatus: firebaseUtil.doc('/')
    };
  },
  methods: {
    sendMessage() {
      firebaseUtil.addToCollection('/chat', {
        message: this.messageSent,
        player: GetNumPlayer.get(),
        timestamp: firebaseUtil.serverTimestamp()
      });
      this.messageSent = '';
    }
  }
};
</script>
