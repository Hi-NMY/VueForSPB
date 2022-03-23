<template>
    <div class="uservar">
        <div class="uname">
            <h3>一头大熊呀</h3>
        </div>
        <div class="hand_info">
            <span>签到天数:</span>&nbsp;
            <span class="qiandao">20</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>徽章</span>&nbsp;
            <img src="../../assets/logo.png">
        </div>
        <div class="qianming">
            这是一条个性签名啦啦啦啦啦啦啦啦啦啦啦啦啦啦
        </div>
        <div class="info_box">
            <div class="box_left">
                <div class="number">
                    9
                </div>
                <div class="title_text">
                    关注
                </div>
            </div>
            <div class="box_middle">
                <div class="number">
                    0
                </div>
                <div class="title_text">
                    被关注
                </div>
            </div>
            <div class="box_right">
                <div class="number">
                    1
                </div>
                <div class="title_text">
                    动态
                </div>
            </div>
            <div class="box_right2">
                <div class="number">
                    1
                </div>
                <div class="title_text">
                    徽章
                </div>
            </div>
        </div>
        <div class="userinfo_button1">
            <div class="button_left">
                <i class="el-icon-user"></i>&nbsp;&nbsp;
                <span>个人中心</span>
            </div>
            <div class="button_right">
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
        <hr class="xian">
        <div class="userinfo_button6">
            <div class="button_left">
                <i class="el-icon-switch-button"></i>&nbsp;&nbsp;
                <span>退出登录</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'user-var'
    }
</script>

<style scoped>
    .uservar{
        /*border: 1px solid lightgray;*/
        box-shadow:0 2px 12px 0 rgba(0, 0, 0, 0.1);
        width: 260px;
        /*height: 480px;*/
        height: 340px;
        background-color: white;
        position: relative;
        right: 100px;
        border-radius: 10px;
        z-index: 3;
        top: 55px;
    }
    .uname{
        position: absolute;
        top: 45px;
        text-align: center;
        width: 100%;
        /*height: 10px;*/
    }
    .hand_info{
        position: absolute;
        height: 30px;
        top: 80px;
        font-size: 12px;
        color: gray;
        /*line-height: 25px;*/
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    .qiandao{
        color: black;
        font-size: 16px;
    }
    .hand_info img{
        height: 20px;
        width: 20px;
        border-radius: 50%;
    }
    .qianming {
        position: absolute;
        top: 95px;
        margin: 20px 40px;
        font-size: 14px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        width: 180px;
        color: lightgray;
    }
    .info_box{
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        top: 130px;
        margin: 20px 30px;
        width: 200px;
    }
    .number{
        font-size: 16px;
        font-weight: bold;
    }
    .title_text{
        color: gray;
        font-size: 14px;

    }
    /*.userinfo_button1,.userinfo_button2,.userinfo_button3,.userinfo_button4,.userinfo_button5,.userinfo_button6{*/
    .userinfo_button1,.userinfo_button6 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        top: 200px;
        margin: 20px 40px;
        width: 180px;
    }
    .xian{
        width: 200px;
        margin: 0px 20px;
        position: absolute;
        /*top: 420px;*/
        top: 260px;
        border: 1px solid whitesmoke;
    }
    .userinfo_button6{
        /*top: 420px;*/
        top: 260px;

    }

</style>