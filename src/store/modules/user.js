import { getInfo } from '@/api/userInfo'
const userInfo = {
    namespaced: true,
    actions: {
        // obtainUserInfo({ commit }, value) {
        //     getInfo(value).then(res => {
        //         commit('obtainUserInfo', res.data)
        //     })
        // }
    },
    mutations: {
        obtainUserInfo(state, value) {
            state.user = value
        }
    },
    state: {
        user: {
            attentionTopicPresenter: [],
            collectBar: [],
            followPresenter: [],
            followedPresenter: [],
            userInfo: {
                id: 0,
                stuClass: 0,
                stuDepartment: '',
                stuMajor: '',
                stuName: '',
                stuSex: '',
                stuYear: 0,
                userAccount: '',
                userBadge: '',
                userBgImage: '',
                userBirth: '',
                userFavorite: '',
                userHeadImage: '',
                userHome: '',
                userLongday: 0,
                userName: '',
                userProfile: ''
            }
        }
    }
}
export default userInfo