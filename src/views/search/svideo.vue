<template>
  <div class="svideo_main">
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="6">
      <bar-item
        v-for="item in data"
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
    <div style="width: 100%; text-align: center">加载中，请稍后.....</div>
  </div>
</template>
<script>
import { queryVideoSearchBarListForDate } from "@/api/search";
import barItem from '@/components/bar/BarItem.vue'
export default {
  name: 'svideo',
  components:{
    barItem
  },
  data() {
    return {
      data: [],
      loading: true,
      skeletonItem: 'skeleton_item',
    }
  },
  methods: {
    init() {
      const search = this.$route.query.search
      this.$bus.$emit('setSearch', search)
      queryVideoSearchBarListForDate(search).then((res) => {
        this.loading = false
        this.data = res.data
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.svideo_main {
  min-height: 700px;
  border-radius: 10px;
  background-color: white;
  padding: 18px 0px 18px 0px;
  overflow: hidden;
}
.skeleton_item {
  width: auto;
  padding: 0px 12px 0px 12px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: white;
}
</style>