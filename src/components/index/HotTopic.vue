<template>
  <div class="hotTopic">
    <div class="head">
      <div class="head_left">热门话题</div>
      <div class="head_right" @click="findUsers">
        <i :class="isLoading"></i>
        刷新
      </div>
    </div>
    <div class="content">
      <el-skeleton
        :class="hotTopic_skeleton_item"
        :loading="loading"
        animated
        :rows="1"
      >
        <ol type="1" v-for="hotTopic in hotTopics" :key="hotTopic.id">
          <li @click="goToDetailTopic(hotTopic.id,hotTopic.topicName)">
            <span class="message">
              {{ hotTopic.topicName }}
            </span>
            <span class="num">{{ hotNum(hotTopic.topicBarnum) }}</span>
          </li>
        </ol>
      </el-skeleton>
      <el-skeleton
        :class="hotTopic_skeleton_item"
        :loading="loading"
        animated
        :rows="1"
      >
      </el-skeleton>
      <el-skeleton
        :class="hotTopic_skeleton_item"
        :loading="loading"
        animated
        :rows="1"
      >
      </el-skeleton>
      <el-skeleton
        :class="hotTopic_skeleton_item"
        :loading="loading"
        animated
        :rows="1"
      >
      </el-skeleton>
      <el-skeleton
        :class="hotTopic_skeleton_item"
        :loading="loading"
        animated
        :rows="1"
      >
      </el-skeleton>
      <div @click="goToHotTopic" class="more">查看更多热门话题</div>
    </div>
  </div>
</template>

<script>
import * as api from '../../api/index'
import { numberHandle } from '@/utils/dateUtil'
export default {
  name: 'HotTopicBox',
  data() {
    return {
      hotTopics: [],
      isLoading: 'el-icon-refresh',
      loading: true,
      hotTopic_skeleton_item: 'hotTopic_skeleton_item',
    }
  },
  computed: {},
  created() {
    this.findUsers()
  },
  methods: {
    findUsers() {
      this.isLoading = 'el-icon-loading'
      this.loading = true
      this.hotTopic_skeleton_item = 'hotTopic_skeleton_item'
      api.hotTopic().then((res) => {
        this.hotTopics = res.data.slice(0, 5)
        this.isLoading = 'el-icon-refresh'
        this.loading = false
        this.hotTopic_skeleton_item = ''
      })
    },
    hotNum(num) {
      return numberHandle(num)
    },
    goToHotTopic() {
      this.$router.push({
        path: '/topic/hotTopic',
      })
    },
    goToDetailTopic(id,name) {
      this.$router.push({
        name: 'detailTopic',
        params: {
          topicId: id,
          topicName: name,
        },
      })
    },
  },
}
</script>

<style scoped>
.hotTopic_skeleton_item {
  margin-top: 15px;
  margin-bottom: 27px;
  width: 300%;
}
.hotTopic {
  height: auto;
  border-radius: 10px;
  width: 100%;
  background-color: white;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 88%;
  color: #909399;
  margin: 20px 0px 10px 0px;
}
.content {
  width: 86%;
}
.content ol li {
  height: 45px;
  width: 100%;
  border-bottom: 1px solid rgb(247, 247, 247);
  line-height: 45px;
  font-size: 14px;
  color: #909399;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content ol li .message {
  /*font-size: 18px;*/
  display: inline-block;
  color: #303133;
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content ol li .message:hover,
.more:hover {
  cursor: pointer;
  color: #3bb0e6;
}
.content ol li .num {
  display: inline-block;
  margin-right: 5px;
  font-size: 12px;
}
.more {
  text-align: center;
  margin: 20px 0px;
  color: #909399;
}
</style>