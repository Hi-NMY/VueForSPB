<template>
  <div id="app">
    <el-button type="primary">主要按钮</el-button>
    <span>{{msg}}</span>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      msg:"111"
    }
  }
}
</script>

<style>
</style>
