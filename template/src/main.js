import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

{{#suites}}
import {{alias}} from '{{name}}'
{{alias}}.install(Vue)
{{/suites}}

new Vue({
  render: h => h(App),
}).$mount('#app')
