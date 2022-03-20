import Vue from 'vue'
import App from './App.vue'
import {Button,Input} from 'element-ui';
//引入store
import store from './store/index.js'
//引入VueRouter和路由器
import VueRouter from 'vue-router'
import router from './router/index.js'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Input)
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  store,
  router,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
