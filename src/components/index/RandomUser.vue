<template>
    <div class="randomUser">
        <div class="head">
            <div class="head_left">
                推荐用户
            </div>
            <div class="head_right">
                <i class="el-icon-refresh"></i>
                换一批
            </div>
        </div>
        <div class="tuijian_user">
            <template>
                <div class="user_msg" v-for="usermsg in usersmsg" :key="usermsg.userAccount">
                    <div class="user_msg_left">
                        <div class="img">
                            <img src="../../assets/logo.png">
                        </div>
                        <div class="message">
                            <span class="username">{{usermsg.userName}}</span><br>
                            <span class="guanzhu">关注</span>
                            <span>{{usermsg.followNum}}</span>
                            <span class="beiguanzhu">被关注</span>
                            <span>{{usermsg.followedNum}}</span>
                        </div>
                    </div>
                    <div class="user_msg_right">
                        + 关注
                    </div>
                </div>

            </template>
<!--           <div class="message_all">-->
<!--                查看全部-->
<!--                <i class="el-icon-arrow-right"></i>-->
<!--            </div>-->
        </div>
    </div>
</template>
<script>
    // import { index } from "../../api/index";
    import * as api from "../../api/index";
    export default {
        data: function () {
            return {
                usersmsg:[]
            }
        },
        created() {
            this.findUsers();

        },
        methods:{
            findUsers:function() {
                // this.$api.index.randomUser().then((res) => {
                api.randomUser().then(res => {
                    this.usersmsg = res.data;
                    console.log(this.usersmsg)
                })
            },

        }
    }
</script>
<style scoped>
    .randomUser{
        height: 420px;
        border-radius: 10px;
        width: 100%;
        padding: 20px;
        background-color: white;
    }
    .head{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 25px;
        color: gray;
    }
    .tuijian_user .user_msg{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 15px;
    }
    .tuijian_user .user_msg_left {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .tuijian_user .user_msg_left .img{
        margin-right: 10px;
    }
    .tuijian_user .user_msg_left .img img{
        width: 45px;
        height: 45px;
        border-radius: 50%;
    }
    .tuijian_user .user_msg_left .message{
        color: grey;
        font-size: 12px;
        line-height: 22.5px;
    }
    .tuijian_user .user_msg_left .message .username{
        color: black;
        font-size: 14px;
    }
    .tuijian_user .user_msg_right{
        color: #46B3E6;
    }
    .beiguanzhu{
        margin-left: 10px;
    }
    /*.message_all{*/
    /*    border: 1px solid gainsboro;*/
    /*    height: 35px;*/
    /*    border-radius: 5px;*/
    /*    background-color: rgb(249,249,249);*/
    /*    line-height: 35px;*/
    /*    text-align: center;*/
    /*    color: grey;*/
    /*    font-size: 14px;*/
    /*    margin-top: 20px;*/
    /*}*/



</style>