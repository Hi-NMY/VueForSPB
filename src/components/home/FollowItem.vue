<template>
  <div class="folllow_msg">
    <div class="folllow_msg_left">
      <div class="img">
        <el-avatar :size="60" src="">
          <img src="../../assets/logo.png" />
        </el-avatar>
      </div>
      <div class="message">
        <span class="folllow_name">{{follow.userName}}</span>
        <img src="../../assets/logo.png" /><!--{{follow.sex}}-->
        <img src="../../assets/logo.png" /><!--{{follow.userBadge}}-->
        <br />
        <span>{{follow.userProfile}}</span><br />
      </div>
    </div>
    <div class="folllow_msg_right" v-if="isfollow2">已关注</div>
    <div class="folllow_msg_right_no" v-else>未关注</div>
  </div>

</template>

<script>
export default {
  name: "FollowItem",
  props: ['follow'],
  data() {
    return {
      isfollow: false,
      isfollow2: true
    }
  }
}
</script>

<style scope lang="scss">
.folllow_msg {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 0;
  font-size: 14px;
  border-top: 1px solid #f5f5f5;
}
.folllow_msg .folllow_msg_left {
  display: flex;
  align-items: center;
  justify-content: center;
  .message {
    margin-left: 5px;
    color: grey;
    width: 450px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
    .folllow_name {
      color: black;
      line-height: 30px;
      font-weight: bold;
      margin-right: 2px;
    }
    img {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      margin: 0 2px;
    }
  }
}
.folllow_msg_right {
  border: 1px solid grey;
  width: 75px;
  height: 30px;
  border-radius: 20px;
  text-align: center;
  line-height: 30px;
  color: grey;
}
.folllow_msg_right:hover {
  border: 1px solid #46B3E6;
  color: #46B3E6;
}
.folllow_msg_right_no {
  background-color: #46B3E6;
  color: white;
  width: 75px;
  height: 30px;
  border-radius: 20px;
  text-align: center;
  line-height: 30px;
}
.folllow_msg_right_no:hover {
  border: 1px solid #46B3E6;
  color: #46B3E6;
  background-color: white;
}
</style>