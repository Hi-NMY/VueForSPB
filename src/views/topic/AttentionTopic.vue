<template>
  <div class="att_topic">
    <div class="att_topic_head">
      <div class="att_topic_title">关注的话题</div>
      <div class="search_topic">
        <button>
          <i class="el-icon-search"></i>
        </button>
        <el-input
          type="text"
          placeholder="搜索话题"
          v-model="search"
        ></el-input>
      </div>
    </div>
    <div class="att_topic_item_box" v-for="topic in topicList" :key="topic.id">
      <topic-item :topicInfo="topic"></topic-item>
    </div>
  </div>
</template>

<script>
import topicItem from '@/components/topic/topicItem.vue'
import { queryHotTopic } from '@/api/topic'
export default {
name:'AttTopic',
 components: {
    topicItem,
  },
  data() {
    return {
      topicList: [],
      search:''
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
.att_topic {
  min-height: 700px;
  border-radius: 10px;
  background-color: white;
  padding: 18px 0px 18px 0px;
  overflow: hidden;
}
.att_topic_item_box {
  float: left;
  margin-left: 28px;
  margin-bottom: 28px;
}
.att_topic_head{
  width: 97%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin:0 auto 28px auto;
}
.att_topic_title{
  font-size: 16px;
}
.search_topic {
  display: flex;
  width: 200px;
  button {
    width: auto;
    padding: 0px 10px;
    border-radius: 20px 0 0 20px;
    border: 0;
    border-left: 0;
    z-index: 0;
    background-color: #f5f5f5;
  }
  .el-input__inner {
    border-radius: 0 20px 20px 0;
    background-color: #f5f5f5;
    border: 0;
    height: 35px;
    padding: 0 10px 0 0;
  }
}
</style>