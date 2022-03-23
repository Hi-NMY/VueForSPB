<template>
    <div class="login">
        <div class="form">
            <el-form :model="loginDto" :rules="rules" class="form-center">
                <el-form-item prop="userAccount">
                    <el-input placeholder="账号" prefix-icon="el-icon-reading" v-model="loginDto.userAccount"></el-input>
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input type="password" placeholder="密码" prefix-icon="el-icon-lock" v-model="loginDto.userPwd"></el-input>
                </el-form-item>
                <div class="remember-me-forget">
                    <div>
                        <input type="checkbox" />
                        <span>记住我</span>
                    </div>
                    <a href="">忘记密码?</a>
                </div>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import {login} from '@/api/login'
export default {
     data: function () {
        return {
            loginDto:{
                userAccount:'',
                userPwd:''
            },
            rules: {
                userNumber: [
                    {required: true, message: '请输入你的账号', trigger: 'blur'},
                    {min: 9, max: 9, message: '请输入正确的账号', trigger: 'blur'},
                    {pattern:/^G\d{8}/,message: '账号格式不对',trigger: 'blur'}
                ],
                userpwd:[
                    {required: true, message: '请设置密码', trigger: 'blur'},
                    {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        submitForm() {
            this.$store.commit('index/updateIsLogin',true)
            this.$router.push({
                name:'index',
            })
            // login(this.loginDto).then(res=>{
            //         if(res.data){
            //             this.$store.commit('index/updateIsLogin',true)
            //             this.$router.push({
            //                     name:'index',
            //                 })
            //         }
            //     }
            // );
        }
    }

}
</script>
<style scoped>
    .form-center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form{
        width: 100%;
    }
    .login-btn{
        margin: 0 0 14px 0;
        width: 70%;
    }
    .tishi{
        font-size: 12px;
        color: darkgrey;
        text-align: center;
    }
    .tishi a{
        color: #46B3E6;
    }
     .remember-me-forget{
         width: 100%;
     }
     .remember-me-forget div{
         float: left;
     }
     .remember-me-forget a{
         color: rgb(117, 117, 117);
         text-decoration: none;
         float: right;
     }
     .remember-me-forget a:hover{
         color: rgb(12, 12, 12);
         text-decoration: none;
         float: right;
     }
     /deep/ .el-button--primary {
        margin-top: 20px;
        color: #FFF;
        background-color: #4D80E4;
        border-color: #4D80E4;
        width: 100%;
        height: 43px;
        border-radius: 20px;
        font-size: 18px;
    }
    /deep/ .el-input__inner{
        width: 300px;
        background-color: rgb(247,247,247);
        height: 50px;
        color: darkgrey;
        border: 1px solid darkgrey;
    }
    /deep/ .el-icon-user,/deep/ .el-icon-reading,/deep/ .el-icon-lock {
         font-size: 20px;
         margin-top: 3px;
     }
    /deep/ .el-input--prefix .el-input__inner {
         padding-left: 34px;
    }   
</style>
