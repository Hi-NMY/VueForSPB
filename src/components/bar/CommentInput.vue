<template>
  <div class="comment_head">
    <div class="comment_input_box">
      <el-avatar :size="35" src="">
        <img src="../../assets/logo.png" />
      </el-avatar>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
    <div class="comment_send_box">
      <div class="emoji_box">表情功能站位</div>
      <div class="send_box">
        <span class="txtCount">{{ inputCount }}</span>
        <el-button
          @click="sendComment"
          type="primary"
          :disabled="input.length == 0"
          round
          >评论</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  computed: {
    inputCount() {
      return this.input.length;
    },
  },
  methods: {
    sendComment() {
      console.log("发送评论");
    },
  },
};
</script>

<style scope>
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
.comment_input_box .el-input__inner {
  width: 98%;
  border: 2px solid #c0c4cc;
  line-height: 35px;
  margin-left: 10px;
  border-radius: 10px;
}
.comment_input_box .el-input__inner:hover {
  border: 2px solid #46b3e6;
}
.comment_input_box .el-input__inner:active {
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
}
.send_box {
  display: flex;
  align-items: center;
}
.txtCount {
  white-space: nowrap;
  font-size: 13px;
  color: #bfbfbf;
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
.comment_send_box .el-button.is-round:hover {
  background-color: #2e5ebe;
}
.comment_send_box .el-button.is-round:active {
  background-color: #4d80e4;
}
</style>