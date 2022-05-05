<template>
  <div class="comment_item_box">
    <el-avatar :size="35" :src="headImg(commentTodo.commentHeadImg)">
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
        <div class="tool">
          <div class="tool1" v-if="deletePower">
            <i @click="deleteTo()" class="iconfont icon-lajitong"></i>
          </div>
          <div>
            <i
              @click="replayTo(commentTodo.userName)"
              class="iconfont icon-xiaoxi"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :append-to-body="true"
      :title="dialogTitle"
      :visible.sync="replayToDialog"
    >
      <comment-input
        :pbId="commentTodo.pbOneId"
        :commentTouser="commentTodo.commentUser"
        :userToname="commentTodo.userName"
      ></comment-input>
    </el-dialog>
    <el-dialog
      class="deleteDialog"
      width="1%"
      :show-close="false"
      :append-to-body="true"
      :visible.sync="deleteDialog"
    >
      <div class="deleteTitle"><span>确定删除评论么？</span></div>
      <div class="deleteButton">
        <el-button @click="deleteCancel" class="button_cancel" round
          >取消</el-button
        >
        <el-button
          @click="deletec(commentTodo.commentId, commentTodo.pbOneId)"
          class="button_right"
          round
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { barTimeUtil } from '@/utils/dateUtil'
import commentInput from '@/components/bar/CommentInput.vue'
import { deleteComment } from '@/api/comment'
export default {
  name: 'comment_item',
  props: ['commentTodo', 'hostAccount', 'index'],
  data() {
    return {
      replayToDialog: false,
      deleteDialog: false,
      dialogTitle: '',
      deletePower: false,
    }
  },
  components: {
    commentInput
  },
  computed: {
    date() {
      const ac = this.$store.state.userInfo.user.userInfo.userAccount
      if (ac && (this.hostAccount == ac || this.commentTodo.commentUser == ac)) {
        this.deletePower = true
      }
      return barTimeUtil(this.commentTodo.commentDate.replace('T', ' '))
    },
    isReply() {
      return this.commentTodo.commentTouser
    },
    isHost() {
      return this.commentTodo.commentTouser == this.hostAccount
    },
    isHosta() {
      return this.commentTodo.commentUser == this.hostAccount
    },
  },
  methods: {
    headImg(value) {
      return this.urlJudge(value)
    },
    replayTo(toName) {
      this.$store.commit('index/getLoginAuthority', {
        _this: this,
        goto: (key) => {
          if (key) {
            this.replayToDialog = true
            this.dialogTitle = '回复 @' + toName
          }
        }
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
    },
    deleteTo() {
      this.deleteDialog = true
    },
    deleteCancel() {
      this.deleteDialog = false
    },
    deletec(commentId, pbOneId) {
      deleteComment({ commentId, pbOneId }).then((res) => {
        this.deleteCancel()
        if (res.data) {
          this.$bus.$emit('deleteComment', this.index)
          this.$message({
            duration: 2000,
            showClose: true,
            message: '评论已删除',
          })
        } else {
          this.$message({
            duration: 2000,
            showClose: true,
            type: 'error',
            message: '错误，请重试！',
          })
        }
      })
    }
  },
  mounted() {
    this.$bus.$on('addComment', () => {
      this.replayToDialog = false
    })
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
.el-dialog {
  border-radius: 10px;
  min-width: 300px;
  max-width: 600px;
}
.el-dialog__title {
  font-weight: bold;
}
.el-dialog__body {
  padding: 0 20px 20px 20px;
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
  .tool {
    display: flex;
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
  width: 400px;
  color: #303133;
  white-space: pre-wrap;
  margin-right: 10px;
}
.comment_item_foot {
  width: 100%;
  height: 10px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.comment_item_foot > .tool {
  display: none;
}
.tool > .tool1 {
  margin-right: 4px;
}
.iconfont.icon-xiaoxi:hover {
  cursor: pointer;
}
.iconfont.icon-lajitong:hover {
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
.deleteDialog {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 32px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .deleteTitle {
    font-size: 18px;
    color: #303133;
    font-weight: bold;
    text-align: center;
  }
  .deleteButton {
    width: 70%;
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  .el-button.is-round {
    border-radius: 20px;
    border: 0;
    width: 124px;
    height: 36px;
    line-height: 0.8;
    font-weight: bold;
  }
  .button_cancel {
    background-color: #eeeeee;
    color: #303133;
  }
  .button_right {
    background-color: #3bb0e6;
    color: #ffffff;
  }
  .button_cancel:hover {
    background-color: #e0e0e0;
    color: #303133;
  }
  .button_right:hover {
    background-color: #2e8db9;
    color: #ffffff;
  }
}
</style>