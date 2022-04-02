<template>
  <div class="topic_item_width">
    <el-image
      src="https://tva4.sinaimg.cn/large/005LlRGlgy1h0k69p2l15j30tz0tzjxv.jpg"
    ></el-image>
    <div class="topic_item_msg_width">
      <span class="topic_item_msg_name_width" @click="lookTopic(topicInfo.topicName)">{{ topicInfo.topicName }}</span>
      <span class="topic_item_msg_des_width">{{ topicInfo.topicSlogan }}</span>
      <div class="topic_item_msg_count_width">
        <span style="color: black">关注</span>
        <span style="margin-left: 2px">{{ topicInfo.topicAttentionNum }}</span>
        <span style="color: black; margin-left: 12px">发帖</span>
        <span style="margin-left: 2px">{{ topicInfo.topicBarNum }}</span>
      </div>
      <el-button class="noAt_width" type="primary" round>关注</el-button>
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

<style scope lang="scss">
.topic_item_width {
  width: 87%;
  height: auto;
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
    border: 0px;
  }
  .noAt_width {
    color: white;
    background-color: #46b3e6;
  }
  .noAt_width:hover {
    background-color: #46b3e6bc;
  }
  .At_width {
    color: #909399;
    background-color: #ffffff;
    border: 1px solid #909399;
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
  margin-top: 4px;
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