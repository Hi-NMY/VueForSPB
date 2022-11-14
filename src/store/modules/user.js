import { addLikeBar, removeLikeBar } from '@/api/postbar'
import { changeInfo } from '@/api/userInfo'
import { addAttention, deleteAttention } from '@/api/topic'
import { addFollow, deleteFollow } from "@/api/follow";

const userInfo = {
    namespaced: true,
    actions: {
        addLikeBar(context, pbId) {
            const query = {
                userAccount: context.state.user.userInfo.userAccount,
                pbOneId: pbId
            }
            addLikeBar(query).then((res) => {
            })
            context.commit('addLikeBar', pbId)
        },
        removeLikeBar(context, pbId) {
            const query = {
                userAccount: context.state.user.userInfo.userAccount,
                pbOneId: pbId
            }
            removeLikeBar(query).then((res) => {
            })
            context.commit('removeLikeBar', pbId)
        },
        addAttentionTopic(context, data) {
            data.query.userAccount = context.state.user.userInfo.userAccount
            addAttention(data.query).then((res) => {
                if (res.data) {
                    data.goto()
                    context.commit('addAttentionTopic', data.query.topicId)
                    data._this.$message({
                        duration: 2000,
                        showClose: true,
                        type: 'success',
                        message: '关注成功',
                    })
                } else {
                    data._this.$message({
                        duration: 2000,
                        showClose: true,
                        type: 'error',
                        message: '出错了，请重试！',
                    })
                }
            })
        },
        removeAttentionTopic(context, data) {
            data.query.userAccount = context.state.user.userInfo.userAccount
            deleteAttention(data.query).then((res) => {
                if (res.data) {
                    data.goto()
                    context.commit('removeAttentionTopic', data.query.topicId)
                    data._this.$message({
                        duration: 2000,
                        showClose: true,
                        message: '已取消关注',
                    })
                } else {
                    data._this.$message({
                        duration: 2000,
                        showClose: true,
                        type: 'error',
                        message: '出错了，请重试！',
                    })
                }
            })
        },
        changeInformation(context, data) {
            changeInfo(data.query).then((res) => {
                if (res.data) {
                    data.goto()
                    context.commit('changeInformation', data.query)
                    data._this.$message({
                        duration: 2000,
                        showClose: true,
                        message: '修改成功',
                    })
                } else {
                    data._this.$message({
                        duration: 2000,
                        showClose: true,
                        type: 'error',
                        message: '出错了，请重试！',
                    })
                }
            })
        },
        addFollow(context, data) {
            data.query.followAccount = context.state.user.userInfo.userAccount
            addFollow(data.query).then((res) => {
                if (res.data) {
                    context.commit('addFollow', data.query.followedAccount)
                    data._this.$message({
                        duration: 2000,
                        showClose: true,
                        type: 'success',
                        message: '关注成功',
                    })
                } else {
                    data._this.$message({
                        duration: 2000,
                        showClose: true,
                        type: 'error',
                        message: '出错了，请重试！',
                    })
                }
            })
        },
        removeFollow(context, data) {
            data.query.followAccount = context.state.user.userInfo.userAccount
            deleteFollow(data.query).then((res) => {
                if (res.data) {
                    context.commit('removeFollow', data.query.followedAccount)
                    data._this.$message({
                        duration: 2000,
                        showClose: true,
                        message: '已取消关注',
                    })
                } else {
                    data._this.$message({
                        duration: 2000,
                        showClose: true,
                        type: 'error',
                        message: '出错了，请重试！',
                    })
                }
            })
        },
    },
    mutations: {
        changeInformation(state, data) {
            state.user.userInfo.userName = data.userName
            state.user.userInfo.userBirth = data.userBirth
            state.user.userInfo.userFavorite = data.userFavorite
            state.user.userInfo.userHome = data.userHome
            state.user.userInfo.userProfile = data.userProfile
            state.user.userInfo.userPrivacy = data.userPrivacy
        },
        obtainUserInfo(state, value) {
            state.user = value
            console.log(state.user);
        },
        addLikeBar(state, pbId) {
            state.user.likeBar.push(pbId)
        },
        removeLikeBar(state, pbId) {
            const index = state.user.likeBar.indexOf(pbId);
            if (index > -1) {
                state.user.likeBar.splice(index, 1);
            }
        },
        addAttentionTopic(state, id) {
            state.user.attentionTopicPresenter.push(id)
        },
        removeAttentionTopic(state, id) {
            const index = state.user.attentionTopicPresenter.indexOf(id);
            if (index > -1) {
                state.user.attentionTopicPresenter.splice(index, 1);
            }
        },
        addFollow(state, account) {
            state.user.followedPresenter.push(account)
        },
        removeFollow(state, account) {
            const index = state.user.followedPresenter.indexOf(account);
            if (index > -1) {
                state.user.followedPresenter.splice(index, 1);
            }
        },
        removeUser(state) {
            state.user = {
                attentionTopicPresenter: [],
                collectBar: [],
                followPresenter: [],
                followedPresenter: [],
                likeBar: [],
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
                    userProfile: '',
                    userPrivacy: ''
                }
            }
        },
        updateUserLongDay(state) {
            state.user.userInfo.userLongday += 1
        },
        changeBarCount(state, c) {
            state.user.userInfo.barCount += c
        },
        addCollectBar(state, id) {
            state.user.collectBar.push(id)
        },
        delCollectBar(state, id) {
            const index = state.user.collectBar.indexOf(id);
            if (index > -1) {
                state.user.collectBar.splice(index, 1);
            }
        },
    },
    state: {
        user: {
            attentionTopicPresenter: [],
            collectBar: [],
            followPresenter: [],
            followedPresenter: [],
            likeBar: [],
            barCount: 0,
            badgeCount: 0,
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
                userProfile: '',
                userPrivacy: ''
            }
        }
    }
}
export default userInfo