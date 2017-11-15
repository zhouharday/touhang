<template>
  <section class="fundedForm">
    <!-- 这是出资统计表 -->
    <div>
      <el-row class="customerMang">
        <el-col :span="6">
          <div class="grid-content bg-purple-dark">
            <el-input placeholder="请按投资者名称进行查询" icon="search" v-model="input2" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
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
      <el-table :data="fundedTabData" stripe style="width: 100%">
        <el-table-column prop="investorName" label="投资者" align="center">
        </el-table-column>
        <el-table-column prop="investorType" label="类型" align="center">
        </el-table-column>
        <el-table-column prop="fundName" label="基金名称" align="center">
        </el-table-column>
        <el-table-column label="签订日期" align="center">
          <template scope='scope'>
            <div>{{scope.row.signDate | formatDateDetails}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="subscribeAmount" label="认缴金额(元)" align="center">
        </el-table-column>
        <el-table-column prop="paidAmount" label="实缴金额(元)" align="center">
        </el-table-column>
        <el-table-column prop="contributiveRatio" label="出资占比(%)" align="center">
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pages.total">
        </el-pagination>
      </div>
    </div>
  </section>
</template>

<script>
import "../../common/js/filter";
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
      }
    }
  },
  created() {
    if (this.fundedTabData.length == "0") {
      this.from = "0";
      this.to = "0";
      this.altogether = "0";
    } else if (this.fundedTabData.length > "0") {
      this.from = 1;
      this.to = this.fundedTabData.length;
      this.altogether = this.fundedTabData.length;
    }
    // console.log(this.fundedTabData.length);
    this.searchInvestorList(this.page, this.pageSize, "");
  },
  data() {
    return {
      input2: "",
      page: 1,
      pageSize: 10,
      from: 0,
      to: 0,
      altogether: 0,
      every: 10,
      fundedTabData: [],
      pages: {
        pageNum: "", //当前页码
        total: "", //数据总数
        pageSize: "", //每页条数
        navigatepageNums: "", //页数
        current: "" //当前页码
      }
    };
  },
  methods: {
    searchInvestorList(page, pageSize, name) {
      //出资统计表 api
      this.$http
        .post(this.api + "/investor/searchInvestorList", {
          merchantId: this.user.merchants[0].id,
          page: this.page,
          pageSize: this.pageSize,
          investorName: name
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log(res.data);
              res.data.result.list.map(item => {
                item.paidAmount = formatNum(String(item.paidAmount));
                item.subscribeAmount = formatNum(String(item.subscribeAmount));
                // console.log(item.paidAmount)
              });
              this.fundedTabData = res.data.result.list;
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
        });
    },
    handleCurrentChange(page) {
      //分页页码切换
      // this.page = '';
      this.page = page;
      this.searchInvestorList(this.page, this.pageSize, "");
    },
    handleSizeChange(pageSize) {
      //分页条数切换
      // this.pageSize = '';
      this.pageSize = pageSize;
      this.searchInvestorList(this.page, this.pageSize, "");
    },
    handleIconClick() {
      //模糊查询
      this.searchInvestorList(this.page, this.pageSize, this.input2);
    }
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
      > a {
        color: #ffffff;
      }
    }
    .articlesNumber {
      margin-top: 20px;
      font-size: 10px;
    }
  }
}
</style>
