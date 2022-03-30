<template>
  <div class="more_fun">
    <span>收藏</span>
    <span>举报</span>
  </div>
</template>

<script>
export default {
  name: 'more-fun',
}
</script>

<style scpoe lang="scss">
.more_fun {
  font-size: 13px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.more_fun > span {
  padding: 10px 20px;
}
.more_fun > span:hover {
  background-color: rgb(245, 245, 245);
  cursor: pointer;
}
</style>