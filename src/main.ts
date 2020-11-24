import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'

import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)

import './assets/styles/tailwind.css'

Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
