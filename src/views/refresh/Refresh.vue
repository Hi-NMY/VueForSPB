<template>
  <div></div>
</template>
 
<script>
export default {
  name: 'RefreshIndex',
  data() {
    return {}
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$router.replace('/index')
    })
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false;
    next();
  }
}
</script>
<style scoped>
</style>