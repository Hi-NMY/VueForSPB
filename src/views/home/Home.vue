<template>
  <div class="home">
    <!-- <head-box></head-box> -->
    <div class="main">
      <div class="main_left">
        <el-row>
          <el-col :span="12">
            <h2>个人空间</h2>
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              active-text-color="#46B3E6">
              <el-menu-item index="1">
                <i class="iconfont icon-jurassic_user"></i>
                <span slot="title">我的主页</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="iconfont icon-wodeguanzhu"></i>
                <span slot="title">我的关注</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="iconfont icon-yonghu"></i>
                <span slot="title">关注我的</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="iconfont icon-wodeshoucang"></i>
                <span slot="title">我的收藏</span>
              </el-menu-item>
              <el-menu-item index="6">
                <i class="iconfont icon-shezhi"></i>
                <span slot="title">个人信息管理</span>
              </el-menu-item>
            
            </el-menu>
          </el-col>
        </el-row>
      </div>
    
    
    </div>
  </div>
</template>

<script>
// import headBox from "@/components/head/Head.vue";
export default {
  name: 'home',
  components: {
    // headBox,
  },
  created() {
    this.$bus.$emit('clearSelect', '/home')
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scope>
.home {
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 180px;
}
.main_left h2 {
  background-color: white;
  /*border-right: solid 1px #e6e6e6;*/
  height: 50px;
  text-indent: 20px;
  line-height: 50px;
  font-weight: 500;
  border-radius: 10px 10px 0 0;
  padding: 10px 10px 0 10px;
}
.el-menu {
  border-radius: 0 0 10px 10px;
  border: none;
  padding-bottom: 10px;
}
.main_left i {
  font-size: 20px;
  margin-right: 12px;
  margin-left: 10px;
}
</style>