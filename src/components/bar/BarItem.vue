<template>
  <div class="bar_item">
    <div>
      <div class="item_head">
        <el-avatar :size="50" src="" @click.native="gotoHome(todo.userAccount)">
          <img src="../../assets/logo.png" />
        </el-avatar>
        <div class="item_head_msg">
          <div>
            <span class="name" @click="gotoHome(todo.userAccount)">{{
              todo.userName
            }}</span>
            <el-image
              src="https://tva4.sinaimg.cn/large/005LlRGlgy1h0k69p2l15j30tz0tzjxv.jpg"
            ></el-image>
          </div>
          <span class="date">{{ date }}</span>
        </div>
        <div class="icon" style="height: 35px">
          <!--<i @click="closeSel2" class="iconfont icon-xiajiantou" style="z-index: 100"></i>-->
          <i
            @click="moreFun = !moreFun"
            class="iconfont icon-xiajiantou"
            style="
              z-index: 1;
              width: auto;
              height: auto;
              position: absolute;
              top: 10px;
              right: 16px;
            "
          ></i>
          <div class="moreFunClass" @clicks="closeSel" v-show="moreFun">
            <more-fun></more-fun>
          </div>
        </div>
      </div>
      <div class="item_main">
        <div class="item_article">
          <span>{{ todo.pbArticle }}</span>
        </div>
        <div class="item_img">
          <el-image
            src="https://tva4.sinaimg.cn/large/005LlRGlgy1h0k69p2l15j30tz0tzjxv.jpg"
          ></el-image>
          <el-image
            src="https://tva4.sinaimg.cn/large/005LlRGlgy1h0k69p2l15j30tz0tzjxv.jpg"
          ></el-image>
        </div>
        <div v-show="location" class="item_location">
          <i class="iconfont icon-location"></i>
          <span>{{ todo.pbLocation }}</span>
        </div>
        <div v-show="topic" class="item_topic">
          <el-tag
            v-for="(topic, index) in topicList"
            :key="index"
            @click="lookTopic(topic)"
            >{{ topic }}
          </el-tag>
        </div>
      </div>
      <div class="item_foot">
        <div>
          <div>
            <i class="iconfont icon-fenxiang"></i>
          </div>
        </div>
        <div>
          <div :class="commentColor" @click="seeComments(todo.pbOneId)">
            <i class="iconfont icon-xiaoxi"></i>
            <span>{{ pbCommentNum }}</span>
          </div>
        </div>
        <div>
          <div :class="likeColor" @click="clickLike">
            <i :class="likeIcon"></i>
            <span>{{ pbThumbNum }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="comment_box" v-loading="commentLoading" v-show="seeComment">
      <comment-input></comment-input>
      <div class="comment_item">
        <bar-comment-item
          v-for="(comment, index) in comments"
          :key="index"
          :commentTodo="comment"
          :hostAccount="todo.userAccount"
        ></bar-comment-item>
      </div>
    </div>
  </div>
</template>

<script scope>
import { barTimeUtil } from '@/utils/dateUtil'
import barCommentItem from '@/components/bar/BarCommentItem.vue'
import { queryBarComment } from '@/api/postbar'
import commentInput from '@/components/bar/CommentInput.vue'
import moreFun from '@/components/bar/MoreFun.vue'

export default {
  name: 'bar-item',
  components: {
    barCommentItem,
    commentInput,
    moreFun,
  },

  data() {
    return {
      topics: [],
      comments: [],
      seeComment: false,
      commentColor: {
        commentColor: false,
      },
      likeColor: {
        likeColor: false,
      },
      likeIcon: 'iconfont icon-aixin',
      commentLoading: false,
      moreFun: false,
    }
  },
  props: ['todo'],
  computed: {
    date() {
      return barTimeUtil(this.todo.pbDate.replace('T', ' '))
    },
    location() {
      const isLocation = this.todo.pbLocation
      if (isLocation) {
        return true
      } else {
        return false
      }
    },
    topic() {
      const isTopic = this.todo.pbTopic
      if (isTopic) {
        return true
      } else {
        return false
      }
    },
    topicList() {
      let topicList = this.todo.pbTopic
      topicList = topicList.split('|')
      topicList.pop()
      return topicList
    },
    pbThumbNum() {
      const pbThumbNum = this.todo.pbThumbNum
      if (pbThumbNum == 0) {
        return ''
      } else {
        return pbThumbNum
      }
    },
    pbCommentNum() {
      const pbCommentNum = this.todo.pbCommentNum
      if (pbCommentNum == 0) {
        return ''
      } else {
        return pbCommentNum
      }
    },
  },
  methods: {
    seeComments(oneId) {
      this.seeComment = !this.seeComment
      this.commentColor.commentColor = !this.commentColor.commentColor
      if (this.seeComment) {
        this.commentLoading = true
        queryBarComment(oneId).then((res) => {
          this.comments = res.data
          this.commentLoading = false
        })
      }
    },
    clickLike() {
      this.likeColor.likeColor = !this.likeColor.likeColor
      if (this.likeColor.likeColor) {
        this.likeIcon = 'iconfont icon-aixin-sel'
      } else {
        this.likeIcon = 'iconfont icon-aixin'
      }
    },
    lookTopic(name) {
      if (this.checkRoutingFirst(this, '/topic/detailTopic')) {
        this.$router.push({
          name: 'detailTopic',
          params: {
            topicId: -1,
            topicName: name
          },
        })
      }
    },
    gotoHome(userAccount){
      if (this.checkRoutingFirst(this, '/home')) {
        this.$router.push({
          name: 'home',
          params: {
            userAccount: userAccount,
          },
        })
      }
    },
    closeSel(e) {
      console.log(this.moreFun)
      let _this = this
      document.addEventListener('click', function (e) {
        console.log(e.target.className)
        if (e.target.className != 'iconfont icon-xiajiantou') {
          if (e.target.className != 'morefun_content') {
            _this.moreFun = false
          } else {
            _this.moreFun = true
          }
        }
      })
    },
  },
  mounted() {
    const likeBar = this.$store.state.userInfo.user.likeBar
    if (likeBar.indexOf(this.todo.pbOneId) != -1) {
      this.likeColor.likeColor = true
      this.likeIcon = 'iconfont icon-aixin-sel'
    }
  },
}
</script>

<style scope lang="scss">
.bar_item {
  border-radius: 10px;
  background-color: white;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-bottom: 10px;
}
.item_head {
  position: relative;
  margin: 20px 10px 5px 20px;
  display: flex;
  align-items: center;
}
.moreFunClass {
  width: auto;
  height: auto;
  position: absolute;
  top: 36px;
  right: 16px;
}
.item_head_msg {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative;
}
.item_head_msg div {
  display: flex;
  align-items: center;
}
.item_head_msg .el-image__inner {
  margin-left: 4px;
  width: 24px;
  height: auto;
}
.name {
  font-weight: bold;
}
.date {
  line-height: 12px;
  font-size: 12px;
  margin-top: 5px;
  font-weight: lighter;
  color: #909399;
}
.icon {
  .iconfont.icon-xiajiantou {
    margin-left: auto;
    margin-right: 15px;
    padding: 3px;
  }
  .iconfont.icon-xiajiantou:hover {
    background-color: #3bb0e62a;
    border-radius: 20px;
  }
}
.item_main {
  margin-left: 80px;
}
.item_article {
  margin-right: 10px;
}
.item_img {
  margin-top: 15px;
}
.item_img .el-image__inner {
  width: 150px;
  height: 150px;
  margin-right: 10px;
}
.item_location {
  margin-top: 15px;
  display: flex;
  align-items: center;
  color: #909399;
  font-size: 14px;
}
.item_location span {
  line-height: 17px;
  margin-right: 1px;
}
.item_topic {
  margin-top: 15px;
}
.el-tag {
  display: inline-block;
  height: 30px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #4d80e4;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
  border: none;
  margin-right: 15px;
}
.item_foot {
  color: #909399;
  font-size: 12px;
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.item_foot div {
  width: 100%;
}
.item_foot div div {
  display: flex;
  align-items: center;
  width: 50px;
  margin: auto;
}
.item_foot span {
  line-height: 12px;
  text-align: center;
  margin-left: 2px;
}
.el-tag:hover,
.el-avatar:hover,
.item_foot > div > div > i:hover,
.name:hover {
  cursor: pointer;
}
.name:hover {
  color: #3bb0e6;
}
.item_foot > div > div > i {
  font-size: 20px;
  padding: 3px;
}
.item_foot > div > div:hover {
  cursor: pointer;
  color: #3bb0e6;
  .iconfont.icon-xiaoxi {
    padding: 3px;
    background-color: #3bb0e62a;
    border-radius: 20px;
  }
}
.item_foot > div > div:hover {
  cursor: pointer;
  color: #3bb0e6;
  .iconfont.icon-fenxiang {
    padding: 3px;
    background-color: #3bb0e62a;
    border-radius: 20px;
  }
}
.item_foot > div > div:hover {
  cursor: pointer;
  color: #3bb0e6;
  .iconfont.icon-aixin {
    padding: 3px;
    background-color: #3bb0e62a;
    border-radius: 20px;
  }
  .iconfont.icon-aixin-sel {
    padding: 3px;
    background-color: #3bb0e62a;
    border-radius: 20px;
  }
}
.commentColor {
  color: #3bb0e6;
}
.likeColor {
  color: #3bb0e6;
}
.comment_box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.comment_item {
  width: 93%;
  margin-bottom: 10px;
}
</style>