import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueToastify from 'vue-toastify'
Vue.use(VueToastify, { theme: 'light', position: 'top-left', duration: 1000 })

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
