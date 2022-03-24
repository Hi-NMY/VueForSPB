<template>
  <div class="postbar-box">
    <div @click="obtainNoVideoPostBar" class="bar-refresh">
      <i :class="isLoading"></i>
      刷新
    </div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="广场" name="1">
          <bar-item
            v-for="item in postBarList"
            :key="item.pbOneId"
            :todo="item"
            class="infinite-list-item"
          ></bar-item>
        </el-tab-pane>
        <el-tab-pane label="视频" name="2">
          <bar-item
            v-for="item in postBarList"
            :key="item.pbOneId"
            :todo="item"
            class="infinite-list-item"
          ></bar-item>
        </el-tab-pane>
        <el-tab-pane v-if="isLogin" label="我的关注" name="3">
          <bar-item
            v-for="item in postBarList"
            :key="item.pbOneId"
            :todo="item"
            class="infinite-list-item"
          ></bar-item>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import barItem from "@/components/index/BarItem.vue";
import { queryNoVideoPostBarForDate } from "@/api/postbar";
export default {
  name: "postbar-box",
  data() {
    return {
      activeName: "1",
      postBarList: [],
      isLoading: "el-icon-refresh",
    };
  },
  components: {
    barItem,
  },
  computed: {
    isLogin() {
      return this.$store.state.index.isLogin;
    },
  },
  methods: {
    handleClick(tab, event) {},
    obtainNoVideoPostBar() {
      // switch (key) {
      //   case value:

      //     break;

      //   default:
      //     break;
      // }
      this.isLoading = "el-icon-loading";
      queryNoVideoPostBarForDate("").then((res) => {
        this.postBarList = res.data;
        this.isLoading = "el-icon-refresh";
      });
    },
  },
  created() {
    this.obtainNoVideoPostBar();
  },
};
</script>
<style scope>
.postbar-box {
  padding: 0px 5px 0px 5px;
  height: auto;
  position: relative;
  z-index: 1;
  /* border:1px solid aqua; */
}
.el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #e4e7ed;
  z-index: 1;
  width: 192px;
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
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  list-style: none;
}
.el-tabs__item:hover {
  color: rgb(70, 179, 230);
  cursor: pointer;
}
.el-tabs__nav-scroll {
  padding-left: 10px;
  overflow: hidden;
  background-color: white;
  border-radius: 10px;
}
.bar-refresh {
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 1;
  color: gray;
}
.bar-refresh:hover {
  cursor: pointer;
}
</style>