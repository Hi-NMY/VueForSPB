//文件用于创建Vuex中最为核心的store
//准备action,mutations,state
//用于响应组件动作,操作数据,存储数据
//注意!!调用此插件要在创建store实例之前
//modules分开编写，一起引入
import Vuex from 'vuex'
import Vue from 'vue'
import index from './modules/index'

Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
	modules:{
		index
	}
})

