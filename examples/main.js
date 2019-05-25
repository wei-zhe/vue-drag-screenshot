import Vue from 'vue'
import App from './App.vue'
import vueScreenshot from '../packages/index'

Vue.config.productionTip = false
Vue.use(vueScreenshot)

new Vue({
  render: h => h(App),
}).$mount('#app')
