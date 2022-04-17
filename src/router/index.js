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
			name: 'home',
			path: '/home',
			redirect: '/home/userHome/:userAccount',
			component: (resolve) => require(['@/views/home/Home.vue'], resolve),
			children: [
				{
					name:'userHome',
					path: 'userHome/:userAccount',
					props: true,
					component: (resolve) => require(['@/views/home/UserHome.vue'], resolve),
					children: [
						// errorRouter
					]
				},
				{
					name:'userFollow',
					path: 'userFollow/:userAccount',
					props: true,
					component: (resolve) => require(['@/views/home/UserFollow.vue'], resolve),
					children: [
						// errorRouter
					]
				},
				{
					name:'userFollowed',
					path: 'userFollowed/:userAccount',
					props: true,
					component: (resolve) => require(['@/views/home/UserFollowed.vue'], resolve),
					children: [
						// errorRouter
					]
				},
				{
					name:'userCollect',
					path: 'userCollect/:userAccount',
					props: true,
					component: (resolve) => require(['@/views/home/UserCollect.vue'], resolve),
					children: [
						// errorRouter
					]
				},
				{
					name:'userInformation',
					path: 'userInformation/:userAccount',
					props: true,
					component: (resolve) => require(['@/views/home/UserInformation.vue'], resolve),
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
					component: (resolve) => require(['@/views/topic/HotTopic.vue'], resolve)
				},
				{
					path: 'allTopic',
					component: (resolve) => require(['@/views/topic/AllTopic.vue'], resolve)
				},
				{
					path: 'attentionTopic',
					component: (resolve) => require(['@/views/topic/AttentionTopic.vue'], resolve)
				},
				{
					name: 'detailTopic',
					path: 'detailTopic/:topicId?/:topicName?',
					props: true,
					component: (resolve) => require(['@/views/topic/DetailTopic.vue'], resolve),
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
	scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})