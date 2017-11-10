<template>
    <section>
        <!-- 这是通讯录内容 -->
        <div class="contacts_list">
            <!-- 联系人list -->
            <div class="contacts_L">
                <div>
                    <div v-for="( item, index) in contacts_list" :key="item.index" @click="active(index,item)" :class="{'bag':ind === index}">
                        <ul>
                            <li>
                                <div>
                                    <img :src="item.src" alt="">
                                </div>
                                <div>
                                    <div>
                                        {{item.name}}
                                    </div>
                                    <div>
                                        {{item.name_bot}}
                                    </div>
                                </div>
                                <div>{{item.time}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="contacts_R">
                <el-row>
                    <div class="contacts_R_header">
                        <el-col :span="24">
                            <div class="grid-content bg-purple">
                                <div class="fl">
                                    <div><img :src="srcContent.src" alt=""></div>
                                    <div>
                                        <div>{{srcContent.name}}</div>
                                        <div>{{srcContent.title}}</div>
                                    </div>
                                </div>
                                <div>
                                    <el-button style="color:#fff;" type="text" @click="openDialog('form')">申请开通系统试用</el-button>
                                </div>
                            </div>
                        </el-col>
                    </div>
                </el-row>
                <el-row style="height:100%;">
                    <div class="contacts_R_content">
                        <el-col :span="24">
                            <img v-show="typeText.type == '1'" :src="errorIMG.error_01" alt="">
                            <div v-show="typeText.type != '1'">{{typeText.text}}</div>
                        </el-col>
                    </div>
                </el-row>
                <el-row>
                    <div class="contacts_R_content">
                        <el-col :span="24">
                        </el-col>
                    </div>
                </el-row>
                <!-- 申请开通系统 对话框 -->
                <el-dialog title="申请开通系统" :visible.sync="systemDialog">
                    <!-- <i></i> -->
                    <el-form :model="form" :rules="rules" ref="form" label-width="200px">
                        <el-row>
                            <el-col>
                                <i></i>
                            </el-col>
                            <el-col :span="18">
                                <el-form-item label="统一社会信用代码" prop="creditCode">
                                    <el-input v-model="form.creditCode" auto-complete="off" class="mgl"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="18">
                                <el-form-item label="企业名称" prop="companyName">
                                    <el-input v-model="form.companyName" auto-complete="off" class="mgl"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="18">
                                <el-form-item label="法人代表" prop="delegate">
                                    <el-input v-model="form.delegate" auto-complete="off" class="mgl"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="18">
                                <el-form-item label="详细地址" prop="address">
                                    <el-input v-model="form.address" auto-complete="off" class="mgl"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <i></i>
                            </el-col>
                            <!-- 企业类型 -->
                            <el-col v-for="(item, index) in typePostage" :key="item.index">
                                <el-form-item prop="edition">
                                    <el-radio v-model="form.edition" :label="item.id">
                                        <b>{{item.typeName}}</b>
                                    </el-radio>
                                    <p>
                                        <span>{{item.typeDescribe}}</span>
                                    </p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="systemDialog = false">取 消</el-button>
                        <el-button type="danger" @click="submitForm('form')">提 交</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </section>
</template>

<style lang="less" scoped>
section {
  height: 93%;
}

.contacts_list {
  height: 103%;
  overflow: hidden;
  .contacts_L {
    width: 20%;
    height: 100%;
    float: left;
    overflow: hidden;
    > div {
      float: left;
      width: 105%;
      height: 100%;
      overflow: scroll;
      border-right: 1px solid #ccc;
      background: #ffffff;
      overflow-x: hidden;
      > div {
        // overflow-y: scroll;
        width: 100%; // height: 100%;
        padding: 10px;
        > ul {
          > li {
            position: relative;
            width: 100%;
            height: 77px;
            > div {
              float: left;
            }
            > div:nth-child(1) {
              border-radius: 50%;
              margin-top: 15.5px;
              margin-right: 15px;
              > img {
                width: 46px;
                height: 46px;
                display: inline-block; // float: left;
              }
            }
            > div:nth-child(2) {
              > div:nth-child(1) {
                position: absolute;
                top: 13px;
              }
              > div:nth-child(2) {
                position: absolute;
                top: 40px;
              }
            }
            > div:nth-child(3) {
              position: absolute;
              right: 23px;
              top: 14px;
            }
          }
        }
      }
    }
  }
  .contacts_R {
    float: left;
    width: 80%;
    height: 100%; // border-bottom: 1px solid #ccc;
    // padding: 10px;
    box-sizing: border-box;
    position: relative;
    .contacts_R_header {
      width: 100%;
      height: 60px; // height: 100%;
      padding: 10px;
      background: #ffffff;
      margin-bottom: 1px;
      .bg-purple {
        .fl {
          > div {
            float: left;
          }
        }
        > div {
          float: left;
          > div {
            // float: left;
            img {
              width: 46px;
              height: 46px;
              margin-right: 10px;
            }
          }
        }
        > div:nth-child(2) {
          position: absolute;
          right: 13.5px;
          top: 13.5px;
          width: 135px;
          height: 33px;
          line-height: 33px;
          text-align: center;
          background: #f05e5e;
          color: #ffffff;
          border-radius: 15px;
          font-size: 10px;
          cursor: pointer;
        }
      }
    }
    .contacts_R_content {
      position: relative;
      background: #ffffff;
      height: 100%;
      > div > img {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 340px;
        height: 273px;
      }
      > div > div {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 500px;
        height: 100px;
        font-family: Helvetica, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑",
          Arial, sans-serif;
        color: darkgreen;
        font-size: 20px;
      }
    }
  }
}

.bag {
  background: #dee0e5;
}

.mgl {
  margin-left: 40px;
}

i {
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 1px solid #c4c4c4;
}

b {
  font-size: 16px;
}
</style>

<script>
import { mapState } from "vuex";
import service from "common/js/fetch";
import axios from "axios";

export default {
  created() {
    this.getData();
    this.$http
      .post(this.api + "/merchantType/queryList", {})
      .then(res => {
        if (res.status == "200") {
          this.typePostage = res.data.result;
          // console.log(res.data.result);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    user() {
      this.$store.state.login.merchants =
        JSON.parse(sessionStorage.getItem("merchants")) || {};
      return {
        merchants: this.$store.state.login.merchants,
        userInfor: this.$store.state.login.userInfor
      };
    },
    typeText() {
      if (JSON.parse(sessionStorage.getItem("saveApprovalStatus")) == null) {
        this.$store.state.login.approvelType.type = "";
        this.$store.state.login.approvelType.text = "您好，请先注册~";
        // console.log(state.login.approvelType);
        return this.$store.state.login.approvelType;
      } else {
        this.$store.state.login.approvelType =
          JSON.parse(sessionStorage.getItem("saveApprovalStatus")) || {};
        // console.log(state.login.approvelType);
        return this.$store.state.login.approvelType;
      }
    },
    id() {
      this.$store.state.login.merchants = JSON.parse(
        sessionStorage.getItem("merchants")
      );
      return this.$store.state.login.merchants[0].id;
    }
  },
  data() {
    return {
      systemDialog: false,
      ind: "",
      errorIMG: {
        error_01: "/static/img/error/error_01.png"
      },
      contacts_list: [
        {
          src: "/static/img/my_tuxiang.png",
          name: "",
          name_bot: "",
          time: ""
        }
      ],
      srcContent: {
        src: "",
        name: "",
        title: ""
      },
      form: {
        creditCode: "", //统一社会信用代码
        companyName: "", //企业名称
        delegate: "", //法人代表
        address: "", //详细地址
        edition: "", //企业类型
        id: this.id
      },
      typePostage: [], //申请类型
      rules: {
        creditCode: [{ required: true, message: "请输入信用代码", trigger: "blur" }],
        companyName: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        delegate: [{ required: true, message: "请输入法人代表", trigger: "blur" }],
        address: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
        edition: [{ required: true, message: "请选择申请类型", trigger: "change" }]
      }
    };
  },
  methods: {
    getData() {
      let myDate = new Date();
      let hour = myDate.getHours(); //小时
      let minuts = myDate.getMinutes(); //分钟
      if (minuts <= 9) {
        minuts = "0" + minuts;
      }
      this.srcContent.name = this.user.merchants[0].contact_user;
      this.srcContent.title = this.user.merchants[0].merchant_name;
      this.contacts_list.forEach(item => {
        // alert(888);
        item.time = hour + ":" + minuts;
        console.log(this.user.merchants);
        item.name = this.user.merchants[0].contact_user;
        item.name_bot = this.user.merchants[0].merchant_name;
      });
    },
    active(index, item) {
      // console.log(item);
      this.ind = index;
      this.srcContent.src = item.src;
      this.srcContent.name = item.name;
      // this.srcContent.title = item.src;
    },
    openDialog(formName) {
      //查询企业类型
      let new_form = {
        creditCode: "", //统一社会信用代码
        companyName: "", //企业名称
        delegate: "", //法人代表
        address: "", //详细地址
        edition: "", //企业类型
        id: this.id //企业id
      };
      this.form = new_form;
      this.systemDialog = !this.systemDialog;
      // this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.form);
          this.$http
            .post(this.api + "/merchant/apply", {
              id: this.id,
              socialCode: this.form.creditCode,
              merchantName: this.form.companyName,
              address: this.form.address,
              merchantTypeId: this.form.edition,
              representative: this.form.delegate
            })
            .then(res => {
              if (res.status == "200") {
                console.log("申请开通企业权限: " + res.data.message);
              } else if (res.data.status == "403") {
                alert(res.data.message);
              }
            })
            .catch(ero => {
              console.log(ero);
            });
          this.systemDialog = !this.systemDialog;
        } else {
          this.$refs[formName].resetFields();
          return false;
        }
      });
    }
  }
};
</script>
