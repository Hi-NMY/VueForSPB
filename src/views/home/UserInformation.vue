<template>
  <div class="userinfo">
    <div class="userinfo_head">
      个人信息管理
    </div>
    <div class="userinfo_content">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="个人信息" name="1">
          <el-form label-width="80px" :model="userinfomsg" :rules="rules">
            
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户名" prop="username">
                  <el-input auto-complete="off" v-model="user.userInfo.userName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="学号(账号)" prop="useracount">
                  <span class="info_message">{{user.userInfo.userAccount}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row>
              <el-col :span="12">
                <el-form-item label="真实姓名" prop="truename">
                  <span class="info_message">{{user.userInfo.stuName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别" prop="sex">
                  <el-radio-group v-model="user.userInfo.stuSex" fill="#46B3E6" text-color="#46B3E6" disabled>
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row>
              <el-col :span="12">
                <el-form-item label="生日" prop="birthday">
                  <el-date-picker
                    v-model="user.userInfo.userBirth"
                    type="date"
                    placeholder="选择日期"
                    @change="birthdayChange"
                    default-value=""
                    style="width: 100%;">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="星座" prop="birth_star">
                  <span class="info_message">{{birth_star}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row>
              <el-col :span="12">
                <el-form-item label="个性标签" prop="biaoqian">
                  <el-input auto-complete="off" placeholder="个性标签占位符" v-model="user.userInfo.userFavorite"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="所在地" prop="place">
              <el-cascader v-model="cityvalue" :options="optionsplaes" filterable clearable @change="handleChange" style="width: 100%"></el-cascader>
            </el-form-item>
            
            <el-form-item label="个性签名" prop="qianmin">
              <el-input auto-complete="off" v-model="user.userInfo.userProfile"></el-input>
            </el-form-item>
          
          </el-form>
          <div class="dialog-footer">
            <!--<el-button type="primary" @click="changePwd" style="background-color: #46B3E6;border: 1px solid #46B3E6;">修改密码</el-button>-->
            <el-button type="primary" @click="changePwd">修改密码</el-button>
            <el-button type="success" @click="submitForm">保存</el-button>
          </div>
        </el-collapse-item>
        <el-collapse-item title="隐私设计" name="2">
          <div class="ys_content">
            <div class="ys_switch">
              展示在线天数
              <el-switch
                v-model="isshowdays"
                active-color="#46B3E6"
                inactive-color="grey">
              </el-switch>
            </div>
            <div class="ys_switch">
              展示我的生日
              <el-switch
                v-model="isshowbirth"
                active-color="#46B3E6"
                inactive-color="grey">
              </el-switch>
            </div>
            <div class="ys_switch">
              展示我的星座
              <el-switch
                v-model="isshowstar"
                active-color="#46B3E6"
                inactive-color="grey">
              </el-switch>
            </div>
            <div class="ys_switch">
              展示我的所在地
              <el-switch
                v-model="isshowplace"
                active-color="#46B3E6"
                inactive-color="grey">
              </el-switch>
            </div>
            <div class="ys_switch">
              展示我的标签
              <el-switch
                v-model="isshowbiaoqian"
                active-color="#46B3E6"
                inactive-color="grey">
              </el-switch>
            </div>
            <div class="ys_switch">
              展示关注和粉丝
              <el-switch
                v-model="isshowfollow"
                active-color="#46B3E6"
                inactive-color="grey">
              </el-switch>
            </div>
            <div class="ys_switch">
              是否可查看我的徽章
              <el-switch
                v-model="isshowhuizhang"
                active-color="#46B3E6"
                inactive-color="grey">
              </el-switch>
            </div>
            <div class="ys_switch">
              双向关注才能查看主页
              <el-switch
                v-model="isshowzhuye"
                active-color="#46B3E6"
                inactive-color="grey">
              </el-switch>
            </div>
          </div>
        
        </el-collapse-item>
      </el-collapse>
    </div>
  
  </div>
</template>

<script>
import { getBirthStar } from '@/utils/dateUtil'
import { regionData, CodeToText } from 'element-china-area-data'
import { mapState } from 'vuex'
export default {
  name: 'UserInformation',
  data() {
    return {
      activeNames: ['1'],
      birth_star: '',
      userinfomsg: {},
      rules: {},
      cityvalue:[],
      optionsplaes:regionData,
      isshowdays: true,
      isshowbirth: false,
      isshowstar: true,
      isshowplace: true,
      isshowbiaoqian: false,
      isshowfollow: true,
      isshowhuizhang: false,
      isshowzhuye: true,
    };
  },
  computed: {
    ...mapState('userInfo', ['user']),
  },
  mounted(){},
  methods: {
    handleChange(e){
      console.log(CodeToText[e[0]],CodeToText[e[1]],CodeToText[e[2]])
      
    },
    star(date) {
      return getBirthStar(date)
    },
    birthdayChange(val) {
      if(!val){
        this.birth_star = ''
        return;
      }
      let _this = this;
      _this.birth_star = this.star(val)
    },
    changePwd() {

    },
    submitForm() {

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
}
.userinfo_head {
  height: 45px;
  font-size: 20px;
}
.userinfo_content {
  .info_message {
    height: 38px;
    padding: 0 15px;
    border: 1px solid #DCDFE6;
    display: block;
    border-radius: 5px;
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