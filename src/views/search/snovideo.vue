<template>
  <div class="snovideo_main">
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
  </div>
</template>
<script>
import { queryNoVideoSearchBarList } from "@/api/search";
import barItem from '@/components/bar/BarItem.vue';
export default {
  name: 'snovideo',
  components:{
    barItem
  },
  data() {
    return {
      skeletonItem: 'skeleton_item',
      loading:true,
      data:[]
    }
  },
  methods: {
    init() {
      const search = this.$route.query.search
      this.$bus.$emit('setSearch',search)
      queryNoVideoSearchBarList(search).then((res) => {
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
.snovideo_main {
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