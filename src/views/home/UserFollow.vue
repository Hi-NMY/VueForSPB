<template>
  <div class="follow">
    <div class="follow_head">
      <div class="folllowcount">
        全部关注（<span>{{ follows.length }}</span
        >）
      </div>
      <div class="search_follow">
        <!-- <button>
          <i class="el-icon-search"></i>
        </button> -->
        <!-- <el-input
          type="text"
          placeholder="搜索好友"
          v-model="search"
          @keyup.enter.native="queryTopicList"
        ></el-input> -->
      </div>
    </div>
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="2">
      <follow-item v-for="follow in follows" :key="follow.id" :follow="follow" :isOtherUser="isOtherUser">
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
import { queryFollowedList } from '@/api/follow'
import { homeChildren } from '@/mixin/home'
export default {
  name: 'UserFollow',
  props: ['userAccount'],
  mixins: [homeChildren],
  data() {
    return {
      search: '',
      follows: [],
      loading: true,
      skeletonItem: 'skeleton_item',
      queryParam: {
        userAccount: '',
        id: 0,
      }
    }
  },
  computed: {

  },
  components: {
    followItem,
  },
  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
      this.beforeRefresh()
      if (this.user.followedPresenter.length == 0 || (this.isOtherUser && this.userPrivacy[4] != 1)) {
        this.afterRefresh()
        return
      }
      this.queryParam.userAccount = this.user.userInfo.userAccount
      queryFollowedList(this.queryParam).then((res) => {
        this.follows = res.data
        this.afterRefresh()
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
  },
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
    z-index: 0;
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