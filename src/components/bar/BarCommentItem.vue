<template>
  <div class="comment_item_box">
    <el-avatar :size="35" src="">
      <img src="../../assets/logo.png" />
    </el-avatar>
    <div class="comment_item_main">
      <div class="comment_item_head">
        <div class="head_left">
          <span
            v-show="isHosta"
            style="color: #46b3e6; cursor: pointer"
            @click="gotoHome(commentTodo.commentUser)"
          >
            楼主
          </span>
          <span
            v-show="!isHosta"
            style="cursor: pointer"
            class="comment_name"
            @click="gotoHome(commentTodo.commentUser)"
            >{{ commentTodo.userName }}</span
          >
          <div v-show="isReply">
            <span>&nbsp;回复</span>
            <span
              v-show="isHost"
              style="color: #46b3e6; cursor: pointer"
              @click="gotoHome(commentTodo.commentTouser)"
            >
              楼主
            </span>
            <span
              v-show="!isHost"
              style="cursor: pointer"
              @click="gotoHome(commentTodo.commentTouser)"
              >{{ commentTodo.userToname }}</span
            >
          </div>
          <span>&nbsp;:&nbsp;</span>
        </div>
        <div class="comment_art">{{ commentTodo.commentArt }}</div>
        <span style="margin-left: auto; white-space: nowrap"
          >{{ commentTodo.commentId }}楼</span
        >
      </div>
      <div class="comment_item_foot">
        <span>{{ date }}</span>
        <i
          @click="replayTo(commentTodo.userName)"
          class="iconfont icon-xiaoxi"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import { barTimeUtil } from '@/utils/dateUtil'
import { MessageBox } from 'element-ui'
import commentInput from '@/components/bar/CommentInput.vue'
export default {
  name: 'comment_item',
  props: ['commentTodo', 'hostAccount'],
  computed: {
    date() {
      return barTimeUtil(this.commentTodo.commentDate.replace('T', ' '))
    },
    isReply() {
      return this.commentTodo.commentTouser ? true : false
    },
    isHost() {
      return this.commentTodo.commentTouser == this.hostAccount ? true : false
    },
    isHosta() {
      return this.commentTodo.commentUser == this.hostAccount ? true : false
    },
  },
  methods: {
    replayTo(toName) {
      const h = this.$createElement
      MessageBox({
        title: '回复 @' + toName,
        showConfirmButton: false,
        message: h(commentInput, { style: 'margin-right: 10px' }),
      })
    },
    gotoHome(userAccount) {
      if (this.checkRoutingFirst(this, '/home')) {
        this.$router.push({
          name: 'home',
          params: {
            userAccount: userAccount,
          },
        })
      }
    }
  },
}
</script>

<style scope lang="scss">
.comment_item_box {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #909399;
  padding: 10px 0px;
  border-bottom: 1px solid rgba(226, 226, 226, 0.178);
}
.comment_item_box > .el-avatar {
  flex-shrink: 0;
}
.comment_item_main {
  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.comment_item_box:hover {
  .iconfont.icon-xiaoxi {
    display: block;
  }
}
.comment_item_head {
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 3px;
}
.head_left {
  white-space: nowrap;
  display: flex;
  align-items: center;
}
.comment_name {
  color: #303133;
}
.comment_art {
  width: 100%;
  color: #303133;
  white-space: pre-wrap;
  margin-right: 10px;
}
.comment_item_foot {
  width: 100%;
  height: 10px;
  margin-top: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.comment_item_foot > .iconfont.icon-xiaoxi {
  display: none;
}
.iconfont.icon-xiaoxi:hover {
  cursor: pointer;
}
.el-message-box {
  width: 460px;
  border-radius: 10px;
}
.el-message-box__title {
  font-size: 14px;
  font-weight: bold;
}
.el-message-box__content {
  padding: 2px 15px;
}
</style>