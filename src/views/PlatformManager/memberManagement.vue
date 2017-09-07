<template>
  <section>
    <!-- 这是会员管理页面 -->
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
      </el-row>
      <el-table :data="memberMTabData" border style="width: 100%">
        <el-table-column prop="phoneNumber" label="手机号" align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
          <template scope="scope">

          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" align="center">
        </el-table-column>
        <el-table-column prop="inBusiness" label="所在企业" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center">
        </el-table-column>
        <el-table-column prop="registraDate" label="注册日期" align="center">
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
        </el-table-column>
        <el-table-column prop="remarks" label="备注" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button @click="remove" type="text" size="small">锁定/启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
  export default {
    data(){
      return {
        memberMTabData:[
          {
            phoneNumber: "188866663333",
            name: "毛草",
            nickName: "依依",
            inBusiness: "阿里巴巴",
            email: "02359887@chinasofti.com",
            registraDate: "2010-05-10",
            status: "开启",
            remarks: "无",
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
    .customerMang {
      margin-bottom: 10px;
    }
    .searchIpt_left {
      float: left;
    }
  }
}
</style>

