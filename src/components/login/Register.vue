<template>
<div class="register">
    <div class="form">
        <el-form :model="param" :rules="rules" ref="param">
            <el-form-item prop="username">
                <el-input type="test" placeholder="你的昵称" prefix-icon="el-icon-user" v-model="param.username" ></el-input>
            </el-form-item>
            <el-form-item prop="userphone">
                <el-input type="phone" placeholder="手机号" prefix-icon="el-icon-mobile-phone" v-model="param.userphone"></el-input>
            </el-form-item>
            <el-form-item prop="userpwd">
                <el-input type="password" placeholder="设置密码" prefix-icon="el-icon-lock" v-model="param.userpwd"></el-input>
            </el-form-item>
            <div class="register-btn">
                <el-button type="primary" @click="submitForm()">注册</el-button>
            </div>
        </el-form>
        <div class="tishi">
            点击“注册”即表示您同意并愿意遵守简书<br>
            <a>用户协议</a> 和
            <a>隐私政策</a> 。
        </div>
    </div>
</div>
</template>
<script>
export default {
    data: function () {
        return {
            param:{
                username:'',
                userphone:'',
                userpwd:''
            },
            rules: {
                username: [
                    {required: true, message: '请输入你的昵称', trigger: 'blur'},
                    {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                ],
                userphone: [
                    {required: true, message: '请输入你的手机号', trigger: 'blur'},
                    {min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur'},
                    {pattern:/^1(3|4|5|6|7|8|9)\d{9}$/,message: '手机号格式不对',trigger: 'blur'}
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
            this.$refs[`param`].validate((valid) => {
                if (valid) {
                    console.log('您点击了注册');
                    this.$message({
                        message: '您点击了注册',
                        type: 'success'
                    });
                }
            });
        }
    }

}
</script>

<style scoped>
    .form{
        width: 23%;
        border: 1px solid red;
        padding: 12px;
        padding-top: 22px;
    }
    /deep/ .el-input__inner{
        background-color: rgb(247,247,247);
        height: 50px;
        color: darkgrey;
        border: 1px solid darkgrey;
    }
    .register-btn{
        margin: 28px 0 14px 0;
    }
    /deep/ .el-button--primary {
        color: #FFF;
        background-color: rgb(66,193,46);
        border-color: rgb(66,193,46);
        width: 100%;
        height: 43px;
        border-radius: 20px;
        font-size: 18px;
    }
    .tishi{
        font-size: 12px;
        color: darkgrey;
        text-align: center;
    }
    .tishi a{
        color: #46B3E6;
    }
    /deep/ .el-icon-user,/deep/ .el-icon-mobile-phone,/deep/ .el-icon-lock {
         font-size: 20px;
         bottom: -4px;
         position: relative;
     }
    /*a{*/
    /*    color: #46B3E6;*/
    /*    color: #4D80E4;*/
    /*    color: #A685E2;*/
    /*    color: #DFF6F0;*/
    /*    color: #ffcc29;*/
    /*    color: #E93B81;*/
    /*}*/
</style>
