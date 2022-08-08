<template>
  <div class="suser_main">
    <el-skeleton :class="skeletonItem" :loading="loading" animated :rows="2">
      <follow-item v-for="item in data" :key="item.userAccount" :follow="item" :isOtherUser="false">
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
import { querySearchUser } from "@/api/search";
import followItem from '@/components/home/FollowItem.vue'
export default {
  name: 'suser',
  components: {
    followItem,
  },
  data() {
    return {
      loading: true,
      skeletonItem: 'skeleton_item',
      data: []
    }
  },
  methods: {
    init() {
      const search = this.$route.query.search
      this.$bus.$emit('setSearch', search)
      querySearchUser(search).then((res) => {
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
.suser_main {
  min-height: 700px;
  border-radius: 10px;
  background-color: white;
  padding: 18px;
  overflow: hidden;
}
.skeleton_item {
  width: auto;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: white;
}
</style>