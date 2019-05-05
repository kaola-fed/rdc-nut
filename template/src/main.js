import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

abc(123)

new Vue({
  render: h => h(App),
}).$mount('#app')
