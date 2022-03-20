//该文件用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入相关依赖
import Login from '../components/login/Login.vue'
//创建并暴露路由器
export default new VueRouter({
	routes:[
		{
            //注意/不能丢
			name:'login',
			path:'/login',
			component:Login
		},
		{
            //注意/不能丢
			name:'register',
			path:'/register'
		}
	]	
})