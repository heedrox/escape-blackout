<template>
  <div>app chat
    <div v-for="(msg, idx) in messages" :key="`message-${idx}`" data-test-id="message-0"> {{ msg.message }}</div>
  </div>
</template>
<script>
import firebaseUtil from '../../lib/firebase/firebase-util';

export default {
  name: 'chat',
  data() {
   return {
     messages: []
   };
  },
  firestore() {
    return {
      messages: firebaseUtil.collection('/chat')
    };
  }
};
</script>
