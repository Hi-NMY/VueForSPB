<template>
  <div class="search_body">
    <div class="search_main">
      <div class="search_main_left">
        <el-row>
          <el-col :span="12">
            <h2>搜索</h2>
            <el-menu
              :default-active="searchIndex"
              class="el-menu-vertical-demo"
              @select="handleSelect"
              active-text-color="#46B3E6"
            >
              <el-menu-item index="sNoVideoP">
                <i class="iconfont icon-zixun"></i>
                <span slot="title">帖子</span>
              </el-menu-item>
              <el-menu-item index="sVideoP">
                <i class="iconfont icon-shipin"></i>
                <span slot="title">视频</span>
              </el-menu-item>
              <el-menu-item index="sUser">
                <i class="iconfont icon-yonghu1"></i>
                <span slot="title">用户</span>
              </el-menu-item>
              <el-menu-item index="sTopic">
                <i class="el-icon-chat-line-square"></i>
                <span slot="title">话题</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="search_main_right">
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ssearch',
  data() {
    return {
      searchIndex: 'sNoVideoP',
    }
  },
  watch: {
    //解决浏览器前进后退按钮，导航正常高亮显示
    $route(to, from) {
      this.searchIndex = to.name
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      this.searchIndex = key
      window.localStorage.setItem('searchIndex', this.searchIndex)
      this.$router.push({
        name: this.searchIndex,
        query: {
          search:this.$route.query.search
        }
      })
    },
  },
  mounted() {
    this.searchIndex = this.$route.name
  },
}
</script>
<style lang="scss" scope>
.search_body {
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-icon-chat-line-square{
    font-size: 20px;
  }
}
.search_main {
  margin: 20px 18% 0px 18%;
  height: auto;
  width: auto;
  // border: 3px solid rgb(187, 54, 54);
  min-width: 1000px;
  display: flex;
  align-items: left;
  margin-top: 85px;
}
.search_main_left {
  width: 18%;
  .el-menu {
    width: 180px;
    border-radius: 0px 0px 10px 10px;
    border: none;
    padding: 10px 0px;
  }
  .el-menu-item.is-active:focus {
    background-color: white;
  }
}
.search_main_left h2 {
  background-color: white;
  /*border-right: solid 1px #e6e6e6;*/
  height: 44px;
  width: 180px;
  text-indent: 20px;
  line-height: 50px;
  font-weight: 500;
  border-radius: 10px 10px 0 0;
  padding: 10px 0px 0px 0px;
}
.search_main_left i {
  font-size: 20px;
  margin-right: 12px;
  margin-left: 10px;
}
.search_main_right {
  margin-left: 10px;
  width: 700px;
  height: auto;
  border-radius: 10px;
  /*border: 1px solid red;*/
}
</style>