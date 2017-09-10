<template>
  <section>
    <!-- 这是角色管理 -->
    <div id="roleManger">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" class="addBtn" @click="addBtn">添加</el-button>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-dark">
            <div>角色权限</div>
          </div>
        </el-col>
      </el-row>
      <!-- 角色管理 Dialog -->
      <el-dialog title="添加角色" :visible.sync="rolFormDialog">
        <el-form :model="rolFormData_L" ref="rolFormData_L">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="rolFormData_L.roleName" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="rolFormDialog = false">取 消</el-button>
          <el-button type="primary" @click="pushRolTabData_L">确 定</el-button>
        </div>
      </el-dialog>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-table @cell-click="roleEdit(row, column, cell, event)" :data="rolTabData_L" border style="width: 100%" align="center">
              <el-table-column prop="roleName" label="角色名称" width="" align="center">
                <template scope="scope">
                  <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.roleName }}</span>
                  <span v-if="scope.row.editFlag" class="cell-edit-input">
                    <el-input v-model="scope.row.roleName" placeholder=""></el-input>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="" align="center">
                <template scope="scope" v-show=" scope.$index != '0' ">
                  <el-button v-if="!scope.row.editFlag" v-show="scope.$index != '0'" @click="editSelecttionTab(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
                  <el-button v-if="scope.row.editFlag" v-show="scope.$index != '0'" @click="saveSelecttionTab(scope.$index,scope.row)" type="text" size="small">保存</el-button>
                  <el-button v-show="scope.$index != '0'" @click="remove(scope.$index,rolTabData_L)" type="text" size="small">删除</el-button>
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
            <el-table @selection-change="handleSelectionChange" ref="multipleTable" :show-header="false" :data="rolTabData_R" border style="width: 100%" align="center">
              <el-table-column prop="roleName" label="权限名称" width="" align="center">
              </el-table-column>
              <!-- <el-table-column prop="operating" label="操作" width="" align="center">
                                                  </el-table-column> -->
              <el-table-column :selectable="checkSelectable" type="selection" width="" align="center">
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
  mounted() {
    this.rolTabData_R.forEach(row => {
      this.$refs.multipleTable.toggleRowSelection(row);
    })
  },
  data() {
    return {
      rolTabData_L: [
        { roleName: "系统管理员", editFlag: false },
        { roleName: "管理员", editFlag: false },
        { roleName: "普通用户", editFlag: false },
      ],
      rolFormDialog: false,
      rolFormData_L: { roleName: "", editFlag: false },
      rolTabData_R: [
        { roleName: "菜单管理", check: false },
        { roleName: "角色管理", check: false },
        { roleName: "消息公告", check: false },
        { roleName: "客户管理", check: false },
        { roleName: "客户权限", check: false },
        { roleName: "账号管理", check: false },
      ],
      multipleSelection: [],
      // isCheck: true

    }
  },
  methods: {
    roleEdit(row, column, cell, event) {
      // alert(1001);
      this.rolTabData_R.forEach(item => {
        item.check = true;
      });
    },
    pushRolTabData_L() { //确定
      this.rolTabData_L.push(this.rolFormData_L);
      this.rolFormData_L = {};
      this.rolFormDialog = false;
    },
    addBtn() { //添加
      // alert(111);
      this.rolFormDialog = true;
      console.log('下面这个error(resetFields) 可以忽略!!!');
      this.$refs.rolFormData_L.resetFields();
    },
    remove(index, rows) { //删除
      rows.splice(index, 1);
    },
    editSelecttionTab(index, row) { //编辑
      row.editFlag = true;
    },
    saveSelecttionTab(index, row) { //保存
      row.editFlag = false;
    },
    handleSelectionChange(val) { //选中的数据
      this.multipleSelection = val;
      // console.log(val);
    },
    checkSelectable(row) {
      // alert(1001);
      return row.check != false;
    }
  },
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
      cursor: pointer;
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
