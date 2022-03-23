<template>
    <div class="head">
        <img src="../../assets/text-logo.png" class="head_img">
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" active-text-color="rgb(70,179,230)">
            <el-menu-item index="1" v-if="!isLogin">
                <i class="el-icon-aim"></i>
                首页
            </el-menu-item>
            <el-menu-item index="2" v-if="!isLogin">
                <i class="el-icon-download"></i>
                下载App
            </el-menu-item>
            <el-menu-item index="3" v-if="!isLogin">
                <i class="el-icon-chat-line-square"></i>
                话题
            </el-menu-item>

            <el-menu-item index="4" v-if="isLogin">
                <i class="el-icon-aim"></i>
                发现
            </el-menu-item>
            <el-menu-item index="5" v-if="isLogin">
                <i class="el-icon-c-scale-to-original"></i>
                关注
            </el-menu-item>
            <el-menu-item index="6" v-if="isLogin">
                <i class="el-icon-chat-line-square"></i>
                话题
            </el-menu-item>
            <el-menu-item index="7" v-if="isLogin">
                <i class="el-icon-chat-dot-round"></i>
                消息
            </el-menu-item>
        </el-menu>
        <div class="search" :class="isLogin">
            <el-input type="text" placeholder="搜索" v-model="search" ></el-input>
            <button>
                <i class="el-icon-search"></i>
            </button>
        </div>
        <div class="head_right">
            <template v-if="!isLogin">
                <button @click="login()">登录</button>
                <button @click="register()">注册</button>
            </template>
            <template v-else>
                <div class="i" @mouseenter="showUserMsg" @mouseleave="showUserMsg">
                    <div>
                        <img :class="headImgAnima" src="../../assets/logo.png">
<!--                        <i class="el-icon-arrow-down"></i>-->
                        <div v-show="userMsg" class="userMsgVar">
                            <template>
                                <user-var></user-var>
                            </template>
                        </div>
                    </div>
                </div>
            </template>
            <button class="sign"><i class="el-icon-magic-stick"></i> 签到</button>
        </div>
  </div>
</template>

<script>
    import UserVar from '@/components/uservar/Uservar'
    export default {
        // name: "Head",
        data() {
            return {
                activeIndex: '1',
                search:'',
                userMsg:false,
                headImgAnima:{
                  imgAnima:false
                }
            };
        },
        components:{
            UserVar
        },
        computed:{
            isLogin(){
                const isLogin = this.$store.state.index.isLogin;
                if(isLogin){
                  this.activeIndex = '4'
                }else{
                  this.activeIndex = '1'
                }
                return isLogin
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                 
            },
            login() {
               this.$router.push({
                                path:'/login',
                            })
            },
            register() {
                this.$router.push({
                                path:'/login',
                            })
            },
            showUserMsg(){
                this.userMsg = !this.userMsg
                this.headImgAnima.imgAnima = !this.headImgAnima.imgAnima
            }
        }
    }
</script>

<style scoped>
    .head{
        white-space:nowrap;
        display: flex;
        align-items: center;
        border: 1px solid rgb(243, 243, 243);
        height: 60px;;
        width: 100%;
        position: fixed;
    }
    .head_img{
        z-index: 1;
        width: 100px;
        height: auto;
        margin-left: 40px;
        float: left;
    }
    /deep/ .el-menu.el-menu--horizontal {
        margin-left: 6%;
        border: none;
        height: 100%;
        width: auto;
        display: flex;
        text-align: center;
        align-items: center;
    }

    /deep/ .el-menu--horizontal>.el-menu-item {
        white-space:nowrap;
        margin: 0px 15px;
        height: 100%;
        padding: 0px 10px;
        font-size: 16px;
        color: black;
        width: auto;
        text-align: center;
        border: none;
    }
    /deep/ .el-menu--horizontal>.el-menu-item:hover {
        background-color: rgb(245, 245, 245);
    }
    .search{
        width: 15%;
        min-width: 100px;
        margin-left: 60px;
        margin-right: 20px;
        top: 12px;
        float: left;
        display: flex;
    }
    /deep/ .search .el-input__inner {
        background-color: rgb(239, 239, 239);
        border-radius: 20px 0 0 20px;
        border: 1px solid #DCDFE6;
        border-right: 0;
    }
    .search button{
        width: auto;
        padding: 0px 10px;
        border-radius: 0 20px 20px 0;
        border: 1px solid #DCDFE6;
        border-left: 0;
        z-index: 99;
    }
    .head_right{
        margin-right: 40px;
        margin-left:auto;
        height: 100%;
        width: auto;
        display: flex;
        text-align: center;
        align-items: center;
    }
    .head_right button{
        width: auto;
        padding: 7px 25px;
        height: auto;
        margin: 0px 5px;
        border-radius: 20px;
        border: 1px solid rgb(255, 255, 255);
        font-size: 18px;
        background-color: white;
        color: gray;
    }
    .head_right button:hover{
        color: rgb(70,179,230);
        border: 1px solid rgb(70,179,230);
    }
    .head_right .sign {
        margin-right: 40px;
        margin-left: 40px;
        color: white;
        border: 1px solid rgb(70,179,230);
        background-color: rgb(70,179,230);
    }
    .head_right .sign:hover{
        color: white;
    }
    .head_right .i{
        width: auto;
        height: 100%;
        border-radius: 0;
        margin-right: 30px;
        display: flex;
        align-items: center;
    }

    .head_right img{
        z-index: 4;
        width: 45px;
        height: 100%;
        margin-left: 10px;
        border-radius: 40px;
    }
    .imgAnima{
        transform:scale(1.7);
        transition: all 0.1s;
        position: relative;
        top: 22px;
    }
    .head_right .i div{
        display: flex;
        align-items: center;
    }
    .head_right .i div i{
        margin-left: 5px;
        margin-right: 10px;
    }
    .head_right .i:hover{
        /*background-color: rgb(245, 245, 245);*/
        cursor: pointer;
    }
    .head_right button:hover{
        cursor: pointer;
    }
    .userMsgVar{
      width: auto;
      height: auto;
        position: absolute;
        top: 9%;
    }
</style>