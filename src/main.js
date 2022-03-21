import Vue from 'vue'
import App from './App.vue'
import {Button, Input, Form, FormItem, Menu, MenuItem, Submenu} from 'element-ui';
//引入store
// import ElementUi from 'element-ui'
//
import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUi)

import store from './store/index.js'
//引入VueRouter和路由器
import VueRouter from 'vue-router'
import router from './router/index.js'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(VueRouter)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)



new Vue({
  render: h => h(App),
  store,
  router,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
