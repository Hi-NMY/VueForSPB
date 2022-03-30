<template>
  <div class="follow">
    <div class="follow_head">
      <div class="folllowcount">全部关注（<span>32</span>）</div>
      <div class="search_follow">
        <button>
          <i class="el-icon-search"></i>
        </button>
        <el-input type="text" placeholder="搜索好友" v-model="search"></el-input>
      </div>
    </div>
    <div class="folllow_msg">
      <div class="folllow_msg_left">
        <div class="img">
          <el-avatar :size="60" src="">
            <img src="../../assets/logo.png" />
          </el-avatar>
        </div>
        <div class="message">
          <span class="folllow_name">1234</span>
          <img src="../../assets/logo.png" />
          <img src="../../assets/logo.png" />
          <br />
          <span>1111111111111111111111111111111111111111111111111111111111111111111115445615615155121111</span><br />
          <span>2222222222222222</span>
        </div>
      </div>
      <div class="folllow_msg_right">已关注</div>
    </div>
    <div class="folllow_msg">
      <div class="folllow_msg_left">
        <div class="img">
          <el-avatar :size="60" src="">
            <img src="../../assets/logo.png" />
          </el-avatar>
        </div>
        <div class="message">
          <span class="folllow_name">1234</span>
          <img src="../../assets/logo.png" />
          <img src="../../assets/logo.png" />
          <br />
          <span>1111111111111111111111111111111111111111111111111111111111111111111115445615615155121111</span><br />
          <span>2222222222222222</span>
        </div>
      </div>
      <div class="folllow_msg_right">已关注</div>
    </div>
    <div class="folllow_msg">
      <div class="folllow_msg_left">
        <div class="img">
          <el-avatar :size="60" src="">
            <img src="../../assets/logo.png" />
          </el-avatar>
        </div>
        <div class="message">
          <span class="folllow_name">1234</span>
          <img src="../../assets/logo.png" />
          <img src="../../assets/logo.png" />
          <br />
          <span>1111111111111111111111111111111111111111111111111111111111111111111115445615615155121111</span><br />
          <span>2222222222222222</span>
        </div>
      </div>
      <div class="folllow_msg_right">已关注</div>
    </div>
    <div class="folllow_msg">
      <div class="folllow_msg_left">
        <div class="img">
          <el-avatar :size="60" src="">
            <img src="../../assets/logo.png" />
          </el-avatar>
        </div>
        <div class="message">
          <span class="folllow_name">1234</span>
          <img src="../../assets/logo.png" />
          <img src="../../assets/logo.png" />
          <br />
          <span>1111111111111111111111111111111111111111111111111111111111111111111115445615615155121111</span><br />
          <span>2222222222222222</span>
        </div>
      </div>
      <div class="folllow_msg_right">已关注</div>
    </div>


  </div>
</template>

<script>
export default {
  name:'UserFollow',
  data(){
    return{
      search:''
    }
  }
}
</script>

<style scope lang="scss">
.follow{
  padding: 10px 20px;
  background-color: white;
  border-radius: 10px;
}
.follow_head{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
}
.search_follow{
  display: flex;
  width: 200px;
  button {
    width: auto;
    padding: 0px 10px;
    border-radius: 20px 0 0 20px;
    border: 0;
    border-left: 0;
    z-index: 99;
    background-color: #f5f5f5;
  }
  .el-input__inner {
    border-radius: 0 20px 20px 0;
    background-color: #f5f5f5;
    border: 0;
    height: 35px;
    padding: 0 10px 0 0;
  }
}
.folllow_msg{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 0;
  font-size: 14px;
  border-top: 1px solid #f5f5f5;
}
.folllow_msg .folllow_msg_left{
  display: flex;
  align-items: center;
  justify-content: center;
  .message{
    margin-left: 5px;
    color: grey;
    width: 450px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
    .folllow_name{
      color: black;
      line-height: 30px;
      font-weight: bold;
      margin-right: 2px;
    }
    img{
      width: 15px;
      height: 15px;
      border-radius: 50%;
      margin: 0 2px;
    }
  }
}
.folllow_msg_right{
  border: 1px solid grey;
  width: 75px;
  height: 30px;
  border-radius: 20px;
  text-align: center;
  line-height: 30px;
  color: grey;
}
.folllow_msg_right:hover{
  border: 1px solid #46B3E6;
  color: #46B3E6;
}

</style>