const index = {
	//该配置项必须为true，否则无法解析使用快捷方法，只能模块.属性
	namespaced: true,
	mutations: {
		updateIsLogin(state, value) {
			state.isLogin = value
		},
		updateHasHead(state, value) {
			state.hasHead = value
		},
		getLoginAuthority(state, data) {
			if (!state.isLogin) {
				data._this.$message({
					duration: 1000,
					showClose: true,
					type: 'error',
					message: '请先登录！',
				})
			}
			data.goto(state.isLogin)
		}
	},
	state: {
		isLogin: false,
		hasHead: true
	},
}
export default index