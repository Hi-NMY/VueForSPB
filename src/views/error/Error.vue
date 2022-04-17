<template>
  <div>出错了</div>
</template>
 
<script>
export default {
  name: 'Null',
  data() {
    return {}
  },
  beforeRouteEnter(to, from, next) {

    //vm.$router.replace('/index')
  },
  mounted() {
    this.$store.commit('index/updateHasHead', false)
  },
  beforeDestroy() {
    this.$store.commit('index/updateHasHead', true)
  },
}
</script>
<style scoped>
</style>