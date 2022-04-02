<template>
  <div class="topic_item">
    <el-image
      src="https://tva4.sinaimg.cn/large/005LlRGlgy1h0k69p2l15j30tz0tzjxv.jpg"
    ></el-image>
    <div class="topic_item_msg">
      <span class="topic_item_msg_name" @click="lookTopic(topicInfo.topicName)">{{ topicInfo.topicName }}</span>
      <span class="topic_item_msg_des">{{ topicInfo.topicSlogan }}</span>
      <div class="topic_item_msg_count">
        <span style="color: black">关注</span>
        <span style="margin-left: 2px">{{ topicInfo.topicAttentionNum }}</span>
        <span style="color: black; margin-left: 6px">发帖</span>
        <span style="margin-left: 2px">{{ topicInfo.topicBarNum }}</span>
      </div>
      <el-button class="noAt" type="primary" round>关注</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopicItem',
  props: ['topicInfo'],
  methods: {
    lookTopic(data){
      if (this.checkRoutingFirst(this, '/topic/detailTopic')) {
        this.$router.push({
          name:'detailTopic',
           params:{
           		topicName:data
           }
        })
      }
    }
  },
}
</script>

<style  scope lang="scss">
.topic_item {
  width: 290px;
  height: auto;
  padding: 8px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  .el-image__inner {
    width: 80px;
    height: 80px;
    border-radius: 10px;
  }
}
.topic_item_msg {
  width: 202px;
  position: relative;
  font-size: 14px;
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  .el-button.is-round {
    font-size: 13px;
    font-weight: bold;
    line-height: 0;
    position: absolute;
    padding: 0;
    width: 60px;
    right: 0;
    bottom: 0;
    height: 24px;
    border: 0px;
  }
  .noAt {
    color: white;
    background-color: #46b3e6;
  }
  .noAt:hover {
    background-color: #46b3e6bc;
  }
  .At {
    color: #909399;
    background-color: #ffffff;
    border: 1px solid #909399;
  }
}
.topic_item_msg_name {
  font-weight: bold;
}

.topic_item_msg_name:hover {
  cursor: pointer;
  color: #46b3e6;
}
.topic_item_msg_des {
  margin-top: 4px;
  width: 184px;
  word-wrap: break-word;
  height: auto;
  font-size: 12px;
  color: #909399;
}
.topic_item_msg_count {
  position: absolute;
  font-size: 12px;
  color: #909399;
  bottom: 0;
}
</style>