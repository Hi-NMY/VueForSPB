import {getInfo} from '@/api/userInfo'
const userInfo = {
    namespaced: true,
    actions:{
        obtainUserInfo({commit},value){
            getInfo(value).then(res => {
                commit('obtainUserInfo',res.data)
            })
        }
    },
    mutations:{
        obtainUserInfo(state, value){
			state.user = value
		}
    },
    state:{
		user : {
			userName: "",
			userBirth: "",
			userHome: "",
			userFavorite: "",
			userProfile: "",
			userBadge: "",
			userLongDay: "",
			userPrivacy: ""
		}
    }
}
export default userInfo