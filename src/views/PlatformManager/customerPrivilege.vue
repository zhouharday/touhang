<template>
  <section>
    <!-- 这是客户权限页面 -->
    <div>
      <el-row class="customerMang">
        <el-col :span="6" class="searchIpt_left">
          <div class="grid-content bg-purple-dark">
            <el-button class="searchIpt_left" type="primary">添加</el-button>
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
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-table :data="customerTabData_L" border style="width: 100%" align="center">
              <el-table-column prop="customerType" label="客户类型" width="" align="center">
              </el-table-column>
              <el-table-column prop="operating" label="操作" width="" align="center">
                <template scope="scope">
                  <el-button @click="edit" type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <el-table :data="customerTabData_R" border style="width: 100%" align="center">
              <el-table-column prop="roleName" label="权限名称名称" width="" align="center">
              </el-table-column>
              <el-table-column prop="operating" label="操作" width="" align="center">
                <template scope="scope">
                  <el-checkbox v-model="checked"></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      customerTabData_L: [
        { customerType: "免费", operating: "" },
        { customerType: "年费", operating: "" },
        { customerType: "永久", operating: "" },
      ],
      customerTabData_R: [
        { roleName: "菜单管理", operating: "" },
        { roleName: "角色管理", operating: "" },
        { roleName: "消息公告", operating: "" },
        { roleName: "客户管理", operating: "" },
        { roleName: "客户权限", operating: "" },
        { roleName: "账号管理", operating: "" },
      ],
      checked: true
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
    .customerMang {
      margin-bottom: 10px;
    }
    .searchIpt {
      float: right;
      margin-right: 10%;
    }
  }
}
</style>
