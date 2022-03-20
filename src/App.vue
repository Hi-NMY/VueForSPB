<template>
  <div id="app">
      <Box></Box>
  </div>
</template>

<script>
import Box from './components/login/Box'
export default {
  name: 'App',
  components:{
    Box
  }
}
</script>

<style>
   *{padding: 0; margin: 0;}

   #app{
        display: flex;
        height: 100%;
   }
</style>
