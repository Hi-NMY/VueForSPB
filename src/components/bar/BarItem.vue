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
        <div class="icon" @mouseenter="showMoreFun" @mouseleave="showMoreFun">
          <i class="iconfont icon-xiajiantou"></i>
          <more-fun class="moreFunClass" v-show="moreFun"></more-fun>
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

    <div class="comment_box" v-loading="commentLoading" v-show="seeComment">
      <comment-input></comment-input>
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
import barCommentItem from "@/components/bar/BarCommentItem.vue";
import { queryBarComment } from "@/api/postbar";
import commentInput from "@/components/bar/CommentInput.vue";
import moreFun from "@/components/bar/MoreFun.vue";
export default {
  name: "item",
  components: {
    barCommentItem,
    commentInput,
    moreFun,
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
      commentLoading: false,
      moreFun: false,
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
    showMoreFun(){
      this.moreFun = !this.moreFun;
    },
    seeComments() {
      this.seeComment = !this.seeComment;
      this.commentColor.commentColor = !this.commentColor.commentColor;
      if (this.seeComment) {
        this.commentLoading = true;
        queryBarComment("").then((res) => {
          this.comments = res.data;
          this.commentLoading = false;
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
  position: relative;
  margin: 20px 10px 5px 20px;
  display: flex;
  align-items: center;
}
.moreFunClass {
  width: auto;
  height: auto;
  position: absolute;
  top: 36px;
  right: 16px;
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
.icon{
  margin-left: auto;
  margin-right: 15px;
  padding: 3px;
}
.iconfont.icon-xiajiantou{

}
.iconfont.icon-xiajiantou:hover {
  background-color: #3bb0e62a;
  border-radius: 20px;
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
.comment_item {
  width: 93%;
  margin-bottom: 10px;
}
</style>