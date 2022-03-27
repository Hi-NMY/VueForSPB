<template>
  <div class="index">
        <head-box></head-box>
    <div class="main">
      <div class="main_left">
        <post-bar class="postBar"></post-bar>
      </div>
      <div class="main_right">
        <bar-fun-group></bar-fun-group>
        <hot-topic class="hotTopic"></hot-topic>
        <random-user class="randomUser"></random-user>
      </div>
    </div>

    <el-backtop target=".index">
      <div
              style="
         {
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
          text-align: center;
          line-height: 40px;
          border-radius: 5px;
          color: #1989fa;
        }
      "
      >
        ☝
      </div>
    </el-backtop>
  </div>

  </template>
<script>
import headBox from "@/components/head/Head.vue";
import postBar from "@/components/index/PostBar.vue";
import randomUser from "@/components/index/RandomUser.vue";
import hotTopic from "@/components/index/HotTopic.vue";
import barFunGroup from "@/components/index/BarFunGroup.vue";

import { login } from "@/api/login";
export default {
  components: {
    headBox,
    postBar,
    randomUser,
    hotTopic,
    barFunGroup,
  },
  created() {
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (error) {}
    if (user) {
      login(user).then((res) => {
        if (res.data) {
          this.$store.commit("index/updateIsLogin", true);
          this.$store.dispatch("userInfo/obtainUserInfo", user.userAccount);
        }
      });
    }
  },
};
</script>
<style scoped>
.index {
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.main {
  margin: 20px 18% 0px 18%;
  height: auto;
  width: auto;
  /* border: 3px solid rgb(187, 54, 54); */
  min-width: 1000px;
  display: flex;
  align-items: top;
  margin-top: 85px;
}
.main_left {
  width: 69%;
}
.main_right {
  margin-left: 1%;
  width: 30%;
}
.randomUser {
  margin-top: 15px;
}
.hotTopic {
  margin-top: 15px;
}
</style>