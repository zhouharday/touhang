<template>
    <section class="projecInfor">
        <!-- 这是项目信息统计表 -->
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
                        <el-input placeholder="" icon="search" v-model="input2" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
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
            <el-table :data="projectInforTabData" border style="width: 100%">
                <el-table-column fixed="left" prop="projectName" label="项目名称" width="150" align="center">
                </el-table-column>
                <el-table-column prop="projectType" label="项目类型" width="150" align="center">
                </el-table-column>
                <el-table-column prop="industry" label="所属行业" width="150" align="center">
                </el-table-column>
                <!-- <el-table-column prop="projectLeader" label="项目负责人" width="150" align="center">
                </el-table-column> -->
                <el-table-column prop="payDate" label="投资时间" width="250" align="center">
                </el-table-column>
                <el-table-column prop="investAmount" label="投资金额" width="150" align="center">
                </el-table-column>
                <el-table-column prop="newAppraisement" label="最新估值" width="150" align="center">
                </el-table-column>
                <el-table-column prop="floatProfit" label="最新浮盈" width="150" align="center">
                </el-table-column>
                <el-table-column prop="exitIncome" label="退出收益" width="150" align="center">
                </el-table-column>
                <el-table-column prop="incomeRatio" label="收益率" width="150" align="center">
                </el-table-column>
                <el-table-column prop="projectInfoStatisticsDetails" fixed="right" label="出资主体" width="200" align="center">
                    <template scope="scope">
                        <div v-for="(item,index) in scope.row.projectInfoStatisticsDetails" :key="item.index">{{ item.investmentSubject}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="projectInfoStatisticsDetails" fixed="right" label="出资金额" width="150" align="center">
                    <template scope="scope">
                        <div v-for="(item,index) in scope.row.projectInfoStatisticsDetails" :key="item.index">{{ item.investmentAmount}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="projectInfoStatisticsDetails" fixed="right" label="股权占比" width="150" align="center">
                    <template scope="scope">
                        <div v-for="(item,index) in scope.row.projectInfoStatisticsDetails" :key="item.index">{{ item.stock}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="pages.total">
                </el-pagination>
            </div>
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
    if (this.projectInforTabData.length == "0") {
      this.from = "0";
      this.to = "0";
      this.altogether = "0";
    } else if (this.projectInforTabData.length > "0") {
      this.from = 1;
      this.to = this.projectInforTabData.length;
      this.altogether = this.projectInforTabData.length;
    }
    // console.log(this.projectInforTabData.length);
    this.projectMessage("", this.input2);
    this.projectType();
  },
  methods: {
    changeActive(index, item) {
      this.ind = index;
      if(index == 0){
          this.projectMessage('','');
      } else {
          this.projectMessage(item.id,'');
      }
    },
    projectType() {
      //查询项目类型api
      this.$http
        .post(this.api + "/dictionaryController/select2Menu", {
          //数据字典=>省份
          dicParent: 202,
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
    projectMessage(projectTypeId, name) {
      //项目信息统计 api
      this.$http
        .post(this.api + "/projectPool/projectMessage", {
          merchantId: this.user.merchants[0].id,
          projectTypeId: projectTypeId,
          projectName: name,
          page: this.page,
          pageSize: this.pageSize,
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log(res.data.result);
              this.projectInforTabData = res.data.result.list;
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
      this.projectMessage("", this.input2);
    },
    handleSizeChange(pageSize) {
      //分页条数切换
      // this.pageSize = '';
      this.pageSize = pageSize;
      this.projectMessage("", this.input2);
    },
    handleIconClick() {
      //模糊查询
      this.projectMessage("", this.input2);
    }
  },
  data() {
    return {
      ind: 0,
      from: 0,
      to: 0,
      altogether: 0,
      every: 10,
      projectInforTabData: [],
      page: 1,
      pageSize: 10,
      pages: {
        pageNum: "", //当前页码
        total: "", //数据总数
        pageSize: "", //每页条数
        navigatepageNums: "", //页数
        current: "" //当前页码
      },
      projectTypeList: []
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
