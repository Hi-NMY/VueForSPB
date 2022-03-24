<template>
  <div class="index">
    <head-box></head-box>
    <div class="main">
      <div class="main_left">
        <post-bar class="postBar"></post-bar>
      </div>

      <div class="main_right">
        <random-user class="randomUser"></random-user>
        <hot-topic class="hotTopic"></hot-topic>
      </div>
    </div>
  </div>
</template>
<script>
import headBox from "@/components/head/Head.vue";
import postBar from "@/components/index/PostBar.vue";
import randomUser from "@/components/index/RandomUser.vue";
import hotTopic from "@/components/index/HotTopic.vue";

import { login } from "@/api/login";
export default {
  components: {
    headBox,
    postBar,
    randomUser,
    hotTopic,
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
  height: auto;
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
  width: 70%;
}
.main_right {
  margin-left: 10px;
  width: 30%;
}
</style>