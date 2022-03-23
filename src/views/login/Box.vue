<template>
  <div class="box">
    <img class="text-logo" src="../../assets/text-logo.png" alt="logo">
    <div class="left-app">
        <img src="../../assets/logo.png" alt="">
        <div class="download-button">
            下载APP(Android)
        </div>
    </div>
    <div class="right-input">
        <div class="login-nav">
            <div class="login-box" :class="loginClass" @click="loginClick">
                登录
            </div>
            <span>·</span>
            <div class="register-box" :class="registerClass" @click="registerClick">
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
  name: "login-box",
  data() {
      return {
          loginClass:{
              select:true,
          },
          registerClass:{
              select:false,
          },
            isBox:true
      }
  },
  components:{
      loginBox,
      registerBox
  },
  methods: {
      loginClick(){
        this.loginClass.select = true;
        this.registerClass.select = false;
        this.isBox = true
      },
      registerClick(){
        this.loginClass.select = false;
        this.registerClass.select = true;
        this.isBox = false
      }
    }
};
</script>
<style scope>
.download-button{
    margin-top: 40px;
    width: 100%;
    padding: 0px 20px;
    font-size: 18px;
    line-height: 48px;
    color: white;
    text-align: center;
    background-color: #46B3E6;
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
  font-family: '微软雅黑';
}
.text-logo{
    position: absolute;
    left: 3%;
    top: 4%;
    width: 150px;
    height: auto;
}
.right-input {
  width: 400px;
  height: 500px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgb(219, 219, 219) 1px 1px 30px 5px;
  border-radius: 5px;
}
.login-nav div,.login-nav span{
    float: left;
}
.login-nav div:hover,.download-button:hover{
    cursor: pointer;
}
.login-nav span{
    margin: 0px 20px;
    padding-top: 5px;
}
.login-box,.register-box{
    padding: 5px 13px;
}
.login-box:hover,.register-box:hover{
   border-bottom: 2px #46B3E6 solid;
}
.select{
    font-weight: bold;
    color: #46B3E6;
    border-bottom: 2px #46B3E6 solid;
}
.login-nav{
    margin: 50px 0px;
}
.left-app{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 150px;
    margin-right: 120px;
}
.left-app img{
    width: 100%;
}
</style>