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
                            <el-button class="searchIpt" type="danger" size="small">
                                导出统计表
                            </el-button>
                        </a>
                    </div>
                </el-col>
            </el-row>
            <el-table :data="fundTabData" border style="width: 100%">
                <el-table-column fixed="left" prop="fundName" label="基金名称" width="230" align="center">
                </el-table-column>
                <el-table-column prop="orgName" label="组织类型" width="150" align="center">
                </el-table-column>
                <el-table-column prop="fundInvest" label="基金投向" width="150" align="center">
                </el-table-column>
                <!-- <el-table-column prop="projectLeader" label="基金负责人" width="150" align="center">
                </el-table-column> -->
                <el-table-column prop="fundScale" label="基金规模" width="300" align="center">
                </el-table-column>
                <el-table-column prop="placementSum" label="募集总额" width="150" align="center">
                </el-table-column>
                <el-table-column prop="investAmount" label="投资总额" width="150" align="center">
                </el-table-column>
                <el-table-column prop="remainAmount" label="剩余额度" width="150" align="center">
                </el-table-column>
                <el-table-column prop="fundAppraisement" label="基金估值" width="150" align="center">
                </el-table-column>
                <el-table-column prop="fundFuying" label="基金浮盈" width="150" align="center">
                </el-table-column>
                <el-table-column label="投资项目数" prop="investCount" fixed="right" width="150" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="openModal(1)" style="color:#f05e5e">{{ scope.row.investCount }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="退出投资数" prop="exitCount" fixed="right" width="150" align="center">
                    <template scope="scope">
                        <el-button type="text" style="color:#f05e5e">{{ scope.row.exitCount }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="pages.total">
                </el-pagination>
            </div>
            
        </div>
        <div class="tableModal">
            <el-dialog title="投资详情" :visible.sync="tableModal">
                <el-table :data="projectData">
                    <el-table-column property="projectName" label="项目名称"></el-table-column>
                    <el-table-column property="projectType" label="项目类型"></el-table-column>
                    <el-table-column property="industry" label="所属行业"></el-table-column>
                    <el-table-column property="createUserName" label="项目创建人"></el-table-column>
                    <el-table-column property="payDate" label="投资日期"></el-table-column>
                    <el-table-column property="paySumAmount" label="投资金额"></el-table-column>
                    <el-table-column property="outingAmount" label="退出金额"></el-table-column>
                    <el-table-column property="outingIncome" label="退出收益"></el-table-column>
                </el-table>
                <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="pages.total">
                </el-pagination>
            </div>
            </el-dialog>
        </div>
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
    openModal(num) {
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
    fundStatistics(fundInvestId,fundName) {
      this.$http
        .post(this.api + "/fund/fundStatistics", {
          merchantId: this.user.merchants[0].id,
          fundInvestId: fundInvestId,
          fundName: fundName,
          page: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log(res.data.result);
              this.fundTabData = res.data.result.list;
              this.pages.pageNum = res.data.result.pageNum; //当前页码
              this.pages.total = res.data.result.total; //数据总数
              this.pages.pageSize = res.data.result.pageSize; //每页条数
              this.pages.navigatepageNums =
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
    handleCurrentChange(page) {
      //分页页码切换
      //获取tabList3 分页数据
      this.page = page;
      this.fundStatistics("", this.input2);
    },
    handleSizeChange(pageSize) {
      //分页条数切换
      // this.pageSize = '';
      this.pageSize = pageSize;
      this.fundStatistics("", this.input2);
    },
    handleIconClick() {
      //模糊查询
      this.fundStatistics("", this.input2);
    }
  },
  data() {
    return {
      ind: 0,
      from: 0,
      to: 0,
      altogether: 0,
      every: 10,
      tableModal: false,
      projectTypeList: [],
      fundTabData: [],
      projectData: [
        {
          projectName: "朝阳项目",
          projectType: "",
          industry: "",
          createUserName: "",
          payDate: "",
          paySumAmount: "",
          outingAmount: "",
          outingIncome: ""
        }
      ],
      page: 1,
      pageSize: 10,
      pages: {
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
