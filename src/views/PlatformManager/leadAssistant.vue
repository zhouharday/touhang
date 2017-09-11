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
        <!-- 融资经历 Form start -->
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
        <!-- 融资经历 Form End -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="leaderAssistantFormDialog = false">取 消</el-button>
          <el-button type="primary" @click="leaderAssistantFormDialog = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加领头助手 Dialog End-->
      <!-- 添加融资经历 Dialog Start -->
      <el-dialog title="添加" :visible.sync="financingDialogFormVisible">
        <el-form :model="financingExperienceForm" ref="financingExperienceForm" :label-position="leaderAssistantFormDialog_align">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="时间" porp="date" :label-width="formLabelWidth">
                <el-input v-model="financingExperienceForm.date" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="轮次" porp="rounds" :label-width="formLabelWidth">
                <el-input v-model="financingExperienceForm.rounds" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资金额" porp="AmountFinan" :label-width="formLabelWidth">
                <el-input v-model="financingExperienceForm.AmountFinan" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="投资方" porp="investor" :label-width="formLabelWidth">
                <el-input v-model="financingExperienceForm.investor" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="financingDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="financingDialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加融资经历 Dialog End -->
      <el-table :data="leadTabData" border style="width: 100%">
        <el-table-column :fixed="left" prop="projectName" label="项目名称" width="220" align="center">
        </el-table-column>
        <el-table-column prop="industry" label="行业" width="150" align="center">
        </el-table-column>
        <el-table-column prop="rounds" label="轮次" width="150" align="center">
        </el-table-column>
        <el-table-column prop="lastCast" label="上轮获投" width="150" align="center">
        </el-table-column>
        <el-table-column prop="location" label="所在地" width="150" align="center">
        </el-table-column>
        <el-table-column prop="established" label="成立时间" width="150" align="center">
        </el-table-column>
        <el-table-column prop="numberAdditions" label="加入次数" width="150" align="center">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="150" align="center">
        </el-table-column>
        <el-table-column prop="sharesNumber" label="分享次数" width="150" align="center">
        </el-table-column>
        <el-table-column :fixed="right" label="操作" width="250" align="center">
          <template scope="scope">
            <el-button @click="hide" type="primary" size="small">隐 藏</el-button>
            <el-button @click="show" type="primary" size="small">显 示</el-button>
            <el-button @click="remove" type="primary" size="small">删 除</el-button>
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
      leadTabData: [
        {
          projectName: '鹿战', //项目名称
          industry: '', //行业
          rounds: '', //轮次
          lastCast: '', //上轮获投
          location: '', //所在地
          established: '', //成立时间
          numberAdditions: '', //加入次数
          status: '显示', //状态
          sharesNumber: '', //分享次数
        },
      ],
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
      financingExperienceTab: [ //融资经历
        {
          date: "", //时间
          rounds: "", //轮次
          AmountFinan: "", //融资金额
          investor: "", //投资方
        }
      ],
      financingExperienceForm: {
        date: "", //时间
        rounds: "", //轮次
        AmountFinan: "", //融资金额
        investor: "", //投资方
      },
      leaderAssistantFormDialog: false,
      financingDialogFormVisible: false,
      leaderAssistantFormDialog_align: 'left',
      formLabelWidth: '120px',
    }
  },
  methods: {
    addLeaderAssistantForm(n) {
      if (n == 1) {
        // this.leaderAssistantFormDialog = true;
        this.leaderAssistantFormDialog = !this.leaderAssistantFormDialog;
      } else if (n == 2) {
        // this.financingDialogFormVisible = true;
      this.financingDialogFormVisible = !this.financingDialogFormVisible;
      }
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
      width: 100%;
      height: 42px;
      line-height: 42px;
      background: #eef1f6;
      margin-bottom: 12px;
      button {
        float: right;
        margin-top: 7px;
      }
    }
  }
}
</style>
