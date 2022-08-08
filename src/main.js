import {
  Row,
  Col,
  Avatar,
  Button,
  Form,
  FormItem,
  Input,
  Menu,
  MenuItem,
  Message,
  Submenu,
  TabPane,
  Tabs,
  Tag,
  Image,
  Backtop,
  Loading,
  Skeleton,
  SkeletonItem,
  Dialog,
  CheckboxGroup,
  Checkbox,
  Collapse, CollapseItem, DatePicker, Cascader, Switch, RadioGroup, Radio, InfiniteScroll, Popover
} from 'element-ui';
import { Picker } from "emoji-mart-vue"
// import {infiniteScroll} from "vue-infinite-scroll";
import 'element-ui/lib/theme-chalk/base.css';

// import './assets/icon/iconfont.css'
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
import { checkRouting, checkRoutingFirst } from '@/utils/checkRouting';

import { urlJudge, urlBadgeImg, videoImgUrl } from '@/utils/urlTool';

import 'animate.css';

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
Vue.prototype.checkRouting = checkRouting
Vue.prototype.checkRoutingFirst = checkRoutingFirst
Vue.prototype.urlJudge = urlJudge
Vue.prototype.urlBadgeImg = urlBadgeImg
Vue.prototype.videoImgUrl = videoImgUrl

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
Vue.use(Row)
Vue.use(Col)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(DatePicker)
Vue.use(Cascader)
Vue.use(Switch)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Dialog)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(InfiniteScroll)
Vue.use(Popover)
Vue.component('picker', Picker)
Vue.prototype.$message = Message;
new Vue({
  render: h => h(App),
  store,
  router,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
