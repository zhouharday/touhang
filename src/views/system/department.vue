<template>
  <div class="department">
    <div class="titles">
      <el-button type="danger" @click="addDepartment" size="small">
        <Icon type="plus-round"></Icon>
        添加
      </el-button>
    </div>
    <div class="table_wrapper">
      <el-table :data="currentData" style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <el-row>
              <el-col v-for="(item, index) in props.row.children" :key="item">
                <el-row :gutter="20">
                  <el-col :span="13" class="item">
                    <span class="add_margin" v-if="!item.editFlag">{{item.deptName}}</span>
                    <span class="add_margin" v-if="item.editFlag">
                      <el-input v-model="item.deptName"></el-input>
                      <!--{{item.deptName}}-->
                    </span>
                  </el-col>
                  <el-col :span="11" class="item">
                    <!--<span class="add_margin">{{item.desc}}</span>-->
                    <el-button size="small" @click="moveUp(item)">
                      <Icon type="ios-arrow-thin-up"></Icon>
                    </el-button>
                    <el-button size="small" @click="moveDown(item)">
                      <Icon type="ios-arrow-thin-down"></Icon>
                    </el-button>
                    <el-button size="small" @click="editClick(item)" v-if="!item.editFlag">
                      编辑
                    </el-button>
                    <el-button size="small" @click="editClick(item)" v-if="item.editFlag">
                      保存
                    </el-button>
                    <el-button size="small" @click="deleteClick(item)">
                      删除
                    </el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="deptName">
          <template scope="scope">
            <span class="add_margin" v-if="!scope.row.editFlag">{{scope.row.deptName}}</span>
            <span class="add_margin" v-if="scope.row.editFlag">
              <el-input v-model="scope.row.deptName"></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <!--<el-button size="small" @click="moveUp(scope.row)">-->
            <!--<Icon type="ios-arrow-thin-up"></Icon>-->
            <!--</el-button>-->
            <!--<el-button size="small" @click="moveDown(scope.row)">-->
            <!--<Icon type="ios-arrow-thin-down"></Icon>-->
            <!--</el-button>-->
            <el-button size="small" @click="editClick(scope.row)" v-if="!scope.row.editFlag">
              编辑
            </el-button>
            <el-button size="small" @click="editClick(scope.row)" v-if="scope.row.editFlag">
              保存
            </el-button>
            <el-button size="small" @click="deleteClick(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加部门模态框 -->
    <el-dialog title="添加部门" :visible.sync="department" :close-on-click-modal="false">
      <el-form :model="departmentData" label-position="left">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="上级" :label-width="formLabelWidth">
              <el-select v-model="departmentData.superior" clearable placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="部门名称" :label-width="formLabelWidth">
              <el-input v-model="departmentData.department" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="department = false">取 消</el-button>
        <el-button type="danger" @click="confirmIncome">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除确认弹框 -->
    <delete-reminders :deleteReminders="deleteReminders" :message="message" :modal_loading="modal_loading" @del="confirmDel" @cancel="deleteReminders=false">
    </delete-reminders>
  </div>
</template>

<script>
import { getNodes } from "common/js/config";
import { addEdit } from "api/system";
import { getDepartmentList } from "api/system";
import { addNewDepartment } from "api/system";
import { SetDepartment } from "api/system";
import { deletDepartment } from "api/system";
import { moveDepartment } from "api/system";
// import Input from "../../../node_modules/iview/src/components/input/input.vue";
// import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
import deleteReminders from "components/deleteReminders";
export default {
  components: {
    // ElInput,
    // Input,
    deleteReminders
  },
  data() {
    return {
      deleteReminders: false,
      message_title: "确认删除",
      message: "是否确认删除该部门？",
      btnText: "删除",
      companyName: "",
      currentData: [],
      department: false,
      formLabelWidth: "120px",
      departmentData: {
        superior: "",
        department: ""
      },
      options: [],
      deleteId: ""
    };
  },
  methods: {
    moveUp(row) {
      console.log(row);
      moveDepartment(row.id, "up")
        .then(res => {
          console.log("*****");
          console.log(res);
          getDepartmentList().then(res => {
            var dataList = addEdit(res.data.result);
            var treeList = getNodes(dataList);
            this.currentData = treeList;
            this._getDepartmentName(this.currentData);
          });
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    moveDown(row) {
      moveDepartment(row.id, "down").then(res => {
        console.log("*****");
        console.log(res);
        getDepartmentList()
          .then(res => {
            var dataList = addEdit(res.data.result);
            var treeList = getNodes(dataList);
            this.currentData = treeList;
            this._getDepartmentName(this.currentData);
          })
          .catch(error => {
            this.$Message.error("请求超时");
          });
      });
    },
    addDepartment() {
      this.department = true;
    },
    confirmIncome() {
      // 方法不完善
      console.log(this.departmentData);
      this.department = false;
      addNewDepartment(
        this.departmentData.department,
        this.departmentData.superior
      )
        .then(res => {
          console.log(res);
            if (res.data.status == 200){

            } else {
                this.$Message.error(res.data.message);
            }
          getDepartmentList().then(res => {
            var dataList = addEdit(res.data.result);
            var treeList = getNodes(dataList);
            this.currentData = treeList;
            this._getDepartmentName(this.currentData);
            this.departmentData.department = "";
            this.departmentData.superior = "";
            //this.myFund = res.data.result.list
          });
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    editClick(item) {
      console.log(item);
      if (item.editFlag == true) {
        console.log(item.deptName);
        /***********************/
        SetDepartment(item.deptName, item.parentId, item.id)
          .then(res => {
              if (res.data.status == 200){

              } else {
                  this.$Message.error(res.data.message);
              }
              getDepartmentList()
                  .then(res => {
                      var dataList = addEdit(res.data.result);
                      var treeList = getNodes(dataList);
                      this.currentData = treeList;
                      this._getDepartmentName(this.currentData);
                  })
                  .catch(error => {
                      this.$Message.error("请求超时");
                  });
          })
          .catch(error => {
            this.$Message.error("请求超时");
          });
      }
      item.editFlag = !item.editFlag;
    },
    _getDepartmentName(arr) {
      let result = [];
      var a = [
        {
          deptName: JSON.parse(sessionStorage.getItem("merchants"))[0]
            .merchant_name,
          id: ""
        }
      ];
      arr = a.concat(arr);
      arr.map(x => {
        result.push({
          label: x.deptName,
          value: x.id
        });
      });
      return (this.options = result);
    },
    deleteClick(item) {
      console.log(item);
      this.deleteReminders = !this.deleteReminders;
      this.deleteId = item.id;
    },
    //确认删除
    confirmDel() {
      deletDepartment(this.deleteId)
        .then(res => {
          getDepartmentList().then(res => {
            this.deleteReminders = !this.deleteReminders;
            var dataList = addEdit(res.data.result);
            var treeList = getNodes(dataList);
            this.currentData = treeList;
            this._getDepartmentName(this.currentData);
          });
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    getDepartmentListClick() {
      this.$http
        .post(this.api + "/sysDept/queryList", {
          merchantId: JSON.parse(sessionStorage.getItem("merchants"))[0].id
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log('*****');
              console.log(res.data);
              var dataList = addEdit(res.data.result);
              var treeList = getNodes(dataList);
              this.currentData = treeList;
              this._getDepartmentName(this.currentData);
            } else {
              this.$Message.error(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    }
  },
  created() {
    this.companyName = JSON.parse(
      sessionStorage.getItem("merchants")
    )[0].merchant_name;
    // getDepartmentList()
    //   .then(res => {
    //     var dataList = addEdit(res.data.result);
    //     var treeList = getNodes(dataList);
    //     this.currentData = treeList;
    //     this._getDepartmentName(this.currentData);
    //   })
    //   .catch(error => {
    //     this.$Message.error("请求超时");
    //   });
    this.getDepartmentListClick();
  }
};
</script>

<style lang="less" scoped>
@import "../../common/styles/mixin.less";
.department {
  .base-style();
  .titles {
    width: 100%;
    height: 42px;
    line-height: 42px;
    flex: 1;
    text-align: right;
    background: none;
    > button {
      float: right;
    }
  }
  .title1 {
    width: 40%;
    height: 42px;
    line-height: 42px;
    flex: 1;
    text-align: left;
  }
  .table_wrapper {
    padding: 12px 0;
    .item {
      padding: 12px 0;
      color: #99a9bf;
      .add_margin {
        padding-left: 48px;
      }
    }
  }
}
</style>
