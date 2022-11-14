<template>
  <div class="user_home">
    <div class="user_home_head">
      <div class="user_home_head_bg">
        <i @click="returnPage" class="iconfont icon-topic_fanhui"></i>
        <img class="user_home_head_bg_img" :src="bgImg" />
      </div>
      <div class="user_home_user_msg_box">
        <el-avatar :size="100" :src="headImg"> </el-avatar>
        <div class="to_follow_div" v-if="isOtherUser">
          <div class="folllow_msg_right" v-if="isFollow" @click="clickFollow">
            已关注
          </div>
          <div class="folllow_msg_right_no" v-else @click="clickFollow">
            未关注
          </div>
        </div>
        <div class="user_home_user_msg_base">
          <div class="user_home_user_name">
            <span>{{ user.userInfo.userName }}</span>
            <i :class="sexClass"></i>
            <el-image v-if="user.userInfo.userBadge" :src="badgeImg"></el-image>
          </div>
          <div v-show="isPrivacyFriend" class="user_home_user_friend">
            <div class="user_home_user_follow" @click="goToFollow">
              <span>关注</span>
              <span class="follow_count">{{
                user.followedPresenter.length
              }}</span>
            </div>
            <div class="user_home_user_followed" @click="goToFollowed">
              <span>被关注</span>
              <span class="follow_count">{{
                user.followPresenter.length
              }}</span>
            </div>
          </div>
        </div>
        <div class="user_home_user_info">
          <div class="user_home_user_info_head">
            <div>
              <i class="iconfont icon-profile"></i>
              <span>{{ userProfile }}</span>
            </div>
            <i @click="showMoreMsg" class="moreMsg" :class="moreMsg"></i>
          </div>
          <div v-show="isMoreMsg" class="user_home_user_info_msg">
            <div>
              <i class="iconfont icon-home"></i>
              <span>{{ userHome }}</span>
            </div>
            <div>
              <i class="iconfont icon-bitrh"></i>
              <span>{{ userBirth }}</span>
            </div>
            <div>
              <i class="iconfont icon-star"></i>
              <span>{{ userStar }}</span>
            </div>
            <div>
              <i class="iconfont icon-favorite"></i>
              <span>{{ userFavorite }}</span>
            </div>
          </div>
        </div>
        <div class="user_home_navigation">
          <div style="border-bottom: 1px solid #b6b6b646"></div>
          <el-tabs v-model="userNav" stretch @tab-click="handleClick">
            <el-tab-pane label="帖子" name="1"></el-tab-pane>
            <el-tab-pane label="视频" name="2"></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="user_home_main">
      <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="6">
        <bar-item
          v-for="item in postBarList"
          :key="item.pbOneId"
          :todo="item"
          class="infinite-list-item"
        ></bar-item>
      </el-skeleton>
      <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="6">
      </el-skeleton>
      <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="6">
      </el-skeleton>
      <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="6">
      </el-skeleton>
      <div style="width: 100%; text-align: center">加载中，请稍后.....</div>
    </div>
  </div>
</template>

<script>
import barItem from '@/components/bar/BarItem.vue'
import { getBirthStar } from '@/utils/dateUtil'
import { queryNoVideoUserBarListForDate, queryVideoUserBarListForDate } from '@/api/home'
import { homeChildren } from '@/mixin/home'
import { listLoad } from '@/mixin/list'
import { delBar } from '@/api/moreFun'
export default {
  name: 'UserHome',
  props: ['userAccount'],
  mixins: [homeChildren, listLoad],
  data() {
    return {
      userNav: '1',
      moreMsg: 'iconfont icon-shangjiantou',
      postBarList: [],
      loading: true,
      skeletonItem: 'skeleton_item',
      queryParam: {
        id: 0,
        userAccount: '',
      },
      queryParamF: {
        followAccount: '',
        followedAccount: '',
      },
      isPrivacyFriend: true,
      sexClass: 'iconfont icon-girl',
    }
  },
  components: {
    barItem,
  },
  computed: {
    headImg() {
      return this.urlJudge(this.user.userInfo.userHeadImage)
    },
    bgImg() {
      return this.urlJudge(this.user.userInfo.userBgImage)
    },
    badgeImg() {
      return this.urlBadgeImg(this.user.userInfo.userBadge)
    },
    isMoreMsg() {
      return this.moreMsg == 'iconfont icon-shangjiantou' ? false : true
    },
    userProfile() {
      if (!this.user.userInfo.userProfile) {
        return '暂无简介'
      } else {
        return this.user.userInfo.userProfile
      }
    },
    //第一个展示在线天数
    userBirth() {
      if (
        !this.user.userInfo.userBirth ||
        (this.isOtherUser && this.userPrivacy[1] != 1)
      ) {
        return '未知'
      } else {
        return this.user.userInfo.userBirth
      }
    },
    userStar() {
      if (!this.user.userInfo.userBirth || (this.isOtherUser && this.userPrivacy[1] != 1)) {
        return '未知'
      } else {
        return getBirthStar(this.user.userInfo.userBirth)
      }
    },
    userHome() {
      if (
        !this.user.userInfo.userHome ||
        (this.isOtherUser && this.userPrivacy[2] != 1)
      ) {
        return '未知'
      } else {
        return this.user.userInfo.userHome
      }
    },
    userFavorite() {
      if (
        !this.user.userInfo.userFavorite ||
        (this.isOtherUser && this.userPrivacy[3] != 1)
      ) {
        return '未知'
      } else {
        let favorite = this.user.userInfo.userFavorite
        return favorite
          .substring(0, favorite.lastIndexOf('|'))
          .replaceAll('|', ' | ')
      }
    },
    userFollow() {
      if (this.userPrivacy[4] != 1) {
        this.isPrivacyFriend = false
      }
    },
    isFollow() {
      const followedPresenter = this.$store.state.userInfo.user.followedPresenter
      if (!followedPresenter || followedPresenter.indexOf(this.user.userInfo.userAccount) === -1) {
        return false
      } else {
        return true
      }
    },
    //是否查看全部徽章
  },
  methods: {
    initSex() {
      if (this.user.userInfo.stuSex == '女') {
        this.sexClass = 'iconfont icon-girl'
      } else {
        this.sexClass = 'iconfont icon-boy'
      }
    },
    handleClick(tab, event) {
      this.queryParam.id = 0
      this.refresh()
    },
    showMoreMsg() {
      if (this.moreMsg === 'iconfont icon-shangjiantou') {
        this.moreMsg = 'iconfont icon-xiajiantou'
      } else {
        this.moreMsg = 'iconfont icon-shangjiantou'
      }
    },
    refresh() {
      this.beforeRefresh()
      this.obtainData()
    },
    obtainData() {
      if (this.userNav == '1') {
        this.queryParam.userAccount = this.user.userInfo.userAccount
        queryNoVideoUserBarListForDate(this.queryParam).then((res) => {
          if (this.queryParam.id == 0) {
            this.postBarList = res.data
          } else {
            this.postBarList.push.apply(this.postBarList, res.data)
          }
          if (this.postBarList.length == 0) {
            this.afterRefresh()
            return
          }
          this.queryParam.id = this.postBarList[this.postBarList.length - 1].id
          this.afterRefresh()
        })
      } else {
        this.queryParam.userAccount = this.user.userInfo.userAccount
        queryVideoUserBarListForDate(this.queryParam).then((res) => {
          if (this.queryParam.id == 0) {
            this.postBarList = res.data
          } else {
            this.postBarList.push.apply(this.postBarList, res.data)
          }
          if (res.data.length != 0) {
            this.queryParam.id = this.postBarList[this.postBarList.length - 1].id
          }
          this.afterRefresh()
        })
      }
    },
    beforeRefresh() {
      this.loading = true
      this.skeletonItem = 'skeleton_item'
    },
    afterRefresh() {
      this.loadAfter()
      this.loading = false
      this.skeletonItem = ''
    },
    goToFollow() {
      this.$router.push({
        path: '/home/userFollow/' + this.userAccount,
      })
    },
    goToFollowed() {
      this.$router.push({
        path: '/home/userFollowed/' + this.userAccount,
      })
    },
    returnPage() {
      this.$router.back()
    },
    clickFollow() {
      this.queryParamF.followedAccount = this.user.userInfo.userAccount
      this.$store.commit('index/getLoginAuthority', {
        _this: this,
        goto: (key) => {
          if (key) {
            if (this.isFollow) {
              this.$store.dispatch('userInfo/removeFollow', {
                query: this.queryParamF,
                _this: this
              })
            } else {
              this.$store.dispatch('userInfo/addFollow', {
                query: this.queryParamF,
                _this: this
              })
            }
          }
        }
      })
    },
    delBar(id) {
      let index = 0;
      for (let i = 0; i < this.postBarList.length; i++) {
        if (this.postBarList[i].pbOneId == id) {
          index = i
          break
        }
      }
      this.postBarList.splice(index, 1)
    }
  },
  mounted() {
    this.initSex()
    this.refresh()
    this.$bus.$on('delBar', this.delBar)
  },
  beforeDestroy() {
    this.$bus.$off('delBar')
  },
}
</script>

<style scope lang="scss">
.user_home {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.user_home_head {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user_home_head_bg {
  width: 100%;
  height: 240px;
  .user_home_head_bg_img {
    object-fit: cover;
    width: 100%;
    height: 240px;
    border-radius: 10px 10px 0px 0px;
  }
  .iconfont.icon-topic_fanhui {
    position: absolute;
    margin-left: 8px;
    margin-top: 8px;
    font-size: 34px;
    color: #909399;
  }
  .iconfont.icon-topic_fanhui:hover {
    cursor: pointer;
  }
}
.user_home_user_msg_box {
  width: 100%;
  height: auto;
  min-height: 130px;
  background-color: white;
  position: relative;
  .el-avatar {
    position: absolute;
    top: -35px;
    left: 24px;
    border: 3px solid white;
  }
  .to_follow_div {
    position: absolute;
    left: 588px;
    top: 20px;
  }
  .folllow_msg_right {
    border: 1px solid grey;
    width: 75px;
    height: 30px;
    border-radius: 20px;
    text-align: center;
    line-height: 30px;
    color: #909399;
  }
  .folllow_msg_right:hover {
    border: 1px solid #46b3e6;
    color: #46b3e6;
    cursor: pointer;
  }
  .folllow_msg_right_no {
    border: 1px solid #46b3e6;
    background-color: #46b3e6;
    color: white;
    width: 75px;
    height: 30px;
    border-radius: 20px;
    text-align: center;
    line-height: 30px;
  }
  .folllow_msg_right_no:hover {
    border: 1px solid #46b3e6;
    color: #46b3e6;
    background-color: white;
    cursor: pointer;
  }
}
.user_home_user_msg_base {
  position: absolute;
  left: 144px;
  top: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 16px;
}
.user_home_user_name {
  display: flex;
  align-items: center;
  .iconfont.icon-girl {
    color: #ff7486;
  }
  .iconfont.icon-boy {
    color: #4bb7ea;
  }
  i {
    margin-left: 5px;
  }
  .el-image__inner {
    width: 24px;
    margin-left: 5px;
  }
  span {
    font-weight: bold;
  }
}
.user_home_user_friend {
  margin-top: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  color: #909399;
  font-size: 14px;
}
.follow_count {
  margin-left: 4px;
  color: #303133;
}
.user_home_user_followed {
  margin-left: 20px;
}
.user_home_user_follow:hover,
.user_home_user_followed:hover {
  cursor: pointer;
  color: #46b3e6;
  .follow_count {
    color: #46b3e6;
  }
}
.user_home_user_info {
  margin-top: 90px;
  color: #909399;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    line-height: 12px;
    font-size: 13px;
    margin-left: 6px;
    font-weight: 300;
  }
  i {
    font-size: 14px;
  }
  .moreMsg {
    padding: 2px;
    background-color: #b6b6b6a1;
    border-radius: 10px;
    color: white;
  }
  .moreMsg:hover {
    cursor: pointer;
  }
}
.user_home_user_info_head {
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user_home_user_info_msg {
  width: 90%;
  display: flex;
  flex-direction: column;
  div {
    margin-top: 4px;
  }
}
.user_home_navigation {
  margin-top: 20px;
  .el-tabs__nav {
    z-index: 1;
  }
  .el-tabs__nav-wrap::after {
    z-index: 0;
  }
  .el-tabs__active-bar {
    z-index: 1;
  }
  .el-tabs.el-tabs--top {
    height: 40px;
  }
  .el-tabs__item.is-active {
    color: rgb(70, 179, 230);
  }
  .el-tabs__active-bar {
    background-color: rgb(70, 179, 230);
  }
  .el-tabs__item:hover {
    color: rgb(70, 179, 230);
  }
}
.user_home_main {
  margin-top: 10px;
}
.skeleton_item {
  width: auto;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: white;
}
</style>