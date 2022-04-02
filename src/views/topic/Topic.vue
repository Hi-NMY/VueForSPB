<template>
  <div class="topic">
    <div class="topic_main">
      <div class="topic_main_left">
        <el-row>
          <el-col :span="12">
            <el-menu
              :default-active="topicIndex"
              class="el-menu-vertical-demo"
              @select="handleSelect"
              router
              active-text-color="#46B3E6"
            >
              <el-menu-item index="/topic/hotTopic">
                <i class="iconfont icon-hotTopic"></i>
                <span slot="title">热点话题</span>
              </el-menu-item>
              <el-menu-item index="/topic/allTopic">
                <i class="iconfont icon-xingzhuang"></i>
                <span slot="title">全部话题</span>
              </el-menu-item>
              <el-menu-item index="/topic/attentionTopic">
                <i class="iconfont icon-attention"></i>
                <span slot="title">我的关注</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="topic_main_right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Topic',
  data() {
    return {
      topicIndex: '/topic/hotTopic',
    }
  },
  watch: {
    //解决浏览器前进后退按钮，导航正常高亮显示
    $route(to, from) {
      this.topicIndex = to.path
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      this.topicIndex = key
      window.localStorage.setItem('topicIndex', this.topicIndex)
    },
  },
  mounted() {
    this.topicIndex = this.$route.path
  },
}
</script>

<style scope lang="scss">
.topic {
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.topic_main {
  margin: 20px 18% 0px 18%;
  height: auto;
  width: auto;
  // border: 3px solid rgb(187, 54, 54);
  min-width: 1000px;
  display: flex;
  align-items: left;
  margin-top: 85px;
}
.topic_main_left {
  width: 18%;
  .el-menu {
    width: 180px;
    border-radius: 10px;
    border: none;
    padding: 10px 0px;
  }
  .el-menu-item.is-active:focus {
    background-color: white;
  }
}
.topic_main_left i {
  font-size: 20px;
  margin-right: 12px;
  margin-left: 10px;
}
.topic_main_right {
  margin-left: 10px;
  width: 70%;
  height: auto;
  border-radius: 10px;
  /*border: 1px solid red;*/
}
</style>