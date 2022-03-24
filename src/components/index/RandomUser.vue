<template>
  <div class="randomUser">
    <div class="head">
      <div class="head_left">推荐用户</div>
      <div class="head_right" @click="findUsers">
        <i :class="isLoading"></i>
        换一批
      </div>
    </div>
    <div class="tuijian_user">
      <div
        class="user_msg"
        v-for="usermsg in usersmsg"
        :key="usermsg.userAccount"
      >
        <div class="user_msg_left">
          <div class="img">
            <el-avatar :size="46" src="">
              <img src="../../assets/logo.png" />
            </el-avatar>
          </div>
          <div class="message">
            <span class="username">{{ usermsg.userName }}</span
            ><br />
            <span class="guanzhu">关注</span>
            <span>{{ usermsg.followNum }}</span>
            <span class="beiguanzhu">被关注</span>
            <span>{{ usermsg.followedNum }}</span>
          </div>
        </div>
        <div class="user_msg_right">+ 关注</div>
      </div>
      <!--           <div class="message_all">-->
      <!--                查看全部-->
      <!--                <i class="el-icon-arrow-right"></i>-->
      <!--            </div>-->
    </div>
  </div>
</template>
<script>
// import { index } from "../../api/index";
import * as api from "../../api/index";
export default {
  data: function () {
    return {
      usersmsg: [],
      isLoading: "el-icon-refresh",
    };
  },
  created() {
    this.findUsers();
  },
  methods: {
    findUsers() {
      this.isLoading = "el-icon-loading";
      // this.$api.index.randomUser().then((res) => {
      api.randomUser().then((res) => {
        this.usersmsg = res.data;
        this.isLoading = "el-icon-refresh";
      });
    },
  },
};
</script>
<style scope>
.randomUser {
  height: auto;
  border-radius: 10px;
  width: 100%;
  background-color: white;
  padding-bottom: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.randomUser .head {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 88%;
  color: gray;
}
.head_right:hover {
  cursor: pointer;
}
.tuijian_user {
  margin-top: 20px;
  width: 88%;
}
.tuijian_user .user_msg {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
}
.tuijian_user .user_msg_left {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tuijian_user .user_msg_left .img {
  margin-right: 10px;
}
.tuijian_user .user_msg_left .message {
  color: grey;
  font-size: 12px;
  line-height: 22.5px;
}
.tuijian_user .user_msg_left .message .username {
  color: black;
  font-size: 14px;
}
.tuijian_user .user_msg_right {
  color: #46b3e6;
}
.user_msg_right:hover,
.username:hover {
  cursor: pointer;
}
.tuijian_user .user_msg_left .message .username:hover {
  color: #3bb0e6;
}
.beiguanzhu {
  margin-left: 10px;
}
/*.message_all{*/
/*    border: 1px solid gainsboro;*/
/*    height: 35px;*/
/*    border-radius: 5px;*/
/*    background-color: rgb(249,249,249);*/
/*    line-height: 35px;*/
/*    text-align: center;*/
/*    color: grey;*/
/*    font-size: 14px;*/
/*    margin-top: 20px;*/
/*}*/
</style>