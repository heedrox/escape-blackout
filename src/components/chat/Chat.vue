<template>
  <div class="flicker">
    <div class="chat-window">
      <div class="text terminal-text" v-for="(msg, idx) in messages" :key="`message-${idx}`" data-test-id="message-0">
        {{msg.player}}> {{ msg.message }}
      </div>
    </div>
    <form class="chat-form" @submit.prevent="sendMessage" v-if="playersTurn">
      <input class="input-message terminal-text" placeholder=">" type="text" data-test-id="input-text" v-model="messageSent"/>
      <input class="terminal-button  terminal-text" type="submit" data-test-id="input-submit" value="INTRO">
    </form>
  </div>
</template>
<style scoped>
.chat-window {
  height: 77vh;
  overflow-y: scroll;
}
.chat-form {
  bottom: 20vh;
  overflow: hidden;
  border-top: solid 1px #999;
  padding: 1.5vh 2vw;
  display:flex;
}
.text {
  margin: 0.6rem 0.5rem 0 1rem;
  color: white;
}

.text:last-child {
  margin-bottom: 0.6rem;
}

.terminal-button {
  color: white;
  padding: 0.3rem 1.3rem;
  background: transparent;
  border: none;
  margin-left: auto;
}

.terminal-button:hover {
  border-bottom: 1px solid #009900;
  box-shadow: 0 0 5px #5cf15c;
}

.input-message {
  background: transparent;
  border: none;
  color: white;
  outline: none;
  width: 100%;
}

.terminal-text{
  font: 1rem Inconsolata, monospace;
  text-shadow: 0 0 20px #c8c8c8;
}

.input-message:focus, .input-message:active {
  outline: none;
}

.flicker {
    animation: flicker 0.70s;
    animation-duration: 3s;
}
@keyframes flicker {
  0% {
    opacity: 0.552;
  }
  5% {
    opacity: 0.48287;
  }
  10% {
    opacity: 0.59134;
  }
  15.0% {
    opacity: 0.79543;
  }
  20% {
    opacity: 0.75134;
  }
  25% {
    opacity: 0.1956;
  }
  30.0% {
    opacity: 0.90687;
  }
  35% {
    opacity: 0.122;
  }
  40% {
    opacity: 0.62254;
  }
  45% {
    opacity: 0.56977;
  }
  50% {
    opacity: 0.9925;
  }
  55.0% {
    opacity: 0.55487;
  }
  60.0% {
    opacity: 0.16607;
  }
  65% {
    opacity: 0.12353;
  }
  70% {
    opacity: 0.2214;
  }
  75% {
    opacity: 0.67908;
  }
  80% {
    opacity: 0.97163;
  }
  85.0% {
    opacity: 0.1275;
  }
  90% {
    opacity: 0.37186;
  }
  95% {
    opacity: 0.24475;
  }
  100% {
    opacity: 0.37221;
  }
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
