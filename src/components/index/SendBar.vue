<template>
  <div class="send_bar_box">
    <i class="iconfont icon-close" @click="closeSendBar"></i>
    <div class="send_bar_input">
      <el-input
        :autosize="{ minRows: 2, maxRows: 8 }"
        type="textarea"
        resize="none"
        v-model="input"
        placeholder="进校吧分享新鲜事......"
        show-word-limit
      ></el-input>
      <div class="send_image">
        <div class="image_box" v-for="item in urls" :key="item">
          <i class="el-icon-error" @click="deleteImage"></i>
          <el-image :src="item" fit="cover"></el-image>
        </div>
        <div class="image_add">
          <i class="iconfont icon-image-add" @click="addImage" />
        </div>
      </div>
      <div class="send_topic">
        <div v-for="(topic, index) in topics" :key="index">
          <el-tag>
            {{ topic }}
            <i class="iconfont icon-close" @click="deleteTopic"></i>
          </el-tag>
        </div>
      </div>
      <div class="send_location">
        <div>
          <i class="iconfont icon-location"></i>
          <span>定位站位</span>
          <i class="iconfont icon-close" @click="deleteLocation"></i>
        </div>
      </div>
    </div>
    <div class="send_bar_foot">
      <div class="send_fun">
        <i class="iconfont icon-emoji"></i>
        <i v-show="!isVideo" class="iconfont icon-image" @click="addImage"></i>
        <i v-show="isVideo" class="iconfont icon-video"></i>
        <i v-show="!isVideo" class="iconfont icon-voice"></i>
        <i class="iconfont icon-topic" @click="addTopic"></i>
        <i class="iconfont icon-location-add" @click="addLocation"></i>
      </div>
      <div class="send">
        <span class="txtCount">{{ inputCount }}</span>
        <el-button
          @click="sendBar"
          type="primary"
          :disabled="input.length == 0"
          round
          >发布</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'send_bar',
  props: ['isVideo'],
  data() {
    return {
      input: '',
      topics: ['asd', 'asd', 'asd'],
      urls: [
        'https://tva4.sinaimg.cn/large/005LlRGlgy1h0k69p2l15j30tz0tzjxv.jpg',
      ],
    }
  },
  computed: {
    inputCount() {
      return this.input.length
    },
  },
  methods: {
    sendBar() {
      console.log('发布')
    },
    deleteImage() {
      console.log('删除图片')
    },
    addImage() {
      console.log('添加图片')
    },
    deleteTopic() {
      console.log('删除话题')
    },
    addTopic() {
      console.log('添加话题')
    },
    deleteLocation() {
      console.log('删除位置')
    },
    addLocation() {
      console.log('添加位置')
    },
    closeSendBar() {
      this.$bus.$emit('sendBar', false, this.isVideo)
    },
  },
}
</script>

<style scope lang="scss">
.send_bar_box {
  width: 100%;
  height: auto;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.send_bar_box > .iconfont.icon-close {
  top: 10px;
  right: 10px;
  position: absolute;
  font-size: 20px;
}
.send_bar_box > .iconfont.icon-close:hover {
  color: #46b3e6;
}
.send_bar_input {
  margin-top: 40px;
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: left;
  .el-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 10px;
    line-height: 1.7;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    font-size: inherit;
    color: #606266;
    background-color: #f0f1f4;
    background-image: none;
    border: 1px solid #f0f1f4;
    border-radius: 10px;
  }
  .el-textarea__inner:hover {
    border: 1px solid #f0f1f4;
  }
  .el-textarea__inner:focus {
    background-color: white;
    border: 1.5px solid #46b3e6;
  }
}
.send_image {
  display: flex;
  align-items: left;
  margin-top: 15px;
}
.image_box {
  position: relative;
  .el-image__inner {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    margin-right: 5px;
  }
  .el-icon-error {
    right: 10px;
    top: 5px;
    z-index: 2;
    position: absolute;
  }
  .el-icon-error:hover {
    cursor: pointer;
  }
}
.image_add i {
  font-size: 100px;
  color: #606266;
}
.image_add i:hover {
  cursor: pointer;
  color: #46b3e6;
}
.send_location {
  margin-top: 10px;
  width: 100%;
  color: #46b3e6;
  font-size: 13px;
  display: flex;
  align-items: center;
  .iconfont.icon-close {
    margin-left: 2px;
    color: #303133;
  }
  .iconfont.icon-close:hover {
    color: #46b3e6;
  }
}
.send_location div {
  width: auto;
  background-color: #e9e9e97a;
  border-radius: 5px;
  padding: 3px;
}
.send_topic {
  margin-top: 10px;
  display: flex;
  align-items: center;
  .el-tag {
    display: inline-block;
    height: 30px;
    padding: 0px 5px 0px 10px;
    line-height: 30px;
    font-size: 12px;
    color: #4d80e4;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    border: none;
    margin-right: 15px;
  }
  .el-tag:hover {
    cursor: default;
  }
  .iconfont.icon-close {
    color: #303133;
  }
  .iconfont.icon-close:hover {
    color: #46b3e6;
    cursor: pointer;
  }
}
.send_bar_foot {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-button.is-round {
    border-radius: 20px;
    padding: 8px 20px;
    font-weight: bold;
  }
}
.send_fun {
  display: flex;
  align-items: center;
}
.send_fun i {
  font-size: 20px;
  color: #606266;
  margin-right: 15px;
  padding: 3px;
}
.send_fun i:hover {
  cursor: pointer;
  color: #3bb0e6;
  padding: 3px;
  background-color: #3bb0e62a;
  border-radius: 20px;
}
.iconfont.icon-video {
  font-size: 23px;
}
.iconfont.icon-topic {
  font-size: 22px;
}
.send .txtCount {
  margin-right: 10px;
}
</style>