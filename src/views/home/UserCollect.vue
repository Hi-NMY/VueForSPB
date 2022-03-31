<template>
  <div>
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="6">
      <bar-item
        v-for="todo in collects"
        :key="todo.id"
        :todo="todo"></bar-item>
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
import * as api from '../../api/postbar'
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
  created() {
    this.findCollects()
  },
  mounted() {
    this.refresh()
  },
  beforeDestroy() {
    this.$bus.$off('refreshIndexBar')
  },
  methods: {
    findCollects() {
      api.queryNoVideoPostBarForDate().then((res) => {
        this.collects = res.data
        console.log(this.collects)
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
</style>