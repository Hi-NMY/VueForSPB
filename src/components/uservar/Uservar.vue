<template>
  <div class="uservar">
    <div class="uname">
      <h3>{{ user.userInfo.userName }}</h3>
    </div>
    <div class="hand_info">
      <span>签到天数:</span>&nbsp;
      <span class="qiandao">{{ user.userInfo.userLongday }}</span
      >&nbsp;&nbsp;&nbsp;&nbsp; <span v-show="userBadge">徽章</span>&nbsp;
      <img src="../../assets/logo.png" v-show="userBadge" />
    </div>
    <div class="qianming">
      {{ userProfile }}
    </div>
    <div class="info_box">
      <div class="box_left">
        <div class="number">{{ user.followPresenter.length }}</div>
        <div class="title_text">关注</div>
      </div>
      <div class="box_middle">
        <div class="number">{{ user.followedPresenter.length }}</div>
        <div class="title_text">被关注</div>
      </div>
      <div class="box_right">
        <div class="number">1</div>
        <div class="title_text">动态</div>
      </div>
      <div class="box_right2">
        <div class="number">1</div>
        <div class="title_text">徽章</div>
      </div>
    </div>
    <div class="userinfo_button1" @click="home">
      <div class="button_left">
        <i class="el-icon-user"></i>&nbsp;&nbsp;
        <span>个人空间</span>
      </div>
      <div class="button_right">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <hr class="xian" />
    <div class="userinfo_button6" @click="loginOut">
      <div class="button_left">
        <i class="el-icon-switch-button"></i>&nbsp;&nbsp;
        <span>退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'user-var',
  data() {
    return {}
  },
  computed: {
    ...mapState('userInfo', ['user']),
    userProfile() {
      const userProfile = this.$store.state.userInfo.user.userProfile
      if (userProfile) {
        return userProfile
      } else {
        return '快去为自己写一句话吧！'
      }
    },
    userBadge() {
      const badge = this.$store.state.userInfo.user.userBadge
      return badge ? true : false
    },
  },
  methods: {
    loginOut() {
      this.$bus.$emit('clearSelect', '/index')
      this.$bus.$emit('returnIndex')
      this.$store.commit('index/updateIsLogin', false)
      localStorage.removeItem('user')
      this.$router.replace({
        path: '/refresh',
      })
    },
    home() {
      if (this.checkRouting(this, '/home')) {
        this.$router.push({
          path: '/home',
        })
      }
    },
  },
}
</script>

<style scoped>
.uservar {
  /*border: 1px solid lightgray;*/
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 260px;
  /*height: 480px;*/
  height: 340px;
  background-color: white;
  border-radius: 10px;
  z-index: 3;
}
.uname {
  position: absolute;
  top: 45px;
  text-align: center;
  width: 100%;
  color: black;
  /*height: 10px;*/
}
.hand_info {
  position: absolute;
  height: 30px;
  top: 80px;
  font-size: 12px;
  color: gray;
  /*line-height: 25px;*/
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.qiandao {
  color: black;
  font-size: 16px;
}
.hand_info img {
  height: 20px;
  width: 20px;
  border-radius: 50%;
}
.qianming {
  position: absolute;
  top: 95px;
  margin: 20px 40px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 180px;
  color: lightgray;
  text-align: center;
}
.info_box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: 130px;
  margin: 20px 30px;
  width: 200px;
}
.number {
  color: black;
  font-size: 16px;
  font-weight: bold;
}
.title_text {
  color: gray;
  font-size: 14px;
}
/*.userinfo_button1,.userinfo_button2,.userinfo_button3,.userinfo_button4,.userinfo_button5,.userinfo_button6{*/
.userinfo_button1,
.userinfo_button6 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 200px;
  margin: 20px 40px;
  width: 180px;
}
.xian {
  width: 200px;
  margin: 0px 30px;
  position: absolute;
  /*top: 420px;*/
  top: 260px;
  border: none;
  border-bottom: 1px solid whitesmoke;
}
.userinfo_button6 {
  /*top: 420px;*/
  top: 260px;
}
</style>