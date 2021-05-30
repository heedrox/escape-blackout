import Vue from 'vue'
import App from './App.vue'
import i18n from './lib/i18n'
import { firestorePlugin } from 'vuefire'
import { mergeInverseHookSoFirestoreUnbindsAtTheEnd } from './merge-inverse-hooks';

Vue.config.productionTip = false

Vue.config.optionMergeStrategies.beforeDestroy = mergeInverseHookSoFirestoreUnbindsAtTheEnd

Vue.use(firestorePlugin)

new Vue({
  render: h => h(App),
  i18n
}).$mount('#app')
