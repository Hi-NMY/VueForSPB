import { getInfo } from '@/api/userInfo'
const home = {
  namespaced: true,
  actions: {
    obtainUserInfo(context, value) {
      getInfo(value.userAccount).then(res => {
        context.commit('obtainUserInfo', res.data)
        let secre = res.data.userInfo.userPrivacy;
        if (secre.charAt(secre.length - 1) != 1) {
          value.goto(context.state.user.followPresenter.indexOf(value.ua) != -1)
          return
        }
        value.goto(true)
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