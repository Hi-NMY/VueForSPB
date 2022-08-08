<template>
  <div class="userinfo">
    <div class="userinfo_head">个人信息管理</div>
    <div class="userinfo_content">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="个人信息" name="1">
          <el-form label-width="80px" :model="queryParam" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户名:" prop="username">
                  <el-input
                    auto-complete="off"
                    v-model="queryParam.userName"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="账号:" prop="useracount">
                  <span class="info_message">{{
                    user.userInfo.userAccount
                  }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名:" prop="truename">
                  <span class="info_message">{{ user.userInfo.stuName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别:" prop="sex">
                  <el-radio-group
                    v-model="user.userInfo.stuSex"
                    fill="#46B3E6"
                    text-color="#46B3E6"
                    disabled
                  >
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="生日:" prop="birthday">
                  <el-date-picker
                    v-model="queryParam.userBirth"
                    type="date"
                    placeholder="选择日期"
                    @change="birthdayChange"
                    default-value=""
                    style="width: 100%"
                    format="yyyy - MM - dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="星座:" prop="birth_star">
                  <span class="info_message">{{ birth_star }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="我的喜欢:" prop="qianmin">
                  <span @click="toDialog" class="input_message">{{
                    queryParam.userFavorite
                  }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="所在地:" prop="place">
              <el-cascader
                separator="-"
                :props="cityProps"
                v-model="citySelect"
                :options="optionsplaes"
                filterable
                clearable
                @change="changeHome"
                style="width: 100%"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="个性签名:" prop="qianmin">
              <el-input
                auto-complete="off"
                v-model="queryParam.userProfile"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="dialog-footer">
            <!--<el-button type="primary" @click="changePwd" style="background-color: #46B3E6;border: 1px solid #46B3E6;">修改密码</el-button>-->
            <el-button type="primary" @click="toPwdDialog">修改密码</el-button>
            <el-button type="success" @click="submitForm" :loading="isLoading"
              >保存</el-button
            >
          </div>
        </el-collapse-item>
        <el-collapse-item title="隐私设置" name="2">
          <span style="margin-top: 12px; color: red"
            >(点击上方保存按钮进行保存)</span
          >
          <div class="ys_content">
            <div class="ys_switch">
              展示在线天数
              <el-switch
                @change="changePrivacy"
                v-model="privacySelect[0]"
                active-color="#46B3E6"
                inactive-color="grey"
              >
              </el-switch>
            </div>
            <div class="ys_switch">
              展示我的生日
              <el-switch
                @change="changePrivacy"
                v-model="privacySelect[1]"
                active-color="#46B3E6"
                inactive-color="grey"
              >
              </el-switch>
            </div>
            <div class="ys_switch">
              展示我的星座
              <el-switch
                @change="changePrivacy"
                v-model="privacySelect[2]"
                active-color="#46B3E6"
                inactive-color="grey"
              >
              </el-switch>
            </div>
            <div class="ys_switch">
              展示我的所在地
              <el-switch
                @change="changePrivacy"
                v-model="privacySelect[3]"
                active-color="#46B3E6"
                inactive-color="grey"
              >
              </el-switch>
            </div>
            <div class="ys_switch">
              展示我的标签
              <el-switch
                @change="changePrivacy"
                v-model="privacySelect[4]"
                active-color="#46B3E6"
                inactive-color="grey"
              >
              </el-switch>
            </div>
            <div class="ys_switch">
              展示关注和粉丝
              <el-switch
                @change="changePrivacy"
                v-model="privacySelect[5]"
                active-color="#46B3E6"
                inactive-color="grey"
              >
              </el-switch>
            </div>
            <div class="ys_switch">
              是否可查看我的徽章
              <el-switch
                @change="changePrivacy"
                v-model="privacySelect[6]"
                active-color="#46B3E6"
                inactive-color="grey"
              >
              </el-switch>
            </div>
            <div class="ys_switch">
              双向关注才能查看主页
              <el-switch
                @change="changePrivacy"
                v-model="privacySelect[7]"
                active-color="#46B3E6"
                inactive-color="grey"
              >
              </el-switch>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <el-dialog
      custom-class="pwdDialog"
      title="修改密码"
      :visible.sync="updateUserPwdDialog"
    >
      <el-form label-width="80px" :model="updatePwdParam" :rules="pwdRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="旧密码:" prop="userOldPwd">
              <el-input
                type="password"
                auto-complete="off"
                v-model="updatePwdParam.userOldPwd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="新密码:" prop="userPwd">
              <el-input
                type="password"
                auto-complete="off"
                v-model="updatePwdParam.userPwd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="divSave">
        <el-button type="success" @click="updateUserPassword">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog title="我的喜欢" :visible.sync="userFavoriteDialog">
      <el-checkbox-group
        @change="changeFavorite"
        v-model="favoriteSelect"
        :min="0"
        :max="9"
      >
        <el-checkbox v-for="f in favorite" :label="f" :key="f">{{
          f
        }}</el-checkbox>
      </el-checkbox-group>
    </el-dialog>
  </div>
</template>

<script>
import { getBirthStar } from '@/utils/dateUtil'
import { homeChildren } from '@/mixin/home'
import cityJson from '@/assets/city.json'
import favoriteJson from '@/assets/favorite.json'
import { updateUserPwd } from "@/api/userInfo";
import { b64_md5 } from "@/utils/md5Util";
import Cookies from 'js-cookie'
export default {
  name: 'UserInformation',
  props: ['userAccount'],
  mixins: [homeChildren],
  data() {
    return {
      activeNames: ['1'],
      birth_star: '',
      queryParam: {
        userName: undefined,
        userBirth: undefined,
        userFavorite: undefined,
        userHome: undefined,
        userProfile: undefined,
        userPrivacy: undefined,
        userAccount: this.userAccount
      },
      updatePwdParam: {
        userAccount: this.userAccount,
        userOldPwd: '',
        userPwd: ''
      },
      optionsplaes: [],
      citySelect: [],
      privacySelect: [],
      favoriteSelect: [],
      favorite: [],
      rules: {},
      pwdRules: {
        userOldPwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          {
            min: 8,
            max: 16,
            message: '长度在 8 到 16 个字符',
            trigger: 'blur',
          },
        ],
        userPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            min: 8,
            max: 16,
            message: '长度在 8 到 16 个字符',
            trigger: 'blur',
          },
        ],
      },
      cityProps: {
        value: 'name',
        label: 'name',
        children: 'city',
      },
      userFavoriteDialog: false,
      updateUserPwdDialog: false,
      isLoading: false
    };
  },
  computed: {
  },
  mounted() {
    Object.keys(this.queryParam).forEach((key) => {
      this.queryParam[key] = this.user.userInfo[key];
    });
    this.initCity()
    this.initPrivacy()
    this.initFavorite()
    if (this.user.userInfo.userBirth) {
      this.birthdayChange(this.user.userInfo.userBirth)
    }
  },
  methods: {
    toDialog() {
      this.userFavoriteDialog = true
    },
    toPwdDialog() {
      this.updateUserPwdDialog = true
    },
    changeHome(value) {
      this.queryParam.userHome = value[0] + "-" + value[1] + "-" + value[2]
    },
    changePrivacy() {
      let str = ''
      for (let i = 0; i < this.privacySelect.length; i++) {
        str += (this.privacySelect[i] ? '1' : '2')
      }
      this.queryParam.userPrivacy = str
    },
    changeFavorite(value) {
      let str = ''
      for (let i = 0; i < value.length; i++) {
        str += (value[i] + "|")
      }
      this.queryParam.userFavorite = str
    },
    initCity() {
      let arr = JSON.parse(JSON.stringify(cityJson))
      for (let index = 0; index < arr.length; index++) {
        for (let i = 0; i < arr[index].city.length; i++) {
          for (let a = 0; a < arr[index].city[i].city.length; a++) {
            arr[index].city[i].city[a] = { "name": arr[index].city[i].city[a] }
          }
        }
      }
      this.optionsplaes = arr
      if (this.queryParam.userHome) {
        this.citySelect = this.queryParam.userHome.split("-")
      }
    },
    initPrivacy() {
      if (this.queryParam.userPrivacy) {
        let arr = this.queryParam.userPrivacy.split("")
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == '1') {
            arr[i] = true
          } else {
            arr[i] = false
          }
        }
        this.privacySelect = arr
      }
    },
    initFavorite() {
      this.favorite = JSON.parse(JSON.stringify(favoriteJson))
      if (this.queryParam.userFavorite) {
        this.favoriteSelect = this.queryParam.userFavorite.substring(0, this.queryParam.userFavorite.lastIndexOf('|')).split("|")
      }
    },
    star(date) {
      return getBirthStar(date)
    },
    birthdayChange(val) {
      if (!val) {
        this.birth_star = ''
        return;
      }
      this.birth_star = this.star(val)
    },
    changePwd() {

    },
    submitForm() {
      this.isLoading = true
      this.$store.dispatch('userInfo/changeInformation', {
        query: this.queryParam,
        _this: this,
        goto: () => {
          this.isLoading = false
        },
      })
    },
    updateUserPassword() {
      let goParams = this.updatePwdParam
      goParams.userOldPwd = b64_md5(goParams.userOldPwd)
      goParams.userPwd = b64_md5(goParams.userPwd)
      updateUserPwd(goParams).then((res) => {
        if (res.data) {
          Cookies.remove('token')
          this.$router.push({
            path: '/login',
          })
          this.$message({
            duration: 1500,
            showClose: true,
            message: '密码修改成功,请重新登陆',
            type: 'success',
          })
          this.updateUserPwdDialog = false
        } else {
          this.$message({
            duration: 1500,
            showClose: true,
            message: res.msg,
            type: 'error',
          })
        }
      })
    }
  }
}
</script>

<style scope lang="scss">
.userinfo {
  width: auto;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: white;
  .el-dialog {
    border-radius: 10px;
    min-width: 300px;
  }
  .el-dialog__body {
    padding: 0px 40px 40px 40px;
  }
  .el-checkbox + .el-checkbox {
    margin-left: 0px;
  }
  .el-checkbox {
    margin-right: 25px;
  }
  .el-checkbox__label {
    margin-top: 24px;
  }
  .pwdDialog {
    width: 400px;
    margin: 0;
    .el-button {
      width: 100px;
      border-radius: 25px;
      margin: 8px 0 0 25px;
    }
    .divSave {
      text-align: right;
      margin: 0px auto;
    }
    .el-dialog__body {
      padding: 10px 16px 20px 16px;
    }
    .el-input__inner {
      min-width: 260px;
    }
    .el-form-item__error {
      width: 400px;
    }
  }
}
.userinfo_head {
  height: 45px;
  font-size: 20px;
}
.userinfo_content {
  .info_message {
    height: 38px;
    padding: 0 15px;
    background-color: rgba(204, 204, 204, 0.104);
    display: block;
    border-radius: 5px;
  }
  .input_message {
    height: 38px;
    padding: 0 15px;
    border: 1px solid #dcdfe6;
    display: block;
    border-radius: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .input_message:hover {
    border: 1px solid #cbcbcb;
  }
  .el-form {
    margin: 10px 35px 5px 12px;
  }
  .el-collapse-item__header {
    font-size: 18px;
    font-weight: 400;
    color: grey;
    margin-left: 3px;
  }
  .dialog-footer {
    float: right;
    margin-right: 35px;
    margin-bottom: 30px;
    .el-button {
      width: 100px;
      border-radius: 25px;
      margin: 0 0 0 25px;
    }
    /*.el-button--primary:hover{
      background-color: rgb((92 192 238));
    }*/
  }
}
.ys_content {
  margin: 15px 35px;
  font-size: 14px;
  .ys_switch {
    height: 35px;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 15px;
    .el-switch {
      float: right;
    }
  }
}
</style>