<template>
  <div class="bar-item">
    <div>
      <div class="item-head">
        <el-avatar :size="50" src="">
          <img src="../../assets/logo.png" />
        </el-avatar>
        <div class="item-head-msg">
          <div>
            <span class="name">{{ todo.userAccount }}</span>
            <el-image
              src="https://tva4.sinaimg.cn/large/005LlRGlgy1h0k69p2l15j30tz0tzjxv.jpg"
            ></el-image>
          </div>
          <span class="date">{{ date }}</span>
        </div>
      </div>
      <div class="item-main">
        <div class="item-article">
          <span>{{ todo.pbArticle }}</span>
        </div>
        <div class="item-img">
          <el-image
            src="https://tva4.sinaimg.cn/large/005LlRGlgy1h0k69p2l15j30tz0tzjxv.jpg"
          ></el-image>
          <el-image
            src="https://tva4.sinaimg.cn/large/005LlRGlgy1h0k69p2l15j30tz0tzjxv.jpg"
          ></el-image>
        </div>
        <div v-show="location" class="item-location">
          <img src="../../assets/location.png" />
          <span>{{ todo.pbLocation }}</span>
        </div>
        <div v-show="topic" class="item-topic">
          <el-tag v-for="(topic, index) in topicList" :key="index">{{
            topic
          }}</el-tag>
        </div>
      </div>
      <div class="item-foot">
        <div>
          <div>
            <i class="iconfont icon-fenxiang"></i>
          </div>
        </div>
        <div>
          <div :class="commentColor" @click="seeComments">
            <i class="iconfont icon-xiaoxi"></i>
            <span>{{ pbCommentNum }}</span>
          </div>
        </div>
        <div>
          <div :class="likeColor" @click="clickLike">
            <i :class="likeIcon"></i>
            <span>{{ pbThumbNum }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="comment_box" v-show="seeComment">
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
            <span class="txtCount">字数站位</span>
            <el-button type="primary" round>评论</el-button>
          </div>
        </div>
      </div>
      <div class="comment_item">
        <bar-comment-item
          v-for="(comment, index) in comments"
          :key="index"
          :commentTodo="comment"
        ></bar-comment-item>
      </div>
    </div>
  </div>
</template>

<script scope>
import { barTimeUtil } from "@/utils/dateUtil";
import barCommentItem from "@/components/index/BarCommentItem.vue";
import { queryBarComment } from "@/api/postbar";
export default {
  name: "item",
  components: {
    barCommentItem,
  },
  data() {
    return {
      topics: [],
      comments: [],
      seeComment: false,
      commentColor: {
        commentColor: false,
      },
      likeColor: {
        likeColor: false,
      },
      likeIcon: "iconfont icon-aixin",
      input: "",
    };
  },
  props: ["todo"],
  computed: {
    date() {
      return barTimeUtil(this.todo.pbDate.replace("T", " "));
    },
    location() {
      const isLocation = this.todo.pbLocation;
      if (isLocation) {
        return true;
      } else {
        return false;
      }
    },
    topic() {
      const isTopic = this.todo.pbTopic;
      if (isTopic) {
        return true;
      } else {
        return false;
      }
    },
    topicList() {
      let topicList = this.todo.pbTopic;
      topicList = topicList.split("|");
      topicList.pop();
      return topicList;
    },
    pbThumbNum() {
      const pbThumbNum = this.todo.pbThumbNum;
      if (pbThumbNum == 0) {
        return "";
      } else {
        return pbThumbNum;
      }
    },
    pbCommentNum() {
      const pbCommentNum = this.todo.pbCommentNum;
      if (pbCommentNum == 0) {
        return "";
      } else {
        return pbCommentNum;
      }
    },
  },
  methods: {
    seeComments() {
      this.seeComment = !this.seeComment;
      this.commentColor.commentColor = !this.commentColor.commentColor;
      if (this.seeComment) {
        queryBarComment("").then((res) => {
          this.comments = res.data;
        });
      }
    },
    clickLike() {
      this.likeColor.likeColor = !this.likeColor.likeColor;
      if (this.likeColor.likeColor) {
        this.likeIcon = "iconfont icon-aixin-sel";
      } else {
        this.likeIcon = "iconfont icon-aixin";
      }
    },
  },
};
</script>

<style scope lang="scss">
.bar-item {
  border-radius: 10px;
  background-color: white;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-bottom: 15px;
}
.item-head {
  margin: 20px 10px 5px 20px;
  display: flex;
  align-items: center;
}
.item-head-msg {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative;
}
.item-head-msg div {
  display: flex;
  align-items: center;
}
.item-head-msg .el-image__inner {
  margin-left: 4px;
  width: 24px;
  height: auto;
}
.name {
  font-weight: bold;
}
.date {
  line-height: 12px;
  font-size: 12px;
  margin-top: 5px;
  font-weight: lighter;
  color: rgb(201, 201, 201);
}
.item-main {
  margin-left: 80px;
}
.item-article {
  margin-right: 10px;
}
.item-img {
  margin-top: 15px;
}
.item-img .el-image__inner {
  width: 150px;
  height: 150px;
  margin-right: 10px;
}
.item-location {
  margin-top: 15px;
  display: flex;
  align-items: center;
  color: #bfbfbf;
  font-size: 14px;
}
.item-location img {
  width: 15px;
  margin-right: 1px;
}
.item-location span {
  line-height: 18px;
  margin-right: 1px;
}
.item-topic {
  margin-top: 15px;
}
.el-tag {
  display: inline-block;
  height: 30px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #4d80e4;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
  border: none;
  margin-right: 15px;
}
.item-foot {
  color: #8a8a8a;
  font-size: 12px;
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.item-foot div {
  width: 100%;
}
.item-foot div div {
  display: flex;
  align-items: center;
  width: 50px;
  margin: auto;
}
.item-foot span {
  line-height: 12px;
  text-align: center;
  margin-left: 2px;
}
.el-tag:hover,
.el-avatar:hover,
.item-foot > div > div > i:hover,
.name:hover {
  cursor: pointer;
}
.name:hover {
  color: #3bb0e6;
}
.item-foot > div > div > i {
  font-size: 20px;
  padding: 3px;
}
.item-foot > div > div:hover {
  cursor: pointer;
  color: #3bb0e6;
  .iconfont.icon-xiaoxi {
    padding: 3px;
    background-color: #3bb0e62a;
    border-radius: 20px;
  }
}
.item-foot > div > div:hover {
  cursor: pointer;
  color: #3bb0e6;
  .iconfont.icon-fenxiang {
    padding: 3px;
    background-color: #3bb0e62a;
    border-radius: 20px;
  }
}
.item-foot > div > div:hover {
  cursor: pointer;
  color: #3bb0e6;
  .iconfont.icon-aixin {
    padding: 3px;
    background-color: #3bb0e62a;
    border-radius: 20px;
  }
  .iconfont.icon-aixin-sel {
    padding: 3px;
    background-color: #3bb0e62a;
    border-radius: 20px;
  }
}
.commentColor {
  color: #3bb0e6;
}
.likeColor {
  color: #3bb0e6;
}
.comment_box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
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
  width: 55%;
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
.comment_item {
  width: 93%;
  margin-bottom: 10px;
}
</style>