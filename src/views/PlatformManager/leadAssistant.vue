<template>
  <section>
    <!-- 这是领头助手页面 -->
    <div>
      <el-row class="customerMang">
        <el-col :span="6">
          <div class="grid-content bg-purple-dark">
            <el-input placeholder="" icon="search" v-model="input2" :on-icon-click="handleIconClick">
            </el-input>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
        <el-col :span="8" class="searchIpt">
          <div class="grid-content bg-purple-dark">
            <el-button @click="addLeaderAssistantForm(1)" class="searchIpt" type="primary">添加</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 添加领头助手 Dialog Start-->
      <el-dialog title="添加人员" :visible.sync="leaderAssistantFormDialog" :close-on-click-modal="false">
        <el-form :model="leadFormData" :label-position="leaderAssistantFormDialog_align">
          <el-row :gutter="20">
            <!-- <el-col :span="24" class="formTitle">基本信息</el-col> -->
            <el-col :span="8">
              <el-form-item label="项目名称" prop="projectName" :label-width="formLabelWidth">
                <el-input placeholder="" v-model="leadFormData.projectName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行业" prop="industry" :label-width="formLabelWidth">
                <el-input placeholder="" v-model="leadFormData.industry"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="轮次" prop="rounds" :label-width="formLabelWidth">
                <el-input placeholder="" v-model="leadFormData.rounds"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="上轮获投" prop="lastCast" :label-width="formLabelWidth">
                <el-input placeholder="" v-model="leadFormData.lastCast"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24" class="formTitle">个人信息</el-col> -->
            <el-col :span="8">
              <el-form-item label="所在地" prop="location" :label-width="formLabelWidth">
                <el-input placeholder="" v-model="leadFormData.location"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成立时间" prop="established" :label-width="formLabelWidth">
                <el-input placeholder="" v-model="leadFormData.established"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 项目介绍 Form Start -->
        </el-form>
        <el-form :model="projectIntroduction" ref="projectIntroduction" :label-position="leaderAssistantFormDialog_align">
          <el-row :gutter="20">
            <el-col :span="24" class="subscriber">项目介绍</el-col>
            <el-col :span="24">
              <el-form-item porp="oerview" label="概述" :label-width="formLabelWidth">
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="projectIntroduction.oerview">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item porp="detailedDescription" label="详细介绍" :label-width="formLabelWidth">
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="projectIntroduction.detailedDescription">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item porp="productService" label="产品服务" :label-width="formLabelWidth">
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="projectIntroduction.productService">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item porp="userMarket" label="用户市场" :label-width="formLabelWidth">
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="projectIntroduction.userMarket">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item porp="businessModel" label="商业模式" :label-width="formLabelWidth">
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="projectIntroduction.businessModel">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item porp="operationalData" label="运营数据" :label-width="formLabelWidth">
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="projectIntroduction.operationalData">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item porp="businessProposal" label="商业计划书" :label-width="formLabelWidth">
                <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或
                    <em>点击上传</em>
                  </div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 项目介绍 Form End -->
        <!-- 融资经历 Tab start -->
        <el-row :gutter="20">
          <!-- <el-col :span="24" class="formTitle">基本信息</el-col> -->
          <el-col :span="24" class="subscriber">
            融资经历
            <el-button @click="addLeaderAssistantForm(2)" size="small" type="primary">添加</el-button>
          </el-col>
          <el-col :span="24">
            <el-table align="center" :data="financingExperienceTab" ref="financingExperienceTab" border style="width: 100%">
              <el-table-column prop="date" label="时间" align="center">
              </el-table-column>
              <el-table-column prop="rounds" label="轮次" align="center">
              </el-table-column>
              <el-table-column prop="AmountFinan" label="融资金额" align="center">
              </el-table-column>
              <el-table-column prop="investor" label="投资方" align="center">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- 融资经历 Tab End -->
        <!-- 创始团队 Tab Start -->
        <el-row :gutter="20">
          <!-- <el-col :span="24" class="formTitle">基本信息</el-col> -->
          <el-col :span="24" class="subscriber">
            <div>创始团队</div>
            <el-button @click="addLeaderAssistantForm(3)" size="small" type="primary">添加</el-button>
          </el-col>
          <!-- <el-row style="padding:13px;"> -->
          <el-col :span="2">
            <div style="margin-top:5px;">团队优势</div>
          </el-col>
          <el-col :span="22">
            <div>
              <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea2">
              </el-input>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="teamMember">
              <div class="fl">团队成员</div>
              <div class="fl" v-for="(item, index) in teamListTab" :key="item.name">
                <span>{{item.name}}</span>
              </div>
            </div>
          </el-col>
          <!-- </el-row> -->
          <el-col :span="24">
            <el-table align="center" :data="teamListTab" ref="teamListTab" border style="width: 100%">
              <el-table-column prop="name" label="姓名" align="center">
              </el-table-column>
              <el-table-column prop="position" label="职位" align="center">
              </el-table-column>
              <el-table-column prop="introduction" label="介绍" align="center">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- 创始团队 Tab End -->
        <!-- 工商信息 Form Start -->
        <el-form style="margin-top: 15px;" :model="businessInformationList" ref="BusinessInformationList" :label-position="leaderAssistantFormDialog_align">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="公司名称" porp="name" :label-width="formLabelWidth">
                <el-input v-model="businessInformationList.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司类型" porp="type" :label-width="formLabelWidth">
                <el-input v-model="businessInformationList.type" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="成立日期" porp="startDate" :label-width="formLabelWidth">
                <el-input v-model="businessInformationList.startDate" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="注册资本" porp="registered" :label-width="formLabelWidth">
                <el-input v-model="businessInformationList.registered" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法人代表" porp="representative" :label-width="formLabelWidth">
                <el-input v-model="businessInformationList.representative" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="经营状态" porp="operatingStart" :label-width="formLabelWidth">
                <el-input v-model="businessInformationList.operatingStart" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登记机关" porp="registration" :label-width="formLabelWidth">
                <el-input v-model="businessInformationList.registration" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="注册地址" porp="registraAddress" :label-width="formLabelWidth">
                <el-input v-model="businessInformationList.registraAddress" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 工商信息 Form End -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="leaderAssistantFormDialog = false">取 消</el-button>
          <el-button type="primary" @click="leaderAssistantFormSaveBtn(1)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加领头助手 Dialog End-->
      <!-- 添加融资经历 Dialog Start -->
      <el-dialog title="添加" :visible.sync="financingDialogFormVisible">
        <el-form :model="financingExperienceForm" ref="financingExperienceForm" :label-position="leaderAssistantFormDialog_align">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="时间" porp="date" :label-width="formLabelWidth">
                <el-input v-model="financingExperienceForm.date" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="轮次" porp="rounds" :label-width="formLabelWidth">
                <el-input v-model="financingExperienceForm.rounds" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="融资金额" porp="AmountFinan" :label-width="formLabelWidth">
                <el-input v-model="financingExperienceForm.AmountFinan" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="投资方" porp="investor" :label-width="formLabelWidth">
                <el-input v-model="financingExperienceForm.investor" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="financingDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="leaderAssistantFormSaveBtn(2)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加融资经历 Dialog End -->
      <!-- 团队成员 Dialog Start -->
      <el-dialog title="添加" :visible.sync="AddTeamDialogFormVisible">
        <el-form :model="teamListForm" ref="teamListForm" :label-position="leaderAssistantFormDialog_align">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="姓名" porp="name" :label-width="formLabelWidth">
                <el-input v-model="teamListForm.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职位" porp="position" :label-width="formLabelWidth">
                <el-input v-model="teamListForm.position" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="介绍" porp="introduction" :label-width="formLabelWidth">
                <el-input v-model="teamListForm.introduction" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="AddTeamDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="leaderAssistantFormSaveBtn(3)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 团队成员 Dialig Eng -->
      <el-table :data="leadTabData" border style="width: 100%">
        <el-table-column :fixed="left" prop="projectName" label="项目名称" width="220" align="center">
        </el-table-column>
        <el-table-column prop="industry" label="行业" width="200" align="center">
        </el-table-column>
        <el-table-column prop="rounds" label="轮次" width="200" align="center">
        </el-table-column>
        <el-table-column prop="lastCast" label="上轮获投" width="200" align="center">
        </el-table-column>
        <el-table-column prop="location" label="所在地" width="200" align="center">
        </el-table-column>
        <el-table-column prop="established" label="成立时间" width="200" align="center">
        </el-table-column>
        <!-- <el-table-column prop="numberAdditions" label="加入次数" width="150" align="center">
        </el-table-column> -->
        <el-table-column prop="status" label="状态" width="200" align="center">
        </el-table-column>
        <!-- <el-table-column prop="sharesNumber" label="分享次数" width="150" align="center">
        </el-table-column> -->
        <el-table-column :fixed="right" label="操作" width="250" align="center">
          <template scope="scope">
            <el-button @click="hideRow(scope.$index,scope.row)" type="primary" size="small">隐 藏</el-button>
            <el-button @click="showRow(scope.$index,scope.row)" type="primary" size="small">显 示</el-button>
            <el-button @click.native.prevent="removeRow(scope.$index, leadTabData)" type="primary" size="small">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      leadTabData: [], //Tab
      leadFormData: { //基本信息
        projectName: '', //项目名称
        industry: '', //行业
        rounds: '', //轮次
        lastCast: '', //上轮获投
        location: '', //所在地
        established: '', //成立时间
        numberAdditions: '', //加入次数
        status: '显示', //状态
        sharesNumber: '', //分享次数

      },
      projectIntroduction: { //项目介绍
        oerview: "", //概述
        detailedDescription: "", //详细介绍
        productService: "", //产品服务
        userMarket: "", //用户市场
        businessModel: "", //商业模式
        operationalData: "", //运营数据
        businessProposal: "", //商业计划书
      },
      financingExperienceTab: [], //融资经历 Tab
      financingExperienceForm: { //融资经历 Form
        date: "", //时间
        rounds: "", //轮次
        AmountFinan: "", //融资金额
        investor: "", //投资方
      },
      teamListTab: [], //团队成员 Tab
      teamListForm: { //团队成员 Form
        name: "", //姓名
        position: "", //职位
        introduction: "" //介绍
      },
      businessInformationList:{ //工商信息 Form
        name: "", //公司名称
        type: "", //公司类型
        startDate: "", //成立日期
        registered: "", //注册资本
        representative: "", //法人代表
        operatingStart: "", //经营状态
        registration: "", //登记机关
        registraAddress: "", //注册地址
      },
      leaderAssistantFormDialog: false, //添加人员 Dialog
      financingDialogFormVisible: false, //添加融资经历 Dialog
      AddTeamDialogFormVisible: false, //添加团队成员 Dialog
      leaderAssistantFormDialog_align: 'left',
      formLabelWidth: '120px',
    }
  },
  methods: {
    addLeaderAssistantForm(n) { //添加
      // alert(n);
      if (n == 1) {
        // alert(1);
        this.leaderAssistantFormDialog = !this.leaderAssistantFormDialog;
      } else if (n == 2) {
        // alert(2);
        let new_financingExperienceForm = {
          date: "", //时间
          rounds: "", //轮次
          AmountFinan: "", //融资金额
          investor: "", //投资方
        };
        this.financingExperienceForm = new_financingExperienceForm;
        this.financingDialogFormVisible = !this.financingDialogFormVisible;
      } else if (n == 3) {
        // alert(n);
        let new_teamListForm = {
          name: "", //姓名
          position: "", //职位
          introduction: "" //介绍
        };
        this.teamListForm = new_teamListForm;
        this.AddTeamDialogFormVisible = !this.AddTeamDialogFormVisible;
      }
    },
    leaderAssistantFormSaveBtn(n) { //确定
      if (n == 1) {
        // alert(1);
        this.leadTabData.push(this.leadFormData);
        this.leaderAssistantFormDialog = !this.leaderAssistantFormDialog;
        this.leadFormData = {};
      } else if (n == 2) {
        // alert(2);
        this.financingExperienceTab.push(this.financingExperienceForm);
        this.financingDialogFormVisible = !this.financingDialogFormVisible;
        this.financingExperienceForm = {};
      } else if (n == 3) {
        // alert(n);
        this.teamListTab.push(this.teamListForm);
        this.AddTeamDialogFormVisible = !this.AddTeamDialogFormVisible;
        this.teamListForm = {};
      }
    },
    hideRow(index,row){
      row.status = '隐藏';
    },
    showRow(index,row){
      row.status = '显示';
    },
    removeRow(index, rows){
      rows.splice(index, 1);
    },
  }
}
</script>

<style lang="less" scoped>
section {
  >div {
    background: #ffffff;
    padding: 24px;
    overflow: hidden;
    .customerMang {
      margin-bottom: 10px;
    }
    .searchIpt_left {
      float: left;
    }
    .searchIpt {
      float: right;
    }
    .subscriber {
      position: relative;
      width: 100%;
      height: 42px;
      line-height: 42px;
      background: #eef1f6;
      margin: 12px 0;
      overflow: hidden;
      >div:nth-child(1) {
        float: left;
      }
      button {
        position: absolute;
        right: 5px;
        margin-top: 7px;
        overflow: hidden;
      }
    }
  }
  .teamMember {
    overflow: hidden;
    margin: 10px 0;
    >div {
      float: left;
    }
    >div:nth-child(1) {
      margin-right: 20px;
    }
    div {
      span {

        margin-right: 10px;
      }
    }
  }
}
</style>
