<template>
  <div class="topic_item_width">
    <el-image
      :src="headImg"
    >
    <img style="width:88px" slot = error src="../../assets/defaultTopic.png"/></el-image>
    <div class="topic_item_msg_width">
      <span
        class="topic_item_msg_name_width"
        @click="lookTopic(topicInfo.id, topicInfo.topicName)"
        >{{ topicInfo.topicName }}</span
      >
      <span class="topic_item_msg_des_width">{{ topicInfo.topicSlogan }}</span>
      <div class="topic_item_msg_count_width">
        <span style="color: #303133">关注</span>
        <span style="margin-left: 2px">{{ topicInfo.topicAttentionnum }}</span>
        <span style="color: #303133; margin-left: 12px">发帖</span>
        <span style="margin-left: 2px">{{ topicInfo.topicBarnum }}</span>
      </div>
      <el-button
        v-if="isAttentionTopic(topicInfo.id)"
        class="noAt_width"
        type="primary"
        round
        >关注</el-button
      >
      <el-button v-else class="At_width" type="primary" round>已关注</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopicItem',
  props: ['topicInfo'],
  computed: {
    headImg() {
      return this.urlJudge(this.topicInfo.topicImage)
    }
  },
  methods: {
    lookTopic(id, name) {
      if (this.checkRoutingFirst(this, '/topic/detailTopic')) {
        this.$router.push({
          name: 'detailTopic',
          params: {
            topicId: id,
            topicName: name,
          },
        })
      }
    },
    isAttentionTopic(index) {
      const attentionTopic = this.$store.state.userInfo.user.attentionTopicPresenter;
      return (attentionTopic.indexOf(index) == -1)
    }
  },
}
</script>

<style scope lang="scss">
.topic_item_width {
  width: 87%;
  height: auto;
  min-height: 80px;
  padding: 18px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  .el-image__inner {
    width: 90px;
    height: 90px;
    border-radius: 10px;
  }
  .el-image__inner:hover {
    cursor: pointer;
  }
}
.topic_item_msg_width {
  width: 80%;
  position: relative;
  font-size: 14px;
  margin-left: 18px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  .el-button.is-round {
    font-size: 13px;
    font-weight: bold;
    line-height: 0;
    position: absolute;
    padding: 0;
    width: 68px;
    right: 0;
    bottom: 0;
    height: 30px;
    border: 1px solid #46b3e6;
  }
  .noAt_width {
    color: white;
    background-color: #46b3e6;
  }
  .noAt_width:hover {
    background-color: #46b3e6bc;
    border: 1px solid #46b3e6bc;
  }
  .At_width {
    color: #46b3e6;
    border: 1px solid #46b3e6;
    background-color: #ffffff;
    padding: 2px 8px;
  }
}
.topic_item_msg_name_width {
  font-weight: bold;
  font-size: 18px;
}

.topic_item_msg_name_width:hover {
  cursor: pointer;
  color: #46b3e6;
}
.topic_item_msg_des_width {
  margin-top: 5px;
  width: auto;
  height: auto;
  font-size: 13px;
  color: #909399;
}
.topic_item_msg_count_width {
  position: absolute;
  font-size: 13px;
  color: #909399;
  bottom: 0;
}
</style>