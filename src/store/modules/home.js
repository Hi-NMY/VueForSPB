import { getInfo } from '@/api/userInfo'
const home = {
  namespaced: true,
  actions: {
    obtainUserInfo({ commit }, value) {
      getInfo(value.userAccount).then(res => {
        commit('obtainUserInfo', res.data)
        let secre = res.data.userInfo.userPrivacy;
        value.goto(secre.charAt(secre.length - 1) == 1)
      })
    }
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
        id: -1,
        stuClass: -1,
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
        userProfile: '',
        userPrivacy:''
      }
    }
  }
}
export default home