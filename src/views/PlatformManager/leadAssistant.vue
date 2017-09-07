<template>
  <section>
    <!-- 这是领头助手页面 -->
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
            <el-button class="searchIpt" type="primary">添加</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="leadTabData" border style="width: 100%">
        <el-table-column prop="projectName" label="项目名称" width="180">
        </el-table-column>
        <el-table-column prop="industry" label="行业" width="180">
          <template scope="scope">

          </template>
        </el-table-column>
        <el-table-column prop="rounds" label="轮次">
        </el-table-column>
        <el-table-column prop="lastCast" label="上轮获投">
        </el-table-column>
        <el-table-column prop="location" label="所在地">
        </el-table-column>
        <el-table-column prop="established" label="成立时间">
        </el-table-column>
        <el-table-column prop="numberAdditions" label="加入次数">
        </el-table-column>
        <el-table-column prop="status" label="状态">
        </el-table-column>
        <el-table-column prop="sharesNumber" label="分享次数">
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template scope="scope">
            <el-button @click="remove" type="text" size="small">隐藏/显示</el-button>
            <el-button @click="remove" type="text" size="small">删除</el-button>
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
      leadTabData: [
        {
          projectName: '鹿战',
          industry: '',
          rounds: '',
          lastCast: '',
          location: '',
          established: '',
          numberAdditions: '',
          status: '隐藏',
          sharesNumber: ''
        },
        {
          projectName: '3188',
          industry: '',
          rounds: '',
          lastCast: '',
          location: '',
          established: '',
          numberAdditions: '',
          status: '发布',
          sharesNumber: ''
        },
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
    .searchIpt {
      float: right;
    }
  }
}
</style>
