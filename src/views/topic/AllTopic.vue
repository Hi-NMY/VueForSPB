<template>
  <div class="all_topic">
    <div class="all_topic_head">
      <div class="all_topic_title">全部话题</div>
      <div class="search_topic">
        <button>
          <i class="el-icon-search"></i>
        </button>
        <el-input
          type="text"
          placeholder="按下enter搜索话题"
          v-model="queryParam.search"
          @keyup.enter.native="queryTopicList"
        ></el-input>
      </div>
    </div>
    <div class="all_topic_item_box" v-for="topic in topicList" :key="topic.id">
      <topic-item :topicInfo="topic"></topic-item>
    </div>
  </div>
</template>

<script>
import topicItem from '@/components/topic/topicItem.vue'
import { queryAllTopic } from '@/api/topic'
export default {
  name: 'AllTopic',
  components: {
    topicItem,
  },
  data() {
    return {
      topicList: [],
      queryParam: {
        search: '',
        id: 0
      },
    }
  },
  methods: {
    queryTopicList() {
      queryAllTopic(this.queryParam).then((res) => {
        this.topicList = res.data
      })
    },
  },
  mounted() {
    this.queryTopicList()
  },
}
</script>

<style scope lang="scss">
.all_topic {
  min-height: 700px;
  border-radius: 10px;
  background-color: white;
  padding: 18px 0px 18px 0px;
  overflow: hidden;
}
.all_topic_item_box {
  float: left;
  margin-left: 24px;
  margin-bottom: 24px;
}
.all_topic_head {
  width: 97%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto 28px auto;
}
.all_topic_title {
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