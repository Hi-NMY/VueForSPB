<template>
  <div class="randomUser">
    <div class="head">
      <div class="head_left">你可能感兴趣的人</div>
      <div class="head_right" @click="findUsers">
        <i :class="isLoading"></i>
        换一批
      </div>
    </div>
    <div class="tuijian_user">
      <el-skeleton
        :class="randomuser_skeleton_item"
        :loading="loading"
        animated
        :rows="1"
      >
        <div
          class="user_msg"
          v-for="usermsg in usersmsg"
          :key="usermsg.userAccount"
        >
          <div class="user_msg_left">
            <div class="img">
              <el-avatar  @click="gotoHome(usermsg.userAccount)" :size="46" :src="headImg(usermsg.userHeadImg)">
              </el-avatar>
            </div>
            <div class="message">
              <span class="username" @click="gotoHome(usermsg.userAccount)">{{ usermsg.userName }}</span><br />
              <span class="beiguanzhu">被关注</span>
              <span>{{ usermsg.followNum }}</span>
            </div>
          </div>
          <div class="user_msg_right" v-if="!filterFollow(usermsg.userAccount)">+ 关注</div>
          <div class="user_msg_right_right" v-else>已关注</div>
        </div>
      </el-skeleton>
      <el-skeleton
        :class="randomuser_skeleton_item"
        :loading="loading"
        animated
        :rows="1"
      >
      </el-skeleton>
      <el-skeleton
        :class="randomuser_skeleton_item"
        :loading="loading"
        animated
        :rows="1"
      >
      </el-skeleton>
      <el-skeleton
        :class="randomuser_skeleton_item"
        :loading="loading"
        animated
        :rows="1"
      >
      </el-skeleton>
      <el-skeleton
        :class="randomuser_skeleton_item"
        :loading="loading"
        animated
        :rows="1"
      >
      </el-skeleton>
      <el-skeleton
        :class="randomuser_skeleton_item"
        :loading="loading"
        animated
        :rows="1"
      >
      </el-skeleton>
    </div>
  </div>
</template>
<script>
import * as api from '../../api/index'
export default {
  name: 'random-user',
  data: function () {
    return {
      usersmsg: [],
      isLoading: 'el-icon-refresh',
      loading: true,
      randomuser_skeleton_item: 'randomuser_skeleton_item',
    }
  },
  computed: {
    
  },
  created() {
    this.findUsers()
  },
  methods: {
    headImg(value){
      return this.urlJudge(value)
    },
    gotoHome(userAccount) {
      if (this.checkRoutingFirst(this, '/home')) {
        this.$router.push({
          name: 'home',
          params: {
            userAccount: userAccount,
          },
        })
      }
    },
    findUsers() {
      this.isLoading = 'el-icon-loading'
      this.loading = true
      this.randomuser_skeleton_item = 'randomuser_skeleton_item'
      api.randomUser(0).then((res) => {
        this.usersmsg = res.data
        this.isLoading = 'el-icon-refresh'
        this.loading = false
        this.randomuser_skeleton_item = ''
      })
    },
    filterFollow(account) {
      const followedPresenter =
        this.$store.state.userInfo.user.followedPresenter
      if (followedPresenter.indexOf(account) === -1) {
        return false
      } else {
        return true
      }
    },
  },
}
</script>
<style scope>
.randomuser_skeleton_item {
  width: 300%;
  margin-top: 20px;
  margin-bottom: 47px;
}
.randomUser {
  height: auto;
  border-radius: 10px;
  width: 100%;
  background-color: white;
  padding-bottom: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.randomUser .head {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 88%;
  color: #909399;
}
.head_right:hover {
  cursor: pointer;
}
.tuijian_user {
  margin-top: 20px;
  width: 88%;
}
.tuijian_user .user_msg {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
}
.tuijian_user .user_msg_left {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tuijian_user .user_msg_left .img {
  margin-right: 10px;
}
.tuijian_user .user_msg_left .message {
  color: #909399;
  font-size: 12px;
  line-height: 22.5px;
}
.tuijian_user .user_msg_left .message .username {
  color: #303133;
  font-size: 14px;
}
.tuijian_user {
  color: #46b3e6;
}
.user_msg_right {
  color: #46b3e6;
  border: 1px solid #ffffff;
  padding: 2px 8px;
}
.user_msg_right_right {
  color: #46b3e6;
  border-radius: 20px;
  border: 1px solid #46b3e6;
  padding: 2px 8px;
}
.user_msg_right:hover,.user_msg_right_right:hover,
.username:hover {
  cursor: pointer;
}
.user_msg_right:hover {
  color: #3bb0e6;
}
.tuijian_user .user_msg_left .message .username:hover {
  color: #3bb0e6;
}
.beiguanzhu {
  margin-right: 4px;
}
</style>