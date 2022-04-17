<template>
  <div v-if="isAlreadyLogin" id="app">
    <head-box v-show="this.$store.state.index.hasHead"></head-box>
    <router-view />
    <el-backtop>
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            border-radius: 5px;
            color: #1989fa;
          }
        "
      >
        ↑
      </div>
    </el-backtop>
  </div>
</template>

<script>
import headBox from '@/components/head/Head.vue'
import { login } from '@/api/login'

export default {
  name: 'App',
  components: {
    headBox,
  },
  data() {
    return {
      isAlreadyLogin:false
    }
  },
  created() {
    let user = null
    try {
      user = JSON.parse(localStorage.getItem('user'))
    } catch (error) {}
    if (user) {
      login(user).then((res) => {
        if (res.code == 200) {
          this.$store.commit('index/updateIsLogin', true)
          this.$store.commit('userInfo/obtainUserInfo', res.data)
          this.isAlreadyLogin = true
        }
      })
    }else{
      this.isAlreadyLogin = true
    }
  },
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font-family: '微软雅黑';
}

#app {
  color: #303133;
  display: flex;
  height: auto;
  min-height: 800px;
  overflow-x: hidden;
  height: 100%;
  overflow: auto;
}
</style>
