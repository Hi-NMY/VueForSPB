<template>
  <div id="app">
      <Head></Head>
  </div>
</template>

<script>

import Head from './components/head/Head'
export default {
  name: 'App',
  components:{
      Head
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
