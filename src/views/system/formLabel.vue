
<template>
        <section  class="zhibiao">
                <div  style="display:  flex;justify-content:  flex-end;  margin-right:  15px;margin-bottom:  10px">
                        <el-button  size="small"  @click="addNew">添加</el-button>
                </div>
                <el-table  :data="zhibiaoData"  border  style="width:  100%"  >
                        <el-table-column  prop="fieldName"  label="指标名称"  align="center">
                                <template  scope  =  "scope">
                                        <span  v-if="!scope.row.editFlag">{{  scope.row.fieldName  }}</span>
                                        <span  v-if="scope.row.editFlag"  class="cell-edit-input">
                                                <el-input  v-model="scope.row.fieldName"></el-input>
                                        </span>
                                </template>
                        </el-table-column>
                        <el-table-column  prop="userName"  label="添加人"  align="center">
                        </el-table-column>
                        <el-table-column  prop="addDate"  label="添加时间"  align="center">
                        </el-table-column>
                        <el-table-column  prop="projectTypeId"  label="操作"  align="center">
                                <template  scope  =  "scope">
                                        <el-button  v-if="!scope.row.editFlag"  type="text"  size="small"  @click="checkEdit(scope.$index,scope.row)">编辑
                                        </el-button>
                                        <el-button  v-if="scope.row.editFlag"  type="text"  size="small"  @click="checkEdit(scope.$index,scope.row)">保存
                                        </el-button>
                                        <el-button  type="text"  size="small"  @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                                </template>
                        </el-table-column>
                </el-table>
                <el-dialog  title="添加指标名称"  :visible.sync="roleDialog">
                        <el-form  :model="zhibiaoForm">
                                <el-form-item  label="指标名称"  prop="role"  label-width="80px">
                                        <el-input  v-model="zhibiaoForm.zhibiaoName"  auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item  label="指标顺序"  prop="role"  label-width="80px">
                                        <el-input  v-model="zhibiaoForm.sort"  auto-complete="off"  type="number"></el-input>
                                </el-form-item>
                        </el-form>
                        <div  slot="footer"  class="dialog-footer">
                                <el-button  @click="roleDialog  =  false">取  消</el-button>
                                <el-button  type="danger"  @click="addnewzhibiao">确  定</el-button>
                        </div>
                </el-dialog>
        </section>
</template>
<script>
import { zhibiaolist } from "api/system";
import { addzhibiao } from "api/system";
import { editzhibiao } from "api/system";
import { reloadQueryData } from "api/system";
import { deletezhibiao } from "api/system";

export default {
  data() {
    return {
      zhibiaoData: [],
      formId: "",
      deleteReminders: false,
      modal_loading: false,
      zhibiaoForm: {
        zhibiaoName: "",
        sort: "",
        editFlag: false
      },
      roleDialog: false,
      editOrNew: true
    };
  },
  methods: {
    //点添加
    addNew() {
      this.roleDialog = true;
      this.zhibiaoForm = {
        zhibiaoName: "",
        sort: "",
        id: "",
        editFlag: false
      };
      this.editOrNew = false;
    },
    //编辑
    checkEdit(index, row) {
      this.roleDialog = true;
      this.zhibiaoForm = {
        zhibiaoName: row.fieldName,
        sort: row.sort,
        id: row.id
      };
      if(!this.zhibiaoForm.sort)
        this.zhibiaoForm.sort = '0';
      this.editOrNew = true;
      //                row.editFlag = !row.editFlag;
      //                if (!row.editFlag) {
      //                    //保存
      //                    editzhibiao(this.formId,row.id,row.fieldName).then((res)=>{
      //                    })
      //                }
    },
    //删除
    handleDelete(index, row) {
      deletezhibiao(row.id).then(res => {
        if (res.data.status == "200") {
            zhibiaolist().then(res => {
              this.zhibiaoData = reloadQueryData(res.data.result.formLabels);
            });
        }else {
            console.log(res);
            this.$Message.error(res.data.message);
        }
      });
    },
    addnewzhibiao() {
      if (this.editOrNew == true) {
        editzhibiao(
          this.formId,
          this.zhibiaoForm.id,
          this.zhibiaoForm.zhibiaoName,
          this.zhibiaoForm.sort
        ).then(res => {
          this.roleDialog = false;
          zhibiaolist().then(res => {
            this.zhibiaoData = reloadQueryData(res.data.result.formLabels);
          });
        });
      } else {
        if (this.roleDialog == true) {
          this.roleDialog = false;
          addzhibiao(
            this.formId,
            this.zhibiaoForm.zhibiaoName,
            this.zhibiaoForm.sort
          ).then(res => {
            if (res.data.status == "200") {
              zhibiaolist().then(res => {
                this.zhibiaoData = reloadQueryData(res.data.result.formLabels);
              });
            }
          });
        }
      }
    }
  },
  created() {
    zhibiaolist().then(res => {
      console.log(res);
      this.formId = res.data.result.formId;
      this.zhibiaoData = reloadQueryData(res.data.result.formLabels);
    });
    //            addzhibiao().then((res)=>{
    //                console.log(res)
    //            })
  }
};
</script>
<style lang="less" scoped>
@import "../../common/styles/variable.less";
.zhibiao {
  width: 100%;
  height: 100%;
  padding: 24px;
  background: @color-base;
  .addPadding {
    padding-bottom: 12px;
  }
  .page {
    padding: 24px 0;
    text-align: right;
  }
}
</style>