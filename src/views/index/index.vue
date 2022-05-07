<template>
  <div class="index">
    <!-- <head-box></head-box> -->
    <div class="main">
      <div class="main_left">
        <send-bar v-if="isSendBar" :isVideo="sendVideo"></send-bar>
        <post-bar class="postBar"></post-bar>
      </div>
      <div class="main_right">
        <bar-fun-group></bar-fun-group>
        <hot-topic class="hotTopic"></hot-topic>
        <random-user class="randomUser"></random-user>
      </div>
    </div>
  </div>
</template>
<script>
// import headBox from "@/components/head/Head.vue";
import postBar from '@/components/index/PostBar.vue'
import randomUser from '@/components/index/RandomUser.vue'
import hotTopic from '@/components/index/HotTopic.vue'
import barFunGroup from '@/components/index/BarFunGroup.vue'
import sendBar from '@/components/index/SendBar.vue'
export default {
  name: 'indexI',
  data() {
    return {
      isSendBar: false,
      sendVideo: false,
    }
  },
  components: {
    // headBox,
    postBar,
    randomUser,
    hotTopic,
    barFunGroup,
    sendBar,
  },
  methods: {
    showSendBar(v1, v2) {
      this.isSendBar = v1
      this.sendVideo = v2
    },
  },
  mounted() {
    this.$bus.$on('sendBar', this.showSendBar)
  },
  beforeDestroy() {
    this.$bus.$off('sendBar')
  },
}
</script>
<style scoped lang="scss">
.index {
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main {
  margin: 20px 18% 0px 18%;
  height: 100%;
  width: auto;
  /* border: 3px solid rgb(187, 54, 54); */
  min-width: 1000px;
  display: flex;
  align-items: top;
  margin-top: 85px;
  position: relative;
}
.main_left {
  width: 69%;
  margin-right: 0.5%;
}
.main_right {
  // position: fixed;
  // right: 256px;
  margin-left: 0.5%;
  width: 30%;
}
.randomUser {
  margin-top: 10px;
}
.hotTopic {
  margin-top: 10px;
}
</style>