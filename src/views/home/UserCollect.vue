<template>
  <div>
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="6">
      <bar-item v-for="todo in collects" :key="todo.id" :todo="todo"></bar-item>
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
import { queryCollectBarListForDate } from '@/api/home'
export default {
  name: 'UserCollect',
  props: ['userAccount'],
  data() {
    return {
      collects: [],
      loading: true,
      skeletonItem: 'skeleton_item',
      queryParam: {
        id: 0,
        userAccount: '',
      },
    }
  },
  components: {
    barItem,
  },
  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
      this.beforeRefresh()
      this.queryParam.userAccount = this.userAccount
      queryCollectBarListForDate(this.queryParam).then((res) => {
        this.collects = res.data
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
</style>