import Vue from 'vue'
import App from './App.vue'
import store from './store'

// import Cloudinary from 'cloudinary-vue'
// const urlParams = new URLSearchParams(window.location.search)
// Vue.use(Cloudinary, {
//   configuration: { cloudName: urlParams.get('cn') || 'pictures77' }
// })

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
