<template>
    <section class="fundInFormation">
        <!-- 这是基金信息统计表 -->
        <div>
            <el-row style="margin-bottom: 20px;">
                <el-col :span="23">
                        <div class="industry-ul">
                            <ul ref="industry">
                                <li class="cursor" v-for="(item,index) in projectTypeList" :label="item.dicName" :value="item.id" :key="item.id" :class="{active: index==ind}" @click="changeActive(index,item)">
                                    {{item.dicName}}
                                </li>
                            </ul>
                        </div>
                    </el-col>
            </el-row>
            <el-row class="customerMang">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark">
                        <el-input placeholder="请按基金名称进行查询" icon="search" v-model="input2" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple-dark"></div>
                </el-col>
                <el-col :span="8" class="searchIpt">
                    <div class="grid-content bg-purple-dark">
                        <a href="/static/source/投行接口文档1.7.xlsx" download="出资统计表.xls">
                            <!-- <el-button class="searchIpt" type="danger" size="small">
                                导出统计表
                            </el-button> -->
                        </a>
                    </div>
                </el-col>
            </el-row>
            <el-table :data="fundTabData" stripe style="width: 100%">
                <el-table-column fixed="left" prop="fundName" label="基金名称" width="230" align="center">
                </el-table-column>
                <el-table-column prop="orgName" label="组织类型" width="150" align="center">
                </el-table-column>
                <el-table-column prop="fundInvest" label="基金投向" width="150" align="center">
                </el-table-column>
                <!-- <el-table-column prop="projectLeader" label="基金负责人" width="150" align="center">
                </el-table-column> -->
                <el-table-column prop="fundScale" label="基金规模" width="250" align="center">
                </el-table-column>
                <el-table-column prop="placementSum" label="募集总额(元)" width="200" align="center">
                </el-table-column>
                <el-table-column prop="investAmount" label="投资总额(元)" width="200" align="center">
                </el-table-column>
                <el-table-column prop="remainAmount" label="剩余额度(元)" width="200" align="center">
                </el-table-column>
                <el-table-column prop="fundAppraisement" label="基金估值" width="150" align="center">
                </el-table-column>
                <el-table-column prop="fundFuying" label="基金浮盈" width="150" align="center">
                </el-table-column>
                <el-table-column label="投资项目数" prop="investCount" fixed="right" width="150" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="openModal(scope.row)" style="color:#f05e5e">{{ scope.row.investCount }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="退出项目数" prop="exitCount" fixed="right" width="150" align="center">
                    <template scope="scope">
                        <el-button type="text" style="color:#f05e5e">{{ scope.row.exitCount }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="page1" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="pages_1.total">
                </el-pagination>
            </div>
        </div>
        <div class="tableModal">
            <el-dialog title="投资详情" :visible.sync="tableModal">
                <el-table :data="projectData" border style="width: 100%">
                    <el-table-column prop="projectName" label="项目名称"></el-table-column>
                    <el-table-column prop="projectType" label="项目类型"></el-table-column>
                    <el-table-column prop="industry" label="所属行业"></el-table-column>
                    <!-- <el-table-column property="createUserName" label="项目创建人"></el-table-column> -->
                    <el-table-column prop="payDate" label="投资日期" width="250"></el-table-column>
                    <el-table-column prop="investAmount" label="投资金额"></el-table-column>
                    <el-table-column prop="exitAmount" label="退出金额"></el-table-column>
                    <el-table-column prop="exitIncome" label="退出收益"></el-table-column>
                </el-table>
                <div class="pagination"> 
                    <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="page2" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="pages_2.total">
                    </el-pagination>
                </div>
            </el-dialog>
        </div>
    </section>
</template>

<script>
import {formatNum} from"../../common/js/config";
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
    if (this.fundTabData.length == "0") {
      this.from = "0";
      this.to = "0";
      this.altogether = "0";
    } else if (this.fundTabData.length > "0") {
      this.from = 1;
      this.to = this.fundTabData.length;
      this.altogether = this.fundTabData.length;
    }
    // console.log(this.fundTabData.length);
    this.fundStatistics("", "");
    this.projectType();
  },
  methods: {
    changeActive(index, item) {
      this.ind = index;
      if (index == 0) {
        this.fundStatistics("", "");
      } else {
        this.fundStatistics(item.id, "");
      }
    },
    handleClick() {
      console.log(1);
    },
    openModal(row) {
      //查询基金统计详情
      console.log(row);
      this.fundId = row.fundId;
      this.fundMessage();
      this.tableModal = true;
    },
    projectType() {
      //查询项目类型api
      this.$http
        .post(this.api + "/dictionaryController/select2Menu", {
          //数据字典=>省份
          dicParent: 304,
          identification: "a"
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log(res.data.result);
              this.projectTypeList = res.data.result;
              this.$Message.success(res.data.message);
            } else if (res.data.status == "403") {
              this.$Message.error(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("访问超时");
        });
    },
    fundStatistics(fundInvestId, fundName) {
      //查询基金信息列表数据
      this.$http
        .post(this.api + "/fund/fundStatistics", {
          merchantId: this.user.merchants[0].id,
          fundInvestId: fundInvestId,
          fundName: fundName,
          page: this.page1,
          pageSize: this.pageSize1
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log(res.data.result);
              res.data.result.list.map((item,index)=> {
                // res.data.result.list[index].map((ele,index)=> {
                  if(item.fundAppraisement == null || item.fundFuying == null || item.fundScale == null || item.investAmount == null || item.placementSum == null || item.remainAmount == null){
                    item.fundAppraisement = '';
                    item.fundFuying = '';
                    item.fundScale = '';
                    item.investAmount = '';
                    item.placementSum = '';
                    item.remainAmount = '';
                  } else {
                    item.fundAppraisement = formatNum(String(item.fundAppraisement));
                    item.fundFuying = formatNum(String(item.fundFuying));
                    item.fundScale = formatNum(String(item.fundScale));
                    item.investAmount = formatNum(String(item.investAmount));
                    item.placementSum = formatNum(String(item.placementSum));
                    item.remainAmount = formatNum(String(item.remainAmount));
                  }

              });

              this.fundTabData = res.data.result.list;
              this.pages_1.pageNum = res.data.result.pageNum; //当前页码
              this.pages_1.total = res.data.result.total; //数据总数
              this.pages_1.pageSize = res.data.result.pageSize; //每页条数
              this.pages_1.navigatepageNums =
                res.data.result.navigatepageNums.length;
              this.$Message.success(res.data.message);
            } else {
              this.$Message.error(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
          console.log("请求超时");
        });
    },
    fundMessage() {
      //查询基金信息列表数据
      this.$http
        .post(this.api + "/projectPool/fundMessage", {
          merchantId: this.user.merchants[0].id,
          funId: this.fundId,
          page: this.page2,
          pageSize: this.pageSize2
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log(res.data.result);
              this.projectData = res.data.result.list;
              this.pages_2.pageNum = res.data.result.pageNum; //当前页码
              this.pages_2.total = res.data.result.total; //数据总数
              this.pages_2.pageSize = res.data.result.pageSize; //每页条数
              this.pages_2.navigatepageNums =
                res.data.result.navigatepageNums.length;
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

    handleCurrentChange1(page) {
      //分页页码切换
      this.page1 = page;
      this.fundStatistics("", this.input2);
    },
    handleSizeChange1(pageSize) {
      //分页条数切换
      this.pageSize1 = pageSize;
      this.fundStatistics("", this.input2);
    },
    handleCurrentChange2(page) {
      //分页页码切换
      this.page2 = page;
      this.fundMessage("");
    },
    handleSizeChange2(pageSize) {
      //分页条数切换
      this.pageSize2 = pageSize;
      this.fundMessage("");
    },
    handleIconClick() {
      //模糊查询
      this.fundStatistics("", this.input2);
    }
  },
  data() {
    return {
      fundId: "",
      ind: 0,
      from: 0,
      to: 0,
      altogether: 0,
      every: 10,
      tableModal: false,
      projectTypeList: [],
      fundTabData: [],
      projectData: [],
      page1: 1,
      pageSize1: 10,
      page2: 1,
      pageSize2: 10,
      pages_1: {
        pageNum: "", //当前页码
        total: "", //数据总数
        pageSize: "", //每页条数
        navigatepageNums: "", //页数
        current: "" //当前页码
      },
      pages_2: {
        pageNum: "", //当前页码
        total: "", //数据总数
        pageSize: "", //每页条数
        navigatepageNums: "", //页数
        current: "" //当前页码
      }
    };
  }
};
</script>

<style lang="less" scoped>
section {
  > div {
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
    .articlesNumber {
      margin-top: 20px;
      font-size: 10px;
    }
    .industry-ul {
      > ul {
        > li {
          float: left;
          margin: 0 10px;
        }
      }
    }
    .active {
      height: 20px;
      color: white;
      text-align: center;
      border-radius: 15px;
      background: #f05e5e;
      padding: 0 10px;
    }
  }
}
</style>
