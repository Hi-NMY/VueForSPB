<template>
  <div class="head">
    <img src="../../assets/text-logo.png" class="head_img" />
    <el-menu
      :default-active="headIndex"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="rgb(70,179,230)"
      router
    >
      <el-menu-item index="/index">
        <i class="el-icon-aim"></i>
        {{ indexName }}
      </el-menu-item>
      <el-menu-item index="/downLoadApp" v-show="!isLogin">
        <i class="el-icon-download"></i>
        下载App
      </el-menu-item>
      <el-menu-item index="/topic">
        <i class="el-icon-chat-line-square"></i>
        话题
      </el-menu-item>
      <el-menu-item index="/follow" v-show="isLogin">
        <i class="el-icon-c-scale-to-original"></i>
        关注
      </el-menu-item>
      <el-menu-item index="/message" v-show="isLogin">
        <i class="el-icon-chat-dot-round"></i>
        消息
      </el-menu-item>
    </el-menu>
    <div class="search">
      <el-input
        type="text"
        placeholder="按下enter搜索"
        v-model="search"
        @keyup.enter.native="querySearch"
      ></el-input>
      <button>
        <i class="el-icon-search"></i>
      </button>
    </div>
    <div class="head_right">
      <template v-if="!isLogin">
        <button @click="login()">登录</button>
        <button @click="register()">注册</button>
      </template>
      <template v-else>
        <div
          class="i"
          @mouseenter="showUserMsg(1)"
          @mouseleave="showUserMsg(2)"
        >
          <div>
            <el-avatar :class="headImgAnima" :size="50" :src="headImg">
            </el-avatar>
            <transition name="el-fade-in-linear">
              <div v-show="userMsg" class="userMsgVar">
                <user-var></user-var>
              </div>
            </transition>
          </div>
        </div>
      </template>
      <button class="sign" @click="gotoSign">签到</button>
    </div>
  </div>
</template>

<script>
import UserVar from '@/components/uservar/Uservar'
export default {
  name: 'Head',
  data() {
    return {
      headIndex: '',
      search: '',
      userMsg: false,
      headImgAnima: {
        imgAnima: false,
        imgAnimaI: true,
      },
    }
  },
  watch: {
    //解决浏览器前进后退按钮，导航正常高亮显示
    $route(to, from) {
      this.headIndex = '/' + to.path.split('/')[1]
    }
  },
  components: {
    UserVar,
  },
  computed: {
    headImg() {
      return this.urlJudge(this.$store.state.userInfo.user.userInfo.userHeadImage)
    },
    isLogin() {
      const isLogin = this.$store.state.index.isLogin
      return isLogin
    },
    indexName() {
      return this.$store.state.index.isLogin ? '发现' : '首页'
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      this.headIndex = key
      window.localStorage.setItem('headIndex', this.headIndex)
      switch (key) {
        case '/index':
          this.$bus.$emit('returnIndex')
          break
        case '5':
          break
        case '6':
          break
        case '7':
          break
        default:
          break
      }
    },
    login() {
      this.$router.push({
        path: '/login',
      })
    },
    register() {
      this.$router.push({
        path: '/login',
      })
    },
    showUserMsg(v) {
      if (v == 1) {
        this.userMsg = true
        this.headImgAnima.imgAnima = true
        this.headImgAnima.imgAnimaI = false
      }
      if (v == 2) {
        this.userMsg = false
        this.headImgAnima.imgAnima = false
        this.headImgAnima.imgAnimaI = true
      }
    },
    clearSelect(v) {
      this.userMsg = false
      this.headImgAnima.imgAnima = false
      this.headImgAnima.imgAnimaI = true
      this.headIndex = v
    },
    gotoSign() {
      this.$store.commit('index/getLoginAuthority', {
        _this: this,
        goto: (key) => {
          if (key) {
            if (this.checkRoutingFirst(this, '/sign')) {
              this.$router.push({
                name: 'sign'
              })
            }
          }
        }
      })
    },
    querySearch() {
      const routerUrl = this.$router.resolve({
        name: 'sNoVideoP',
        query: {
          search:this.search
        }
      })
      window.open(routerUrl.href, '_back')
    },
    setSearch(s){
      this.search = s
    }
  },
  mounted() {
    if (this.$route.path.split('/')[1]) {
      this.headIndex = '/' + this.$route.path.split('/')[1]
    } else {
      this.headIndex = '/index'
    }
    this.$bus.$on('clearSelect', this.clearSelect)
    this.$bus.$on('setSearch', this.setSearch)
  },
}
</script>

<style scoped>
.head {
  background-color: #ffffff;
  white-space: nowrap;
  display: flex;
  align-items: center;
  border: 1px solid rgb(243, 243, 243);
  height: 60px;
  width: inherit;
  position: fixed;
  z-index: 2;
}
.head_img {
  z-index: 1;
  width: 100px;
  height: auto;
  margin-left: 40px;
  float: left;
}
.el-menu.el-menu--horizontal {
  margin-left: 6%;
  border: none;
  height: 100%;
  width: auto;
  display: flex;
  text-align: center;
  align-items: center;
}

.el-menu--horizontal > .el-menu-item {
  white-space: nowrap;
  margin: 0px 15px;
  height: 100%;
  padding: 0px 10px;
  font-size: 16px;
  color: #303133;
  width: auto;
  text-align: center;
  border: none;
}
.el-menu--horizontal > .el-menu-item:hover {
  background-color: rgb(245, 245, 245);
}
.search {
  width: 15%;
  min-width: 100px;
  margin-left: 60px;
  margin-right: 20px;
  top: 12px;
  float: left;
  display: flex;
}
/deep/ .el-input__inner {
  background-color: rgb(239, 239, 239);
  border-radius: 20px 0 0 20px;
  border: 1px solid #dcdfe6;
  border-right: 0;
  padding: 0px 0px 0px 15px;
}
/deep/ .el-input__inner:focus {
  border: 1px solid #dcdfe6;
  border-right: none;
  /*outline: none;*/
}
/deep/ .el-input__inner:hover {
  border: 1px solid #dcdfe6;
  border-right: none;
  /*outline: none;*/
}

.search button {
  width: auto;
  padding: 0px 10px;
  border-radius: 0 20px 20px 0;
  border: 1px solid #dcdfe6;
  border-left: 0;
  z-index: 99;
}
.head_right {
  margin-right: 40px;
  margin-left: auto;
  height: 100%;
  width: auto;
  display: flex;
  text-align: center;
  align-items: center;
}
.head_right:hover {
  cursor: default;
}
.head_right button {
  width: auto;
  padding: 7px 25px;
  height: auto;
  margin: 0px 5px;
  border-radius: 20px;
  border: 1px solid rgb(255, 255, 255);
  font-size: 18px;
  background-color: white;
  color: gray;
}
.head_right button:hover {
  color: rgb(70, 179, 230);
  border: 1px solid rgb(70, 179, 230);
}
.head_right .sign {
  margin-right: 40px;
  margin-left: 40px;
  color: white;
  border: 1px solid rgb(70, 179, 230);
  background-color: rgb(70, 179, 230);
}
.head_right .sign:hover {
  color: white;
}
.head_right .i {
  width: auto;
  height: 100%;
  border-radius: 0;
  margin-right: 30px;
  display: flex;
  align-items: center;
}

/* .head_right img {
  z-index: 4;
  width: 45px;
  height: 100%;
  margin-left: 10px;
  border-radius: 40px;
} */

.el-avatar {
  margin-left: 10px;
  z-index: 99;
}
.imgAnima {
  z-index: 100;
  transform: scale(1.5);
  transition: all 0.1s;
  position: relative;
  top: 22px;
}
.imgAnimaI {
  z-index: 100;
  transform: scale(1);
  transition: all 0.1s;
  position: relative;
  top: 0px;
}
.head_right .i div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.head_right .i div i {
  margin-left: 5px;
  margin-right: 10px;
}
.head_right .i:hover {
  /*background-color: rgb(245, 245, 245);*/
  cursor: pointer;
}
.head_right button:hover {
  cursor: pointer;
}
.userMsgVar {
  width: auto;
  height: auto;
  position: absolute;
  top: 60px;
  margin-left: 10px;
}
</style>