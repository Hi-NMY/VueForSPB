<template>
  <div class="hot_topic">
    <div class="hot_topic_title">热点话题</div>
    <div class="hot_topic_itembox" v-for="topic in topicList" :key="topic.id">
      <div class="hot_id">{{topic.id}}</div>
      <topic-item-width :topicInfo="topic"></topic-item-width>
    </div>
  </div>
</template>

<script>
import topicItemWidth from '@/components/topic/topicItemWidth.vue'
import { queryHotTopic } from '@/api/topic'
export default {
  name: 'HotTopic',
  components: {
    topicItemWidth,
  },
  data() {
    return {
      topicList: [],
    }
  },
  mounted() {
    queryHotTopic('').then((res) => {
      this.topicList = res.data
    })
  },
}
</script>

<style scope lang="scss">
.hot_topic {
  min-height: 700px;
  border-radius: 10px;
  background-color: white;
  padding: 18px 0px 18px 0px;
  overflow: hidden;
}
.hot_topic_itembox{
  margin: 18px 18px 18px 0px;
  display: flex;
  align-items: center;
  .hot_id{
    width: 68px;
    height: 68px;
    font-size: 18px;
    line-height: 68px;
    text-align: center;
  }
}
.hot_topic_title{
  font-size: 16px;
  margin-left: 12px;
  margin-top: 7px;
  margin-bottom: 8px;
}
</style>