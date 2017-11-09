<template>
    <div class="register-wrap">
        <div class="register-case">
            <div class="register-name">
                <p>领投者企业注册</p>
                <span>Lead investor enterprise registration</span>
            </div>
            <div class="register-box">
                <div class="register-en">
                    <label>企业名称：</label>
                    <input required type="text" class="register-enterprise" placeholder="请输入企业名称" @input="checkVata" v-model="register.merchantName">
                </div>
                <div class="register-in">
                    <label>所属行业：</label>
                    <el-select class="register_select" required @change="checkVata" v-model="register.industry" placeholder="请选择">
                        <el-option v-for="item in industry" :key="item.id" :label="item.dicName" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="register-us">
                    <label>联系人姓名：</label>
                    <input required type="text" class="register-user" placeholder="请输入联系人姓名" @input="checkVata" v-model="register.contactUser">
                </div>
                <div class="register-ad">
                    <label>所在地：</label>
                    <el-select class="register_select" required @change="checkVata" v-model="register.province" placeholder="请选择">
                        <el-option v-for="item in provinces" :key="item.id" :label="item.dicName" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <button type="button" class="register-btn" @click="submitForm" :class="{ active:valueData }">确 定</button>
            <!-- <router-link to="/registerphone" type="button" class="register-btn" @click="submitForm" :class="{ active:valueData }">确定</router-link> -->
        </div>
    </div>
</template>

<script>
import city from "../../static/js/city.json.js";
import { mapState } from "vuex";
import axios from "axios";
import md5 from "js-md5";
export default {
  data() {
    return {
      // plsSelect: 0,
      userName: "",
      valueData: false,
      provinces: [], //省份数据
      industry: [], //行业数据
      // cityName1: [],
      // cityName: city.cityList,
      register: {
        // "validationCode": "", //验证码 必须
        merchantName: "", //企业名称 必须
        industry: "", //行业id
        province: "", //省份id
        // "city": "", //市id
        contactUser: "" //联系人姓名
        // "contactPhone": "" //联系电话 必须
      }
    };
  },

  mounted() {},
  created() {
    this.$http
      .post(this.api + "/dictionaryController/select2Menu", {
        //数据字典=>行业
        dicParent: "1"
      })
      .then(res => {
        if (res.data.status == "200") {
          this.industry = res.data.result;
          console.log(res.data.result);
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.$http
      .post(this.api + "/dictionaryController/select2Menu", {
        //数据字典=>省份
        dicParent: 501
      })
      .then(res => {
        if (res.data.status == "200") {
          this.provinces = res.data.result;
          console.log(res.data.result);
        }
      })
      .catch(error => {
        console.log(error);
      });
    function getIndustry(self) {
      //获取行业数据
      return self.$http.post(this.api + "/dictionaryController/select2Menu", {
        dicParent: 1
      });
    }
    function getRegister(self) {
      //获取省份数据
      return self.$http.post(this.api + "/dictionaryController/select2Menu", {
        dicParent: 501
      });
    }
    // let self = this;
    // axios.all([getIndustry(this), getRegister(this)])
    //     .then(axios.spread(function(res1, res2) {
    //         // if (res.data.status == '200') {
    //             this.industry = res1.data.result;
    //             this.provinces = res2.data.result;
    //             console.log(res1.data.result);
    //             console.log(res2.data.result);
    //         // }
    //     }))
    //     .catch(axios.spread(function(error1, error2) {
    //         console.log(error1);
    //         console.log(error2);
    //     }))
  },
  computed: mapState({
    registers(state) {
      state.register.register =
        JSON.parse(sessionStorage.getItem("register")) || {};
      return state.register.register;
    }
  }),
  methods: {
    checkVata(province) {
      //选择省份回调
      if (
        this.register.merchantName &&
        this.register.industry &&
        this.register.province &&
        this.register.contactUser
      ) {
        this.valueData = 1;
        return;
      }
      this.valueData = 0;
    },
    submitForm() {
      //最后一步提交所有注册数据
      if (this.valueData) {
        console.log(this.register);
        this.$store.state.login.loading = true;
        // this.$store.state.register.register.merchantName = this.register.merchantName;
        // this.$store.state.register.register.industry = this.register.industry;
        // this.$store.state.register.register.province = this.register.province;
        // this.$store.state.register.register.contactUser = this.register.contactUser;
        // // window.sessionStorage.setItem('register', JSON.stringify(this.$store.state.register.register));
        // this.$store.state.register.register = JSON.parse(sessionStorage.getItem('register')) || {};
        console.log(this.$store.state.register.register);
        this.$http
          .post(this.api + "/merchant/register", {
            validationCode: this.registers.validationCode,
            contactPhone: this.registers.contactPhone,
            industry: this.register.industry,
            province: this.register.province,
            contactUser: this.register.contactUser,
            merchantName: this.register.merchantName
          })
          .then(res => {
            if (res.data.status == "200") {
              //注册数据验证通过
              // this.$store.state.login.show_OR_hide.isVshowYe = false; //首次登陆用户不显示首页
              // this.$store.state.login.show_OR_hide.isShowSidebar = true; //只显示通讯录菜单列表
              let number = this.$store.state.register.register.contactPhone;
              let pass = md5("123456", 32);
              this.$store.dispatch({
                //登录
                type: "loginAPI",
                name: number,
                pwd: pass,
                self: this
              });
              // this.$router.push({ name: 'contacts' }); //进入通讯录页面
              // console.log(res.data);
            } else {
              //网络异常
              // console.log(res.data);
              // alert(res.data.message);
              this.$store.state.login.loading = false;
              this.$Message.warning(res.data.message);
            }
          })
          .catch(error => {
            // alert(222);
            console.log(error);
          });
      }
    }
  }
};
</script>


<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  font-family: ITC Avant Garda Gothic Demi Regular;
}

.register-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
  background: url(/static/img/register_bg.png) no-repeat center;
}

.register-case {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  margin: auto;
  width: 700px;
  height: 600px;
}

.register-name {
  position: absolute;
  top: 45px;
  left: 205px;
  width: 300px;
  height: 45px;
  font-size: 36px;
  text-align: center;
}

.register-name span {
  font-size: 14px;
}

.register-box {
  position: absolute;
  top: 150px;
  left: 60px;
  width: 700px;
  height: 350px;
  font-size: 16px;
}

.register-box label {
  display: inline-block;
  width: 100px;
  text-align: right;
}

input::-webkit-input-placeholder {
  color: #a6a9ad;
}

.register-en,
.register-in,
.register-us,
.register-ad {
  width: 500px;
  height: 100px;
}

.register-enterprise,
.register-industry,
.register-user,
.register-province,
.register-city {
  width: 300px;
  height: 36px;
  padding: 10px;
  margin-left: 20px;
  font-size: 16px;
  /* color: #fff; */
  border: none;
  border-radius: 4px;
  /* border-bottom: 2px solid #a6a9ad; */
  outline: none;
  /* background: transparent; */
}

.register-province,
.register-city {
  width: 160px;
}

.register-btn {
  position: absolute;
  top: 580px;
  left: 180px;
  display: inline-block;
  width: 350px;
  height: 45px;
  font-size: 24px;
  color: #fff;
  text-align: center;
  line-height: 45px;
  background: #f05e5e;
  border: none;
  border-radius: 30px;
  outline: none;
}

.active {
  background: red;
}

.register_select {
  margin-left: 20px;
  /* background:  */
  width: 300px;
}
</style>