<template>
  <div class="hotTopic">
    <div class="head">
      <div class="head_left">热门话题</div>
      <div class="head_right" @click="findUsers">
        <i :class="isLoading"></i>
        刷新
      </div>
    </div>
    <div class="content">
      <ol type="1" v-for="totTopic in totTopics" :key="totTopic.id">
        <li>
          <span class="message">
            <!--                        <span class="i">1</span>-->
            {{ totTopic.topicName }}
          </span>
          <span class="num">{{ hotNum(totTopic.topicBarNum) }}</span>
        </li>
        <!--                <li><span class="message">22222222</span><span class="num">44万</span></li>-->
        <!--                <li><span class="message">3333333333</span><span class="num">44万</span></li>-->
        <!--            -->
      </ol>
      <div class="more">查看更多热门话题</div>
    </div>
  </div>
</template>

<script>
import * as api from "../../api/index";
import { numberHandle } from "@/utils/dateUtil";
export default {
  name: "HotTopic",
  data() {
    return {
      totTopics: [],
      isLoading: "el-icon-refresh",
    };
  },
  computed: {},
  created() {
    this.findUsers();
  },
  methods: {
    findUsers() {
      this.isLoading = "el-icon-loading";
      // this.$api.index.randomUser().then((res) => {
      api.hotTopic().then((res) => {
        //console.log(res)
        this.totTopics = res.data;
        this.isLoading = "el-icon-refresh";
      });
    },
    hotNum(num) {
      return numberHandle(num);
    },
  },
};
</script>

<style scoped>
.hotTopic {
  /*height: 420px;*/
  border-radius: 10px;
  width: 100%;
  background-color: white;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 88%;
  color: gray;
  margin: 20px 0px 10px 0px;
}
.content {
  width: 86%;
}
.content ol li {
  height: 45px;
  border-bottom: 1px solid rgb(247, 247, 247);
  line-height: 45px;
  font-size: 14px;
  color: grey;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content ol li .message {
  /*font-size: 18px;*/
  display: inline-block;
  color: black;
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content ol li .message:hover,
.more:hover {
  cursor: pointer;
  color: #3bb0e6;
}
.content ol li .num {
  display: inline-block;
  margin-right: 5px;
  font-size: 12px;
}
.more {
  text-align: center;
  margin: 20px 0px;
  color: grey;
}
</style>