<template>
  <div class="stopic_main">
    <topic-item-width
      class="item"
      v-for="(topic, index) in data"
      :key="index"
      :topicInfo="topic"
    ></topic-item-width>
  </div>
</template>
<script>
import { querySearchTopicList } from "@/api/search";
import topicItemWidth from '@/components/topic/topicItemWidth.vue'
export default {
  name: 'stopic',
  components: {
    topicItemWidth
  },
  data() {
    return {
      data: []
    }
  },
  methods: {
    init() {
      const search = this.$route.query.search
      this.$bus.$emit('setSearch', search)
      querySearchTopicList(search).then((res) => {
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
.stopic_main {
  min-height: 700px;
  border-radius: 10px;
  background-color: white;
  padding: 18px 18px 18px 18px;
  overflow: hidden;
  .item {
    width: auto;
    margin-bottom: 16px;
  }
}
</style>