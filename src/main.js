import Vue from 'vue'
import App from './App.vue'
import i18n from './lib/i18n'
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  i18n
}).$mount('#app')
