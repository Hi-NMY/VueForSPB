<template>
  <div class="follow">
    <div class="follow_head">
      <div class="folllowcount">全部关注我的（<span>32</span>）</div>
      <div class="search_follow">
        <button>
          <i class="el-icon-search"></i>
        </button>
        <el-input type="text" placeholder="搜索好友" v-model="search"></el-input>
      </div>
    </div>
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="2">
      <follow-item
        v-for="follow in follows"
        :key="follow.id"
        :follow="follow">
      </follow-item>
    </el-skeleton>
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="2">
    </el-skeleton>
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="2">
    </el-skeleton>
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="2">
    </el-skeleton>
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="2">
    </el-skeleton>
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="2">
    </el-skeleton>
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="2">
    </el-skeleton>
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="2">
    </el-skeleton>
  </div>
</template>

<script>
import followItem from '@/components/home/FollowItem.vue'
import * as api from '../../api/follow'
import { queryNoVideoPostBarForDate } from '@/api/postbar'
export default {
  name: 'UserFollowed',
  data() {
    return {
      search: '',
      follows: [],
      loading: true,
      skeletonItem: 'skeleton_item',
    }
  },
  components: {
    followItem,
  },
  created() {
    this.findFollows()
  },
  mounted() {
    this.refresh()
  },
  beforeDestroy() {
    this.$bus.$off('refreshIndexBar')
  },
  methods: {
    findFollows() {
      api.queryFollowedList().then((res) => {
        this.follows = res.data
        console.log(this.follows)
      })
    },
    refresh() {
      this.beforeRefresh()
      queryNoVideoPostBarForDate('').then((res) => {
        this.afterRefresh()
        this.$bus.$emit('afterRefresh')
      })
    },
    beforeRefresh() {
      this.loading = true
      this.skeletonItem = 'skeleton_item'
    },
    afterRefresh() {
      this.loading = false
      this.skeletonItem = ''
    },
  }

}
</script>

<style scope lang="scss">
.skeleton_item {
  width: auto;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: white;
}
.follow {
  padding: 10px 20px;
  background-color: white;
  border-radius: 10px;
}
.follow_head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
}
.search_follow {
  display: flex;
  width: 200px;
  button {
    width: auto;
    padding: 0px 10px;
    border-radius: 20px 0 0 20px;
    border: 0;
    border-left: 0;
    z-index: 99;
    background-color: #f5f5f5;
  }
  .el-input__inner {
    border-radius: 0 20px 20px 0;
    background-color: #f5f5f5;
    border: 0;
    height: 35px;
    padding: 0 10px 0 0;
  }
}
</style>