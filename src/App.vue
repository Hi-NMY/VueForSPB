<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  display: flex;
  height: auto;
  min-height: 700px;
  overflow-x: hidden;
  height: 100%;
  overflow: auto;
}
</style>
