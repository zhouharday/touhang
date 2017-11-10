<template>
  <section class="personal">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="编辑资料" name="first">
        <el-form label-position="left" :model="form1" :rules="rules1" ref="form1" label-width="90px">
          <el-row :gutter="40">
            <el-col :span="7">
              <el-form-item label="用户ID：" prop="phone">
                <el-input v-model="form1.number" auto-complete="off" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="用户角色：" prop="userRole">
                <el-input v-model="form1.userRole" auto-complete="off" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="企业名称：" prop="companyName">
                <el-input :disabled="1" v-model="form1.companyName" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="部门：" prop="deptName">
                <!-- <el-select v-model="form1.dept" placeholder="请选择" size="120%">
                                      <el-option v-for="item in department" :key="item.id" :label="item.deptName" :value="item.id">
                                      </el-option>
                                  </el-select> -->
                <el-input :disabled="1" v-model="form1.deptName" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14" style="margin-bottom:50px">
              <el-form-item label="姓名：" prop="name">
                <el-input v-model="form1.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="手机：" prop="phone">
                <el-input v-model="form1.phone" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="14">
                              <el-form-item label="办公电话：" prop="telephone">
                                  <el-input v-model="form1.telephone" auto-complete="off"></el-input>
                              </el-form-item>
                          </el-col> -->
            <el-col :span="14">
              <el-form-item label="邮箱：" prop="emil">
                <el-input v-model="form1.emil" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
        <div style="margin-left:23%">
          <el-button>取消</el-button>
          <el-button type="danger" @click="dangerBtn">确认</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="second">
        <el-form label-position="left" :model="form2" ref="form2" label-width="120px">
          <el-row :gutter="40">
            <el-col :span="13">
              <el-form-item label="请输入当前密码" prop="currentPwd">
                <el-input v-model="form2.currentPwd" @input="checkVata" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="请输入新密码" prop="newPwd">
                <el-input v-model="form2.newPwd" @input="checkVata" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="请确认新密码" prop="newPwd2">
                <el-input v-model="form2.newPwd2" @input="checkVata" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="请输入手机号" prop="phone">
                <el-input v-model="form2.phone" @input="checkVata" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button :class="{'active-code':isSendCode}" @click="sendVerificationCode" class="code-btn" :disabled="!isSendCode" type="danger">{{ btnText}}
              </el-button>
            </el-col>
            <el-col :span="13">
              <el-form-item label="请输入验证码" prop="code">
                <el-input v-model="form2.code" @input="checkVata" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button type="danger" style="width:100px;margin-left:23%;" @click="submitForm" :disabled="!valueData" :class="{ active:valueData }">完成</el-button>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>


<script>
export default {
  computed: {
    user() {
      this.$store.state.login.merchants =
        JSON.parse(sessionStorage.getItem("merchants")) || {};
      this.$store.state.login.userInfor =
        JSON.parse(sessionStorage.getItem("userInfor")) || {};
      return {
        merchants: this.$store.state.login.merchants,
        userInfor: this.$store.state.login.userInfor
      };
    }
  },
  created() {
    this.selectpersonalInfo();
    this.queryList();
  },
  data() {
    return {
      activeName: "first",
      isSendCode: false, //是否可以发送验证码
      valueData: false, //所有输入的值是否通过验证
      btnText: "获取验证码",
      form1: {
        //用户信息
        userID: "",
        userRole: "",
        companyName: "",
        deptName: "", //部门
        name: "", //姓名
        phone: "", //手机
        telephone: "", //办公电话
        emil: "" //邮箱
      },
      form2: {
        //修改密码
        currentPwd: "",
        newPwd: "",
        newPwd2: "",
        phone: "",
        code: ""
      },
      pwd: false,
      department: [] //部门列表数据
    };
  },
  methods: {
    /*******************验证 修改密码表单开始 *************************/
    checkVata() {
      let isPhone = this.checkPhone(this.form2.phone);

      if (isPhone) {
        this.isSendCode = true;
        this.valueData = false;
      } else {
        this.isSendCode = false;
        this.valueData = false;
      }
      if (
        this.form2.currentPwd &&
        isPhone &&
        this.form2.newPwd &&
        this.form2.newPwd2 &&
        this.form2.code
      ) {
        this.isSendCode = true;
        this.valueData = true;
      } else {
        // this.isSendCode = false;
        this.valueData = false;
      }
    },
    /***********************验证表单结束***************************************/

    /***********************手机号码验证开始************************************************/
    checkPhone(phone) {
      var pattern = /^1[34578][0-9]{9}$/;
      if (phone != "") {
        if (pattern.test(phone)) {
          return true;
        } else {
          return false;
        }
      }
    },
    /************************手机号码验证结束*************************************/

    /************************验证码倒计时开始************************************/
    time() {
      if (this.isSendCode) {
        this.isSendCode = !this.isSendCode;
        // this.valueData = false;
        var self = this;
        var sec = 60;
        var timer1 = setInterval(function() {
          // self.isSendCode = true;
          self.btnText = sec + "s";
          if (sec < 0) {
            // self.isSendCode = false;
            clearInterval(timer1);
            self.isSendCode = !self.isSendCode;
            self.btnText = "获取验证码";
          }
          sec--;
        }, 1000);
      }
    },
    /************************验证码倒计时结束*********************/
    sendVerificationCode() {
      //发送验证码 Ajax
      this.$http
        .post(this.api + "/personalCenter/seedCode", {
          id: this.user.userInfor.id,
          inputPhone: this.form2.phone
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              this.time();
              console.log(res.data);
              this.$Message.success(res.data.message);
            } else {
              this.$Message.error(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    /************************验证码倒计时结束*********************/

    /***********************提交表单开始*************************/
    submitForm() {
      if (this.form2.newPwd !== this.form2.newPwd2) {
        this.$Message.error("新密码与确认密码不一致，请重新输入");
        return;
      }
      if (this.valueData) {
        this.updatePass();
        console.log(this.form2);
      }
    },
    dangerBtn() {
      //编辑用户信息确认 Btn
      console.log(this.form1);
      //    this.updatePersonalData();
    },
    /************************提交表单结束********************************/
    selectpersonalInfo() {
      //个人中心个人详细信息展示 api
      this.$http
        .post(this.api + "/personalCenter/selectpersonalInfo", {
          userId: this.user.userInfor.id,
          merchantId: this.user.merchants[0].id
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log(res.data);
              this.form1 = res.data.result;
              let arr = [];
              res.data.result.roleList.map((item, index) => {
                arr.push(res.data.result.roleList[index].roleName);
                this.form1.userRole = arr.join(",");
                // this.form1.userRole = item.roleName;
              });
              this.form1.companyName = this.user.merchants[0].merchant_name;
              this.$Message.success(res.data.message);
            } else {
              this.$Message.error(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    updatePersonalData() {
      //个人中心个人详细信息更改 api
      this.$http
        .post(this.api + "/personalCenter/updatePersonalData", {
          id: this.user.userInfor.id,
          phone: this.form1.name, //手机号
          emil: this.form1.emil, //邮箱
          telephone: this.form1.telephone, //办公电话
          name: this.form1.name //姓名
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log(res.data);
              this.selectpersonalInfo();
              this.$Message.success(res.data.message);
            } else {
              this.$Message.error(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    queryList() {
      //查询部门列表 api
      this.$http
        .post(this.api + "/sysDept/queryList", {
          merchantId: this.user.merchants[0].id
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log(res.data);
              this.department = res.data.result;
              this.$Message.success(res.data.message);
            } else {
              this.$Message.error(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    updatePass() {
      let newPwd = this.md5(this.form2.newPwd2, 32);
      let pass = this.md5(this.form2.currentPwd, 32);
      //个人中心密码更改 api
      this.$http
        .post(this.api + "/personalCenter/updatePass", {
          id: this.user.userInfor.id, //用户ID
          mobileCode: this.form2.code, //用户输入的验证码
          phone: this.form2.phone, //用户手机号码
          newPwd: newPwd, //新的密码
          pass: pass //当前密码
        })
        .then(res => {
          if (res.status == "200") {
            console.log(res);
            if (res.data.status == "200") {
              console.log(res.data);
              this.$router.push({ name: "login" });
              sessionStorage.clear();
              localStorage.clear();
              this.$Message.success(res.data.message);
            } else {
              this.$Message.error(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    }
  }
};
</script>


<style lang="less" scoped>
.personal {
  background: #ffffff;
  padding: 24px;
  .code-btn {
    font-size: 14px;
    color: #fff;
    outline: none;
    background: gray;
  }

  .active-code {
    background: orange;
  }

  .active {
    background: #f10215;
  }
}
.formComponents {
  min-height: 300px;
}
.formContent {
  min-height: 300px;
  background: #fff;
}
.formRight {
  min-height: 300px;
}
</style>
