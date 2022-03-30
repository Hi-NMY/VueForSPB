<template>
  <div>
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="6">
      <bar-item
        v-for="item in noVidePostBarList"
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
import { queryNoVideoPostBarForDate } from '@/api/postbar'
export default {
  name: 'NoVideoBar',
  data() {
    return {
      noVidePostBarList: [],
      loading: true,
      skeletonItem: 'skeleton_item',
    }
  },
  components: {
    barItem,
  },
  methods: {
    refresh() {
      this.beforeRefresh()
      queryNoVideoPostBarForDate('').then((res) => {
        this.noVidePostBarList = res.data
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
  },
  mounted() {
    this.$bus.$on('refreshIndexBar', this.refresh)
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