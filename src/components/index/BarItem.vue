<template>
  <div class="bar-item">
    <div class="item-head">
      <el-avatar :size="50" src="">
        <img src="../../assets/logo.png" />
      </el-avatar>
      <div class="item-head-msg">
        <span class="name">{{todo.userAccount}}</span>
        <span class="date">{{todo.pbDate}}</span>
      </div>
    </div>
    <div class="item-main">
      <div class="item-article">
        <span
          >{{todo.pbArticle}}</span
        >
      </div>
      <div class="item-img">
        <el-image
          src="https://tva4.sinaimg.cn/large/005LlRGlgy1h0k69p2l15j30tz0tzjxv.jpg"
        ></el-image>
        <el-image
          src="https://tva4.sinaimg.cn/large/005LlRGlgy1h0k69p2l15j30tz0tzjxv.jpg"
        ></el-image>
      </div>
      <div class="item-location">
        <img src="../../assets/location.png" />
        <span>{{todo.pbLocation}}</span>
      </div>
      <div class="item-topic">
        <el-tag v-for="(topic, index) in topics" :key="index">{{
          topic
        }}</el-tag>
      </div>
    </div>
    <div class="item-foot">
      <div>
        <div>
          <img style="margin: auto" src="../../assets/bar_share.png" />
        </div>
      </div>
      <div>
        <div>
          <img src="../../assets/bar_comment.png" />
          <span>123</span>
        </div>
      </div>
      <div>
        <div>
          <img src="../../assets/bar_like.png" />
          <span>123</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "item",
  data() {
    return {
      topics: ["话题1", "话题2", "话题3", "话题4"],
    };
  },
  props: ["todo"],
};
</script>

<style scope>
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
}
.name {
  font-weight: bold;
}
.date {
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
.el-image__inner {
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
  color: #bfbfbf;
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
.item-foot img {
  width: 20px;
}
</style>