<template>
  <div class="send_bar_box">
    <i class="iconfont icon-close" @click="closeSendBar"></i>
    <div class="send_bar_input">
      <div class="send_bar_input_div">
        <el-input
          ref="barInput"
          :autosize="{ minRows: 2, maxRows: 8 }"
          type="textarea"
          resize="none"
          v-model="queryParam.pbArticle"
          placeholder="进校吧分享新鲜事......"
          @blur="inputBlur"
        ></el-input>
      </div>
      <div class="send_image">
        <div class="image_box" v-for="(item, index) in urls" :key="index">
          <i class="el-icon-error" @click="removeImage(index)"></i>
          <el-image :src="returnUrl(item)" fit="cover"></el-image>
        </div>
        <div class="image_add">
          <input
            type="file"
            @change="handleFileChange"
            ref="imageInput"
            style="display: none"
            multiple
            accept="image/*"
          />
          <i
            v-show="addImageIcon"
            class="iconfont icon-image-add"
            @click="addImage"
          />
        </div>
      </div>
      <div class="send_topic">
        <div v-for="(topic, index) in selectTopic" :key="index">
          <el-tag>
            {{ topic }}
            <i
              class="iconfont icon-close"
              @click="removeSelectTopic(index)"
            ></i>
          </el-tag>
        </div>
      </div>
      <div class="send_location">
        <div v-show="queryParam.pbLocation">
          <i class="iconfont icon-location"></i>
          <span>{{ queryParam.pbLocation }}</span>
          <i class="iconfont icon-close" @click="removeSelectLocation"></i>
        </div>
      </div>
    </div>
    <div class="send_bar_foot">
      <div class="send_fun">
        <div class="emoji_popover">
          <el-popover>
            <picker
              style="width: 288px; height: 292px; border: 0"
              color="#3bb0e6"
              :i18n="e18"
              :include="['recent', 'people', 'nature', 'places', 'symbols']"
              :showSearch="false"
              :showPreview="false"
              :showCategories="true"
              @select="addEmoji"
            />
            <i slot="reference" class="iconfont icon-emoji"></i>
          </el-popover>
        </div>
        <i v-show="!isVideo" class="iconfont icon-image" @click="addImage"></i>
        <i v-show="isVideo" class="iconfont icon-video"></i>
        <i v-show="!isVideo" class="iconfont icon-voice"></i>
        <div class="topic_popover">
          <el-popover @show="topicPopover">
            <div>
              <div class="topic_input">
                <el-input
                  v-model="topicSearch"
                  @keyup.enter.native="topicPopover"
                  placeholder="按enter键搜索相关话题"
                >
                </el-input>
              </div>
              <div style="height: 210px" v-loading="loading">
                <div
                  v-for="(item, index) in searchTopics"
                  :key="index"
                  class="send_bar_topic_item"
                  @click="selectTopicItem(item)"
                >
                  <span>{{ item }}</span>
                </div>
              </div>
            </div>
            <i slot="reference" class="iconfont icon-topic"></i>
          </el-popover>
        </div>
        <div class="location_popover">
          <el-popover @show="locationPopover">
            <div>
              <div class="location_input">
                <el-input
                  v-model="locationSearch"
                  @keyup.enter.native="locationPopover"
                  placeholder="按enter键搜索相关位置"
                >
                </el-input>
              </div>
              <div style="height: 240px" v-loading="loading">
                <div
                  v-for="(item, index) in searchLocation"
                  :key="index"
                  class="location_item"
                  @click="selectLocationItem(item)"
                >
                  <i class="iconfont icon-location-add"></i>
                  <span style="margin: 0px 4px">{{ item }}</span>
                </div>
              </div>
            </div>
            <i slot="reference" class="iconfont icon-location-add"></i>
          </el-popover>
        </div>
      </div>
      <div class="send">
        <span class="txtCount">{{ inputCount }}</span>
        <el-button
          @click="sendBar"
          type="primary"
          :disabled="queryParam.pbArticle.length == 0"
          round
          :loading="sendLoading"
          >发布</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { hotTopic } from '../../api/index'
import { querySearchTopicName } from '@/api/topic'
import { addBar } from '@/api/postbar'

export default {
  name: 'send_bar',
  props: ['isVideo'],
  data() {
    return {
      urls: [],
      queryParam: {
        userAccount: '',
        pbArticle: '',
        pbTopic: '',
        pbLocation: '',
      },
      e18: {
        categories: {
          recent: '历史',
          people: '笑脸',
          nature: '动物',
          places: '旅行',
          symbols: '符号',
        }
      },
      locationInit: ['景区'],
      searchTopics: [],
      loading: true,
      topicSearch: '',
      selectTopic: [],
      inputCursor: 0,
      locationSearch: '',
      searchLocation: [],
      geolocationCity: undefined,
      addImageIcon: true,
      sendLoading: false
    }
  },
  computed: {
    inputCount() {
      return this.queryParam.pbArticle.length
    },
  },
  methods: {
    sendBar() {
      this.sendLoading = true
      this.queryParam.userAccount = this.$store.state.userInfo.user.userInfo.userAccount
      if (this.selectTopic.length != 0) {
        for (let i = 0; i < this.selectTopic.length; i++) {
          this.queryParam.pbTopic = this.queryParam.pbTopic + this.selectTopic[i] + '|'
        }
      }
      let formData = new FormData();
      for (let i = 0; i < this.urls.length; i++) {
        formData.append("image", this.urls[i]);
      }
      formData.append("userAccount", this.queryParam.userAccount);
      formData.append("pbArticle", this.queryParam.pbArticle);
      formData.append("pbTopic", this.queryParam.pbTopic);
      formData.append("pbLocation", this.queryParam.pbLocation);
      addBar(formData,(res)=>{
        this.sendLoading = false
        this.$bus.$emit('sendBar', false, this.isVideo)
        this.$message({
          duration: 1500,
          showClose: true,
          type: 'success',
          message: '发布成功',
        })
      })
    },
    addImage() {
      if (this.urls.length >= 4) {
        this.$message(
          {
            duration: 1500,
            showClose: true,
            type: 'warning',
            message: '最多选择四张图片哦',
          }
        )
        this.addImageIcon = false
        return
      } else {
        this.addImageIcon = true
      }
      this.$refs.imageInput.dispatchEvent(new MouseEvent('click'))
    },
    closeSendBar() {
      this.$bus.$emit('sendBar', false, this.isVideo)
    },
    inputBlur() {
      this.inputCursor = this.$refs.barInput.$el.children[0].selectionStart;
    },
    addEmoji(e) {
      this.queryParam.pbArticle = this.queryParam.pbArticle.substring(0, this.inputCursor) + e.native + this.queryParam.pbArticle.substring(this.inputCursor)
      this.inputCursor += e.native.length
    },
    topicPopover() {
      this.loading = true
      this.searchTopics = []
      if (this.topicSearch) {
        querySearchTopicName(this.topicSearch).then((res) => {
          this.searchTopics = res.data
          this.loading = false
        })
      } else {
        hotTopic().then((res) => {
          for (let i = 0; i < 7; i++) {
            this.searchTopics.unshift(res.data[i].topicName)
          }
          this.loading = false
        })
      }
    },
    selectTopicItem(item) {
      if (this.selectTopic.length >= 5) {
        this.$message({
          duration: 1500,
          showClose: true,
          type: 'warning',
          message: '最多添加五个话题哦',
        })
        return
      }
      if (this.selectTopic.indexOf(item) != -1) {
        return
      }
      this.selectTopic.unshift(item)
    },
    removeSelectTopic(index) {
      this.selectTopic.splice(index, 1)
    },
    locationPopover() {
      const _this = this
      this.loading = true
      this.searchLocation = []
      if (this.locationSearch) {
        if (this.geolocationCity) {
          this.querySearchLocation(_this, true, this.locationSearch)
        } else {
          this.initLocation(this)
        }
      } else {
        this.initLocation(this)
      }
    },
    initLocation(_this) {
      const geolocation = new BMapGL.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          _this.geolocationCity = r
          _this.querySearchLocation(_this, false, _this.locationInit)
        }
      });
    },
    querySearchLocation(_this, search, searchKey) {
      const local = new BMapGL.LocalSearch(_this.geolocationCity.address.city, {
        onSearchComplete: function (results) {
          let los = undefined
          if (search) {
            los = results._pois
          } else {
            los = results[0]._pois
          }
          for (let i = 0; i < 6; i++) {
            _this.searchLocation.push(los[i].title)
          }
          _this.searchLocation.unshift(_this.geolocationCity.address.city)
          _this.loading = false
        },
        pageCapacity: 100
      });
      local.searchNearby(searchKey, _this.geolocationCity.point, 1000);
    },
    selectLocationItem(name) {
      this.queryParam.pbLocation = name
    },
    removeSelectLocation() {
      this.queryParam.pbLocation = ''
    },
    handleFileChange(e) {
      let inputDOM = e.target.files;
      for (let i = 0; i <= inputDOM.length - 1; i++) {
        if (i >= 4) {
          break
        }
        this.urls.unshift(inputDOM[i])
      }
      if (this.urls.length >= 4) {
        this.$message(
          {
            duration: 1500,
            showClose: true,
            type: 'warning',
            message: '最多选择四张图片哦',
          }
        )
        this.addImageIcon = false
      } else {
        this.addImageIcon = true
      }
    },
    returnUrl(file) {
      let url = null;
      if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      }
      return url
    },
    removeImage(index) {
      this.urls.splice(index, 1)
      if (this.urls.length < 4) {
        this.addImageIcon = true
      }
    }
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
  .send_bar_input_div {
    background-color: #f0f1f4;
    background-image: none;
    border: 1.5px solid #f0f1f4;
    border-radius: 10px;
    padding: 3px 4px 3px 3px;
  }
  .send_bar_input_div:focus-within {
    background-color: white;
    border: 1.5px solid #46b3e6;
    .el-textarea__inner {
      background-color: white;
    }
  }
  .el-textarea__inner {
    display: block;
    resize: vertical;
    line-height: 1.7;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    font-size: inherit;
    color: #606266;
    background-color: #f0f1f4;
    border: 0;
    background-image: none;
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
  min-height: 24px;
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
  min-height: 80px;
  margin-top: 10px;
  display: flex;
  div {
    margin-bottom: 4px;
  }
  flex-wrap: wrap;
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
  i:focus {
    cursor: pointer;
    color: #3bb0e6;
    padding: 3px;
    background-color: #3bb0e62a;
    border-radius: 20px;
  }
  .el-button.is-round {
    border-radius: 20px;
    padding: 8px 20px;
    font-weight: bold;
  }
}
.send_bar_topic_item,
.location_item {
  margin: 12px 4px;
}
.send_bar_topic_item:hover,
.location_item:hover {
  color: #3bb0e6;
  cursor: pointer;
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
.topic_input,
.location_input {
  background-color: #f0f1f4;
  background-image: none;
  border: 1.5px solid #f0f1f4;
  border-radius: 10px;
  padding: 3px 4px 3px 3px;
  .el-input__inner {
    display: block;
    resize: vertical;
    line-height: 1.7;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    font-size: inherit;
    color: #606266;
    background-color: #f0f1f4;
    border: 0;
    background-image: none;
  }
}
.topic_input:focus-within,
.location_input:focus-within {
  background-color: white;
  border: 1.5px solid #46b3e6;
  .el-input__inner {
    background-color: white;
  }
}
</style>