<template>
  <div class="home">
    <!-- <head-box></head-box> -->
    <div class="home_main">
      <div class="home_main_left">
        <el-row>
          <el-col :span="12">
            <h2>个人空间</h2>
            <el-menu
              :default-active="homeIndex"
              class="el-menu-vertical-demo"
              @select="handleSelect"
              router
              active-text-color="#46B3E6"
            >
              <el-menu-item index="/home/UserHome">
                <i class="iconfont icon-jurassic_user"></i>
                <span slot="title">我的主页</span>
              </el-menu-item>
              <el-menu-item index="/home/UserFollow">
                <i class="iconfont icon-wodeguanzhu"></i>
                <span slot="title">我的关注</span>
              </el-menu-item>
              <el-menu-item index="/home/UserFollowed">
                <i class="iconfont icon-yonghu"></i>
                <span slot="title">关注我的</span>
              </el-menu-item>
              <el-menu-item index="/home/UserCollect">
                <i class="iconfont icon-wodeshoucang"></i>
                <span slot="title">我的收藏</span>
              </el-menu-item>
              <el-menu-item index="/home/UserInformation">
                <i class="iconfont icon-shezhi"></i>
                <span slot="title">个人信息管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="home_main_right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// import headBox from "@/components/head/Head.vue";
export default {
  name: 'home',
  data() {
    return {
      homeIndex: '/home/UserHome',
    }
  },
  watch: {
    //解决浏览器前进后退按钮，导航正常高亮显示
    $route(to, from) {
      this.homeIndex = to.path
    },
  },
  components: {
    // headBox,
  },
  methods: {
    handleSelect(key, keyPath) {
      this.homeIndex = key
      window.localStorage.setItem('homeIndex', this.homeIndex)
    },
  },
  mounted() {
    this.homeIndex = this.$route.path
    this.$bus.$emit('clearSelect', '/home')
  },
}
</script>

<style scope lang="scss">
.home {
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home_main {
  margin: 20px 18% 0px 18%;
  height: auto;
  width: auto;
  /* border: 3px solid rgb(187, 54, 54); */
  min-width: 1000px;
  display: flex;
  align-items: left;
  margin-top: 85px;
}
.home_main_left {
  width: 18%;
  .el-menu {
    width: 180px;
    border-radius: 0 0 10px 10px;
    border: none;
    padding-bottom: 10px;
  }
  .el-menu-item.is-active:focus {
    background-color: white;
  }
}
.home_main_left h2 {
  background-color: white;
  /*border-right: solid 1px #e6e6e6;*/
  height: 50px;
  width: 180px;
  text-indent: 20px;
  line-height: 50px;
  font-weight: 500;
  border-radius: 10px 10px 0 0;
  padding: 10px 0px 0 0px;
}
.home_main_left i {
  font-size: 20px;
  margin-right: 12px;
  margin-left: 10px;
}
.home_main_right {
  margin-left: 10px;
  width: 70%;
  height: auto;
  border-radius: 10px;
  /*border: 1px solid red;*/
}
</style>