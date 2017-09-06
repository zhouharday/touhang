<template>
  <section>
    <!-- 这是消息公告页面 -->
    <div>
      <el-row class="searchBox">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button class="searchIpt" type="primary">新增</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="newsTabData" border style="width: 100%">
        <el-table-column prop="title" label="标题" align="center">
        </el-table-column>
        <el-table-column prop="publisher" label="发布人" align="center">
        </el-table-column>
        <el-table-column prop="publisherDate" label="发布日期" align="center">
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="primary" size="small" @click="handleClick">删除</el-button>
            <el-button type="primary" size="small" @click="handleClick">发布</el-button>
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
      newsTabData: [
        {
          title: '系统维护通知', //标题
          publisher: '李克强', //发布人
          publisherDate: '2017-09-10', //发布日期
          status: "已发布", //状态
          operating: "" //操作
        },
        {
          title: '系统维护通知', //标题
          publisher: '李克强', //发布人
          publisherDate: '2017-09-10', //发布日期
          status: "已发布", //状态
          operating: "" //操作
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
    .searchBox {
      margin-bottom: 10px;
    }
    .searchIpt {
      float: right;
    }
  }
}
</style>
