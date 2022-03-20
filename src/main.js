import Vue from 'vue'
import App from './App.vue'
import { Button, Input, Form,FormItem} from 'element-ui';
//引入store
// import ElementUi from 'element-ui'
//
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUi)

import store from './store/index.js'
//引入VueRouter和路由器
import VueRouter from 'vue-router'
import router from './router/index.js'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  store,
  router,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
