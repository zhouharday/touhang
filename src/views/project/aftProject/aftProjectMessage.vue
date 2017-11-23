<template>
  <div class="aftProjectMessage">
    <div class="title">
      <div class="left">
        <span class="desc">{{title}}</span>
      </div>
    </div>
    <div class="firstLayer">
      <el-row :gutter="40">
        <el-col :span="12">
          <div class="tableTitle">出资主体</div>
          <el-table :data="fundTable" style="width:100%;overflow:hidden;" :row-class-name="tableRowClassName">
            <el-table-column prop="fundName" label="基金名称" align="center">
            </el-table-column>
            <el-table-column prop="investAmount" label="投资金额（元）" align="center">
              <template scope="scope">{{scope.row.investAmount | toMoney}}</template>
            </el-table-column>
            <el-table-column prop="stockRatio" label="股权占比（%）" align="center">
            </el-table-column>
            <el-table-column prop="sumPayAmount" label="支付金额（元）" align="center">
              <template scope="scope">{{scope.row.sumPayAmount | toMoney}}</template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <my-echarts class="chart" :opinion="opinion" :opinionData="opinionData"></my-echarts>
        </el-col>
      </el-row>
    </div>
    <div class="secondLayer">
      <el-row :gutter="40">
        <el-col :span="12">
          <table-show :data="tableData"></table-show>
        </el-col>
        <el-col :span="12">
          <div class="prompt_message">
            <span class="prompt">{{prompt}}</span>
            <div class="item_wrapper">
              <div class="item" v-for="(item, index) in message" :key="item.index">
                <span class="count">{{index + 1}}</span>
                <p class="desc">{{item.message}}</p>
                <!-- <el-button type="text" :disabled=item.state :class="{ complete:item.state === true,state:item.state === false}" @click="modalAlarm=true">
                                          {{item.info}}
                                      </el-button> -->
              </div>
            </div>
            <Page class="page" show-sizer="true" :page-size="pageSize" :current="page" :total="total" simple @on-change="getWarning"></Page>
            <div class="img_wrapper">
              <img src="/static/img/double-02.png">
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane :disabled="!checkProjectAuth('XM-xiangqing')" label="详情" name="details" class="tab_list">
          <detail-form :isInTeam="isInTeam" :basicForm="basicForm" :companyForm="companyForm" :capitalForm="capitalForm">
          </detail-form>
          <table-form :isInTeam="isInTeam" :memberData="memberData" :structureData="structureData"></table-form>
        </el-tab-pane>
        <el-tab-pane :disabled="!checkProjectAuth('XM-shenpi')" label="审批" name="approve" class="tab_list">
          <approve-table :isInTeam="isInTeam" :projectId="projectId" :tabs="tabs"></approve-table>
        </el-tab-pane>
        <el-tab-pane :disabled="!checkProjectAuth('XM-wendang')" label="文档" name="file" class="tab_list">
          <file-table :isInTeam="isInTeam" :tabs="tabs" :projectId="projectId"></file-table>
        </el-tab-pane>
        <el-tab-pane :disabled="!checkProjectAuth('XM-guanli')" label="管理" name="manage" class="tab_list">
          <manage-table :isInTeam="isInTeam" :tabs="tabs" :proId="projectId"></manage-table>
        </el-tab-pane>
        <el-tab-pane :disabled="!checkProjectAuth('XM-jilu')" label="记录" name="record" class="tab_list">
          <record-form :isInTeam="isInTeam" :tabs="tabs" :projectId="projectId"></record-form>
        </el-tab-pane>
        <el-tab-pane :disabled="!checkProjectAuth('XM-fengxianguanli')" label="风险管理" name="risk" class="tab_list">
          <risk-table :isInTeam="isInTeam" :tabs="tabs" :projectId="projectId" :proUsers="proUsers"></risk-table>
        </el-tab-pane>
        <el-tab-pane :disabled="!checkProjectAuth('XM-zhongdashixiang')" label="重大事项" name="event" class="tab_list">
          <event-table :isInTeam="isInTeam" :tabs="tabs" :projectId="projectId"></event-table>
        </el-tab-pane>
        <el-tab-pane :disabled="!checkProjectAuth('XM-shujutianbao')" label="数据填报" name="data" class="tab_list">
          <data-table :isInTeam="isInTeam" :tabs="tabs" :projectId="projectId"></data-table>
        </el-tab-pane>
        <el-tab-pane :disabled="!checkProjectAuth('XM-jiankongshezhi')" label="监控设置" name="monitor" class="tab_list">
          <monitor-table :isInTeam="isInTeam" :tabs="tabs" :projectId="projectId"></monitor-table>
        </el-tab-pane>
        <el-tab-pane label="日志" name="log" class="tab_list">
          <log-table ref="logTab" :typeId="projectId" :type="type"></log-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import "common/js/filter";
import tableShow from "../../../components/tableShow";
import myEcharts from "../../../components/myEcharts";
import detailForm from "./details";
import tableForm from "./tables";
import approveTable from "./approve";
import recordForm from "./record";
import fileTable from "./file";
import manageTable from "./manage";
import riskTable from "./risk";
import eventTable from "./event";
import dataTable from "./data";
import monitorTable from "./monitor";
import logTable from "components/log";
import { getProjectUsers } from "api/projectSys";
import { getTeams, getPreDetail } from "api/projectPre";
import { checkProjectAuth, changeDate } from "common/js/config";
import {
  getWarnMessageList,
  getInvestSubject,
  getAppraisementRep,
  getAppraisementDetails
} from "api/projectAfter";

export default {
  components: {
    myEcharts,
    tableShow,
    detailForm,
    tableForm,
    approveTable,
    recordForm,
    fileTable,
    manageTable,
    riskTable,
    eventTable,
    dataTable,
    monitorTable,
    logTable
  },
  data() {
    return {
      type: 1,
      opinion: [],
      opinionData: [],
      projectId: "",
      investProjectId: "",
      title: "",
      prompt: "任务助手小双温馨提示:",
      page: 1,
      pageSize: 5,
      total: 0,
      activeName: "details",
      proUsers: [], // 项目用户列表
      message: [],
      tableData: {},
      tabs: {
        tabList: [
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ]
      },
      basicForm: {}, // 基本信息
      companyForm: {}, // 企业信息
      memberData: [], // 董事会成员
      structureData: [], // 股权结构
      // 风险预警 立即处理表单
      alarmForm: {
        result: "",
        content: "",
        appendix: ""
      },
      isInTeam: false,
      log: false
    };
  },
  created() {
    this.investProjectId = this.$route.params.investProjectId;
    this.projectId = this.$route.params.projectId;
    this.$store.dispatch({
        type: "getPermissionButton",
        this: this,
        typeId: this.$route.params.investProjectId
    });
    this.init();

  },
  watch: {
    $route(to, from) {
      this.investProjectId = this.$route.params.investProjectId;
      this.projectId = this.$route.params.projectId;
      if (to.name == "aftProjectMessage") {
        this.init(); //再次调起我要执行的函数
      }
    }
  },
  methods: {
    checkProjectAuth(code) {
      return checkProjectAuth(code) && this.isInTeam;
    },
    init() {
      this.initInfo();
      this.initData();
    },
    handleClick(val) {
      let idx = val.index;
      let _tabList = this.tabs.tabList;
      if (!_tabList[idx]) {
        for (var i = 0; i < _tabList.length; i++) {
          if (i == idx) {
            _tabList[i] = true;
          } else {
            _tabList[i] = false;
          }
        }
        let _tabs = { tabList: _tabList };
        this.tabs = _tabs;
      }
      if (this.activeName == "log") {
        this.$refs.logTab.initLog();
      }
    },
    initInfo() {
      let merchants = JSON.parse(
        window.sessionStorage.getItem("merchants") || "[]"
      );
      this.merchantId = merchants[0].id;
      this.checkTeamUser();
      this.getWarnMessageList();
      this.getInvestSubject();
      this.getAppraisementRep();
      this.getAppraisementDetails();
      this.getProUsers();
    },
    checkTeamUser() {
      getTeams(this.investProjectId)
        .then(resp => {
          this.teamData = resp.data.result;
          if (resp.data.result == null || resp.data.result.length == 0) {
            this.isInTeam = false;
          } else {
            let userId = JSON.parse(sessionStorage.getItem("userInfor")).id;
            let _isInTeam = false;
            resp.data.result.forEach(item => {
              if (item.userId == userId) {
                _isInTeam = true;
                return;
              }
            });
            this.isInTeam = _isInTeam;
          }
          console.log("登录人是否在团队:" + this.isInTeam);
        })
        .catch(e => {
          console.log("checkTeamUser error: ", e);
        });
    },
    /**
         * [getProUsers 获取项目用户列表]
         * @return {[type]} [description]
         */
    getProUsers() {
      getProjectUsers({
        merchantId: this.merchantId
      })
        .then(resp => {
          let data = resp.data;
          if (data.status == "200") {
            this.proUsers = data.result;
          }
        })
        .catch(e => {
          console.log("getProjectUsers() exists error: ", e);
        });
    },
    initData() {
      getPreDetail(this.projectId)
        .then(resp => {
          if (
            resp.data.result.enterpriseInfo == undefined ||
            resp.data.result.enterpriseInfo == ""
          ) {
            console.log(
              "项目详情-企业信息为空: " + JSON.stringify(resp.data.result.enterpriseInfo)
            );
          } else {
            this.companyForm = Object.assign(
              {},
              {
                baseInfo: "企业信息",
                flag: true
              },
              resp.data.result.enterpriseInfo
            );
          }

          this.basicForm = Object.assign(
            {},
            {
              baseInfo: "基本信息",
              flag: true
            },
            resp.data.result.projectInfo
          );

          this.capitalForm = Object.assign(
            {},
            {
              baseInfo: "投资信息",
              flag: true
            },
            resp.data.result.projectInvestmentInfo
          );
          this.memberData = resp.data.result.listBoardMember;
          this.structureData = resp.data.result.listOwnershipStructure;
          this.title = resp.data.result.projectInfo.projectName;
        })
        .catch(e => {});
    },
    //获取预警提醒
    getWarnMessageList() {
      getWarnMessageList(
        this.projectId,
        this.page,
        this.pageSize
      ).then(resp => {
        // console.log("获取预警提醒: "+ JSON.stringify(resp.data));
        if (resp.data.status == "200") {
          this.message = resp.data.result.list;
          this.total = resp.data.result.total;
        } else if (resp.data.status === "49999") {
          this.message = [];
          this.total = 0;
        } else {
          this.$message.error(resp.data.message);
        }
      });
    },
    //获取投资主体
    getInvestSubject() {
      getInvestSubject(this.projectId).then(resp => {
        if (resp.data.status == "200") {
          this.fundTable = resp.data.result;
        } else if (resp.data.status === "49999") {
          this.fundTable = [];
        } else {
          this.$message.error(resp.data.message);
        }
      });
    },
    //获取投后项目的估值信息
    getAppraisementRep() {
      getAppraisementRep(this.projectId).then(resp => {
        if (resp.data.status == "200") {
          this.tableData = resp.data.appraisement;
        } else {
          this.$message.error(resp.data.message);
        }
      });
    },
    getAppraisementDetails() {
      getAppraisementDetails(this.projectId).then(resp => {
        if (resp.data.status == "200") {
          let _opinion = [];
          let _opinionData = [];
          let dataList = resp.data.result;
          console.log(resp.data.result);
          dataList.forEach(item => {
            let ind = item.appraisementDate.indexOf(" ");
            item.appraisementDate = item.appraisementDate.substr(0, ind);
            _opinion.push(item.appraisementDate);
            _opinionData.push(item.appraisementValue);
          });
          this.opinion = _opinion;
          this.opinionData = _opinionData;
        } else {
          this.$message.error(resp.data.message);
        }
      });
    },
    disable(name) {
      if (name.flag === false) {
        return (name.flag = true);
      } else {
        return (name.flag = false);
      }
    },
    // 设置 出资主体table  间隔行的background-color
    tableRowClassName(row, index) {
      if (index % 2 == 0) {
        return "info-row";
      } else {
        return "positive-row";
      }
      return "";
    },
    getWarning(page) {
      this.page = page;
      this.getWarnMessageList();
    }
  }
};
</script>    




<style lang="less" scoped>
.aftProjectMessage {
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  padding: 24px;
  .title {
    width: 100%;
    height: 64px;
    line-height: 64px;
    margin-bottom: 24px;
    background-color: #2a3142;
    .left {
      height: 100%;
      float: left;
      margin-left: 24px;
      .desc {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
        vertical-align: top;
      }
    }
    .right {
      height: 100%;
      float: right;
      margin-right: 24px;
      .el-button {
        border-radius: 24px;
        padding: 5px 15px;
      }
    }
  }
  .firstLayer {
    width: 100%;
    margin-bottom: 40px;
    .tableTitle {
      font-weight: bold;
      color: #333;
      font-size: px;
    }
  }
  .secondLayer {
    .prompt_message {
      position: relative;
      width: 100%;
      height: 262px;
      vertical-align: middle;
      background: #eef0f4;
      padding: 18px 24px;
      text-align: left;
      border-radius: 10px;
      .prompt {
        line-height: 36px;
      }
      .item {
        width: 100%;
        height: 36px;
        margin-left: 24px;
        line-height: 36px;
        .count,
        .desc,
        .state {
          float: left; // line-height: 36px;
        }
        .count {
          width: 20px;
          height: 20px;
          line-height: 20px;
          border-radius: 100%;
          color: #fff;
          background: #f05e5e;
          text-align: center;
          margin-top: 8px;
        }
        .desc {
          margin: 0 24px 0 20px;
        }
        .state {
          color: #f05e5e;
        }
        .complete {
          color: #a0a3aa;
        }
      }
      .page {
        float: right;
        font-size: 14px;
        position: absolute;
        right: 20px;
        bottom: 15px;
      }
      .img_wrapper img {
        position: absolute;
        width: 120px;
        height: 120px;
        bottom: 55px;
        right: 10px;
      }
    }
  }
  .tabs {
    width: 100%;
    margin-top: 50px;
    padding-bottom: 54px;
    .el-tabs__nav {
      width: 100% !important;
      .el-tabs__item {
        width: 12.5% !important;
      }
    }
  }
}
</style>
