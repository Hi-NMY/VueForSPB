<template>
  <div class="postbar-box">
    <div @click="obtainPostBar" class="bar-refresh">
      <i :class="refreshLoading"></i>
      刷新
    </div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="广场" name="1">
          <el-skeleton
            :class="skeletonItem"
            :loading="loading"
            animated
            :rows="6"
          >
            <bar-item
              v-for="item in noVidePostBarList"
              :key="item.pbOneId"
              :todo="item"
              class="infinite-list-item"
            ></bar-item>
          </el-skeleton>
          <el-skeleton
            :class="skeletonItem"
            :loading="loading"
            animated
            :rows="6"
          >
          </el-skeleton>
          <el-skeleton
            :class="skeletonItem"
            :loading="loading"
            animated
            :rows="6"
          >
          </el-skeleton>
          <el-skeleton
            :class="skeletonItem"
            :loading="loading"
            animated
            :rows="6"
          >
          </el-skeleton>
        </el-tab-pane>
        <el-tab-pane label="视频" name="2">
          <el-skeleton
            :class="skeletonItem"
            :loading="loading"
            animated
            :rows="6"
          >
            <bar-item
              v-for="item in videoPostBarList"
              :key="item.pbOneId"
              :todo="item"
              class="infinite-list-item"
            ></bar-item>
          </el-skeleton>
          <el-skeleton
            :class="skeletonItem"
            :loading="loading"
            animated
            :rows="6"
          >
          </el-skeleton>
          <el-skeleton
            :class="skeletonItem"
            :loading="loading"
            animated
            :rows="6"
          >
          </el-skeleton>
          <el-skeleton
            :class="skeletonItem"
            :loading="loading"
            animated
            :rows="6"
          >
          </el-skeleton>
        </el-tab-pane>
        <el-tab-pane v-if="isLogin" label="我的关注" name="3">
          <el-skeleton
            :class="skeletonItem"
            :loading="loading"
            animated
            :rows="6"
          >
            <bar-item
              v-for="item in followPostBarList"
              :key="item.pbOneId"
              :todo="item"
              class="infinite-list-item"
            ></bar-item>
          </el-skeleton>
          <el-skeleton
            :class="skeletonItem"
            :loading="loading"
            animated
            :rows="6"
          >
          </el-skeleton>
          <el-skeleton
            :class="skeletonItem"
            :loading="loading"
            animated
            :rows="6"
          >
          </el-skeleton>
          <el-skeleton
            :class="skeletonItem"
            :loading="loading"
            animated
            :rows="6"
          >
          </el-skeleton>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import barItem from "@/components/bar/BarItem.vue";
import {
  queryNoVideoPostBarForDate,
  queryVideoPostBarForDate,
  queryNoVideoFollowPostBarForDate,
} from "@/api/postbar";
export default {
  name: "postbar-box",
  data() {
    return {
      activeName: "1",
      noVidePostBarList: [],
      videoPostBarList: [],
      followPostBarList: [],
      refreshLoading: "el-icon-refresh",
      loading: true,
      skeletonItem: "skeleton_item",
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
    handleClick(tab, event) {
      switch (tab.index) {
        case "0":
          if (this.noVidePostBarList.length == 0) {
            this.obtainPostBar();
          }
          break;
        case "1":
          if (this.videoPostBarList.length == 0) {
            this.obtainPostBar();
          }
          break;
        case "2":
          if (this.followPostBarList.length == 0) {
            this.obtainPostBar();
          }
          break;
        default:
          break;
      }
    },
    obtainPostBar() {
      this.beforeRefresh();
      switch (this.activeName) {
        case "1":
          queryNoVideoPostBarForDate("").then((res) => {
            this.noVidePostBarList = res.data;
            this.afterRefresh();
          });
          break;
        case "2":
          queryVideoPostBarForDate("").then((res) => {
            this.videoPostBarList = res.data;
            this.afterRefresh();
          });
          break;
        case "3":
          queryNoVideoFollowPostBarForDate("").then((res) => {
            this.followPostBarList = res.data;
            this.afterRefresh();
          });
          break;
        default:
          break;
      }
    },
    beforeRefresh() {
      this.refreshLoading = "el-icon-loading";
      this.loading = true;
      this.skeletonItem = "skeleton_item";
    },
    afterRefresh() {
      this.refreshLoading = "el-icon-refresh";
      this.loading = false;
      this.skeletonItem = "";
    },
  },
  created() {
    this.obtainPostBar();
  },
};
</script>
<style scope>
.skeleton_item {
  width: auto;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: white;
}
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