<template>
    <div class="logTable">
        <!-- <div class="searchBox ">
            <p>
                <span>起始日期</span>
                <el-date-picker v-model="startDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
                </el-date-picker>
            </p>
            <p>
                <span>结束日期</span>
                <el-date-picker v-model="endingDate" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
                </el-date-picker>
            </p>
            <p>
                <el-button  size="large" class="el-icon-search" @clcik="searchHandler($event)">搜索</el-button>
            </p>
            <p>
                <el-button size="large" class="el-icon-refresh" @clcik="refreshHandler($event)">刷新</el-button>
            </p>
        </div> -->
        <el-table :data="tableData" border style="width:100%">
            <el-table-column prop="index" label="序号" align="center" width="120">
            </el-table-column>
            <el-table-column prop="operateDate" label="操作时间" align="center" width="300">
            </el-table-column>
            <el-table-column prop="username" label="操作人" align="center" width="300">
            </el-table-column>
            <el-table-column prop="operateDescribe" label="日志详情" align="center">
            </el-table-column>
        </el-table>
        <div class="pageStyle">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pages.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      tableData: [],
      pages: {
        pageNum: "", //当前页码
        total: "", //数据总数
        pageSize: "", //每页条数
        navigatepageNums: "", //页数
        current: "" //当前页码
      }
    };
  },
  watch: {
    tabs: function(to, from) {
      to.tabList.map((item, index) => {
        if (item) {
          this.init();
        } else {
          //   this.init();
        }
      });
    }
  },
  props: {
    // tableData: {
    //   type: Array,
    //   default: []
    // },
    tabs: {
      type: Object,
      default: {}
    },
    currentPage: {
      type: String,
      default: 1
    },
    totalPage: {
      type: String,
      default: 10
    },
    typeId: {
      type: String,
      default: ""
    },
    type: {
      type: Number,
      default: ""
    }
  },
  methods: {
    handleSizeChange(pageSizes) {
      this.pageSizes = pageSizes;
      this.init();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.init();
    },
    init() {
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
                res.data.result.list[index].index = index+1;
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
    }
  }
};
</script>



<style lang="less" scoped>
.logTable {
  margin: 0 auto;
  // width: 1200px;
  width: 100%;
  // border: 1px solid #ddd;
  border-radius: 4px;
  padding-bottom: 20px;
  .searchBox {
    height: 80px;
    line-height: 80px;
    > p {
      float: left;
      margin-left: 20px;
      button {
        color: #495060;
      }
    }
  }
}
</style>
