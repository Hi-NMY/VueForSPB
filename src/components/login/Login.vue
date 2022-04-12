<template>
  <div class="login">
    <div class="form">
      <el-form :model="loginDto" :rules="rules" class="form_center">
        <el-form-item prop="userAccount">
          <el-input
            placeholder="账号"
            prefix-icon="el-icon-reading"
            v-model="loginDto.userAccount"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            v-model="loginDto.password"
          ></el-input>
        </el-form-item>
        <div class="remember_me_forget">
          <div>
            <input type="checkbox" v-model="rememberMe" />
            <span>记住我</span>
          </div>
          <a href="">忘记密码?</a>
        </div>
        <div class="login_btn">
          <el-button type="primary" @click="submitForm()" :loading="loading"
            >登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/login'
export default {
  data: function () {
    return {
      loginDto: {
        userAccount: '',
        password: '',
      },
      loading: false,
      rememberMe: false,
      rules: {
        userAccount: [
          { required: true, message: '请输入你的账号', trigger: 'blur' },
          { min: 9, max: 9, message: '请输入正确的账号', trigger: 'blur' },
          { pattern: /^G\d{8}/, message: '账号格式不对', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请设置密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    submitForm() {
      if (!this.loginDto.userAccount || !this.loginDto.password) {
        return
      }
      this.loading = true
      login(this.loginDto).then((res) => {
        this.loading = false
        if (res.code == 200) {
          if (this.rememberMe) {
            localStorage.setItem('user', JSON.stringify(this.loginDto))
          }
          this.$bus.$emit('clearSelect', '/index')
          this.$store.commit('index/updateIsLogin', true)
          this.$store.commit('userInfo/obtainUserInfo', res.data)
          this.$router.replace({
            path: '/index/noVidePostBar',
          })
        } else {
          this.$message({
            duration: 1500,
            showClose: true,
            message: res.msg,
            type: 'error',
          })
        }
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
.login_btn {
  margin: 0 0 14px 0;
  width: 70%;
}
.tishi {
  font-size: 12px;
  color: #909399;
  text-align: center;
}
.tishi a {
  color: #46b3e6;
}
.remember_me_forget {
  width: 100%;
}
.remember_me_forget div {
  float: left;
}
.remember_me_forget a {
  color: #909399;
  text-decoration: none;
  float: right;
}
.remember_me_forget a:hover {
  color: #606266;
  text-decoration: none;
  float: right;
}
/deep/ .el-button--primary {
  margin-top: 20px;
  color: #fff;
  background-color: #4d80e4;
  border-color: #4d80e4;
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
