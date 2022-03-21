const index = {
	//该配置项必须为true，否则无法解析使用快捷方法，只能模块.属性
	namespaced: true,
	mutations: {
		updateIsLogin(state, value) {
			state.isLogin = value
		},
	},
	state: {
		isLogin: false
	},
}
export default index