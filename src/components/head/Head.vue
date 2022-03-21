<template>
    <div class="head">
        <img src="../../assets/text-logo.png" class="head_img">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color="rgb(70,179,230)">
            <el-menu-item index="1" v-if="!isdenglu">
                <i class="el-icon-aim"></i>
                首页
            </el-menu-item>
            <el-menu-item index="2" v-if="!isdenglu">
                <i class="el-icon-download"></i>
                下载App
            </el-menu-item>
            <el-menu-item index="3" v-if="!isdenglu">
                <i class="el-icon-chat-line-square"></i>
                话题
            </el-menu-item>

            <el-menu-item index="4" v-if="isdenglu">
                <i class="el-icon-aim"></i>
                发现
            </el-menu-item>
            <el-menu-item index="5" v-if="isdenglu">
                <i class="el-icon-c-scale-to-original"></i>
                关注
            </el-menu-item>
            <el-menu-item index="6" v-if="isdenglu">
                <i class="el-icon-chat-line-square"></i>
                话题
            </el-menu-item>
            <el-menu-item index="7" v-if="isdenglu">
                <i class="el-icon-chat-dot-round"></i>
                消息
            </el-menu-item>
        </el-menu>
        <div class="sousuo" v-if="!isdenglu" style="left: 680px">
            <el-input type="text" placeholder="搜索" v-model="sousuo" ></el-input>
            <button>
                <i class="el-icon-search"></i>
            </button>
        </div>
        <div class="sousuo" v-if="isdenglu" style="left: 810px">
            <el-input type="text" placeholder="搜索" v-model="sousuo" ></el-input>
            <button>
                <i class="el-icon-search"></i>
            </button>
        </div>
        <div class="head_right">
            <div v-if="!isdenglu">
                <button class="denglu" @click="denglu()">登录</button>
                <button class="zhuce" @click="zhuce()">注册</button>
                <button class="qiandao"><i class="el-icon-magic-stick"></i> 签到</button>

            </div>
            <div v-if="isdenglu">
                <img class="touxiang" src="../../assets/touxiang.png">
                <button class="i"><i class="el-icon-arrow-down"></i></button>
                <button class="qiandao"><i class="el-icon-magic-stick"></i> 签到</button>

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        // name: "Head",
        data() {
            return {
                activeIndex: '1',
                sousuo:'',
                isdenglu: false

            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            denglu() {
                // this.isdenglu
            }
        }
    }
</script>

<style scoped>
    .head{
        border: 1px solid gainsboro;
        height: 60px;
        width: 100%;
        position: relative;
        display: inline;
    }
    .head_img{
        z-index: 1;
        position: relative;
        height: 80px;
        top: -10px;
        margin-left: 45px;
        margin-right: 100px;
        display: inline;
        /*width: 125px;*/
    }
    .el-menu-demo{
        position: relative;
        display: inline;
    }
    /deep/ .el-menu.el-menu--horizontal {
        display: inline-block;
        position: absolute;
    }
    /deep/ .el-menu--horizontal>.el-menu-item.is-active {
        /* border-bottom: 2px solid #409EFF; */
        color: rgb(70,179,230);
        /*margin: 0;*/
        /*padding: 0;*/
        border: 0;
    }
    /deep/ .el-menu--horizontal>.el-menu-item {
        margin: 0;
        padding: 0;
        font-size: 16px;
        color: black;
        width: 130px;
        text-align: center;
        border: 0;
    }
    /*.el-menu--horizontal>.el-menu-item :hover{*/
    /*    color: rgb(70,179,230);*/
    /*}*/
    .sousuo{
        width: 220px;
        position: absolute;
        display: inline-block;
        top: 12px;
    }
    /deep/ .sousuo .el-input__inner {
        background-color: rgb(239, 239, 239);
        border-radius: 20px 0 0 20px;
        border: 1px solid #DCDFE6;
        border-right: 0;
    }
    .sousuo button{
        /*border: 1px solid red;*/
        border: 0;
        width: 35px;
        position: absolute;
        display: inline-block;
        height: 40px;
        border-radius: 0 20px 20px 0;
        border: 1px solid #DCDFE6;
        border-left: 0;
        z-index: 99;
    }
    .head_right{
        position: absolute;
        display: inline-block;
        right: 45px;
        /*border: 1px solid red;*/
    }
    .head_right button{
        width: 90px;
        margin: 10px 12px;
        height: 40px;
        border-radius: 20px;
        border: 0;
        font-size: 16px;
        background-color: white;
        color: gray;
    }
    .head_right button:hover{
        color: rgb(70,179,230);
        border: 1px solid rgb(70,179,230);
    }
    .head_right .qiandao {
        width: 110px;
        color: white;
        background-color: rgb(70,179,230);
    }
    .head_right .qiandao:hover{
        color: white;
    }
    .head_right img{
        width: 40px;
        height: 40px;
        /*border: 1px solid red;*/
        border-radius: 40px;
        margin: 10px 5px;
        position: absolute;
        left: -50px;

    }
    .head_right .i{
        width: 20px;
        height: 40px;
        /*border: 1px solid red;*/
        border-radius: 0;
        margin: 10px 0;
    }
</style>