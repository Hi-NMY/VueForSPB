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
                  <el-input auto-complete="off" v-model="userinfomsg.username"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="学号(账号)" prop="useracount">
                  <el-input auto-complete="off" v-model="userinfomsg.useracount"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row>
              <el-col :span="12">
                <el-form-item label="真实姓名" prop="truename">
                  <el-input auto-complete="off" v-model="userinfomsg.truename"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别" prop="sex">
                  <el-radio-group v-model="userinfomsg.sex" fill="#46B3E6" text-color="#46B3E6" disabled="true">
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
                    v-model="userinfomsg.birthday0"
                    type="date"
                    placeholder="选择日期"
                    @change="birthdayChange"
                    default-value=""
                    style="width: 90%;">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="星座" prop="birth_star">
                  <el-input auto-complete="off" readonly="true" v-model="userinfomsg.birth_star"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row>
              <el-col :span="12">
                <el-form-item label="所在地" prop="place">
                  <el-cascader :options="optionsplaes" clearable v-model="userinfomsg.place"
                               style="width: 101%;"></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="个性标签" prop="biaoqian">
                  <el-input auto-complete="off" placeholder="个性标签占位符" v-model="userinfomsg.biaoqian"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-form-item label="个性签名" prop="qianmin">
              <el-input auto-complete="off" v-model="userinfomsg.qianmin" style="width: 96%"></el-input>
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
export default {
  name: 'UserInformation',
  data() {
    return {
      activeNames: ['1'],
      userinfomsg: {
        birthday0: '',
        birthday: '',
        birth_star: '',
        username: '',
        useraccount: '',
        truename: '',
        sex: 1,
        place: '',
        biaoqian: '',
        qianmin: '',
      },

      optionsplaes: [{
        value: 'jiangsu',
        label: '江苏省',
        children: [
          {
            value: 320100,
            label: "南京市",
            children: [
              {
                value: 320102,
                label: "玄武区",
              },
              {
                value: 320104,
                label: "秦淮区",
              },
              {
                value: 320105,
                label: "建邺区",
              },
              {
                value: 320106,
                label: "鼓楼区",
              },
              {
                value: 320111,
                label: "浦口区",
              }, {
                value: 320126,
                label: "江北新区",
              },
              {
                value: 320113,
                label: "栖霞区",
              },
              {
                value: 320114,
                label: "雨花台区",
              },
              {
                value: 320115,
                label: "江宁区",
              },
              {
                value: 320116,
                label: "六合区",
              },
              {
                value: 320124,
                label: "溧水区",
              },
              {
                value: 320125,
                label: "高淳区",
              },
              {
                value: 320101,
                label: "南京市直",
              }
            ]
          },
          {
            value: 320200,
            label: "无锡市",
            children: [
              {
                value: 320213,
                label: "梁溪区",
              },
              {
                value: 320214,
                label: "新吴区",
              },
              {
                value: 320205,
                label: "锡山区",
              },
              {
                value: 320206,
                label: "惠山区",
              },
              {
                value: 320211,
                label: "滨湖区",
              },
              {
                value: 320281,
                label: "江阴市",
              },
              {
                value: 320282,
                label: "宜兴市",
              },
              {
                value: 320201,
                label: "无锡市直",
              },
            ]
          },
          {
            value: 320300,
            label: "徐州市",
            children: [
              {
                value: 320302,
                label: "鼓楼区",
              },
              {
                value: 320303,
                label: "云龙区",
              },
              {
                value: 320605,
                label: "贾汪区",
              },
              {
                value: 320311,
                label: "泉山区",
              },
              {
                value: 320323,
                label: "铜山区",
              },
              {
                value: 320321,
                label: "丰县",
              },
              {
                value: 320322,
                label: "沛县",
              },
              {
                value: 320324,
                label: "睢宁县",
              },
              {
                value: 320381,
                label: "新沂市",
              },
              {
                value: 320382,
                label: "邳州市",
              },
              {
                value: 320301,
                label: "徐州市直",
              },

            ]
          },
          {
            value: 320400,
            label: "常州市",
            children: [
              {
                value: 320482,
                label: "金坛区",
              },
              {
                value: 320481,
                label: "溧阳市",
              },
              {
                value: 320412,
                label: "武进区",
              },
              {
                value: 320411,
                label: "新北区",
              },
              {
                value: 320404,
                label: "钟楼区",
              },
              {
                value: 320402,
                label: "天宁区",
              },
              {
                value: 320401,
                label: "常州市直",
              }
            ]
          },
          {
            value: 320500,
            label: "苏州市",
            children: [
              {
                value: 320508,
                label: "姑苏区",
              },
              {
                value: 320584,
                label: "吴江区",
              },
              {
                value: 320581,
                label: "常熟市",
              },
              {
                value: 320582,
                label: "张家港市",
              },
              {
                value: 320583,
                label: "昆山市",
              },
              {
                value: 320585,
                label: "太仓市",
              },
              {
                value: 320504,
                label: "高新区",
              },
              {
                value: 320507,
                label: '相城区'
              },
              {
                value: 320506,
                label: '吴中区'
              },
              {
                value: 320505,
                label: '虎丘区'
              },
              {
                value: 320595,
                label: '工业园区'
              },
            ]
          },
          {
            value: 320600,
            label: "南通市",
            children: [
              {
                value: 320602,
                label: "崇川区",
              },
              {
                value: 320611,
                label: "港闸区",
              },
              {
                value: 320582,
                label: "通州区",
              },
              {
                value: 320621,
                label: "海安市",
              },
              {
                value: 320623,
                label: "如东县",
              },
              {
                value: 320681,
                label: "启东市",
              },
              {
                value: 320682,
                label: '如皋市'
              },
              {
                value: 320684,
                label: '海门区'
              },
              {
                value: 320601,
                label: '南通市直'
              },
            ]
          },
          {
            value: 320700,
            label: "连云港市",
            children: [

              {
                value: 320703,
                label: "连云区",
              },
              {
                value: 320706,
                label: "海州区",
              },
              {
                value: 320721,
                label: "赣榆区",
              },
              {
                value: 320722,
                label: '东海县'
              },
              {
                value: 320723,
                label: '灌云县'
              },
              {
                value: 320724,
                label: '灌南县'
              },
            ]
          },
          {
            value: 320800,
            label: "淮安市",
            children: [
              {
                value: 320803,
                label: "淮安区",
              },
              {
                value: 320804,
                label: "淮阴区",
              },
              {
                value: 320811,
                label: '清江浦区'
              },
              {
                value: 320826,
                label: '涟水县'
              },
              {
                value: 320829,
                label: '洪泽区'
              },
              {
                value: 320830,
                label: '盱眙县'
              },
              {
                value: 320831,
                label: '金湖县'
              },
              {
                value: 320801,
                label: '淮安市直'
              }
            ]
          },
          {
            value: 320900,
            label: "盐城市",
            children: [
              {
                value: 320902,
                label: "亭湖区",
              },
              {
                value: 320903,
                label: "盐都区",
              },
              {
                value: 320921,
                label: "响水县",
              },
              {
                value: 320922,
                label: "滨海县",
              },
              {
                value: 320923,
                label: '阜宁县'
              },
              {
                value: 320924,
                label: '射阳县'
              },
              {
                value: 320925,
                label: '建湖县'
              },
              {
                value: 320981,
                label: '东台市'
              },
              {
                value: 320982,
                label: '大丰市'
              },
              {
                value: 320901,
                label: '盐城市直'
              }
            ]
          },
          {
            value: 321000,
            label: "扬州市",
            children: [
              {
                value: 321002,
                label: "广陵区",
              },
              {
                value: 321003,
                label: '邗江区'
              },
              {
                value: 321088,
                label: '江都区'
              },
              {
                value: 321023,
                label: '宝应县'
              },
              {
                value: 321081,
                label: '仪征市'
              },
              {
                value: 321084,
                label: '高邮市'
              },
              {
                value: 321001,
                label: '扬州市直'
              }
            ]
          },
          {
            value: 321100,
            label: "镇江市",
            children: [
              {
                value: 321102,
                label: "京口区",
              },
              {
                value: 321111,
                label: '润州区'
              },
              {
                value: 321112,
                label: '丹徒区'
              },
              {
                value: 321181,
                label: '丹阳市'
              },
              {
                value: 321182,
                label: '扬中市'
              },
              {
                value: 321183,
                label: '句容市'
              },
              {
                value: 321101,
                label: '镇江市直'
              }
            ]
          },
          {
            value: 321200,
            label: "泰州市",
            children: [
              {
                value: 321202,
                label: "海陵区",
              },
              {
                value: 321203,
                label: '高港区'
              },
              {
                value: 321284,
                label: '姜堰区'
              },
              {
                value: 321281,
                label: '兴化市'
              },
              {
                value: 321282,
                label: '靖江市'
              },
              {
                value: 321283,
                label: '泰兴市'
              },
              {
                value: 321201,
                label: '泰州市直'
              }
            ]
          },
          {
            value: 321300,
            label: "宿迁市",
            children: [
              {value: 321302, label: '宿城区'},
              {value: 321311, label: '宿豫区',},
              {value: 321322, label: '沭阳县'},
              {value: 321323, label: '泗阳县'},
              {value: 321324, label: '泗洪县'},
            ]
          }
        ]
      }, {
        value: 'zujian',
        label: '安徽省',
        children: [{
          value: '11',
          label: '11',
          children: [{
            value: '111',
            label: '111'
          }, {
            value: '112',
            label: '112'
          }, {
            value: '113',
            label: '113'
          }, {
            value: '114',
            label: '114'
          }, {
            value: '115',
            label: '115'
          }]
        }, {
          value: '22',
          label: '22',
          children: [{
            value: '221',
            label: '221'
          }, {
            value: '222',
            label: '222'
          }, {
            value: '223',
            label: '223'
          }, {
            value: '224',
            label: '224'
          }]
        }, {
          value: '33',
          label: '33',
          children: [{
            value: '331',
            label: '331'
          }, {
            value: '332',
            label: '332'
          }]
        }, {
          value: '44',
          label: '44',
          children: [{
            value: '441',
            label: '441'
          }, {
            value: '442',
            label: '442'
          }]
        }, {
          value: '55',
          label: '55',
          children: [{
            value: '551',
            label: '551'
          }, {
            value: '552',
            label: '552'
          }]
        }]
      }
      ],
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
  methods: {
    handleChange(val) {
      console.log(val);
    },
    star(date) {
      return getBirthStar(date)
    },
    birthdayChange(val) {
      let _this = this;
      // console.log(val);
      // var date = new Date(val)
      _this.userinfomsg.birth_star = this.star(val)

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
  .el-form {
    margin: 10px 12px 5px 12px;
  }
  .el-input {
    width: 90%;
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