<template>
  <div class="home">
    <!-- <head-box></head-box> -->
    <div class="main">个人空间</div>
  </div>
</template>

<script>
// import headBox from "@/components/head/Head.vue";
export default {
  name: 'home',
  components: {
    // headBox,
  },
  created() {
    this.$bus.$emit('clearSelect', '/home')
  },
}
</script>

<style scope>
.home {
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main {
  margin: 20px 18% 0px 18%;
  height: auto;
  width: auto;
  /* border: 3px solid rgb(187, 54, 54); */
  min-width: 1000px;
  display: flex;
  align-items: top;
  margin-top: 85px;
}
</style>