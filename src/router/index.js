//该文件用于创建整个应用的路由器
import VueRouter from 'vue-router'
const errorRouter = {
	path: '*',
	component: (resolve) => require(['@/views/error/Error.vue'], resolve)
}
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
			name: 'login',
			component: (resolve) => require(['@/views/login/Box.vue'], resolve)
		},
		{
			path: '/refresh',
			name: 'refresh',
			component: (resolve) => require(['@/views/refresh/Refresh.vue'], resolve)
		},
		{
			name: 'index',
			path: '/index',
			name: 'index',
			redirect: '/index/noVidePostBar',
			component: (resolve) => require(['@/views/index/index.vue'], resolve),
			children: [
				{
					path: 'noVidePostBar',
					name: 'noVidePostBar',
					component: (resolve) => require(['@/views/index/NoVidePostBar.vue'], resolve),
					meta: {
						keepAlive: true // 需要缓存
					},
				},
				{
					path: 'videoPostBar',
					name: 'videoPostBar',
					component: (resolve) => require(['@/views/index/VideoPostBar.vue'], resolve),
					meta: {
						keepAlive: true // 需要缓存
					},
				},
				{
					path: 'followPostBar',
					name: 'followPostBar',
					component: (resolve) => require(['@/views/index/FollowPostBar.vue'], resolve),
					meta: {
						keepAlive: true // 需要缓存
					},
				}
			]
		},
		{
			name: 'home',
			path: '/home',
			name: 'home',
			redirect: '/home/userHome/:userAccount',
			component: (resolve) => require(['@/views/home/Home.vue'], resolve),
			children: [
				{
					name: 'userHome',
					path: 'userHome/:userAccount',
					props: true,
					component: (resolve) => require(['@/views/home/UserHome.vue'], resolve),
					meta: {
						keepAlive: false
					},
					children: [
						// errorRouter
					]
				},
				{
					name: 'userFollow',
					path: 'userFollow/:userAccount',
					props: true,
					component: (resolve) => require(['@/views/home/UserFollow.vue'], resolve),
					meta: {
						keepAlive: false
					},
					children: [
						// errorRouter
					]
				},
				{
					name: 'userFollowed',
					path: 'userFollowed/:userAccount',
					props: true,
					component: (resolve) => require(['@/views/home/UserFollowed.vue'], resolve),
					meta: {
						keepAlive: false
					},
					children: [
						// errorRouter
					]
				},
				{
					name: 'userCollect',
					path: 'userCollect/:userAccount',
					props: true,
					component: (resolve) => require(['@/views/home/UserCollect.vue'], resolve),
					meta: {
						keepAlive: false
					},
					children: [
						// errorRouter
					]
				},
				{
					name: 'userInformation',
					path: 'userInformation/:userAccount',
					props: true,
					component: (resolve) => require(['@/views/home/UserInformation.vue'], resolve),
					meta: {
						keepAlive: false
					},
					children: [
						// errorRouter
					]
				},
				// errorRouter
			],
		},
		{
			name: 'topic',
			path: '/topic',
			redirect: '/topic/hotTopic',
			component: (resolve) => require(['@/views/topic/Topic.vue'], resolve),
			children: [
				{
					path: 'hotTopic',
					name: 'hotTopic',
					component: (resolve) => require(['@/views/topic/HotTopic.vue'], resolve),
					meta: {
						keepAlive: true
					},
				},
				{
					path: 'allTopic',
					name: 'allTopic',
					component: (resolve) => require(['@/views/topic/AllTopic.vue'], resolve),
					meta: {
						keepAlive: true
					},
				},
				{
					path: 'attentionTopic',
					name: 'attentionTopic',
					component: (resolve) => require(['@/views/topic/AttentionTopic.vue'], resolve),
					meta: {
						keepAlive: true
					},
				},
				{
					name: 'detailTopic',
					path: 'detailTopic/:topicId?/:topicName?',
					props: true,
					component: (resolve) => require(['@/views/topic/DetailTopic.vue'], resolve),
					meta: {
						keepAlive: false
					},
					children: [
						//errorRouter
					]
				},
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
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	}
})