<template>
  <div class="fund">
    <div class="title">
      <div class="left">
        <span class="desc">{{formDetails.fundName}}</span>
      </div>
      <div class="right">
        <!-- :disabled="judgementFundStage" -->
        <el-button type="danger" @click="changeStep">下一阶段</el-button>
        <el-button type="danger" :class="{bgc:suspend}" :disabled="suspend" @click="stopSuppression">中止
        </el-button>
      </div>
    </div>
    <el-row class="step">
      <div class="step_lists" v-for="(step, index) of steps" :key="index" :class="{step_one: index == '0',
                         step_third: index == steps.length-1,
                         step_second:index > 0 && index < steps.length-1,
                         current_border: step.id == currentStep}">
        <span class="step_content">{{step.stageName}}</span>
      </div>
    </el-row>
    <div class="picture">
      <div class="img_wrapper">
        <img src="../../../static/img/double.png" alt="">
      </div>
      <div class="prompt_message">
        <span class="prompt">{{prompt}}</span>
        <div class="item_wrapper">
          <div v-for="(item, index) in module" class="item" :key="item.index">
            <span class="count">{{index + 1}}</span>
            <p class="desc">{{item.title}}</p>
            <span class="state" v-if="item.type == '1'">
              <span @click="showModalUpload(index, item.id)" v-if="item.status == '0'">
                立即上传
              </span>
              <span v-else="item.status !== '0'">已完成</span>
            </span>
            <!-- {{item}} -->
            <span class="state" v-if="item.type == '2'">
              <span v-if="item.status == '0'" @click="showProgressModal(item.id, item.type)">立即审批</span>
              <span v-else="item.status !== '0'">已完成</span>
            </span>
            <span class="state" :class="{complete:item.status == '0'}" v-if="item.type == '3'">
              <span v-if="item.status == '0'" @click="showProgressModal(item.id, item.type)">查看进度</span>
              <span v-else="item.status !== '0'">已完成</span>
            </span>
          </div>
        </div>
        <my-upload :modalUpload="modalUpload" :uploadInfo="uploadInfo" @cancelModal="cancelModal" @uploadSuccess="uploadSuccess"></my-upload>
        <apply-dialog :applyModal="applyModal" :applyForm="applyForm" :auditorOptions="auditorOptions" @submit="confirmApplyModal" @cancle="cancleApplyModal"></apply-dialog>
        <progress-dialog :progressModal="progressModal" :documentInfo="documentInfo" :table2="approveStageNodeData" :approvalForm="approvalForm" :isBlock="whichClick" :auditorOptions="auditorOptions" :dialogTitle="dialogTitle" @submit="confirmProgress" @cancle="cancalProgress" @closeShowModal="closeShowModal"></progress-dialog>
      </div>
    </div>
    <div class="chart">
      <el-row :gutter="10" style="width: 100%; height: 100%">
        <el-col :span="12">
          <tableInfo :data="tableData"></tableInfo>
        </el-col>
        <el-col :span="12">
          <echarts></echarts>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="tabs" v-if="existPermissions"> -->
    <div class="tabs">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="详情" name="details" class="tab_list" v-if="haveJurisdiction('GL-JJXQ')">
          <my-details :formDetails="formDetails" :formMIS="formMIS" :formRegistration="formRegistration" :formAccountInfo="formAccountInfo" :fundLevel="fundLevel" :showOrhiddren="showOrhiddren">
          </my-details>
        </el-tab-pane>
        <el-tab-pane label="团队" name="team" class="tab_list">
          <team :teamData="teamData"></team>
        </el-tab-pane>
        <el-tab-pane label="审批" name="examine" class="tab_list">
          <examine :examineData="examineData"></examine>
        </el-tab-pane>
        <el-tab-pane label="投资者" name="Investor" class="tab_list">
          <investor :investorData="investorData"></investor>
        </el-tab-pane>
        <el-tab-pane label="投资项目" name="project" class="tab_list">
          <projects :projectsData="projectsData"></projects>
        </el-tab-pane>
        <el-tab-pane label="文档" name="file" class="tab_list" v-if="haveJurisdiction('GL-JJWD')">
          <my-file :fileListData="fileListData"></my-file>
        </el-tab-pane>
        <el-tab-pane label="运营管理" name="manage" class="tab_list" v-if="haveJurisdiction('GL-YYGL')">
          <manage :costData="costData" :fundName="formDetails.fundName"></manage>
        </el-tab-pane>
        <el-tab-pane label="日志" name="log" class="tab_list">
          <log-table :table-data="tableData" :page="page" :page-size="pageSize" :pages="pages"></log-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 中止确认弹框 -->
    <delete-reminders :deleteReminders="deleteReminders" :modal_loading="modal_loading" :message_title="message_title" :message="message" :btnText="btnText" @del="confirmSuppression" @cancel="deleteReminders=false">
    </delete-reminders>
  </div>
</template>

<script type="text/ecmascript-6">
import tableInfo from "../../components/tableInfo";
import Details from "./details";
import Team from "./team";
import Examine from "./examine";
import Investor from "./investor";
import Projects from "./projects";
import File from "./file";
import Manage from "./manage";
import echarts from "../../components/echarts";
import deleteReminders from "components/deleteReminders";
import MyUpload from "components/upload";
import logTable from "components/log";
import { checkFundAuth } from "common/js/config";
import applyDialog from "components/applyDialog";
import progressDialog from "components/progressDialog";
import {
  getMyFundDetails,
  getFundTeamList,
  getInvestorByFund,
  getProjectContractByFund,
  selectProjectOrFundDocument,
  getFunAppraisement,
  getFundFeeList,
  getFundApprList,
  selectStageUploadDocument,
  slectStageAllocation,
  nextStage,
  getApproveList,
  getTeamListPage,
  startApproveInfo,
  getApproveInfo,
  approveResult,
  suspendFund
} from "api/fund";
const NUM = 2;
export default {
  $route(to, from) {
    this.projectId = this.$route.params.id;
    // if (to.name == "preProjectMessage") {
    //   this.init(); //再次调起我要执行的函数
    // }
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
      pages: {
        pageNum: "", //当前页码
        total: "", //数据总数
        pageSize: "", //每页条数
        navigatepageNums: "", //页数
        current: "" //当前页码
      },
      tableData: [],
      type: 2,
      tabs: {
        tabList: [false, false, false, false, false, false, false, false, false]
      },
      projectId: "",
      steps: JSON.parse(sessionStorage.getItem("steps")) || [],
      currentStep: "" || sessionStorage.getItem("currentStep"),
      stepId: "", // 当前显示列表id
      deleteReminders: false,
      message_title: "确认中止",
      message: "是否确认中止该项目？",
      btnText: "中止",
      modal_loading: false,
      prompt: "任务助手小双温馨提示:",
      module: [],
      tableData: {},
      activeName: "details",
      showOrhiddren: true,
      applyModal: false, // 发起申请对话框
      roleId: "0",
      auditorOptions: [], // 审批人员列表
      progressModal: false, // 立即审批对话框
      existPermissions: false, // 当前用户是否拥有权限
      approvalForm: {
        disposeResult: "1",
        approveUserId: "",
        remark: ""
      },
      applyForm: {},
      formDetails: {
        fundName: "",
        fundNo: "",
        fundScale: "",
        createUserId: "",
        manageTypeId: "",
        orgTypeId: "",
        fundInvestId: "",
        fundOrg: "",
        fundOrgValue: "", //基金结构选2的时候的比例值
        fundTerm: "",
        startDate: "",
        endDate: "",
        businessDeptId: "",
        yearsDaynum: "",
        merchantId: "",
        versionRecord: "",
        fundStatus: "",
        fundType: "",
        mainInvestField: "",
        incomeDis: "",
        fundRemarks: "",
        flag: true
      }, //详情 - 基本信息
      formMIS: {
        fundStratorId: "", //基金管理人
        fundCustodianId: "", //基金托管人
        fundSupervisorId: "", // 基金监管人
        fundSuperintId: "", // 基金监理人
        fundAdvisorId: "", // 基金投资顾问
        fundOrganizationId: "", // 第三方合作机构
        flag: true
      }, //详情 - 管理信息
      formRegistration: {
        regDate: "",
        regAddress: "",
        recordStatus: "",
        recordDate: "",
        recordNo: "",
        flag: true
      }, //详情 - 备案注册
      formAccountInfo: [
        {
          username: "",
          openingBank: "",
          accountNumber: "",
          accountType: 1,
          accountTypeName: "基本户"
        },
        {
          username: "",
          openingBank: "",
          accountNumber: "",
          accountType: 2,
          accountTypeName: "托管户"
        },
        {
          username: "",
          openingBank: "",
          accountNumber: "",
          accountType: 3,
          accountTypeName: "募集结算账户"
        }
      ], //详情 - 账户信息
      fundLevel: {
        priority: "",
        intermediateStage: "",
        generalLevel: ""
      },
      teamData: [], //团队列表
      investorData: [], // 投资者列表
      fileListData: [], // 文档列表
      projectsData: [], // 投资项目
      costData: [], // 基金费用
      examineData: [], // 审批数据
      file: null,
      listIndex: 0, // 当前点击id
      loadingStatus: false,
      modalUpload: false, // 显示或隐藏模态框
      uploadInfo: {
        file: null,
        stageId: "",
        uploadTypeId: this.$route.params.id,
        fileId: this.stepId || sessionStorage.getItem("stepId"),
        type: 1,
        userId: JSON.parse(sessionStorage.getItem("userInfor")).id
      },
      log: false
    };
  },
  methods: {
    initLog() {
      alert(111);
      this.$http
        .post(this.api + "/businessLogRecord/selectBusinessLogRecordPageList", {
          type: this.type,
          type_id: this.typeId,
          page: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          if (res.status == "200") {
            // console.log(res);
            if (res.data.status == "200") {
              console.log(res.data);
              res.data.result.list.map((item, index) => {
                res.data.result.list[index].index = index + 1;
              });
              this.tableData = res.data.result.list;
              this.pages.pageNum = res.data.result.pageNum; //当前页码
              this.pages.total = res.data.result.total; //数据总数
              this.pages.pageSize = res.data.result.pageSize; //每页条数
              this.pages.navigatepageNums =
                res.data.result.navigatepageNums.length; //页数长度
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
      };
      if (this.activeName == "team") {
        getFundTeamList(this.$route.params.id).then(res => {
          if (res.status == "200") {
            // console.log(res.data.result)
            this.teamData = res.data.result;
          }
        });
      } else if (this.activeName == "Investor") {
        getInvestorByFund(this.$route.params.id).then(res => {
          if (res.status == "200") {
            // console.log(res.data.result) // 投资者数据为空
            this.investorData = res.data.result;
          }
        });
      } else if (this.activeName === "examine") {
        getApproveList(this.$route.params.id).then(res => {
          if (res.status === 200) {
            // console.log(res)
            this.examineData = res.data.result.list;
          }
        });
      } else if (this.activeName == "project") {
        getProjectContractByFund(this.$route.params.id).then(res => {
          if (res.status == "200") {
            // console.log(res) // 投资项目数据为空
            this.projectsData = res.data.result;
          }
        });
      } else if (this.activeName == "file") {
        selectProjectOrFundDocument(this.$route.params.id, 2).then(res => {
          if (res.status == "200") {
            // console.log(res.data.result)
            this.fileListData = res.data.result;
          }
        });
      } else if (this.activeName == "manage") {
        getFundFeeList(this.$route.params.id).then(res => {
          if (res.status == "200") {
            // console.log(res)
            this.costData = res.data.result;
          }
        });
      } else if (this.activeName == "log") {
        // this.log = false;
        this.initLog();  
      }
    },

    // 转至下一阶段 的方法
    changeStep() {
      nextStage(this.$route.params.id, NUM, this.currentStep).then(res => {
        if (res.status == "200") {
          // console.log(res)
          if (res.data.status == "9021") {
            this.$Message.error(res.data.message || "操作失败，有未完成的任务");
          } else if (res.data.status == "9022") {
            this.$Message.error(res.data.message || "请勿重复操作");
          } else if (res.data.status === "9030") {
            console.log(res);
            this.applyModal = true;
            this.applyForm = res.data.result;
            this.roleId = res.data.result.roleId;
            this._getTeamlist(this.roleId, this.$route.params.id);
          } else if (res.data.status === "9032") {
            this.$Message.info(res.data.message || "操作失败,有审批未完成");
          } else if (res.data.status == "200") {
            this.getDataStageAddUpload();
          }
        }
      });
    },
    confirmApplyModal() {
      // 确认提交审批申请
      this.applyForm.userId = JSON.parse(
        sessionStorage.getItem("userInfor")
      ).id;
      startApproveInfo(this.applyForm)
        .then(res => {
          // console.log(this.applyForm)
          if (res.status === 200) {
            this.getDataStageAddUpload();
            this.applyModal = false;
          }
        })
        .catch(err => {
          this.$Message.error("提交申请失败！");
        });
    },
    cancleApplyModal() {
      this.applyModal = false;
      return false;
    },
    showProgressModal(id, type) {
      // 立即审批方法
      if (type === 2) {
        this.whichClick = true;
      } else {
        this.whichClick = false;
      }
      getApproveInfo(id).then(res => {
        if (res.status === 200) {
          this.dialogTitle = res.data.result.approveTitle;
          this.documentInfo = res.data.result.dataDocumentResult;
          this.approveStageNodeData = res.data.result.approveStageNodeData;
          this._getTeamlist(res.data.result.roleId, this.$route.params.id);
          this.approvalForm = Object.assign({}, this.approvalForm, {
            id: res.data.result.id,
            roleId: res.data.result.roleId,
            orderValue: res.data.result.orderValue,
            stageId: sessionStorage.getItem("currentStep"),
            typeId: this.$route.params.id,
            type: 2
          });
          this.progressModal = true;
        }
        console.log(res);
      });
    },
    confirmProgress() {
      approveResult(this.approvalForm)
        .then(res => {
          if (res.status === 200) {
            if (res.data.status === 200) {
              this.$Message.success(res.data.message || "审批成功!");
            } else if (res.data.status == "9131") {
              this.$Message.success(res.data.message || "您已经完成此审批，不能重复审批!");
            }
            this.progressModal = false;
            this.approvalForm = {
              disposeResult: "1",
              approveUserId: "",
              remark: ""
            };
            this.getDataStageAddUpload();
          }
        })
        .catch(err => {
          this.$Message.error("审批失败！");
        });
    },
    cancalProgress() {
      this.progressModal = false;
      this.approvalForm = {
        disposeResult: "1",
        approveUserId: "",
        remark: ""
      };
    },
    closeShowModal() {
      this.progressModal = false;
    },
    showModalUpload(index, id) {
      // 显示上传模态框
      this.stepId = id;
      this.uploadInfo.fileId = id;
      this.listIndex = index;
      // console.log(this.uploadInfo)
      this.modalUpload = true;
      this.uploadInfo.stageId = this.currentStep;
      console.log("上传时数据" + this.uploadInfo);
    },
    cancelModal() {
      //隐藏上传模态框
      this.modalUpload = false;
      // console.log(this.modalUpload)
    },
    uploadSuccess() {
      // 上传成功隐藏模态框
      this.getDataStageAddUpload();
      this.modalUpload = false;
    },
    getDataStageAddUpload() {
      // 获取小双，阶段数据
      sessionStorage.removeItem("currentStep");
      selectStageUploadDocument(this.$route.params.id, NUM).then(res => {
        if (res.status == "200") {
          console.log("获取时阶段stageId" + res.data.stageId);
          this.module = res.data.result;
          this.currentStep = res.data.stageId;
          if (res.data.result[0] === undefined) {
            return;
          } else {
            this.stepId = this.module[this.listIndex].id;
          }
          sessionStorage.setItem("stepId", this.stepId);
          sessionStorage.setItem("currentStep", res.data.stageId);
          // console.log(res)
        }
      });
      slectStageAllocation().then(res => {
        // 获取配置项目或者基金的阶段
        if (res.status == "200") {
          // console.log(res)
          this.steps = res.data.result;
          sessionStorage.setItem("steps", JSON.stringify(res.data.result));
        }
      });
    },
    // judgementFundStage() {
    //     var last = this.steps[this.steps.length - 1].id
    //     var current = this.currentStep
    //     if (last === current) {
    //         return false
    //     } else {
    //         return true
    //     }
    // },
    stopSuppression() {
      this.message_title = "确认中止";
      this.message = "是否确认中止该基金？";
      this.deleteReminders = true;
    },
    confirmSuppression() {
      // 确认中止
      suspendFund(this.$route.params.id)
        .then(res => {
          if (res.status === 200) {
            if (res.data.status === "9015") {
              this.$Message.info(res.data.message || "该阶段无法中止！");
            } else if (res.data.status === "200") {
              this.$Message.info(res.data.message || "操作成功!");
            }
          }
        })
        .catch(err => {
          this.$Message.info("该阶段无法中止！");
        });
      this.deleteReminders = false;
    },
    _getFundList(id) {
      getMyFundDetails(id).then(res => {
        if (res.status == "200") {
          this.formDetails = Object.assign(
            {},
            {
              flag: true
            },
            res.data.result.fundBaseInfo
          );
          this.formDetails.fundTerm = parseFloat(this.formDetails.fundTerm);
          this.formDetails.fundScale = parseFloat(this.formDetails.fundScale);
          window.sessionStorage.setItem(
            "FUNDNAME",
            JSON.stringify(res.data.result.fundBaseInfo.fundName)
          );
          this.formMIS = Object.assign(
            {},
            {
              flag: true
            },
            res.data.result.fundManageInfo
          );

          if (res.data.result.fundAccinfo) {
            var fundAccinfo = res.data.result.fundAccinfo;
            fundAccinfo.map(x => {
              x.flag = true;
            });
            this.formAccountInfo = fundAccinfo;
          }
          if (res.data.result.fundBaseInfo.fundOrgValue) {
            this.fundLevel.priority = res.data.result.fundBaseInfo.fundOrgValue.split(
              ":"
            )[0];
            this.fundLevel.intermediateStage = res.data.result.fundBaseInfo.fundOrgValue.split(
              ":"
            )[1];
            this.fundLevel.generalLevel = res.data.result.fundBaseInfo.fundOrgValue.split(
              ":"
            )[2];
          } else {
            this.fundLevel.priority = "";
            (this.fundLevel.intermediateStage = ""),
              (this.fundLevel.generalLevel = "");
          }
          if (res.data.result.fundRegistration == null) {
            return;
          } else {
            this.formRegistration = Object.assign(
              {},
              {
                flag: true
              },
              res.data.result.fundRegistration
            );
          }
        }
      });
    },
    haveJurisdiction(str) {
      if (checkFundAuth(str)) {
        return true;
      } else {
        return false;
      }
    },
    _getTeamlist(roleId, id) {
      getTeamListPage(roleId, id).then(res => {
        if (res.status === 200) {
          console.log(res);
          if (res.data.result.list) {
            this.auditorOptions = res.data.result.list;
          } else {
            this.auditorOptions = [];
          }
        }
      });
    },
    _existPermissions() {
      getFundTeamList(this.$route.params.id).then(res => {
        var getIdList = [];
        var currentUserId = JSON.parse(sessionStorage.getItem("userInfor")).id;
        if (res.status === 200 && res.data.result) {
          res.data.result.map(x => {
            getIdList.push(x.userId);
          });
        } else {
          this.existPermissions = false;
        }
        this.existPermissions = getIdList.includes(currentUserId)
          ? true
          : false;
      });
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //     getFundApprList(this.$route.params.id).then((res) => {
    //         if (res.status == '200') {
    //             console.log(res)
    //         }
    //     })
    // })
    this.getDataStageAddUpload();
  },
  created() {
    this.projectId = this.$route.params.id;
    getFunAppraisement(this.$route.params.id).then(res => {
      if (res.status == "200") {
        // console.log(res.data.result.newFuy < 0)
        this.tableData = res.data.result;
      }
    });
    this._getFundList(this.$route.params.id);
    this._existPermissions();
  },
  beforeRouteUpdate(to, from, next) {
    this._getFundList(to.params.id);
  },
  components: {
    tableInfo,
    echarts,
    myDetails: Details,
    Team,
    Examine,
    Investor,
    Projects,
    myFile: File,
    Manage,
    deleteReminders,
    MyUpload,
    applyDialog,
    progressDialog,
    logTable
  }
};
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
.fund {
  width: 100%; // min-width: 1343px;
  /*height: 100%;*/
  background-color: #fff;
  padding: 24px;
  .title {
    width: 100%;
    height: 64px;
    line-height: 64px;
    background-color: #2a3142;
    .left {
      height: 100%;
      float: left;
      margin-left: 24px;
      font-size: 0;
      .desc {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
        vertical-align: top;
      }
      .icon {
        font-size: 20px;
        font-weight: 600;
        color: @color-theme-red;
        margin-left: 24px;
      }
      .termination {
        margin-left: 24px;
        vertical-align: middle;
      }
    }
    .right {
      height: 100%;
      float: right;
      margin-right: 24px;
      .el-button {
        padding: 5px 15px;
      }
    }
    .restart {
      width: 24px;
      height: 24px;
      padding: 6px;
      color: @color-theme-red;
      font-size: 20px;
      font-weight: 600;
      margin-left: 24px;
      vertical-align: middle;
    }
  }

  .step {
    width: 100%;
    height: 52px;
    margin-top: 24px;
    display: flex;
    .step_lists {
      flex: 1;
      line-height: 52px;
      text-align: center;
      height: 52px;
      border: 1px solid #000;
      position: relative;
    }
    .current_border {
      border: 1px solid #f05e5e;
      span {
        color: #f05e5e;
      }
      &.step_one::after {
        border-color: #f05e5e #f05e5e transparent transparent;
      }
      &.step_second::before {
        border-color: #f05e5e #f05e5e transparent transparent;
      }
      &.step_second::after {
        border-color: #f05e5e #f05e5e transparent transparent;
      }
      &.step_third::before {
        border-color: #f05e5e #f05e5e transparent transparent;
      }
    }
    .step_one {
      &::after {
        content: "";
        width: 36px;
        height: 36px;
        background: #fff;
        position: absolute;
        top: 7px;
        right: -19px;
        border: 1px solid;
        border-color: #000 #000 transparent transparent;
        transform: rotate(45deg);
        z-index: 1;
      }
    }
    .step_second {
      margin-left: 2%;
      &::after {
        content: "";
        width: 36px;
        height: 36px;
        background: #fff;
        position: absolute;
        top: 7px;
        right: -19px;
        border: 1px solid;
        border-color: #000 #000 transparent transparent;
        transform: rotate(45deg);
        z-index: 1;
      }
      &::before {
        content: "";
        width: 36px;
        height: 36px;
        background: #fff;
        position: absolute;
        top: 7px;
        left: -19px;
        border: 1px solid;
        border-color: #000 #000 transparent transparent;
        transform: rotate(45deg);
      }
    }
    .step_third {
      margin-left: 2%;
      &::before {
        content: "";
        width: 36px;
        height: 36px;
        background: #fff;
        position: absolute;
        top: 7px;
        left: -19px;
        border: 1px solid;
        border-color: #000 #000 transparent transparent;
        transform: rotate(45deg);
      }
    }
  }

  .picture {
    width: 100%;
    text-align: center;
    padding: 54px 0;
    .img_wrapper {
      height: 100%;
      margin-right: 34px;
      display: inline-block;
      vertical-align: middle;
    }
    .prompt_message {
      min-width: 48%;
      min-height: 140px;
      display: inline-block;
      vertical-align: middle;
      background: #eef0f4;
      padding: 18px 24px;
      text-align: left;
      border-radius: 10px;
      position: relative;
      &::before {
        content: "";
        width: 0;
        height: 0;
        border-bottom: 20px solid #eef0f4;
        border-left: 20px solid transparent;
        position: absolute;
        top: 40px;
        left: -19px;
      }
      .prompt {
        line-height: 36px;
      }
      .item {
        width: 100%;
        height: 36px;
        margin-left: 24px;
        line-height: 36px;
        overflow: hidden;
        .count,
        .desc,
        .state {
          float: left;
          line-height: 36px;
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
    }
  }
  .tabs {
    width: 100%;
    padding-top: 20px;
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
