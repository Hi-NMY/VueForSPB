<template>
  <div v-show="signInfo" class="sign_main">
    <div class="sign_body">
      <div>
        <div class="info_box">
          <span>已签到{{ longDay }}天</span>
          <div>
            <img src="../../assets/icon_coin.png" /><span>{{ coin }}</span>
          </div>
        </div>
        <div class="sign_box">
          <div v-if="this.signInfo">
            <template v-for="index in 7">
              <div class="sign_item" :key="index">
                <div :class="isSignClass(index)">
                  <i
                    v-if="isSignImg(index)"
                    class="iconfont icon-sign-right"
                  ></i>
                  <img
                    v-if="isSignCoin(index)"
                    src="../../assets/icon_coin.png"
                  />
                  <span v-if="isSignSpan(index)" @click="sendSign(index)"
                    >打卡</span
                  >
                </div>
                <span>第{{ index }}天</span>
              </div>
            </template>
          </div>
        </div>
        <div class="ct_box">
          <div>
            <span class="title">个人徽章</span>
            <span class="tip">完成认证即可获得徽章</span>
          </div>
          <div class="star_box">
            <div class="a">
              <div>
                <span style="font-weight: bold; font-size: 16px">星座徽章</span>
                <span :class="ctStarClass">{{ starTitle }}</span>
              </div>
              <span class="tip">点击认证自己的生日，获取星座徽章</span>
              <span class="tip_blue">注：每个账号仅可成功认证一次</span>
            </div>
            <el-image @click="starCt" :src="starBadge" fit="fill"></el-image>
          </div>
          <div class="big_box">
            <div class="a">
              <div>
                <span style="font-weight: bold; font-size: 16px">认证徽章</span>
                <span :class="ctCtClass">未认证</span>
              </div>
              <span class="tip">点击填写相关信息，获取官方认证徽章</span>
              <span class="tip_blue">注：每个账号仅可成功认证一次</span>
            </div>
            <el-image :src="ctBadge" fit="fill"></el-image>
          </div>
        </div>
      </div>
      <div>
        <div class="like_badge_box">
          <div>
            <span class="title">获赞徽章</span>
            <span class="tip">帖子获赞达到一定数量即可领取</span>
          </div>
          <div class="img_box">
            <template v-for="index in 3">
              <div :key="index">
                <img :src="assetLikeSrc[index - 1]" /><span
                  :class="likeClass(index - 1)"
                  @click="likeClick(index - 1)"
                  >{{ likeTitle(index - 1) }}</span
                >
              </div>
            </template>
          </div>
        </div>
        <div class="sign_badge_box">
          <div>
            <span class="title">签到徽章</span>
            <span class="tip">成功签到一定天数即可领取</span>
          </div>
          <div class="img_box">
            <template v-for="index in 3">
              <div :key="index">
                <img :src="assetTaskSrc[index - 1]" /><span
                  :class="signClass(index - 1)"
                  @click="signClick(index - 1)"
                  >{{ signTitle(index - 1) }}</span
                >
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="认证生日" :visible.sync="starDialog">
      <div>
        <span style="color: red">注：每个账号仅可成功认证一次</span>
        <el-date-picker
          v-model="ctBirth"
          type="date"
          placeholder="选择日期"
          default-value=""
          style="width: 100%"
          format="yyyy - MM - dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <div class="button">
          <el-button class="button_cancel" @click="closeDialog" round
            >取消</el-button
          >
          <el-button
            class="button_right"
            @click="commitStar"
            round
            :disabled="!ctBirth"
            >确定</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as signApi from '@/api/sign';
import { getBirthStarImage } from '@/utils/dateUtil'
export default {
  name: 'sign',
  data() {
    return {
      src: require('../../assets/icon_add_circle.png'),
      starDialog: false,
      ctBirth: '',
      signInfo: null,
      likeCount: 0,
      likeBadgeKey: -1,
      signBadgeKey: -1,
      assetLikeSrc: [
        require('../../assets/like_badge_one.png'),
        require('../../assets/like_badge_two.png'),
        require('../../assets/like_badge_three.png')
      ],
      assetTaskSrc: [
        require('../../assets/sign_badge_one.png'),
        require('../../assets/sign_badge_two.png'),
        require('../../assets/sign_badge_three.png')
      ],
      signArr: []
    }
  },
  computed: {
    longDay() {
      return this.$store.state.userInfo.user.userInfo.userLongday
    },
    coin() {
      if (!this.signInfo) {
        return 0
      }
      return this.signInfo.signCoin
    },
    ctBadge() {
      if (!this.signInfo) {
        return require('../../assets/icon_add_circle.png')
      }
      if (this.signInfo.signCtBadge == 0) {
        return this.urlBadgeImg('certification_badge.png')
      }
      return require('../../assets/icon_add_circle.png')
    },
    ctTitle() {
      if (!this.signInfo) {
        return '未认证'
      }
      if (this.signInfo.signCtBadge == 0) {
        return '已认证'
      }
      return '未认证'
    },
    ctCtClass() {
      if (!this.signInfo) {
        return 'ct_class_false'
      }
      if (this.signInfo.signCtBadge == 0) {
        return 'ct_class_true'
      }
      return 'ct_class_false'
    },
    starBadge() {
      if (!this.signInfo) {
        return require('../../assets/icon_add_circle.png')
      }
      if (this.signInfo.signStarBadge) {
        return this.urlBadgeImg(this.signInfo.signStarBadge)
      }
      return require('../../assets/icon_add_circle.png')
    },
    starTitle() {
      if (!this.signInfo) {
        return '未认证'
      }
      if (this.signInfo.signStarBadge) {
        return '已认证'
      }
      return '未认证'
    },
    ctStarClass() {
      if (!this.signInfo) {
        return 'ct_class_false'
      }
      if (this.signInfo.signStarBadge) {
        return 'ct_class_true'
      }
      return 'ct_class_false'
    },
  },
  methods: {
    starCt() {
      if (!this.signInfo.signStarBadge) {
        this.starDialog = true
      } else {
        this.$message({
          duration: 1500,
          showClose: true,
          message: '你已认证',
        })
      }
    },
    ct() {

    },
    closeDialog() {
      this.starDialog = false
    },
    commitStar() {
      const star = getBirthStarImage(this.ctBirth)
      signApi.updateStarBadge({
        userAccount: this.$store.state.userInfo.user.userInfo.userAccount,
        signStarBadge: star
      }).then((res) => {
        this.closeDialog()
        if (res.data) {
          this.signInfo.signStarBadge = star
          this.$message({
            duration: 1500,
            showClose: true,
            message: '认证成功',
          })
        } else {
          this.$message({
            duration: 1500,
            showClose: true,
            type: 'error',
            message: '认证失败，请重试',
          })
        }
      })
    },
    likeClass(index) {
      let aclass = 'no_badge'
      if (!this.signInfo) {
        return aclass
      }
      switch (index) {
        case 0:
          if (this.likeCount >= 15) {
            aclass = 'yes_badge'
            this.likeBadgeKey = 0
          }
          break;
        case 1:
          if (this.likeCount >= 60) {
            aclass = 'yes_badge'
            this.likeBadgeKey = 1
          }
          break;
        case 2:
          if (this.likeCount >= 150) {
            aclass = 'yes_badge'
            this.likeBadgeKey = 2
          }
          break;
      }
      if (this.signInfo.signLikeBadge) {
        let arr = this.signInfo.signLikeBadge.split('|')
        arr.pop()
        if (index < arr.length) {
          aclass = 'no_badge'
        }
      }
      return aclass
    },
    likeTitle(index) {
      let title = ''
      switch (index) {
        case 0:
          title = '15赞'
          break;
        case 1:
          title = '60赞'
          break;
        case 2:
          title = '150赞'
          break;
      }
      if (this.signInfo && this.signInfo.signLikeBadge) {
        let arr = this.signInfo.signLikeBadge.split('|')
        arr.pop()
        if (index < arr.length) {
          title = '已领取'
        }
      }
      return title
    },
    likeClick(index) {
      if (this.likeBadgeKey == -1 || index > this.likeBadgeKey) {
        this.$message({
          duration: 1500,
          showClose: true,
          message: '未完成此任务，不能领取',
        })
        return
      }
      if (this.signInfo && this.signInfo.signLikeBadge) {
        let arr = this.signInfo.signLikeBadge.split('|')
        arr.pop()
        if (index < arr.length) {
          this.$message({
            duration: 1500,
            showClose: true,
            message: '您已领取此徽章',
          })
          return
        }
      }
      let badge = ''
      switch (index) {
        case 0:
          badge = 'like_badge_one.png|'
          break;
        case 1:
          badge = 'like_badge_one.png|like_badge_two.png|'
          break;
        case 2:
          badge = 'like_badge_one.png|like_badge_two.png|like_badge_three.png|'
          break;
      }
      signApi.updateSignLikeBadge({
        'userAccount': this.$store.state.userInfo.user.userInfo.userAccount,
        'signLikeBadge': badge
      }).then((res) => {
        if (res.data) {
          this.signInfo.signLikeBadge = badge
          this.$message({
            duration: 1500,
            showClose: true,
            message: '徽章已领取',
          })
        }
      })
    },
    signClass(index) {
      let aclass = 'no_badge'
      if (!this.signInfo) {
        return aclass
      }
      const day = this.$store.state.userInfo.user.userInfo.userLongday
      switch (index) {
        case 0:
          if (day >= 10) {
            aclass = 'yes_badge'
            this.signBadgeKey = 0
          }
          break;
        case 1:
          if (day >= 50) {
            aclass = 'yes_badge'
            this.signBadgeKey = 1
          }
          break;
        case 2:
          if (day >= 110) {
            aclass = 'yes_badge'
            this.signBadgeKey = 2
          }
          break;
      }
      if (this.signInfo.signTaskBadge) {
        let arr = this.signInfo.signTaskBadge.split('|')
        arr.pop()
        if (index < arr.length) {
          aclass = 'no_badge'
        }
      }
      return aclass
    },
    signTitle(index) {
      let title = ''
      switch (index) {
        case 0:
          title = '10天'
          break;
        case 1:
          title = '50天'
          break;
        case 2:
          title = '110天'
          break;
      }
      if (this.signInfo && this.signInfo.signTaskBadge) {
        let arr = this.signInfo.signTaskBadge.split('|')
        arr.pop()
        if (index < arr.length) {
          title = '已领取'
        }
      }
      return title
    },
    signClick(index) {
      if (this.signBadgeKey == -1 || index > this.signBadgeKey) {
        this.$message({
          duration: 1500,
          showClose: true,
          message: '未完成此任务，不能领取',
        })
        return
      }
      if (this.signInfo && this.signInfo.signTaskBadge) {
        let arr = this.signInfo.signTaskBadge.split('|')
        arr.pop()
        if (index < arr.length) {
          this.$message({
            duration: 1500,
            showClose: true,
            message: '您已领取此徽章',
          })
          return
        }
      }
      let badge = ''
      switch (index) {
        case 0:
          badge = 'sign_badge_one.png|'
          break;
        case 1:
          badge = 'sign_badge_one.png|sign_badge_two.png|'
          break;
        case 2:
          badge = 'sign_badge_one.png|sign_badge_two.png|sign_badge_three.png|'
          break;
      }
      signApi.updateSignTaskBadge({
        'userAccount': this.$store.state.userInfo.user.userInfo.userAccount,
        'signTaskBadge': badge
      }).then((res) => {
        if (res.data) {
          this.signInfo.signTaskBadge = badge
          this.$message({
            duration: 1500,
            showClose: true,
            message: '徽章已领取',
          })
        }
      })
    },
    isSignClass(index) {
      if (index + 0 <= this.signArr.length) {
        return 'sign_class'
      }
      return 'no_sign'
    },
    isSignImg(index) {
      if (index + 0 <= this.signArr.length) {
        return true
      }
      return false
    },
    isSignCoin(index) {
      if (index + 0 == this.signArr.length + 1) {
        const isRight = this.signInfo.signRight
        if (isRight == 1) {
          return false
        }
      }
      if (index + 0 > this.signArr.length) {
        return true
      }
      return false
    },
    isSignSpan(index) {
      if (index + 0 == this.signArr.length + 1) {
        const isRight = this.signInfo.signRight
        if (isRight == 1) {
          return true
        }
      }
      return false
    },
    sendSign(index) {
      this.signArr.push(index + "")
      this.signInfo.signRight = 0
      let str = ''
      for (let i = 0; i < this.signArr.length; i++) {
        str += (this.signArr[i] + "|")
      }
      signApi.sign({
        userAccount: this.$store.state.userInfo.user.userInfo.userAccount,
        signDay: str,
        signCoin: index
      }).then((res) => {
        if (res) {
          this.signInfo.signCoin = this.signInfo.signCoin + index
          this.$store.commit('userInfo/updateUserLongDay')
          this.$message({
            duration: 1500,
            showClose: true,
            type:'success',
            message: '签到成功，金币＋' + index,
          })
       } else {
          this.$message({
            duration: 1500,
            showClose: true,
            message: '出错了，请重试',
          })
        }
      })
    }
  },
  mounted() {
    const ac = this.$store.state.userInfo.user.userInfo.userAccount
    signApi.queryUserBarLikeCount(ac).then((res) => {
      this.likeCount = res.data
    })
    signApi.getSign({ 'userAccount': ac }).then((result) => {
      this.signInfo = result.data
      if (this.signInfo.signDay) {
        this.signArr = this.signInfo.signDay.split('|')
      }
      this.signArr.pop()
    })
  },
}
</script>

<style scope lang="scss">
.sign_main {
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sign_body {
  background-color: #f5f5f5;
  margin: 20px 18% 0px 18%;
  height: 100%;
  // border: 3px solid rgb(187, 54, 54);
  min-width: 1000px;
  margin-top: 85px;
  display: flex;
}
.sign_body > div {
  // border: 2px blue solid;
  display: flex;
  flex-direction: column;
}
.sign_body > div > div {
  margin-right: 10px;
}
.sign_main {
  .sign_box,
  .info_box,
  .like_badge_box,
  .sign_badge_box,
  .ct_box {
    padding: 12px;
    border-radius: 10px;
    background-color: white;
    margin-bottom: 10px;
  }
}
.sign_box > div {
  display: flex;
  align-items: center;
}
.sign_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .sign_item {
    margin: 5px 10px;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: white;
        font-size: 14px;
        cursor: pointer;
      }
    }
    img {
      width: 24px;
      height: 24px;
    }
  }
  .sign_class {
    width: 40px;
    height: 56px;
    background-color: #f2f6fc;
    border-radius: 5px;
    margin-bottom: 5px;
  }
  .no_sign {
    width: 40px;
    height: 56px;
    border-radius: 5px;
    margin-bottom: 5px;
    background-image: linear-gradient(to top right, #46b3e6, #4d80e4);
  }
  .iconfont.icon-sign-right {
    font-size: 28px;
    color: #e93b81;
  }
}
.sign_main {
  .info_box {
    display: flex;
    justify-content: space-between;
    span {
      line-height: 2;
    }
    img {
      width: 30px;
      height: 30px;
      margin-right: 4px;
    }
    div {
      display: flex;
      align-content: center;
    }
  }
}
.like_badge_box,
.sign_badge_box,
.ct_box {
  padding-top: 16px;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  align-content: center;
  .img_box {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0px 50px;
    display: flex;
    div {
      margin: 0px 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  img {
    width: 100px;
    height: 100px;
  }
}
.star_box,
.big_box {
  margin-left: 20px;
  margin-right: 20px;
  border-top: 0.5px #f2f6fcea solid;
  margin-top: 20px;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  .a {
    display: flex;
    flex-direction: column;
  }
  .el-image__inner {
    width: 68px;
    height: 68px;
  }
  .el-image__inner:hover {
    cursor: pointer;
  }
}
.sign_main {
  .tip {
    color: #909399;
    font-size: 12px;
    margin-top: 8px;
  }
  .title {
    color: #303133;
    font-weight: bold;
    font-size: 18px;
    margin-right: 12px;
  }
  .tip_blue {
    color: #4d80e4;
    font-size: 12px;
    margin-top: 4px;
  }
  .ct_class_true {
    margin-left: 8px;
    text-align: center;
    width: 40px;
    font-size: 13px;
    border-radius: 5px;
    padding: 4px 8px;
    color: white;
    background-image: linear-gradient(to top right, #dff6f0, #ffcc29);
  }
  .ct_class_false {
    margin-left: 8px;
    text-align: center;
    width: 40px;
    font-size: 13px;
    border-radius: 5px;
    padding: 4px 8px;
    color: white;
    background-image: linear-gradient(to top right, #4d80e4, #a685e2);
  }
  .yes_badge {
    text-align: center;
    width: 40px;
    font-size: 13px;
    border-radius: 5px;
    padding: 4px 8px;
    color: white;
    background-image: linear-gradient(to top right, #dff6f0, #ffcc29);
  }
  .no_badge {
    text-align: center;
    width: 40px;
    font-size: 13px;
    border-radius: 5px;
    padding: 4px 8px;
    background-color: #f2f6fc;
  }
  .yes_badge:hover {
    cursor: pointer;
  }
  .no_badge:hover {
    cursor: pointer;
  }
}
.sign_main {
  .el-dialog {
    border-radius: 10px;
    min-width: 300px;
    max-width: 600px;
  }
  .el-dialog > div {
    display: flex;
    flex-direction: column;
  }
  .button {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .el-button.is-round {
    border-radius: 20px;
    border: 0;
    width: 100px;
    height: 36px;
    line-height: 0.8;
    font-weight: bold;
  }
  .button_cancel {
    background-color: #eeeeee;
    color: #303133;
  }
  .button_right {
    background-color: #3bb0e6;
    color: #ffffff;
  }
  .button_cancel:hover {
    background-color: #e0e0e0;
    color: #303133;
  }
  .button_right:hover {
    background-color: #2e8db9;
    color: #ffffff;
  }
}
</style>