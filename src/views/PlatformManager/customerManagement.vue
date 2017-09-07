<template>
  <section>
    <!-- 这是客户管理页面 -->
    <div>
      <el-row class="customerMang">
        <el-col :span="6">
          <div class="grid-content bg-purple-dark">
            <el-input placeholder="" icon="search" v-model="input2" :on-icon-click="handleIconClick">
            </el-input>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
        <el-col :span="8" class="searchIpt">
          <div class="grid-content bg-purple-dark">
            <el-button class="searchIpt" type="primary">新增客户</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="clientName" label="客户名称" align="center">
        </el-table-column>
        <el-table-column prop="account" label="账号" align="center">
        </el-table-column>
        <el-table-column prop="openDate" label="开通日期" align="center">
        </el-table-column>
        <el-table-column prop="expiryDate" label="到期日期" align="center">
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center">
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button @click="edit" type="text" size="small">编辑</el-button>
            <el-button @click="remove" type="text" size="small">锁定/启用</el-button>
            <el-button @click="remove" type="text" size="small">密码初始化</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          clientName: '王岐山',
          account: '2359965145325585625',
          openDate: '2017-09-10',
          expiryDate: '2020-01-01',
          type: '',
          status: '启用'
        },
        {
          clientName: '陈良宇',
          account: '235996514532558564',
          openDate: '2017-09-10',
          expiryDate: '2020-01-01',
          type: '',
          status: '启用'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
section {
  >div {
    background: #ffffff;
    padding: 24px;
    overflow: hidden;
    .customerMang{
      margin-bottom: 10px;
    }
    .searchIpt_left{
      float: left;
    }
    .searchIpt {
      float: right;
    }
  }
}
</style>
