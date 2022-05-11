<template>
  <div class="detail_topic">
    <div class="detail_topic_head_bg">
      <img class="detail_topic_head_bg_img" :src="bgImg" />
      <div class="detail_topic_head_head_img">
        <el-image :src="headImg">
          <img
            style="width: 88px"
            slot="error"
            src="../../assets/defaultTopic.png"
          />
        </el-image>
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
          v-if="!isAtention"
          class="noAt"
          type="primary"
          @click="toAttention()"
          round
          >关注</el-button
        >
        <el-button v-else class="At" type="primary" @click="toAttention()" round
          >已关注</el-button
        >
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
          v-for="item in postBarList"
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
      <div style="width: 100%; text-align: center">加载中，请稍后.....</div>
    </div>
  </div>
</template>
<script>
import barItem from '@/components/bar/BarItem.vue'
import { getTopicFull, getNewTopicPostBar, getHotTopicPostBar, getVideoTopicPostBar } from '@/api/topic'
import { listLoad } from '@/mixin/list'
export default {
  name: 'DetailTopic',
  mixins: [listLoad],
  props: [
    'topicId',
    'topicName'
  ],
  data() {
    return {
      topicNav: '1',
      postBarList: [],
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
        id: 0,
        pbThumbNum: -1,
      },
      firstQuery: {
        topicId: -1,
        topicName: ''
      },
      isAtention: false
    }
  },
  computed: {
    headImg() {
      return this.urlJudge(this.topicInfo.topicImage)
    },
    bgImg() {
      if (!this.topicInfo.topicImage) {
        return require('../../assets/defaultTopic.png')
      }
      const a = this.topicInfo.topicImage.lastIndexOf('.')
      const str = this.topicInfo.topicImage.substring(0, a) + 'A' + this.topicInfo.topicImage.substring(a)
      return this.urlJudge(str)
    }
  },
  components: {
    barItem,
  },
  methods: {
    initTopic() {
      this.firstQuery.topicId = this.topicId
      this.firstQuery.topicName = this.topicName
      getTopicFull(this.firstQuery).then((res) => {
        this.topicInfo = res.data
        const attentionTopic = this.$store.state.userInfo.user.attentionTopicPresenter;
        this.isAtention = !(attentionTopic.indexOf(this.topicInfo.id) == -1)
        this.queryParam.pbTopic = this.topicInfo.topicName
        this.refresh()
      })
    },
    handleClick(tab, event) {
      this.queryParam.id = 0
      this.queryParam.pbThumbNum = -1
      this.queryParam.id = 0
      this.refresh()
    },
    refresh() {
      this.beforeRefresh()
      this.obtainData()
    },
    obtainData() {
      switch (this.topicNav) {
        case '1':
          getNewTopicPostBar(this.queryParam).then((res) => {
            if (this.queryParam.id == 0) {
              this.postBarList = res.data
            } else {
              this.postBarList.push.apply(this.postBarList, res.data)
            }
            if (this.postBarList.length != 0) {
              this.queryParam.id = this.postBarList[this.postBarList.length - 1].id
            }
            this.afterRefresh()
          })
          break;
        case '2':
          getHotTopicPostBar(this.queryParam).then((res) => {
            if (this.queryParam.pbThumbNum == -1) {
              this.postBarList = res.data
            } else {
              this.postBarList.push.apply(this.postBarList, res.data)
            }
            if (this.postBarList.length != 0) {
              this.queryParam.pbThumbNum = this.postBarList[this.postBarList.length - 1].pbThumbNum
            }
            this.afterRefresh()
          })
          break;
        case '3':
          getVideoTopicPostBar(this.queryParam).then((res) => {
            if (this.queryParam.id == 0) {
              this.postBarList = res.data
            } else {
              this.postBarList.push.apply(this.postBarList, res.data)
            }
            if (this.postBarList.length != 0) {
              this.queryParam.id = this.postBarList[this.postBarList.length - 1].id
            }
            this.afterRefresh()
          })
          break;
      }
    },
    beforeRefresh() {
      this.loading = true
      this.skeletonItem = 'skeleton_item'
    },
    afterRefresh() {
      this.loadAfter()
      this.loading = false
      this.skeletonItem = ''
    },
    returnPage() {
      this.$router.back()
    },
    toAttention() {
      this.$store.commit('index/getLoginAuthority', {
        _this: this,
        goto: (key) => {
          if (key) {
            if (this.isAtention) {
              this.$store.dispatch('userInfo/removeAttentionTopic', {
                query: {
                  topicId: this.topicInfo.id,
                  topicName: this.topicInfo.topicName
                },
                _this: this,
                goto: () => {
                  this.isAtention = !this.isAtention
                }
              })
            } else {
              this.$store.dispatch('userInfo/addAttentionTopic', {
                query: {
                  topicId: this.topicInfo.id,
                  topicName: this.topicInfo.topicName
                },
                _this: this,
                goto: () => {
                  this.isAtention = !this.isAtention
                }
              })
            }
          }
        }
      })
    },
  },
  mounted() {
    this.initTopic()
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