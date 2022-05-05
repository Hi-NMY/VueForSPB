<template>
  <div class="topic_item">
    <el-image
      :src="headImg"
      @click="lookTopic(topicInfo.id, topicInfo.topicName)"
      ><img
        style="width: 88px"
        slot="error"
        src="../../assets/defaultTopic.png"
    /></el-image>
    <div class="topic_item_msg">
      <span
        class="topic_item_msg_name"
        @click="lookTopic(topicInfo.id, topicInfo.topicName)"
        >{{ topicInfo.topicName }}</span
      >
      <span class="topic_item_msg_des">{{ topicInfo.topicSlogan }}</span>
      <div class="topic_item_msg_count">
        <span style="color: #303133">关注</span>
        <span style="margin-left: 2px">{{ topicInfo.topicAttentionnum }}</span>
        <span style="color: #303133; margin-left: 6px">发帖</span>
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
  data() {
    return {
      queryParam: {
        topicId: this.topicInfo.id,
        topicName: this.topicInfo.topicName
      },
      isAtention: false
    }
  },
  methods: {
    toAttention() {
      this.$store.commit('index/getLoginAuthority', {
        _this: this,
        goto: (key) => {
          if (key) {
            if (this.isAtention) {
              this.$store.dispatch('userInfo/removeAttentionTopic', {
                query: this.queryParam,
                _this: this,
                goto: () => {
                  this.isAtention = !this.isAtention
                }
              })
            } else {
              this.$store.dispatch('userInfo/addAttentionTopic', {
                query: this.queryParam,
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
    lookTopic(id, name) {
      if (this.checkRoutingFirst(this, '/topic/detailTopic')) {
        this.$router.push({
          name: 'detailTopic',
          params: {
            topicId: id,
            topicName: name
          },
        })
      }
    },
  },
  mounted() {
    const attentionTopic = this.$store.state.userInfo.user.attentionTopicPresenter;
    this.isAtention = !(!attentionTopic || attentionTopic.indexOf(this.topicInfo.id) == -1)
  },
}
</script>

<style  scope lang="scss">
.topic_item {
  width: 290px;
  height: auto;
  min-height: 80px;
  padding: 12px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  .el-image__inner {
    width: 80px;
    height: 80px;
    border-radius: 10px;
  }
  .el-image__inner:hover {
    cursor: pointer;
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
  }
  .noAt {
    color: white;
    background-color: #46b3e6;
    border: 1px solid #46b3e6;
  }
  .noAt:hover {
    background-color: #46b3e6bc;
    border: 1px solid #46b3e6bc;
  }
  .At {
    color: #46b3e6;
    border: 1px solid #46b3e6;
    background-color: #ffffff;
    padding: 2px 8px;
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