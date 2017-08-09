<template>
    <div>
        <el-input v-model="input" 
         placeholder="请输入内容"
         class="search">
         </el-input>
        <el-table
        :data="tableData4"
        border
        style="width: 100%"
        max-height="250">
        <el-table-column
          fixed
          prop="date"
          label="项目名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="项目负责人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="所属行业"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="项目类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="项目阶段"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData4)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration">直接前往</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
  </div>
    </div>
</template>

<script>
  export default {
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      
    },
    data() {
      return {
        tableData4: [{
          date: '京东',
          name: '王经理',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '百度',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '天猫',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '一号店',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    }
  }
</script>
<style scoped>
    .search{
        width: 180px;
    }
</style>