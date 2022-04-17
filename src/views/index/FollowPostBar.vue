<template>
  <div>
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="6">
      <bar-item
        v-for="item in followPostBarList"
        :key="item.pbOneId"
        :todo="item"
        class="infinite-list-item"
      ></bar-item>
    </el-skeleton>
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="6">
    </el-skeleton>
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="6">
    </el-skeleton>
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="6">
    </el-skeleton>
  </div>
</template>

<script>
import barItem from '@/components/bar/BarItem.vue'
import { queryNoVideoFollowPostBarForDate } from '@/api/postbar'
export default {
  name: 'FollowBar',
  data() {
    return {
      followPostBarList: [],
      loading: true,
      skeletonItem: 'skeleton_item',
      queryParam: {
        id: 0,
        userAccount: '',
      },
    }
  },
  watch: {
    '$store.state.userInfo.user.userInfo.userAccount': {
      handler(newValue, oldValue) {
        if (newValue != '' && oldValue == '') {
          this.queryParam.userAccount = newValue
          this.refresh()
        }
      },
    },
  },
  components: {
    barItem,
  },
  methods: {
    refresh() {
      this.beforeRefresh()
      if (!this.$store.state.userInfo.user.userInfo.userAccount) {
        return
      } else {
        this.queryParam.userAccount =
          this.$store.state.userInfo.user.userInfo.userAccount
      }
      queryNoVideoFollowPostBarForDate(this.queryParam).then((res) => {
        this.followPostBarList = res.data
        this.afterRefresh()
        this.$bus.$emit('afterRefresh')
      })
    },
    firstRefresh() {
      this.queryParam.id = 0
      this.refresh()
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
  mounted() {
    this.$bus.$on('refreshIndexBar', this.firstRefresh)
    this.refresh()
  },
  beforeDestroy() {
    this.$bus.$off('refreshIndexBar')
  },
}
</script>

<style scope>
.skeleton_item {
  width: auto;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: white;
}
</style>