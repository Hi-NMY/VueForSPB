<template>
  <div id="app">
    <head-box v-show="this.$store.state.index.hasHead"></head-box>
    <router-view />
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
        }
      })
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
  display: flex;
  height: auto;
  min-height: 700px;
  overflow-x: hidden;
  height: 100%;
  overflow: auto;
}
</style>
