<template>
  <div class="home">
    <!-- <head-box></head-box> -->
    <div class="home_main">
      <div class="home_main_left">
        <el-row>
          <el-col :key="account" :span="12">
            <h2>个人空间</h2>
            <el-menu
              :default-active="homeIndex"
              class="el-menu-vertical-demo"
              @select="handleSelect"
              router
              active-text-color="#46B3E6"
            >
              <el-menu-item :index="urlList[0]">
                <i class="iconfont icon-jurassic_user"></i>
                <span slot="title">{{ titleOne }}</span>
              </el-menu-item>
              <el-menu-item :index="urlList[1]">
                <i class="iconfont icon-wodeguanzhu"></i>
                <span slot="title">{{ titleTwo }}</span>
              </el-menu-item>
              <el-menu-item :index="urlList[2]">
                <i class="iconfont icon-yonghu"></i>
                <span slot="title">{{ titleThree }}</span>
              </el-menu-item>
              <el-menu-item v-show="!isOtherUser" :index="urlList[3]">
                <i class="iconfont icon-wodeshoucang"></i>
                <span slot="title">我的收藏</span>
              </el-menu-item>
              <el-menu-item v-show="!isOtherUser" :index="urlList[4]">
                <i class="iconfont icon-shezhi"></i>
                <span slot="title">个人信息管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div v-if="isAlreadyLoad" class="home_main_right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      isAlreadyLoad: false,
      homeIndex: '',
      isOtherUser: false,
      urlList: [],
      account: '',
    }
  },
  watch: {
    $route(to, from) {
      this.homeIndex = to.path
    },
  },
  computed: {
    titleOne() {
      return this.isOtherUser ? '他的主页' : '我的主页'
    },
    titleTwo() {
      return this.isOtherUser ? '他的关注' : '我的关注'
    },
    titleThree() {
      return this.isOtherUser ? '关注他的' : '关注我的'
    },
  },
  components: {},
  methods: {
    handleSelect(key, keyPath) {
      this.homeIndex = key
      window.localStorage.setItem('homeIndex', this.homeIndex)
    },
    init() {
      let path = this.$route.path
      const userAccount = path.substring(path.lastIndexOf('/') + 1)
      if (this.account == userAccount) {
        return
      }
      this.isAlreadyLoad = false
      this.account = userAccount
      this.urlList = [
        '/home/userHome/' + userAccount,
        '/home/userFollow/' + userAccount,
        '/home/userFollowed/' + userAccount,
        '/home/userCollect/' + userAccount,
        '/home/userInformation/' + userAccount,
      ]
      this.homeIndex = path
      if (userAccount != this.$store.state.userInfo.user.userInfo.userAccount) {
        this.isOtherUser = true
        this.$store.dispatch('home/obtainUserInfo', {
          userAccount,
          goto: (key) => {
            if (key) {
              this.isAlreadyLoad = true
            } else {
              this.$message({
                duration: 2000,
                showClose: true,
                message: '双向关注才能查看他(她)的主页哦^_^',
              })
            }
          },
        })
      } else {
        this.isOtherUser = false
        this.isAlreadyLoad = true
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.$bus.$emit('clearSelect', '/home')
  },
  updated() {
    this.init()
  }
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