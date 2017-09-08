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
            <el-row :gutter="0" class="roleName">
              <el-col :span="15" class="roleName_spanBoder">
                <div class="grid-content bg-purple-dark">
                  权限名称
                </div>
              </el-col>
              <el-col :span="9" class="roleName_spanBoder">
                <div class="grid-content bg-purple-dark">
                  操作
                </div>
              </el-col>
            </el-row>
            <el-table :show-header="false" :data="rolTabData_R" border style="width: 100%" align="center">
              <el-table-column prop="roleName" label="权限名称" width="" align="center">
              </el-table-column>
              <!-- <el-table-column prop="operating" label="操作" width="" align="center">
                      </el-table-column> -->
              <el-table-column type="selection" width="" align="center">
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
    .addBtn {
      margin-bottom: 10px;
    }
    .roleName {
      height: 40px;
      background: #eef1f6;
      line-height: 40px;
      border: 1px solid #dfe6ec;
      box-sizing: border-box;
      border-bottom: none;
      color: #1f2d3d;
    }
    .roleName_spanBoder {
      text-align: center;
    }
  }
}
</style>
