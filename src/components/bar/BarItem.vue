<template>
  <div class="bar_item">
    <div>
      <div class="item_head">
        <el-avatar :size="50" :src="headImg" @click.native="gotoHome">
        </el-avatar>
        <div class="item_head_msg">
          <div>
            <span class="name" @click="gotoHome">{{ todo.userName }}</span>
            <el-image v-if="todo.userBadge" :src="badgeImg"></el-image>
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
        <div v-if="isVideo" class="item_video">
          <video
            ref="videoPlayer"
            @play="playVideo"
            class="video-js vjs-big-play-centered vjs-fluid"
          ></video>
        </div>
        <div :class="itemImg">
          <el-image
            v-for="(img, index) in imageA"
            :key="index"
            :src="img"
            :preview-src-list="imageA"
          ></el-image>
        </div>
        <div v-if="isVoice" @click="playVoice" class="item_voice">
          <div class="item_voice_box">
            <i :class="voiceClass"></i>
            <span>{{ audioTime }}</span>
          </div>
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
          <div :class="commentColor" @click="seeComments">
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

    <div class="comment_box" v-loading="commentLoading" v-if="seeComment">
      <comment-input :pbId="todo.pbOneId" :commentTouser="''"></comment-input>
      <div class="comment_item">
        <bar-comment-item
          v-for="(comment, index) in comments"
          :key="index"
          :index="index"
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
import videojs from 'video.js';
import 'video.js/dist/video-js.css'

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
      image: [],
      imageA: [],
      comments: [],
      seeComment: false,
      commentColor: {
        commentColor: false,
      },
      likeColor: {
        likeColor: false,
      },
      likeIcon: 'iconfont icon-aixin',
      commentLoading: true,
      moreFun: false,
      itemImg: 'item_img',
      voiceClass: 'iconfont icon-Playerplay',
      playAudio: undefined,
      audioTime: '',
      player: undefined,
    }
  },
  props: ['todo'],
  computed: {
    headImg() {
      return this.urlJudge(this.todo.userHeadImg)
    },
    badgeImg() {
      return this.urlBadgeImg(this.todo.userBadge)
    },
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
      if (topicList) {
        topicList = topicList.split('|')
        topicList.pop()
        return topicList
      }
      return []
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
    isVoice() {
      const isVoice = this.todo.pbVoice
      if (isVoice) {
        this.$bus.$on('initVoice', this.nextAudio)
        this.initVoice()
        return true
      } else {
        return false
      }
    },
    isVideo() {
      const isVideo = this.todo.pbVideo
      if (isVideo) {
        this.$bus.$on('initVideo', this.nextVideo)
        return true
      } else {
        return false
      }
    }
  },
  watch: {
  },
  methods: {
    initImage() {
      if (this.todo.pbImageUrl) {
        if (this.todo.pbImageUrl.indexOf('@') != -1) {
          let arr = this.todo.pbImageUrl.split('@')
          if (arr[0].indexOf('|') != -1) {
            this.image = this.imgUrl(arr[0].split('|'))
            if (this.image.length > 3) {
              this.itemImg = 'item_img_width'
            }
          } else {
            this.image.unshift(this.imgUrl(arr[0]))
          }
          if (arr[1].indexOf('|') != -1) {
            this.imageA = this.imgUrl(arr[1].split('|'))
          } else {
            this.imageA.unshift(this.imgUrl(arr[1]))
          }
        } else {
          this.imageA = this.todo.pbImageUrl.substring(0, this.todo.pbImageUrl.lastIndexOf('|')).split('|')
          if (this.imageA.length > 3) {
            this.itemImg = 'item_img_width'
          }
        }
      }
    },
    nextAudio(id) {
      if (id != this.todo.pbOneId) {
        this.initVoice()
      }
    },
    initVoice() {
      this.voiceClass = 'iconfont icon-Playerplay'
      if (this.playAudio) {
        this.playAudio.pause()
      }
      let audio = new Audio('http://localhost:8888/' + this.todo.pbVoice);
      audio.load();
      this.playAudio = audio
      audio.oncanplay = () => {
        this.audioTime = parseInt(audio.duration) + "S"
      }
    },
    playVoice() {
      if (this.voiceClass == 'iconfont icon-Playerpause') {
        this.initVoice()
      } else {
        this.$bus.$emit('initVoice', this.todo.pbOneId)
        this.voiceClass = 'iconfont icon-Playerpause'
        this.playAudio.ontimeupdate = () => {
          let t = parseInt(this.playAudio.duration) - parseInt(this.playAudio.currentTime)
          if (t == 0) {
            this.initVoice()
          }
          this.audioTime = t + 'S'
        }
        this.playAudio.play();
      }
    },
    nextVideo(id) {
      if (id != this.todo.pbOneId) {
        if (this.player) {
          this.player.pause()
        }
      }
    },
    initVideo() {
      const isVideo = this.todo.pbVideo
      if (isVideo) {
        this.player = videojs(this.$refs.videoPlayer, {
          poster: this.videoImgUrl(this.todo.pbVideo),
          controls: true,
          fluid: false,
          sources: [
            {
              src:
                this.urlJudge(this.todo.pbVideo),
              type: 'video/mp4',
            }
          ]
        }, () => {
          this.player.log('onPlayerReady');
        });
      }
    },
    playVideo() {
      this.$bus.$emit('initVideo', this.todo.pbOneId)
    },
    imgUrl(imgList) {
      if (typeof (imgList) == 'string') {
        return this.urlJudge(imgList)
      }
      for (let i = 0; i < imgList.length; i++) {
        imgList[i] = this.urlJudge(imgList[i])
      }
      return imgList
    },
    initLike() {
      const likeBar = this.$store.state.userInfo.user.likeBar
      if (!likeBar) {
        return
      }
      if (likeBar.indexOf(this.todo.pbOneId) != -1) {
        this.likeColor.likeColor = true
        this.likeIcon = 'iconfont icon-aixin-sel'
      }
    },
    seeComments() {
      this.$bus.$on('addComment', this.addComment)
      this.$bus.$on('deleteComment', this.deleteComment)
      this.seeComment = !this.seeComment
      this.commentColor.commentColor = !this.commentColor.commentColor
      this.comments = []
      if (this.seeComment) {
        this.commentLoading = true
        setTimeout(() => {
          queryBarComment(this.todo.pbOneId).then((res) => {
            this.comments = res.data
            this.commentLoading = false
          })
        }, 200)
      }
    },
    clickLike() {
      this.$store.commit('index/getLoginAuthority', {
        _this: this,
        goto: (key) => {
          if (key) {
            this.likeColor.likeColor = !this.likeColor.likeColor
            if (this.likeColor.likeColor) {
              this.$store.dispatch('userInfo/addLikeBar', this.todo.pbOneId)
              this.likeIcon = 'iconfont icon-aixin-sel animate__heartBeat'
              this.todo.pbThumbNum += 1
            } else {
              this.$store.dispatch('userInfo/removeLikeBar', this.todo.pbOneId)
              this.likeIcon = 'iconfont icon-aixin'
              this.todo.pbThumbNum -= 1
            }
          }
        }
      })
    },
    lookTopic(name) {
      if (this.$route.params.topicName != name) {
        this.$router.push({
          name: 'detailTopic',
          params: {
            topicId: -1,
            topicName: name
          },
        })
      }
    },
    gotoHome() {
      if (this.checkRoutingFirst(this, '/home')) {
        this.$router.push({
          name: 'home',
          params: {
            userAccount: this.todo.userAccount,
          },
        })
      }
    },
    addComment(data) {
      this.comments.unshift(data)
      this.todo.pbCommentNum += 1
    },
    deleteComment(index) {
      this.comments.splice(index, 1)
      this.todo.pbCommentNum -= 1
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
    this.initImage()
    this.initLike()
    this.initVideo()
  },
  beforeDestroy() {
    if (this.playAudio) {
      this.initVoice()
    }
    if (this.player) {
      this.player = undefined
    }
    this._timer && clearTimeout(this._timer)
    this.$bus.$off('addComment')
    this.$bus.$off('deleteComment')
    if (this.player) {
      this.player.dispose();
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
  .el-image__inner {
    width: 150px;
    height: 150px;
    margin-right: 5px;
    border-radius: 10px;
  }
}
.item_img_width {
  margin-top: 15px;
  max-width: 400px;
  .el-image__inner {
    width: 150px;
    height: 150px;
    margin-right: 5px;
    border-radius: 10px;
  }
}
.item_voice {
  width: 200px;
  height: 44px;
  background-color: #3bb0e6;
  border-radius: 40px;
  .item_voice_box {
    margin: 0px 16px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .iconfont.icon-Playerplay,
    .iconfont.icon-Playerpause {
      font-size: 24px;
      color: white;
    }
    span {
      color: white;
      font-weight: bold;
    }
  }
  .item_voice_box:hover {
    cursor: pointer;
  }
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
.item_video {
  width: 528px;
  margin-top: 8px;
  border-radius: 10px;
  border: 1px solid white;
  overflow: hidden;
}
.video-js {
  /* 视频占满容器高度 */
  height: 297px;
  width: 528px;
  background-color: #161616;
  z-index: 0;
}
</style>