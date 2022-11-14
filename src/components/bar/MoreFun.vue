<template>
  <div class="more_fun">
    <span
      v-if="keyFun == 1 || keyFun == 3"
      @click="collect"
      class="morefun_content"
      >收藏</span
    >
    <span
      v-if="keyFun == 2 || keyFun == 4"
      @click="deleteCollect"
      class="morefun_content"
      >取消收藏</span
    >
    <span
      v-if="keyFun == 3 || keyFun == 4"
      @click="deleteBar"
      class="morefun_content"
      >删除</span
    >
    <span v-if="keyFun == 1 || keyFun == 2" class="morefun_content">举报</span>
  </div>
</template>

<script>
import * as funMethed from '@/api/moreFun';
export default {
  name: 'more-fun',
  props: ['keyFun', 'barId'],
  methods: {
    collect() {
      funMethed.collect({
        userAccount: this.$store.state.userInfo.user.userInfo.userAccount,
        pbOneId: this.barId,
      }).then((res) => {
        console.log(res);
        if (res.data) {
          this.$store.commit('userInfo/addCollectBar', this.barId)
          this.$message({
            duration: 1500,
            message: '已收藏',
          })
        } else {
          this.$message({
            duration: 1500,
            message: '错误，请重试',
            type: 'warning',
          })
        }
      })
      this.close()
    },
    deleteCollect() {
      funMethed.delCollect({
        userAccount: this.$store.state.userInfo.user.userInfo.userAccount,
        pbOneId: this.barId,
      }).then((res) => {
        if (res.data) {
          this.$store.commit('userInfo/delCollectBar', this.barId)
          this.$message({
            duration: 1500,
            message: '已取消收藏',
          })
        } else {
          this.$message({
            duration: 1500,
            message: '错误，请重试',
            type: 'warning',
          })
        }
      })
      this.close()
    },
    deleteBar() {
      const id = this.barId
      funMethed.delBar({
        pbId: id
      }).then((res) => {
        if (res.data) {
          this.$store.commit('userInfo/changeBarCount', -1)
          this.$bus.$emit('delBar',id)
          this.$message({
            duration: 1500,
            message: '已删除',
          })
        } else {
          this.$message({
            duration: 1500,
            message: '错误，请重试',
            type: 'warning',
          })
        }
      })
      this.close()
    },
    close() {
      this.$bus.$emit('closeMoreFun')
    }
  },
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
  width: 52px;
  text-align: center;
  padding: 10px 20px;
}
.more_fun > span:hover {
  background-color: rgb(245, 245, 245);
  cursor: pointer;
}
</style>