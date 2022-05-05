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
    <div style="width: 100%; text-align: center">加载中，请稍后.....</div>
  </div>
</template>

<script>
import barItem from '@/components/bar/BarItem.vue'
import { queryNoVideoPostBarForDate } from '@/api/postbar'
import { listLoad } from '@/mixin/list'
export default {
  name: 'NoVideoBar',
  mixins: [listLoad],
  data() {
    return {
      noVidePostBarList: [],
      loading: true,
      skeletonItem: 'skeleton_item',
      queryParam: {
        id: 0
      }
    }
  },
  components: {
    barItem,
  },
  methods: {
    refresh() {
      this.beforeRefresh()
      this.obtainData()
    },
    obtainData() {
      queryNoVideoPostBarForDate(this.queryParam).then((res) => {
        if (this.queryParam.id == 0) {
          this.noVidePostBarList = res.data
        }else{
          this.noVidePostBarList.push.apply(this.noVidePostBarList,res.data)
        }
        this.queryParam.id = this.noVidePostBarList[this.noVidePostBarList.length - 1].id
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
      this.loadAfter()
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
  beforeRouteLeave(to, from, next) {
    from.meta.keepAlive = true;
    next();
  }
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