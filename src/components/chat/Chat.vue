<template>
  <div>
    <div v-for="(msg, idx) in messages" :key="`message-${idx}`" data-test-id="message-0">
      {{msg.player}}> {{ msg.message }}
    </div>
    <form @submit.prevent="sendMessage">
      <input type="text" data-test-id="input-text" v-model="messageSent"/>
      <input type="submit" data-test-id="input-submit" value=">">
    </form>
  </div>
</template>
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
