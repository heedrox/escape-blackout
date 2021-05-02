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
  data() {
   return {
     messages: [],
     messageSent: ''
   };
  },
  firestore() {
    return {
      messages: firebaseUtil.collection('/chat')
    };
  },
  methods: {
    sendMessage() {
      this.$firestoreRefs.messages.add({ message: this.messageSent,
        player: GetNumPlayer.get(),
        timestamp: firebaseUtil.serverTimestamp()
      });
      this.messageSent = '';
    }
  }
};
</script>
