<template>
  <div class="user_home">
    <div class="user_home_head">
      <div class="user_home_head_bg">
        <img
          class="user_home_head_bg_img"
          src="https://tva4.sinaimg.cn/large/005LlRGlgy1h0k69p2l15j30tz0tzjxv.jpg"
        />
      </div>
      <div class="user_home_user_msg_box">
        <el-avatar :size="100" src="">
          <img src="../../assets/logo.png" />
        </el-avatar>
        <div class="user_home_user_msg_base">
          <div class="user_home_user_name">
            <span>{{ userName }}</span>
            <el-image
              src="https://tva4.sinaimg.cn/large/005LlRGlgy1h0k69p2l15j30tz0tzjxv.jpg"
            ></el-image>
            <el-image
              src="https://tva4.sinaimg.cn/large/005LlRGlgy1h0k69p2l15j30tz0tzjxv.jpg"
            ></el-image>
          </div>
          <div class="user_home_user_friend">
            <div class="user_home_user_follow">
              <span>关注</span>
              <span class="follow_count">12</span>
            </div>
            <div class="user_home_user_followed">
              <span>被关注</span>
              <span class="follow_count">12</span>
            </div>
          </div>
        </div>
        <div class="user_home_user_info">
          <div class="user_home_user_info_head">
            <div>
              <i class="iconfont icon-profile"></i>
              <span>暂无简介</span>
            </div>
            <i @click="showMoreMsg" class="moreMsg" :class="moreMsg"></i>
          </div>
          <div v-show="isMoreMsg" class="user_home_user_info_msg">
            <div>
              <i class="iconfont icon-home"></i>
              <span>南京</span>
            </div>
            <div>
              <i class="iconfont icon-bitrh"></i>
              <span>2020-12-23</span>
            </div>
            <div>
              <i class="iconfont icon-star"></i>
              <span>射手座</span>
            </div>
            <div>
              <i class="iconfont icon-favorite"></i>
              <span>南京</span>
            </div>
          </div>
        </div>
        <div class="user_home_navigation">
          <div style="border-bottom: 1px solid #b6b6b646"></div>
          <el-tabs v-model="userNav" stretch @tab-click="handleClick">
            <el-tab-pane label="帖子" name="1"></el-tab-pane>
            <el-tab-pane label="视频" name="2"></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="user_home_main">
      <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="6">
        <bar-item
          v-for="item in noVidePostBarList"
          :key="item.pbOneId"
          :todo="item"
          class="infinite-list-item"
        ></bar-item>
      </el-skeleton>
      <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="6">
      </el-skeleton>
      <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="6">
      </el-skeleton>
      <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="6">
      </el-skeleton>
    </div>
  </div>
</template>

<script>
import barItem from '@/components/bar/BarItem.vue'
import { queryNoVideoPostBarForDate } from '@/api/postbar'
export default {
  name: 'UserHome',
  data() {
    return {
      userNav: '1',
      moreMsg: 'iconfont icon-shangjiantou',
      noVidePostBarList: [],
      loading: true,
      skeletonItem: 'skeleton_item',
    }
  },
  components: {
    barItem,
  },
  computed: {
    userName() {
      return '看那个月亮爬上来'
    },
    isMoreMsg() {
      return this.moreMsg == 'iconfont icon-shangjiantou' ? false : true
    },
  },
  methods: {
    handleClick(tab, event) {
      this.refresh()
    },
    showMoreMsg() {
      if (this.moreMsg === 'iconfont icon-shangjiantou') {
        this.moreMsg = 'iconfont icon-xiajiantou'
      } else {
        this.moreMsg = 'iconfont icon-shangjiantou'
      }
    },
    refresh() {
      this.beforeRefresh()
      queryNoVideoPostBarForDate('').then((res) => {
        this.noVidePostBarList = res.data
        this.afterRefresh()
      })
    },
    beforeRefresh() {
      this.loading = true
      this.skeletonItem = 'skeleton_item'
    },
    afterRefresh() {
      this.loading = false
      this.skeletonItem = ''
    },
  },
  mounted() {
    this.refresh()
  },
}
</script>

<style scope lang="scss">
.user_home {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.user_home_head {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user_home_head_bg {
  width: 100%;
  height: 240px;
  .user_home_head_bg_img {
    object-fit: cover;
    width: 100%;
    height: 240px;
    border-radius: 10px 10px 0px 0px;
  }
}
.user_home_user_msg_box {
  width: 100%;
  height: auto;
  min-height: 130px;
  background-color: white;
  position: relative;
  .el-avatar {
    position: absolute;
    top: -35px;
    left: 24px;
    border: 3px solid white;
  }
}
.user_home_user_msg_base {
  position: absolute;
  left: 144px;
  top: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
}
.user_home_user_name {
  display: flex;
  align-items: center;
  .el-image__inner {
    width: 24px;
    margin-left: 5px;
  }
  span {
    font-weight: bold;
  }
}
.user_home_user_friend {
  margin-top: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  color: #939393;
  font-size: 14px;
}
.follow_count {
  margin-left: 4px;
  color: black;
}
.user_home_user_followed {
  margin-left: 20px;
}
.user_home_user_follow:hover,
.user_home_user_followed:hover {
  cursor: pointer;
  color: #46b3e6;
  .follow_count {
    color: #46b3e6;
  }
}
.user_home_user_info {
  margin-top: 90px;
  color: #939393;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    line-height: 12px;
    font-size: 13px;
    margin-left: 6px;
    font-weight: 300;
  }
  i {
    font-size: 14px;
  }
  .moreMsg {
    padding: 2px;
    background-color: #b6b6b6a1;
    border-radius: 10px;
    color: white;
  }
  .moreMsg:hover {
    cursor: pointer;
  }
}
.user_home_user_info_head {
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user_home_user_info_msg {
  width: 90%;
  display: flex;
  flex-direction: column;
  div {
    margin-top: 4px;
  }
}
.user_home_navigation {
  margin-top: 20px;
  .el-tabs__nav {
    z-index: 1;
  }
  .el-tabs__nav-wrap::after {
    z-index: 0;
  }
  .el-tabs__active-bar{
     z-index: 1;
  }
  .el-tabs.el-tabs--top {
    height: 40px;
  }
  .el-tabs__item.is-active {
    color: rgb(70, 179, 230);
  }
  .el-tabs__active-bar {
    background-color: rgb(70, 179, 230);
  }
  .el-tabs__item:hover {
    color: rgb(70, 179, 230);
  }
}
.user_home_main {
  margin-top: 10px;
}
.skeleton_item {
  width: auto;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: white;
}
</style>