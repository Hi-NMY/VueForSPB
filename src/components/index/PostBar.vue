<template>
  <div class="postbar-box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="广场" name="1">
        <bar-item v-for="item in postBarList" :key="item.pbOneId" :todo="item"  class="infinite-list-item"></bar-item>
      </el-tab-pane>
      <el-tab-pane v-if="isLogin" label="我的关注" name="2">
        <bar-item v-for="item in postBarList" :key="item.pbOneId" :todo="item"  class="infinite-list-item"></bar-item>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import barItem from '@/components/index/BarItem.vue'
import {queryNoVideoPostBarForDate} from '@/api/postbar'
export default {
  name: "postbar-box",
  data() {
    return {
      activeName: "1",
      postBarList:[]
    };
  },
  components:{
barItem
  },
  computed: {
    isLogin() {
      return this.$store.state.index.isLogin;
    },
  },
  methods: {
    handleClick(tab, event) {},
  },
  created(){
    queryNoVideoPostBarForDate('').then(res => {
      this.postBarList = res.data
    })
  }
};
</script>
<style scope>
.postbar-box {
  padding: 0px 5px 0px 5px;
  height: auto;
  width: 70%;
  /* border:1px solid aqua; */
}
.el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #E4E7ED;
    z-index: 1;
    width: 124px;
    margin-left: 10px;
}
.el-tabs__item.is-active {
    color: rgb(70, 179, 230);
}
.el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: rgb(70, 179, 230);
    z-index: 1;
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    list-style: none;
}
.el-tabs__nav-scroll {
  padding-left: 10px;
    overflow: hidden;
    background-color: white;
    border-radius: 5px;
}
</style>