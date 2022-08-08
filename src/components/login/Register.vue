<template>
  <div class="register">
    <div class="form">
      <el-form :model="param" :rules="rules" class="form_center">
        <el-form-item prop="userName">
          <el-input
            type="text"
            placeholder="你的昵称"
            prefix-icon="el-icon-user"
            v-model="param.userName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userAccount">
          <el-input
            type="phone"
            placeholder="学号"
            prefix-icon="el-icon-reading"
            v-model="param.userAccount"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="设置密码"
            prefix-icon="el-icon-lock"
            v-model="param.password"
          ></el-input>
        </el-form-item>
        <div class="register_btn">
          <el-button type="primary" @click="submitForm()">注册</el-button>
        </div>
      </el-form>
      <div class="tishi">
        点击“注册”即表示您同意并愿意遵守校吧<br />
        <a href="">用户协议</a> 和 <a href="">隐私政策</a> 。
      </div>
    </div>
  </div>
</template>
<script>
import { register } from '@/api/login'
import { b64_md5 } from "@/utils/md5Util";
export default {
  data: function () {
    return {
      param: {
        userName: '',
        userAccount: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入你的昵称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        userAccount: [
          { required: true, message: '请输入你的学号', trigger: 'blur' },
          { min: 9, max: 9, message: '请输入正确的学号', trigger: 'blur' },
          { pattern: /^G\d{8}/, message: '学号格式不正确', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请设置密码', trigger: 'blur' },
          {
            min: 8,
            max: 16,
            message: '长度在 8 到 16 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    submitForm() {
      let goParams = this.param
      goParams.password = b64_md5(goParams.password)
      register(goParams).then((res) => {
        console.log(res);
      })
    },
  },
}
</script>

<style scoped>
.form_center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form {
  width: 100%;
}
.register_btn {
  margin: 0 0 14px 0;
  width: 70%;
}
.tishi {
  font-size: 12px;
  color: #909399;
  text-align: center;
}
.tishi a {
  text-decoration: none;
  color: #46b3e6;
}
/deep/ .el-button--primary {
  color: #fff;
  background-color: rgb(66, 193, 46);
  border-color: rgb(66, 193, 46);
  width: 100%;
  height: 43px;
  border-radius: 20px;
  font-size: 18px;
}
/deep/ .el-input__inner {
  width: 300px;
  background-color: rgb(247, 247, 247);
  height: 50px;
  color: #909399;
  border: 1px solid #909399;
}
/deep/ .el-icon-user,
/deep/ .el-icon-reading,
/deep/ .el-icon-lock {
  font-size: 20px;
  margin-top: 3px;
}
/deep/ .el-input--prefix .el-input__inner {
  padding-left: 34px;
}
</style>
