<template>
  <div class="postbar_box">
    <div @click="obtainPostBar" class="bar_refresh">
      <i :class="refreshLoading"></i>
      刷新
    </div>
    <div>
      <el-tabs v-model="indexTab" @tab-click="handleClick">
        <el-tab-pane label="广场" name="/index/noVidePostBar"> </el-tab-pane>
        <el-tab-pane label="视频" name="/index/videoPostBar"> </el-tab-pane>
        <el-tab-pane
          v-if="isLogin"
          label="我的关注"
          name="/index/followPostBar"
        >
        </el-tab-pane>
      </el-tabs>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'postbar-box',
  data() {
    return {
      indexTab: '/index/noVidePostBar',
      refreshLoading: 'el-icon-loading',
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.index.isLogin
    },
  },
  methods: {
    handleClick(tab, event) {
      this.indexTab = tab.name
      if (this.checkRouting(this, tab.name)) {
        this.$router.replace({
          path: tab.name,
        })
      }
    },
    obtainPostBar() {
      this.beforeRefresh()
      this.$bus.$emit('refreshIndexBar')
    },
    beforeRefresh() {
      this.refreshLoading = 'el-icon-loading'
    },
    afterRefresh() {
      this.refreshLoading = 'el-icon-refresh'
    },
  },
  mounted() {
    this.indexTab = this.$route.path
    this.$bus.$on('afterRefresh', this.afterRefresh)
    this.$bus.$on('returnIndex', () => {
      this.indexTab = '/index/noVidePostBar'
    })
  },
  beforeDestroy() {
    this.$bus.$off('afterRefresh')
    this.$bus.$off('returnIndex')
  },
}
</script>
<style scope lang="scss">
.postbar_box {
  height: auto;
  position: relative;
  z-index: 1;
  /* border:1px solid aqua; */
  .el-tabs__nav-wrap::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    background-color: #e4e7ed;
    z-index: 1;
    width: 192px;
    margin-left: 10px;
  }
  .el-tabs__item.is-active {
    color: rgb(70, 179, 230);
  }
  .el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: rgb(70, 179, 230);
    z-index: 1;
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    list-style: none;
  }
  .el-tabs.el-tabs--top {
    height: 40px;
    margin-bottom: 10px;
  }
  .el-tabs__item:hover {
    color: rgb(70, 179, 230);
    cursor: pointer;
  }
  .el-tabs__nav-scroll {
    padding-left: 10px;
    overflow: hidden;
    background-color: white;
    border-radius: 10px;
  }
}
.bar_refresh {
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 1;
  color: #909399;
}
.bar_refresh:hover {
  cursor: pointer;
}
</style>