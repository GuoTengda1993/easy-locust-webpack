import Vue from 'vue'
import ElementUI from 'element-ui'
import jsoneditor from 'jsoneditor'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import util from './utils/util.js'
import '@/css/base.css'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.$jsoneditor = jsoneditor
Vue.use(util)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
