<template>
  <div class="logTable">
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
  props: ["projectId","type"],
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
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.initLog();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.initLog();
    },
    initLog() {
      // alert(111);
      this.$http
        .post(this.api + "/businessLogRecord/selectBusinessLogRecordPageList", {
          type: this.type,
          typeId: this.projectId,
          page: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          if (res.status == "200") {
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
