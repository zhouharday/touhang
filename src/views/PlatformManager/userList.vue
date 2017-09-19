<template>
  <section>
    <!-- 这是用户列表页面 -->
    <div>
      <el-row class="searchBox">
        <el-col :span="4" class="searchIpt">
          <div class="grid-content bg-purple-dark">
            <el-input placeholder="" icon="search" v-model="input2" :on-icon-click="handleIconClick">
            </el-input>
          </div>
        </el-col>
      </el-row>
      <div class="roleMang_tab">
        <el-row>
          <el-col :span="6" class="roleMang_tab_boder">
            <div class="grid-content bg-purple-dark">
              <el-button @click="addTab" type="primary" size="small" class="addBtn">添加</el-button>
            </div>
          </el-col>
          <el-col :span="6" class="roleMang_tab_boder">
            <div class="grid-content bg-purple-dark">
            </div>
          </el-col>
          <el-col :span="6" class="roleMang_tab_boder">
            <div class="grid-content bg-purple-dark">
              <span>状态: {{status}}</span>
            </div>
          </el-col>
          <el-col :span="6" class="roleMang_tab_boder">
            <div class="grid-content bg-purple-dark">
              <el-select v-model="status" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- Add userListFormData Diglog  -->
      <el-dialog title="添加用户" :visible.sync="userListDialogFormVisible">
        <el-form :model="userListFormData" ref="userListFormData" class="userListFormData">
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="addPeople" label="添加人员" :label-width="formLabelWidth">
                  <el-input v-model="userListFormData.addPeople" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <div class="inforBackg">基本信息</div>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="account" label="账号" :label-width="formLabelWidth">
                  <el-input v-model="userListFormData.account" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="userName" label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="userListFormData.userName" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="rolePeople" label="角色" :label-width="formLabelWidth">
                  <el-select v-model="userListFormData.rolePeople" placeholder="请选择" size="120%">
                    <el-option v-for="item in roleSelect" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <div class="inforBackg">个人信息</div>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="gender" label="性别" :label-width="formLabelWidth">
                  <el-select v-model="userListFormData.gender" placeholder="请选择" size="100%">
                    <el-option v-for="item in gender" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="birthday" label="生日" :label-width="formLabelWidth">
                  <el-input v-model="userListFormData.birthday" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="phoneNumber" label="手机" :label-width="formLabelWidth">
                  <el-input v-model="userListFormData.phoneNumber" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
                  <el-input v-model="userListFormData.email" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userListDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="pushRolTabData_L">确 定</el-button>
        </div>
      </el-dialog>

      <el-row :gutter="20">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
      </el-row>
      <el-table id="userListTabData" :data="userListTabData" style="width: 100%" ref="userListTabData">
        <el-table-column prop="userName" label="姓名" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.userName }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.userName" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="账号" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.account }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.account" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.email }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.email" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button :disabled="scope.row.locked == true" v-if="!scope.row.editFlag" @click="editUserListTabData(scope.$index,scope.row)" type="primary" size="small">编 辑</el-button>
            <el-button v-if="scope.row.editFlag" @click="editUserListTabData(scope.$index,scope.row)" type="primary" size="small">保 存</el-button>
            <el-button @click="checkLocking(scope.$index,scope.row)" type="primary" size="small">锁 定</el-button>
            <el-button @click="checkLocking(scope.$index,scope.row)" type="primary" size="small">启 用</el-button>
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
      locked: false, //是否锁定
      isDisabled: false, //是否禁用按钮
      status: '所有',
      options: [{
        value: '所有',
        label: '所有'
      }, {
        value: '启用',
        label: '启用'
      }, {
        value: '锁定',
        label: '锁定'
      }],
      userListTabData: [
        {
          userName: "习近平",
          account: "12564998525215",
          email: "12345678@qq.com",
          editFlag: false,
          locked: false,
        }
      ],
      userListFormData: { //添加用户信息 form list
        userName: "", //姓名
        account: "", //账号
        email: "", //邮箱
        addPeople: "", //添加人员
        rolePeople: "", //角色
        gender: "", //性别
        birthday: "", //生日
        phoneNumber: "", //手机
        editFlag: false,
        locked: false,
      },
      userListDialogFormVisible: false, //Diglog
      roleSelect: [{ //角色 selectList
        value: '黄金糕',
        label: '黄金糕'
      }, {
        value: '双皮奶',
        label: '双皮奶'
      }, {
        value: '蚵仔煎',
        label: '蚵仔煎'
      }, {
        value: '龙须面',
        label: '龙须面'
      }, {
        value: '北京烤鸭',
        label: '北京烤鸭'
      }],
      role: '',
      gender: '',
      gender: [
        {
          value: '0',
          label: '男'
        },
        {
          value: '1',
          label: '女'
        },
      ],
      formLabelWidth: '',
      formSelectLabelWidth: 200,
    }
  },
  methods: {
    addTab() { //添加
      // alert(1);
      let new_userListFormData = {
        userName: "", //姓名
        account: "", //账号
        email: "", //邮箱
        addPeople: "", //添加人员
        rolePeople: "", //角色
        gender: "", //性别
        birthday: "", //生日
        phoneNumber: "", //手机
        editFlag: false,
        locked: false,
      };
      this.userListFormData = new_userListFormData;
      this.userListDialogFormVisible = true;
      // console.log('下面这个error(resetFields) 可以忽略!!!');
      // this.$refs.userListFormData.resetFields();
    },
    pushRolTabData_L() { //确定
      this.userListTabData.push(this.userListFormData);
      // console.log(this.userListFormData.rolePeople);
      this.userListFormData = {};
      this.userListDialogFormVisible = false;
    },
    editUserListTabData(index, row) { //编辑
      if (row.locked == false) {
        row.editFlag = !row.editFlag;
      }
    },
    // saveUserListTabData(index, row) { //保存
    //   row.editFlag = false;
    // },
    checkLocking(index,row) { //锁定
      row.locked = !row.locked;
    },
  }
}
</script>

<style lang="less" scoped>
section {
  >div {
    padding: 24px;
    background: #ffffff;
    overflow: hidden;
    .searchBox {
      margin-bottom: 10px;
    }
    .searchIpt {
      float: right;
    }
    .roleMang_tab {
      .roleMang_tab_boder {
        // border: 1px solid #cccccc;
        margin-bottom: 10px;
        height: 40px;
        line-height: 40px;
      }
    }
    .userListFormData {
      .inforBackg {
        height: 40px;
        line-height: 40px;
        background: #eff2f7;
      }
    }
  }
}
</style>
