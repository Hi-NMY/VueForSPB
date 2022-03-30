import { Avatar, Button, Form, FormItem, Input, Menu, MenuItem, Message, Submenu, TabPane, Tabs, Tag, Image, Backtop, Loading, Skeleton, SkeletonItem } from 'element-ui';
import 'element-ui/lib/theme-chalk/base.css';
//引入store
// import ElementUi from 'element-ui'
//
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
//引入VueRouter和路由器
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router/index.js';
// Vue.use(ElementUi)
import store from './store/index.js';
import { checkRouting } from '@/utils/checkRouting';

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
Vue.prototype.checkRouting = checkRouting

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(VueRouter)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Avatar)
Vue.use(Tag)
Vue.use(Image)
Vue.use(Backtop)
Vue.use(Loading.directive);
Vue.use(Skeleton)
Vue.use(SkeletonItem)
Vue.prototype.$message = Message;

new Vue({
  render: h => h(App),
  store,
  router,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
