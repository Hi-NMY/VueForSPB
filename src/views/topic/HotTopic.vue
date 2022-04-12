<template>
  <div class="hot_topic">
    <div class="hot_topic_title">热点话题</div>
    <div
      class="hot_topic_itembox"
      v-for="(topic, index) in topicList"
      :key="index"
    >
      <div v-show="index > 4" class="hot_id">{{ index + 1 }}</div>
      <div v-show="index < 5" class="hot_id_img">
        <i :class="idList[index]"></i>
      </div>
      <topic-item-width :topicInfo="topic"></topic-item-width>
    </div>
  </div>
</template>

<script>
import topicItemWidth from '@/components/topic/topicItemWidth.vue'
import { hotTopic } from '@/api/index'
export default {
  name: 'HotTopic',
  components: {
    topicItemWidth,
  },
  data() {
    return {
      topicList: [],
      idList:['iconfont icon-one','iconfont icon-two','iconfont icon-three','iconfont icon-four','iconfont icon-five']
    }
  },
  mounted() {
    hotTopic().then((res) => {
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
.hot_topic_itembox {
  margin: 18px 18px 18px 0px;
  display: flex;
  align-items: center;
  .hot_id {
    width: 68px;
    height: 68px;
    font-size: 18px;
    line-height: 68px;
    text-align: center;
  }
  .hot_id_img {
    width: 68px;
    height: 68px;
    display: flex;
    align-items: center;
    i {
      margin: 0px auto;
    }
    .iconfont.icon-one{
      font-size: 62px;
      color: red;
    }
    .iconfont.icon-two{
      font-size: 52px;
      color: rgb(255, 208, 0);
    }
    .iconfont.icon-three{
      font-size: 46px;
      color: #e93b81;
    }
    .iconfont.icon-four{
      font-size: 38px;
      color: #a685e2;
    }
    .iconfont.icon-five{
      font-size: 34px;
      color: #4d80e4;
    }
  }
}
.hot_topic_title {
  font-size: 16px;
  margin-left: 12px;
  margin-top: 7px;
  margin-bottom: 8px;
}
</style>