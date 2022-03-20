<template>
  <div class="box">
    <div class="left-app"></div>
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
            <router-view></router-view>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login-box",
  data() {
      return {
          loginClass:{
              select:true,
          },
          registerClass:{
              select:false,
          }
      }
  },
  methods: {
      loginClick(){
        this.loginClass.select = true;
        this.registerClass.select = false;
        this.$router.push({
           name:'login'
         })
      },
      registerClick(){
         this.loginClass.select = false;
        this.registerClass.select = true;
        this.$router.push({
           name:'register'
         })
      }
    }
};
</script>
<style>
.box {
  width: 1000px;
  height: 600px;
  margin: auto;
  display: flex;
  justify-content: right;
  color: rgb(117, 117, 117);
  font-size: 18px;
  font-family: '微软雅黑';
}
.right-input {
  width: 400px;
  height: 500px;
  margin: 40px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgb(219, 219, 219) 1px 1px 30px 5px;
  border-radius: 2px;
}
.right-input div div,.right-input div span{
    float: left;
}
.right-input div span{
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
    margin-top: 40px;
}
</style>