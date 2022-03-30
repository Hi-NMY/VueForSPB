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
}
</script>
<style scoped>
</style>