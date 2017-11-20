<template>
    <div class="subscriber">
        <el-row :gutter="20">
            <!-- 树形控件 -->
            <el-col :span="4">
                <div class="table-title">阿里巴巴</div>
                <el-tree :data="structure" :props="defaultProps" accordion :default-expand-all="true" class="tree" @node-click="handleNodeClick">
                </el-tree>
            </el-col>
            <!-- table页面 -->
            <el-col :span="20">
                <div class="title">
                    <div class="filter">
                        <el-form :inline="true" class="demo-form-inline">
                            <el-form-item>
                                <el-input placeholder="请输入搜索内容" icon="search" v-model="input2" :on-icon-click="handleIconClick">
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="value2" placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="btn">
                        <el-button type="danger" size="small" @click="showSubscriber">添加</el-button>
                    </div>
                </div>
                <el-table :data="subscriberData" style="width: 100%">
                    <el-table-column prop="name" label="姓名" width="180" align="center">
                        <template scope="scope">
                            {{scope.row.name}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" label="账号" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="deptName" label="部门" width="180" align="center">
                    </el-table-column>
                    <!--<el-table-column prop="role" label="所属角色" width="180">-->
                    <!--</el-table-column>-->
                    <el-table-column prop="umdisables" label="状态" width="180" align="center">
                        <template scope="scope">
                            <div v-if="scope.row.umdisables == 1">启用</div>
                            <div v-if="scope.row.umdisables == 0">锁定</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template scope="scope">
                            <el-button @click.native.prevent="editRow(scope.$index, scope.row)" type="text" size="small" style="color:#f05e5e">
                                编辑
                            </el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" type="text" size="small" style="color:#f05e5e">
                                <div v-if="scope.row.umdisables == 1">锁定</div>
                                <div v-if="scope.row.umdisables == 0">启用</div>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <!-- 添加人员 -->
        <el-dialog :title=biaoti :visible.sync="modelSubscriber" :close-on-click-modal="false">
            <el-form :rules="rules1" :model="addSubscriber" label-position="left">
                <el-row :gutter="10">
                    <el-col :span="24" class="formTitle">基本信息</el-col>
                    <el-col :span="11">
                        <el-form-item prop="account" label="账号" :label-width="formLabelWidth">
                            <div v-if="newOrChange == true">
                                <el-input placeholder="请输入账号" v-model="addSubscriber.account"></el-input>
                            </div>
                            <div v-if="newOrChange == false">{{addSubscriber.account}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item prop="name" label="姓名" :label-width="formLabelWidth" width="100">
                            <el-input placeholder="请输入账号" v-model="addSubscriber.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item prop="department" label="部门" :label-width="formLabelWidth">
                            <el-select placeholder="请选择部门" v-model="addSubscriber.department" style="width:100%;">
                                <div v-for="item in allDepartmentList" :key="item.index">
                                    <el-option :value="item.deptName">{{item.deptName}}</el-option>
                                </div>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" class="formTitle">个人信息</el-col>
                    <el-col :span="11">
                        <el-form-item prop="sex" label="性别" :label-width="formLabelWidth">
                            <el-select placeholder="请选择性别" v-model="addSubscriber.sex" style="width: 100%">
                                <el-option value="女">女</el-option>
                                <el-option value="男">男</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item prop="birthday" label="年龄" :label-width="formLabelWidth">
                            <el-select placeholder="请选择年龄" v-model="addSubscriber.birthday" style="width:100%;">
                                <div v-for="item in allAge" :key="item.index">
                                    <el-option :value="item">{{item}}</el-option>
                                </div>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item prop="cellphone" label="手机" :label-width="formLabelWidth">
                            <el-input placeholder="请输入手机号" v-model="addSubscriber.cellphone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
                            <el-input placeholder="请输入邮箱" v-model="addSubscriber.email"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="default" @click="modalIncome">取 消</el-button>
                <el-button type="danger" @click="confirmIncome">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import { getNodes } from "common/js/config";
import { getDepartmentList } from "api/system";
import { getUserlist } from "api/system";
import { openOrClose } from "api/system";
import { addNewUser } from "api/system";

export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      var pattern = /^1[34578][0-9]{9}$/;
      if (pattern.test(value) && value != "") {
        return callback();
      } else {
        return callback(new Error("请输入合法的手机号码"));
      }
    };
    var validateEmail = (rule, value, callback) => {
      var pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (pattern.test(value) && value != "") {
        return callback();
      } else {
        return callback(new Error("请输入合法的邮箱地址"));
      }
    };
    return {
      rules1: {
        account: [{ validator: validatePhone, trigger: "blur" }],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        department: [{ required: true, message: "请选择部门", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        birthday: [{ required: true, message: "请选择生日", trigger: "blur" }],
        cellphone: [{ validator: validatePhone, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }]
      },
      structure: [],
      options: [
        {
          lable: "",
          value: "所有"
        },
        {
          lable: "0",
          value: "锁定"
        },
        {
          lable: "1",
          value: "启用"
        }
      ],
      value2: "",
      subscriberData: [],
      addSubscriber: {
        account: "",
        name: "",
        department: "",
        role: "",
        sex: "",
        birthday: "",
        cellphone: "",
        email: "",
        pass: this.md5("123456", 32)
      },
      modelSubscriber: false,
      formLabelWidth: "50px",
      addId: "",
      allDepartmentList: [],
      allAge: [
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        64,
        65,
        66,
        67,
        68,
        69,
        70
      ],
      input2: "",
      newOrChange: false,
      biaoti: ""
    };
  },
  methods: {
    deleteRow(index, row) {
      var disables;
      if (row.umdisables == 0) {
        disables = 1;
      } else disables = 0;
      console.log(disables);
      openOrClose(row.umId, disables).then(res => {
        console.log(res.data);
        getUserlist(this.addId).then(res => {
          this.subscriberData = res.data.result;
          console.log(this.subscriberData);
        });
      });
    },
    showSubscriber() {
      //点击添加
      this.newOrChange = true;
      this.biaoti = "添加人员";
      this.modelSubscriber = true;
      this.addSubscriber.role = "";
      this.addSubscriber.name = "";
      this.addSubscriber.department = "";
      this.addSubscriber.sex = "";
      this.addSubscriber.birthday = "";
      this.addSubscriber.cellphone = "";
      this.addSubscriber.email = "";
      this.addSubscriber.account = "";
    },
    editRow(index, row) {
      this.biaoti = "修改信息";
      this.newOrChange = false;
      console.log(row);
      this.addSubscriber.role = row.id;
      this.addSubscriber.name = row.name;
      this.addSubscriber.department = row.deptName;
      if (row.sex == "1") this.addSubscriber.sex = "女";
      else this.addSubscriber.sex = "男";

      //            this.addSubscriber.sex = row.six
      this.addSubscriber.birthday = row.age;
      this.addSubscriber.cellphone = row.telephone;
      this.addSubscriber.email = row.emil;
      this.addSubscriber.account = row.number;
      this.modelSubscriber = true;
    },

    handleNodeClick(data) {
      this.addId = data.id;
      getUserlist(data.id).then(res => {
        this.subscriberData = res.data.result;
        console.log(this.subscriberData);
      });
    },
    confirmIncome() {
      // this.addSubscriber.cellphone = this.md5(this.addSubscriber.cellphone,32);
      if (this.checkMobile(this.addSubscriber.cellphone) == false) return;
      else {
        if (this.checkEmail(this.addSubscriber.email) == false) return;
        else {
          if (this.addSubscriber.sex == "女") this.addSubscriber.sex = 1;
          else this.addSubscriber.sex = 0;
          var depArr = this.allDepartmentList;
          depArr.forEach(item => {
            if (item.deptName == this.addSubscriber.department)
              this.addSubscriber.department = item.id;
          });
          //                    console.log(this.addSubscriber)
          var LockStatus;
          addNewUser(this.addSubscriber, this.newOrChange).then(res => {
            console.log(res);
            getUserlist("", LockStatus, this.input2).then(res => {
              this.subscriberData = [];
              this.subscriberData = res.data.result;
            });
          });
          //确认添加
          this.modelSubscriber = false;
        }
      }
    },
    checkMobile(phone) {
      var sMobile = phone;
      if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(sMobile)) {
        alert("请输入正确手机号");
        return false;
      }
    },
    checkEmail(str) {
      var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (re.test(str)) {
        return true;
      } else {
        alert("请输入正确的邮箱");
        return false;
      }
    },
    modalIncome() {
      //取消
      this.modelSubscriber = false;
    },
    handleIconClick() {
      //        alert(this.value2)
      var LockStatus; //锁定状态
      //            this.options.forEach(function (item , index) {
      //                if (item.value == this.value2)
      //                {
      //                    LockStatus = item.label
      //                }
      //            });
      getUserlist("", LockStatus, this.input2).then(res => {
        this.subscriberData = res.data.result;
      });
    }
  },
  created() {
    getDepartmentList().then(res => {
      var dataList = res.data.result;
      this.allDepartmentList = dataList;
      var treeList = getNodes(dataList);
      this.structure = treeList;
    });
    getUserlist().then(res => {
      this.subscriberData = res.data.result;
      console.log(this.subscriberData);
    });
  }
};
</script>

<style lang="less" scoped>
@import "../../common/styles/mixin.less";
.subscriber {
  .base-style();
  .tree {
    &:hover {
      box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
      border-color: transparent;
    }
  }
  .table-title {
    width: 100%;
    height: 35px;
    line-height: 35px;
    padding-left: 20px;
    background: #eef0f4;
    font-weight: bold;
    border: 1px solid #ddd;
    border-bottom: none;
  }
  .title {
    width: 100%;
    height: 42px;
    line-height: 42px;
    margin-bottom: 12px;
    display: flex;
    background: none;
    .filter {
      flex: 0 0 50%;
      padding-top: 25px;
    }
    .btn {
      flex: 0 0 50%;
      text-align: right;
    }
  }
  .formTitle {
    width: 100%;
    height: 42px;
    line-height: 42px;
    background: #eef1f6;
    margin-bottom: 12px;
  }
}
</style>
