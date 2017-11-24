<template>
    <div class="addProject">
        <div class="addProjectContents">
            <section class="editAddProject">
                <h3>新增项目</h3>
                <div class="addForm">
                    <div class="basicForm">
                        <div class="title">
                            <div>基本信息</div>
                        </div>
                        <el-form ref="basicForm" :rules="rules1" :model="basicForm" label-position="left" label-width="100px">
                            <el-row :gutter="15">
                                <el-col :span="12">
                                    <el-form-item label="项目名称" prop="projectName">
                                        <el-input v-model="basicForm.projectName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目简称" prop="projectShortName">
                                        <el-input v-model="basicForm.projectShortName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目类型" prop="projectTypeId">
                                        <el-select v-model="basicForm.projectTypeId" filterable placeholder="请选择项目类型" style="width:100%">
                                            <el-option v-for="item in $store.state.project.typeOptions" :key="item.id" :label="item.dicName" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="所属行业" prop="industryId">
                                        <el-select v-model="basicForm.industryId" filterable placeholder="请选择所属行业" style="width:100%">
                                            <el-option v-for="item in $store.state.project.industryOptions" :key="item.id" :label="item.dicName" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目来源" prop="projectFromId">
                                        <el-select v-model="basicForm.projectFromId" filterable placeholder="请选择项目来源" style="width:100%">
                                            <el-option v-for="item in $store.state.project.fromOptions" :key="item.id" :label="item.dicName" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="所在地" prop="addressId">
                                        <el-select v-model="basicForm.addressId" filterable placeholder="请选择所在地" style="width:100%" :disabled="basicForm.flag">
                                            <el-option v-for="item in $store.state.project.addressOptions" :key="item.id" :label="item.dicName" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="业务部门" prop="departmentId">
                                        <el-select v-model="basicForm.departmentId" filterable placeholder="请选择业务部门" style="width:100%">
                                            <el-option v-for="item in $store.state.project.departmentOptions" :key="item.id" :label="item.deptName" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <!-- 上传 企业LOGO -->
                                <el-col>
                                    <el-form-item label="企业LOGO" prop="projectLogo">
                                        <img v-if="basicForm.projectLogo" :src="basicForm.projectLogo" style="width: 58px;height:58px;line-height: 58px;">
                                        <el-button type="small" @click="getFile($event)">点击选择文件</el-button>
                                        <input type="file" accept="image/png,image/gif,image/jpg,image/jpeg" style="display:none" @change="changeImage($event)" ref="avatarInput">
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="companyForm">
                        <div class="title">
                            <div>企业信息</div>
                        </div>
                        <el-form ref="form" :model="companyForm" label-position="left" label-width="120px">
                            <el-row :gutter="15">
                                <el-col :span="12">
                                    <el-form-item label="企业名称" prop="enterpriseName">
                                        <el-input v-model="companyForm.enterpriseName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="法人代表" prop="legalPerson">
                                        <el-input v-model="companyForm.legalPerson"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="注册资本（元）" prop="registeredCapital">
                                        <el-input v-model="companyForm.registeredCapital"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="实收资本（元）" prop="paiclCapital">
                                        <el-input v-model="companyForm.paiclCapital"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="注册登记日期" prop="registerDate">
                                        <el-date-picker type="date" v-model="companyForm.registerDate" style="width:100%">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="统一信用代码" prop="creditCode">
                                        <el-input v-model="companyForm.creditCode"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="注册地址" prop="registerAddress">
                                        <el-input v-model="companyForm.registerAddress"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="办公地址" prop="workAddress">
                                        <el-input v-model="companyForm.workAddress"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="主营业务" prop="mainBusiness">
                                        <el-input v-model="companyForm.mainBusiness"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="备注" prop="remark">
                                        <el-input v-model="companyForm.remark"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="formBtn">
                        <el-row>
                            <el-col style="display:flex;justify-content:flex-end;">
                                <el-button type="danger" size="small" @click="submitForm('basicForm')">保存</el-button>
                                <el-button type="default" size="small" @click="cancleForm">取消</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addPro, getDeptListByMid } from "api/project";
import { getDicChildren } from "common/js/dictionary";
import { Loading } from "element-ui";
const store = {
  isSubmit: false
};
export default {
  name: "addProject",
  computed: mapGetters({
    typeOptions: "getTypeOptions", // 获取项目类型
    industryOptions: "getIndustryOptions", // 获取项目所属行业
    fromOptions: "getFromOptions", // 获取项目来源
    addressOptions: "getAddressOptions", // 获取项目所在地
    departmentOptions: "getDepartmentOptions" // 获取业务部门
  }),
  watch: {},
  data() {
    return {
      dataNum: 3,
      basicForm: {
        projectName: "",
        projectShortName: "",
        projectTypeId: "",
        industryId: "",
        projectFromId: "",
        addressId: "",
        departmentId: "",
        projectLogo: ""
      },
      companyForm: {
        enterpriseName: "",
        legalPerson: "",
        registeredCapital: "",
        paiclCapital: "",
        registerDate: "",
        creditCode: "",
        registerAddress: "",
        workAddress: "",
        mainBusiness: "",
        remark: ""
      },
      addressOptions: [],
      typeOptions: [],
      industryOptions: [],
      fromOptions: [],
      departmentOptions: [],
      // 基本信息 form验证
      rules1: {
        projectName: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        projectShortName: [
          { required: true, message: "请输入项目简称", trigger: "blur" }
        ],
        projectTypeId: [
          { required: true, message: "请输入项目类型", trigger: "blur" }
        ],
        industryId: [{ required: true, message: "请选择所属行业", trigger: "blur" }],
        addressId: [{ required: true, message: "请选择所在地", trigger: "blur" }]
      },
      // 上传 企业LOGO
      defaultList: [
        // {
        //     'name': 'bc7521e033abdd1e92222d733590f104',
        //     'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        // },
        {
          name: "",
          url: ""
        }
      ],
      imgName: "",
      visible: false,
      uploadList: [],
      uploadInfo: {
        files: []
      },
      file: ""
    };
  },
  created() {
    this.$store.dispatch("getTypeOptions");
    this.$store.dispatch("getIndustryOptions");
    this.$store.dispatch("getFromOptions");
    this.$store.dispatch("getAddressOptions");
    this.$store.dispatch("getDepartmentOptions");
    this.init();
  },
  methods: {
    ...mapActions([
      "getTypeOptions",
      "getIndustryOptions",
      "getFromOptions",
      "getAddressOptions",
      "getDepartmentOptions"
    ]),
    init() {
      this.initInfo();
    },
    initInfo() {
      let merchants = JSON.parse(
        window.sessionStorage.getItem("merchants") || "[]"
      );
      let info = JSON.parse(sessionStorage.getItem("userInfor") || "{}");
      this.merchantId = merchants[0].id;
      this.addProjectUserId = info.id;
    },
    getFile(event) {
      //点击上传文件图像
      this.$refs.avatarInput.click();
    },
    changeImage(e) {
      //上传文件input
      this.file = e.target.files[0];
      this.onSubmit(e);
    },
    onSubmit(event) {
      //提交上传文件到服务器
      let loadingInstance = Loading.service({ fullscreen: true });
      event.preventDefault();
      let formData = new FormData();
      formData.append("files", this.$refs.avatarInput.files[0]);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      this.$http
        .post(this.api + "/files/upload", formData, config)
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              this.basicForm.projectLogo = res.data.filePath;
              loadingInstance.close();
            } else if (res.data.status == "403") {
              this.$Message.error(res.data.message);
              loadingInstance.close();
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
          loadingInstance.close();
        });
    },
    submitForm(formName) {
      console.log("this.basicForm" + this.basicForm.projectLogo);
      let basicForm = this.basicForm;
      let companyForm = this.companyForm;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (store.isSubmit) return;
          store.isSubmit = true;
          addPro({
            basicForm: basicForm,
            companyForm: companyForm
          })
            .then(resp => {
              if (resp.data.status == "200") {
                (this.basicForm = {
                  projectName: "",
                  projectShortName: "",
                  projectTypeId: "",
                  industryId: "",
                  projectFromId: "",
                  addressId: "",
                  departmentId: "",
                  projectLogo: ""
                }),
                  (this.companyForm = {
                    enterpriseName: "",
                    legalPerson: "",
                    registeredCapital: "",
                    paiclCapital: "",
                    registerDate: "",
                    creditCode: "",
                    registerAddress: "",
                    workAddress: "",
                    mainBusiness: "",
                    remark: ""
                  }),
                  this.addTab("项目池", "/home/projectPool", "projectPool");
                this.$router.push({ name: "projectPool" });
              }else{
                this.$Message.error(resp.data.message);
              }
              store.isSubmit = false;
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancleForm() {
      this.isShow = true;
      this.isHide = false;
    },
    addTab(th, url, name) {
      this.$store.commit({ type: "addTab", title: th, url: url, name: name });
    }
  }
};
</script>

<style lang="less" scoped>
.addProject {
  min-height: 100%;
  .addProjectContents {
    width: 100%; // height: 800px;
    padding: 20px;
    font-size: 14px;
    background: #fff;
    h3 {
      margin-bottom: 20px;
    }
    .editAddProject {
      .title {
        width: 100%;
        height: 42px;
        line-height: 42px;
        background: #2a3142;
        color: #fff;
        padding: 0 26px;
        margin-bottom: 12px;
      }
    } //  上传 企业LOGO 的样式设置
    .demo-upload-list {
      display: inline-block;
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
      margin-right: 4px;
    }
    .demo-upload-list img {
      width: 100%;
      height: 100%;
    }
    .demo-upload-list-cover {
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover {
      display: block;
    }
    .demo-upload-list-cover i {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
    }
  }
}
</style>
