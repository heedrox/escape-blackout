import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
import firebaseUtil from './lib/firebase/firebase-util';

firebaseUtil.init();
Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
