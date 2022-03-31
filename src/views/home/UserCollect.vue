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
import { queryNoVideoPostBarForDate } from '@/api/postbar'
export default {
  name: 'UserCollect',
  data() {
    return {
      collects: [],
      loading: true,
      skeletonItem: 'skeleton_item',
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
      queryNoVideoPostBarForDate('').then((res) => {
        this.afterRefresh()
        this.collects = res.data
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