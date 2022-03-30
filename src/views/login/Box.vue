<template>
  <div class="box">
    <img class="text_logo" src="../../assets/text-logo.png" alt="logo" />
    <div class="left_app">
      <img src="../../assets/logo.png" alt="" />
      <div class="download_button">下载APP(Android)</div>
    </div>
    <div class="right_input">
      <div class="login_nav">
        <div class="login_box" :class="loginClass" @click="loginClick">
          登录
        </div>
        <span>·</span>
        <div class="register_box" :class="registerClass" @click="registerClick">
          注册
        </div>
      </div>
      <div class="login-register-box">
        <loginBox v-if="isBox"></loginBox>
        <registerBox v-else></registerBox>
      </div>
    </div>
  </div>
</template>
<script>
import loginBox from '@/components/login/Login.vue'
import registerBox from '@/components/login/Register.vue'
export default {
  name: 'login-box',
  data() {
    return {
      loginClass: {
        select: true,
      },
      registerClass: {
        select: false,
      },
      isBox: true,
    }
  },
  components: {
    loginBox,
    registerBox,
  },
  methods: {
    loginClick() {
      this.loginClass.select = true
      this.registerClass.select = false
      this.isBox = true
    },
    registerClick() {
      this.loginClass.select = false
      this.registerClass.select = true
      this.isBox = false
    },
  },
  mounted() {
    this.$store.commit('index/updateHasHead', false)
  },
  beforeDestroy() {
    this.$store.commit('index/updateHasHead', true)
  },
}
</script>
<style scope>
.download_button {
  margin-top: 40px;
  width: 100%;
  padding: 0px 20px;
  font-size: 18px;
  line-height: 48px;
  color: white;
  text-align: center;
  background-color: #46b3e6;
  border-radius: 360px;
}
.box {
  width: auto;
  height: 70%;
  margin: auto;
  display: flex;
  padding-left: 100px;
  justify-content: right;
  color: rgb(117, 117, 117);
  font-size: 18px;
}
.text_logo {
  position: absolute;
  left: 3%;
  top: 4%;
  width: 150px;
  height: auto;
}
.right_input {
  width: 400px;
  height: 500px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgb(219, 219, 219) 1px 1px 30px 5px;
  border-radius: 5px;
}
.login_nav div,
.login_nav span {
  float: left;
}
.login_nav div:hover,
.download_button:hover {
  cursor: pointer;
}
.login_nav span {
  margin: 0px 20px;
  padding-top: 5px;
}
.login_box,
.register_box {
  padding: 5px 13px;
}
.login_box:hover,
.register_box:hover {
  border-bottom: 2px #46b3e6 solid;
}
.select {
  font-weight: bold;
  color: #46b3e6;
  border-bottom: 2px #46b3e6 solid;
}
.login_nav {
  margin: 50px 0px;
}
.left_app {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  margin-right: 120px;
}
.left_app img {
  width: 100%;
}
</style>