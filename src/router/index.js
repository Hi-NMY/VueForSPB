//该文件用于创建整个应用的路由器
import VueRouter from 'vue-router'
//创建并暴露路由器
export default new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/index/noVidePostBar'
		},
		{
			path: '/login',
			component: (resolve) => require(['@/views/login/Box.vue'], resolve)
		},
		{
			path: '/refresh',
			component: (resolve) => require(['@/views/refresh/Refresh.vue'], resolve)
		},
		{
			name: 'index',
			path: '/index',
			redirect: '/index/noVidePostBar',
			component: (resolve) => require(['@/views/index/index.vue'], resolve),
			children: [
				{
					path: 'noVidePostBar',
					component: (resolve) => require(['@/views/index/NoVidePostBar.vue'], resolve)
				},
				{
					path: 'videoPostBar',
					component: (resolve) => require(['@/views/index/VideoPostBar.vue'], resolve)
				},
				{
					path: 'followPostBar',
					component: (resolve) => require(['@/views/index/FollowPostBar.vue'], resolve)
				}
			]
		},
		{
			path: '/home',
			redirect: '/home/userHome',
			component: (resolve) => require(['@/views/home/Home.vue'], resolve),
			children: [
				{
					path: 'userHome',
					component: (resolve) => require(['@/views/home/UserHome.vue'], resolve)
				},
				{
					path: 'userFollow',
					component: (resolve) => require(['@/views/home/UserFollow.vue'], resolve)
				},
				{
					path: 'userFollowed',
					component: (resolve) => require(['@/views/home/UserFollowed.vue'], resolve)
				},
				{
					path: 'userCollect',
					component: (resolve) => require(['@/views/home/UserCollect.vue'], resolve)
				},
				{
					path: 'userInformation',
					component: (resolve) => require(['@/views/home/UserInformation.vue'], resolve)
				},
			]
		},
		{
			name: 'topic',
			path: '/topic',
			redirect: '/topic/aa',
			children: [

			]
		},
		{
			name: 'follow',
			path: '/follow',
			redirect: '/follow/aa',
			children: [
			]
		},
		{
			name: 'message',
			path: '/message',
			redirect: '/message/aa',
			children: [
			]
		}
	]
})