//该文件用于创建整个应用的路由器
import VueRouter from 'vue-router'
//创建并暴露路由器
export default new VueRouter({
	// routes:[
	// 	{
	// 		path: '/login',
	// 		component: () => import(/* webpackChunkName: "login" */ '../components/login/Login.vue'),
	// 		meta: { title: '登录' }
	// 	},
	// 	{
	// 		path: '/register',
	// 		component: () => import(/* webpackChunkName: "login" */ '../components/login/Register.vue'),
	// 		meta: { title: '注册' }
	// 	},
	// ]
})