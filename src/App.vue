<template>
  <div id="app" v-if="isAlreadyLogin">
    <head-box v-show="this.$store.state.index.hasHead"></head-box>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
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
import { getAlInfo } from '@/api/userInfo'
import headBox from '@/components/head/Head.vue'
import Cookies from 'js-cookie'
export default {
  name: 'App',
  components: {
    headBox,
  },
  watch: {
  },
  data() {
    return {
      isAlreadyLogin: false,
      isLoad: false
    }
  },
  methods: {
    handleScroll(e) {
      if (e.srcElement.scrollingElement.scrollTop + e.srcElement.scrollingElement.offsetHeight + 100 >= e.srcElement.scrollingElement.scrollHeight) {
        if (this.isLoad) {
          return
        }
        this.isLoad = true
        this.$bus.$emit('load')
      } else {
        this.isLoad = false
      }
    }
  },
  created() {
    let token = Cookies.get('token');
    if (!token) {
      this.isAlreadyLogin = true
      return
    }
    getAlInfo().then((res) => {
      if (res.code == 200) {
        this.$store.commit('index/updateIsLogin', true)
        this.$store.commit('userInfo/obtainUserInfo', res.data)
      } else {
        Cookies.remove('token');
        this.$message({
          duration: 1500,
          showClose: true,
          message: res.msg,
          type: 'error',
        })
      }
      this.isAlreadyLogin = true
    })

  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
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
  background-color: #f5f5f5;
  color: #303133;
  display: flex;
  width: 100%;
  height: auto;
  overflow-x: hidden;
  overflow: auto;
}
.el-dialog {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0px !important;
}
.el-popper[x-placement^='bottom'] {
  margin-top: 4px;
}
.el-popper {
  border-radius: 10px;
}
</style>
