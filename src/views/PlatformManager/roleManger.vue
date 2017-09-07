<template>
  <section>
    <!-- 这是角色管理 -->
    <div>
      <el-button type="primary" class="addBtn">添加</el-button>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-table :data="rolTabData_L" border style="width: 100%" align="center">
              <el-table-column prop="roleName" label="角色名称" width="" align="center">
              </el-table-column>
              <el-table-column prop="operating" label="操作" width="" align="center">
                <template scope="scope">
                  <el-button @click="edit" type="text" size="small">编辑</el-button>
                  <el-button @click="remove" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <el-table :data="rolTabData_R" border style="width: 100%" align="center">
              <el-table-column prop="roleName" label="权限名称名称" width="" align="center">
              </el-table-column>
              <el-table-column prop="operating" label="操作" width="" align="center">
                
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
      rolTabData_L: [
        { roleName: "系统管理员", operating: "" },
        { roleName: "管理员", operating: "" },
        { roleName: "普通用户", operating: "" },
      ],
      rolTabData_R: [
        { roleName: "菜单管理", operating: "" },
        { roleName: "角色管理", operating: "" },
        { roleName: "消息公告", operating: "" },
        { roleName: "客户管理", operating: "" },
        { roleName: "客户权限", operating: "" },
        { roleName: "账号管理", operating: "" },
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
    .addBtn{
      margin-bottom: 10px;
    }
  }
}
</style>
