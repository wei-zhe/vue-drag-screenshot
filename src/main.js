import Vue from 'vue'
import App from './App.vue'
import vueScreenshot from './lib/index.js'
// import vuePayKeyboard from './lib/indexvue-pay-keyboard'
Vue.use(vueScreenshot)
new Vue({
  el: '#app',
  render: h => h(App)
})
