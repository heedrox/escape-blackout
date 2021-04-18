import VueI18n from 'vue-i18n';
import Vue from 'vue';
import messages from '../locales/index.js';

Vue.use(VueI18n)
export default new VueI18n({
  locale: 'es',
  fallbackLocale: 'es',
  messages
})
