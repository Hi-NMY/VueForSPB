<template>
  <div class="comment_item_box">
    <el-avatar :size="35" src="">
      <img src="../../assets/logo.png" />
    </el-avatar>
    <div class="comment_item_main">
      <div class="comment_item_head">
        <div>
          <span class="comment_name">{{ commentTodo.commentUser }}</span>
          <div v-show="isReply">
            <span>&nbsp;回复</span>
            <span v-show="isHost" style="color: #46b3e6"> 楼主 </span>
            <span v-show="!isHost">{{ commentTodo.commentToUser }}</span>
          </div>
          <span>&nbsp;:&nbsp;</span>
        </div>
        <span>{{ commentTodo.commentArt }}</span>
      </div>
      <div class="comment_item_foot">
        <span>{{ date }}</span>
        <i class="iconfont icon-xiaoxi"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { barTimeUtil } from "@/utils/dateUtil";
export default {
  name: "comment_item",
  props: ["commentTodo"],
  computed: {
    date() {
      return barTimeUtil(this.commentTodo.commentDate.replace("T", " "));
    },
    isReply() {
      return this.commentTodo.commentToUser ? true : false;
    },
    isHost() {
      return this.commentTodo.commentToUser == "1231" ? true : false;
    },
  },
};
</script>

<style scope lang="scss">
.comment_item_box {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #8a8a8a;
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
.comment_item_head > div {
  white-space: nowrap;
  display: flex;
  align-items: center;
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
.iconfont.icon-xiaoxi:hover{
  cursor: pointer;    
}
</style>