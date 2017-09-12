<template>
  <section>
    <!-- 这是客户权限页面 -->
    <div>
      <el-row class="customerMang">
        <el-col :span="6" class="searchIpt_left">
          <div class="grid-content bg-purple-dark">
            <el-button @click="addCustomer" class="searchIpt_left" type="primary">添加</el-button>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
        <el-col :span="8" class="searchIpt">
          <div class="grid-content bg-purple-dark">
            <el-button class="searchIpt" type="primary">保存</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 新增客户 Dialog Start -->
      <el-dialog title="新增客户" :visible.sync="customerDialogFormVisible">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-form :model="customerFormData_L" :rules="customerFormData_L" ref="customerFormData_L" label-width="100px" class="demo-ruleForm">
                <el-form-item label="客户类型" prop="checkPass">
                  <el-select v-model="customerFormData_L.FreeType" clearable placeholder="请选择">
                    <el-option v-for="item in customerFormData_options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="customerDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="customerDialogFormPush">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 新增客户 Dialog End -->
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-table :data="customerTabData_L" border style="width: 100%" align="center">
              <el-table-column prop="FreeType" label="客户类型" width="" align="center">
                <template scope="scope">
                  <span class="cursor" @click="roleEdit(row, column, cell, event)" v-if="!scope.row.editFlag">{{ scope.row.FreeType }}</span>
                  <span v-if="scope.row.editFlag" class="cell-edit-input">
                    <el-input v-model="scope.row.FreeType" placeholder=""></el-input>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="" align="center">
                <template scope="scope">
                  <el-button v-if="!scope.row.editFlag" @click="edit(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
                  <el-button v-if="scope.row.editFlag" @click="edit(scope.$index,scope.row)" type="text" size="small">保存</el-button>
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
            <el-table :show-header="false" @selection-change="handleSelectionChange" :data="customerTabData_R" ref="customerTabData_R" border style="width: 100%" align="center">
              <el-table-column prop="roleName" label="权限名称名称" width="" align="center">
              </el-table-column>
              <el-table-column label="操作" :selectable="checkSelectable" type="selection" width="" align="center">
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
    this.customerTabData_R.forEach(row => {
      this.$refs.customerTabData_R.toggleRowSelection(row);
    })
  },
  data() {
    return {
      customerTabData_L: [
        { FreeType: "免费", editFlag: false },
        { FreeType: "年费", editFlag: false },
        { FreeType: "永久", editFlag: false },
      ],
      customerFormData_L: { FreeType: "", editFlag: false },
      customerFormData_options: [
        {
          value: '免费',
          label: '免费',
          FreeType: "",
          editFlag: false
        },
        {
          value: '年费',
          label: '年费',
          editFlag: false
        },
        {
          value: '永久',
          label: '永久',
          editFlag: false
        }
      ],
      customerTabData_R: [
        { roleName: "菜单管理", check: false },
        { roleName: "角色管理", check: false },
        { roleName: "消息公告", check: false },
        { roleName: "客户管理", check: false },
        { roleName: "客户权限", check: false },
        { roleName: "账号管理", check: false },
      ],
      customerSelectValue: '', //客户类型
      checked: true,
      customerDialogFormVisible: false,
    }
  },
  methods: {
    addCustomer() { //新增客户类型
      let new_customerFormData_L = {
        FreeType: "", editFlag: false
      };
      this.customerFormData_L = new_customerFormData_L;
      this.customerDialogFormVisible = true;
    },
    edit(index, row) { //编辑
      row.editFlag = !row.editFlag;
    },
    customerDialogFormPush() { //保存
      this.customerTabData_L.push(this.customerFormData_L);
      this.customerFormData_L = {};
      this.customerDialogFormVisible = false;
    },
    roleEdit(row, column, cell, $event) {
      this.customerTabData_R.forEach(item => {
        item.check = true;
      })
    },
    handleSelectionChange(val) { //选中的数据
      this.multipleSelection = val;
      // console.log(val);
    },
    checkSelectable(row) {
      // alert(1001);
      return row.check != false;
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
