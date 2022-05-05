<template>
  <div class="comment_head">
    <div class="comment_input_box">
      <el-avatar v-if="$store.state.userInfo.user.userInfo.userAccount" :size="35" :src="headImg"> </el-avatar>
      <div class="comment_input_box_div">
        <el-input
          ref="commentInput"
          :autosize="{ minRows: 1, maxRows: 4 }"
          type="textarea"
          resize="none"
          v-model="queryParam.commentArt"
          placeholder="请输入评论内容"
          @blur="inputBlur"
        ></el-input>
      </div>
    </div>
    <div class="comment_send_box">
      <div class="emoji_box">
        <el-popover>
          <picker
            style="width: 320px; height: 320px; border: 0"
            color="#3bb0e6"
            :i18n="e18"
            :include="['recent', 'people', 'nature', 'places', 'symbols']"
            :showSearch="false"
            :showPreview="false"
            :showCategories="true"
            @select="addEmoji"
          />
          <i slot="reference" class="iconfont icon-emoji"></i>
        </el-popover>
      </div>
      <div class="send_box">
        <span :class="txtCount">{{ inputCount }}</span>
        <el-button
          @click="sendComment"
          type="primary"
          :disabled="
            queryParam.commentArt.length == 0 ||
            queryParam.commentArt.length > 100
          "
          round
          >评论</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'comment-input',
  props: ['pbId', 'commentTouser', 'userToname'],
  data() {
    return {
      e18: {
        categories: {
          recent: '历史',
          people: '笑脸',
          nature: '动物',
          foods: '食物',
          activity: '活动',
          places: '旅行',
          objects: '工作',
          symbols: '符号',
          flags: '旗帜',
        }
      },
      queryParam: {
        pbOneId: this.pbId,
        commentArt: '',
        commentUser: this.$store.state.userInfo.user.userInfo.userAccount,
        commentTouser: this.commentTouser,
      },
      txtCount: 'txtCount',
      inputCursor: 0,
    }
  },
  computed: {
    headImg() {
      return this.urlJudge(this.$store.state.userInfo.user.userInfo.userHeadImage)
    },
    inputCount() {
      let count = this.queryParam.commentArt.length
      if (count > 100) {
        this.txtCount = 'txtCount_error'
        count = 100 - count
      } else {
        this.txtCount = 'txtCount'
      }
      return count
    },
  },
  methods: {
    inputBlur() {
      this.inputCursor = this.$refs.commentInput.$el.children[0].selectionStart;
    },
    addEmoji(e) {
      this.queryParam.commentArt = this.queryParam.commentArt.substring(0, this.inputCursor) + e.native + this.queryParam.commentArt.substring(this.inputCursor)
      this.inputCursor += e.native.length
    },
    sendComment() {
      this.$store.commit('index/getLoginAuthority', {
        _this: this,
        goto: (key) => {
          if (key) {
            addComment(this.queryParam).then((res) => {
              res.data.commentHeadImg = this.$store.state.userInfo.user.userInfo.userHeadImage
              res.data.userName = this.$store.state.userInfo.user.userInfo.userName
              res.data.userToname = this.userToname
              if (res.data) {
                this.$bus.$emit('addComment', res.data)
                this.queryParam.commentArt = ''
                this.$message({
                  duration: 2000,
                  showClose: true,
                  message: '评论成功',
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
        }
      })
    },
  },
}
</script>

<style scope lang="scss">
.comment_head {
  padding: 15px 0px;
  border-top: 1px solid rgba(226, 226, 226, 0.384);
  border-bottom: 1px solid rgba(226, 226, 226, 0.384);
  width: 93%;
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.comment_input_box {
  width: 100%;
  display: flex;
  align-items: center;
}
.comment_input_box .el-avatar {
  flex-shrink: 0;
}
.comment_input_box .el-textarea__inner {
  width: 100%;
  line-height: 1.7;
  border: 0;
}
.comment_input_box_div {
  padding: 3px 4px 3px 3px;
  width: 100%;
  border: 2px solid #c0c4cc;
  margin-left: 10px;
  border-radius: 10px;
}
.comment_input_box .comment_input_box_div:hover {
  border: 2px solid #46b3e6;
}
.comment_input_box .comment_input_box_div:focus-within {
  border: 2px solid #46b3e6;
}
.comment_send_box {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.emoji_box {
  margin-left: 40px;
  i {
    font-size: 20px;
    color: #606266;
    margin-right: 15px;
    padding: 3px;
  }
  i:hover {
    cursor: pointer;
    color: #3bb0e6;
    padding: 3px;
    background-color: #3bb0e62a;
    border-radius: 20px;
  }
  i:focus {
    cursor: pointer;
    color: #3bb0e6;
    padding: 3px;
    background-color: #3bb0e62a;
    border-radius: 20px;
  }
}
.el-popper[x-placement^='bottom'] {
  margin-top: 4px;
}
.el-popper {
  border-radius: 10px;
}
.send_box {
  display: flex;
  align-items: center;
}
.txtCount {
  white-space: nowrap;
  font-size: 13px;
  color: #c0c4cc;
}
.txtCount_error {
  white-space: nowrap;
  font-size: 13px;
  color: red;
}
.comment_send_box .el-button.is-round {
  width: 73px;
  height: 34px;
  margin-left: 10px;
  text-align: center;
  line-height: 0.8;
  color: white;
  font-weight: bolder;
  border: 0px;
  background-color: #4d80e4;
  border-radius: 20px;
}
.comment_send_box {
  .el-button.is-round:active {
    background-color: #4d80e4;
  }
  .el-button.is-round:hover {
    background-color: #2e5ebe;
  }
  .el-button.is-disabled:hover {
    background-color: #4d80e4;
  }
  .el-button.is-disabled:active {
    background-color: #4d80e4;
  }
}
</style>