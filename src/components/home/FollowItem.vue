<template>
  <div class="folllow_msg">
    <div class="folllow_msg_left">
      <div class="img">
        <el-avatar :size="60" :src="headImg" @click.native="gotoHome">
        </el-avatar>
      </div>
      <div class="message">
        <div>
          <span class="folllow_name" @click="gotoHome">{{
            follow.userName
          }}</span>
          <i :class="sexClass"></i>
          <el-image v-if="follow.userBadge" :src="badgeImg"></el-image>
        </div>
        <div>
          <span>{{ follow.userProfile }}</span>
        </div>
      </div>
    </div>
    <div class="folllow_msg_right" v-if="isfollow2">已关注</div>
    <div class="folllow_msg_right_no" v-else>未关注</div>
  </div>
</template>

<script>
export default {
  name: 'FollowItem',
  props: ['follow'],
  data() {
    return {
      isfollow: false,
      isfollow2: true,
      sexClass: 'iconfont icon-girl'
    }
  },
  computed: {
    headImg() {
      return this.urlJudge(this.follow.userHeadImg)
    },
    badgeImg() {
      return this.urlBadgeImg(this.follow.userBadge)
    },
  },
  methods: {
    initSex() {
      if (this.follow.sex == '女') {
        this.sexClass = 'iconfont icon-girl'
      } else {
        this.sexClass = 'iconfont icon-boy'
      }
    },
    gotoHome() {
      this.$router.push({
        name: 'home',
        params: {
          userAccount: this.follow.userAccount,
        },
      })
    },
  },
  mounted() {
    this.initSex()
  },
}
</script>

<style scope lang="scss">
.folllow_msg {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 0;
  font-size: 14px;
  border-top: 1px solid #f5f5f5;
}
.folllow_msg .folllow_msg_left {
  display: flex;
  align-items: center;
  justify-content: center;
  .message {
    margin-left: 8px;
    color: #909399;
    width: 450px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    i {
      margin-top: 3px;
    }
    .iconfont.icon-girl {
      color: #ff7486;
    }
    .iconfont.icon-boy {
      color: #4bb7ea;
    }
    div {
      display: flex;
      flex-direction: row;
    }
    .folllow_name {
      color: #303133;
      font-size: 14px;
      font-weight: bold;
      margin-right: 4px;
      margin-bottom: 10px;
    }
    .folllow_name:hover {
      color: #46b3e6;
      cursor: pointer;
    }
    .el-image__inner {
      width: 24px;
      height: 24px;
    }
  }
  .img:hover {
    cursor: pointer;
  }
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
</style>