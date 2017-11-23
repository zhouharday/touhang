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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    // this.init();
  },

  created() {
    console.log(this.pages);
    this.init();
  },
  data() {
    return {
      // page: 1,
      // pageSize: 10,
      // // tableData: [],
      // pages: {
      //   pageNum: "", //当前页码
      //   total: "", //数据总数
      //   pageSize: "", //每页条数
      //   navigatepageNums: "", //页数
      //   current: "" //当前页码
      // }
    };
  },
  watch: {
    // log: function() {
    //   if (this.log) {
    //     this.init();
    //   }
    // }
  },
  // props: ["tableData"],
  // props: ["page","pages","tableData"],
  props: {
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: String,
      default: '0'
    },
    total: {
      type: String,
      default: '0'
    },
    // pages: {
    //   type: Object,
    //   // default: {}
    // },
    tableData: {
      type: Array,
      default: []
    }
  },
  methods: {
    // handleSizeChange(pageSize) {
    //   this.pageSize = pageSize;
    //   this.init();
    // },
    // handleCurrentChange(page) {
    //   this.page = page;
    //   this.init();
    // },
    init() {
      this.$emit("initLog");
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
