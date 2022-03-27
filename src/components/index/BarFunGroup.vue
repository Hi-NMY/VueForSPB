<template>
  <div class="bar_fun_grout">
    <div class="addBar">
      <el-button type="primary" @click="addBarFun" round>发帖子</el-button>
    </div>
    <div class="addVideo">
      <el-button type="primary" @click="addVideoFun" round>发视频</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "fun-group",
  methods: {
    addBarFun() {},
    addVideoFun() {},
  },
};
</script>

<style scope lang="scss">
.bar_fun_grout {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.addBar {
  width: 100%;
}
.addVideo {
  width: 100%;
}
.addBar .el-button.is-round {
  margin-bottom: 10px;
  width: 100%;
  color: white;
  font-weight: bolder;
  border: 0px;
  background-color: rgb(70, 179, 230);
  border-radius: 20px;
}
.addBar .el-button.is-round:hover {
  background-color: rgb(97, 190, 233);
}
.addBar .el-button.is-round:active {
  background-color: rgb(70, 179, 230);
}
.addVideo .el-button.el-button {
  width: 100%;
  color: white;
  font-weight: bolder;
  border: 0px;
  background-color: #ffcc29;
  margin-left: 0px;
}
.addVideo .el-button.is-round:hover {
  background-color: #fcd75d;
}
.addVideo .el-button.is-round:active {
  background-color: #ffcc29;
}
</style>