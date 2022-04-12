<template>
  <div class="detail_topic">
    <div class="detail_topic_head_bg">
      <img
        class="detail_topic_head_bg_img"
        src="https://tva3.sinaimg.cn/large/005LlRGlgy1h0vdavpdimj30dw0dmweq.jpg"
      />
      <div class="detail_topic_head_head_img">
        <el-image
          src="https://tvax3.sinaimg.cn/large/005LlRGlgy1h0vda23shrj30dw0dmwf4.jpg"
        ></el-image>
      </div>
      <div class="detail_topic_head_msg_box">
        <span class="detail_topic_head_msg_name">{{
          topicInfo.topicName
        }}</span>
        <span class="detail_topic_head_msg_des">{{
          topicInfo.topicSlogan
        }}</span>
        <div class="detail_topic_head_msg_count">
          <span style="color: #303133">关注</span>
          <span style="margin-left: 2px">{{
            topicInfo.topicAttentionnum
          }}</span>
          <span style="color: #303133; margin-left: 18px">发帖</span>
          <span style="margin-left: 2px">{{ topicInfo.topicBarnum }}</span>
        </div>
        <el-button
          v-if="isAttentionTopic(topicInfo.id)"
          class="noAt"
          type="primary"
          round
          >关注</el-button
        >
        <el-button v-else class="At" type="primary" round>已关注</el-button>
      </div>
      <i @click="returnPage" class="iconfont icon-topic_fanhui"></i>
      <div class="detail_topic_navigation">
        <div style="border-bottom: 1px solid #b6b6b646"></div>
        <el-tabs v-model="topicNav" stretch @tab-click="handleClick">
          <el-tab-pane label="最新" name="1"></el-tab-pane>
          <el-tab-pane label="热点" name="2"></el-tab-pane>
          <el-tab-pane label="视频" name="3"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="detail_topic_main">
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
import { getTopicFull,getNewTopicPostBar } from '@/api/topic'
export default {
  name: 'DetailTopic',
  props: ['topicId','topicName'],
  data() {
    return {
      topicNav: '1',
      noVidePostBarList: [],
      loading: true,
      skeletonItem: 'skeleton_item',
      topicInfo: {
        id: 0,
        topicAttentionnum: 0,
        topicBarnum: 0,
        topicImage: '',
        topicName: '',
        topicSlogan: '',
      },
      queryParam: {
        pbTopic: '',
        pbDate: '',
        pbThumbNum: -1,
      },
      firstQuery:{
        topicId: -1,
        topicName:''
      }
    }
  },
  components: {
    barItem,
  },
  methods: {
    handleClick(tab, event) {
      switch (tab.index) {
        case '1':
          this.queryParam.pbDate = ''
          break
        case '2':
          this.queryParam.pbThumbNum = -1
          break
        default:
          this.queryParam.pbDate = ''
          break
      }
      this.refresh()
    },
    refresh() {
      this.beforeRefresh()
      getNewTopicPostBar(this.queryParam).then((res) => {
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
    returnPage() {
      this.$router.back()
    },
    isAttentionTopic(index) {
      const attentionTopic =
        this.$store.state.userInfo.user.attentionTopicPresenter
      return attentionTopic.indexOf(index) == -1
    },
  },
  mounted() {
    this.firstQuery.topicId = this.topicId
    this.firstQuery.topicName = this.topicName
    getTopicFull(this.firstQuery).then((res) => {
      this.topicInfo = res.data
      this.queryParam.pbTopic = this.topicInfo.topicName
      this.refresh()
    })
  },
}
</script>

<style scope lang="scss">
.skeleton_item {
  width: auto;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: white;
}
.detail_topic {
  min-height: 700px;
  overflow: hidden;
}
.detail_topic_head_bg {
  position: relative;
  width: 100%;
  height: auto;
  .detail_topic_head_bg_img {
    width: 100%;
    object-fit: cover;
    height: 220px;
    border-radius: 10px 10px 0px 0px;
  }
  .detail_topic_head_head_img {
    top: 25%;
    left: 60px;
    position: absolute;
  }
  .el-image__inner {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }
  .detail_topic_head_msg_box {
    width: 460px;
    height: 100px;
    top: 25%;
    left: 160px;
    margin-left: 20px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: left;
    .detail_topic_head_msg_name {
      font-weight: bold;
      font-size: 18px;
    }
    .detail_topic_head_msg_des {
      margin-top: 8px;
      font-size: 14px;
      color: #606266;
    }
    .detail_topic_head_msg_count {
      position: absolute;
      font-size: 14px;
      color: #606266;
      bottom: 0;
    }
    .el-button.is-round {
      font-size: 14px;
      font-weight: bold;
      line-height: 0;
      position: absolute;
      padding: 0;
      width: 76px;
      right: -10px;
      bottom: 0;
      top: 38%;
      height: 34px;
    }
    .noAt {
      color: white;
      background-color: #46b3e6;
      border: 1px solid #46b3e6;
    }
    .noAt:hover {
      background-color: #65bce4;
      border: 1px solid #46b3e6bc;
    }
    .At {
      color: #46b3e6;
      border: 1px solid #46b3e6;
      background-color: #ffffff00;
      padding: 2px 8px;
    }
  }
}
.iconfont.icon-topic_fanhui {
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 34px;
  color: #909399;
}
.iconfont.icon-topic_fanhui:hover {
  cursor: pointer;
}
.detail_topic_navigation {
  margin-top: 20px;
  .el-tabs__nav {
    z-index: 1;
    background-color: white;
  }
  .el-tabs__nav-wrap::after {
    z-index: 0;
  }
  .el-tabs__active-bar {
    z-index: 1;
  }
  .el-tabs.el-tabs--top {
    height: 40px;
  }
  .el-tabs__item.is-active {
    color: #46b3e6;
  }
  .el-tabs__active-bar {
    background-color: #46b3e6;
  }
  .el-tabs__item:hover {
    color: #46b3e6;
  }
}
.detail_topic_navigation {
  margin-top: -6px;
}
.detail_topic_main {
  margin-top: 10px;
}
</style>