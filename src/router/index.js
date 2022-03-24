//该文件用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入相关依赖
import Box from '../views/login/Box.vue'
import Index from '../views/index/index.vue'
//创建并暴露路由器
export default new VueRouter({
	mode: 'history',
	routes: [
		{
			//注意/不能丢
			path: '/',
			redirect: '/index'
		},
		{
			//注意/不能丢
			path: '/login',
			component: Box
		},
		{
			//注意/不能丢
			name: 'index',
			path: '/index',
			component: Index
		},
	]
})