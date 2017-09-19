<template>
  <section>
    <!-- 这是客户管理页面 -->
    <div>
      <el-row class="customerMang">
        <el-col :span="6">
          <div class="grid-content bg-purple-dark">
            <el-input placeholder="" icon="search" v-model="input2" :on-icon-click="handleIconClick">
            </el-input>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
        <el-col :span="8" class="searchIpt">
          <div class="grid-content bg-purple-dark">
            <el-button @click="addCustomer" class="searchIpt" type="primary">新增客户</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 新增客户信息 Dialog -->
      <el-dialog title="新增客户" :visible.sync="addCustomerDialogFormVisible">
        <el-form class="addCustomerFormData" :model="addCustomerFormData" ref="addCustomerFormData">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <div class="inforBackg">客户信息</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="clientName" label="客户名称(企业名称)" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.clientName" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="account" label="账号" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.account" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="openDate" label="开通日期" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.openDate" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="expiryDate" label="到期日期" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.expiryDate" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="officeAddress" label="办公地址" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.officeAddress" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="companyEmail" label="公司邮箱" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.companyEmail" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="contactPerson" label="联系人" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.contactPerson" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="contactPhone" label="联系电话" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.contactPhone" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="type" label="类型" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.type" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="relatedDoc" label="相关文档" :label-width="formLabelWidth">
                  <el-upload class="upload-demo" drag action="addCustomerFormData.relatedDoc" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或
                      <em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="remarks" label="备注" :label-width="formLabelWidth">
                  <el-input type="textarea" autosize placeholder="请输入内容" v-model="addCustomerFormData.remarks">
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <div class="inforBackg">企业详情</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="uscc" label="*统一社会信用代码" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.uscc" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="legalRepresen" label="*法人代表" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.legalRepresen" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="lrIDNumber" label="*法人代表身份证号" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.lrIDNumber" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="address" label="*详细地址" :label-width="formLabelWidth">
                  <el-input type="textarea" autosize placeholder="请输入内容" v-model="addCustomerFormData.address">
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addCustomerDialogFormVisible = false">关 闭</el-button>
          <el-button type="primary" @click="saveCustomerDialogForm">保 存</el-button>
        </div>
      </el-dialog>
      <!-- 新增客户信息 Dialog End -->
      <el-table :data="addCustomerTabData" border style="width: 100%">
        <el-table-column prop="clientName" label="客户名称" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.clientName }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.clientName" placeholder=""></el-input>
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
        <el-table-column prop="openDate" label="开通日期" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.openDate }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.openDate" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="expiryDate" label="到期日期" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.expiryDate }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.expiryDate" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.type }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.type" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">

        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button v-if="!scope.row.editFlag" :disabled="scope.row.status == '锁定'" @click="Edit(scope.$index,scope.row)" type="text" size="small">编 辑</el-button>
            <el-button v-if="scope.row.editFlag" @click="Edit(scope.$index,scope.row)" type="text" size="small">保 存</el-button>
            <el-button @click="locking(scope.$index,scope.row)" type="text" size="small">锁 定 &nbsp;&nbsp;/</el-button>
            <el-button @click="Enabled(scope.$index,scope.row)" type="text" size="small">启 用</el-button>
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
      addCustomerTabData: [],
      addCustomerFormData: {
        clientName: '', //客户名称
        account: '', //账号
        openDate: '', //开通日期
        expiryDate: '', //到期日期
        type: '', //类型
        status: '启用', //状态
        officeAddress: "", //办公地址
        companyEmail: "", //公司邮箱
        contactPerson: "", //联系人
        contactPhone: "", //联系电话
        relatedDoc: "", //相关文档
        remarks: "", //备注
        uscc: "", //*统一社会信用代码
        legalRepresen: "", //法人代表
        lrIDNumber: "", //法人代表身份证号
        address: "", //*详细地址
        editFlag: false, //是否可编辑
      },
      isDisabled: false,
      locked: false,
      addCustomerDialogFormVisible: false,
    }
  },
  methods: {
    NewObj(){

    },
    addCustomer() { //Add 新客户
      // let new_addCustomerFormData = {
      //     clientName: '', //客户名称
      //     account: '', //账号
      //     openDate: '', //开通日期
      //     expiryDate: '', //到期日期
      //     type: '', //类型
      //     status: '启用', //状态
      //     officeAddress: "", //办公地址
      //     companyEmail: "", //公司邮箱
      //     contactPerson: "", //联系人
      //     contactPhone: "", //联系电话
      //     relatedDoc: "", //相关文档
      //     remarks: "", //备注
      //     uscc: "", //*统一社会信用代码
      //     legalRepresen: "", //法人代表
      //     lrIDNumber: "", //法人代表身份证号
      //     address: "", //*详细地址
      //     editFlag: false
      //   };
      // for( let i in this.addCustomerFormData ){
      //   this.addCustomerFormData[i] = '';
      // }
      // for( let i in new_addCustomerFormData ){
      //   new_addCustomerFormData[i] = '';
      // }
      let new_addCustomerFormData = new Object;
      new_addCustomerFormData = this.addCustomerFormData;
      // console.log(this.addCustomerFormData);
      // console.log(this.addCustomerFormData);
      this.addCustomerFormData = new_addCustomerFormData;
      this.addCustomerDialogFormVisible = true;
      // this.$refs.addCustomerFormData.resetFields();
    },
    saveCustomerDialogForm() { //保存新增客户列表
      this.addCustomerTabData.push(this.addCustomerFormData);
      this.addCustomerFormData = {};
      // this.$refs.addCustomerFormData.resetFields();
      this.addCustomerDialogFormVisible = false;
    },
    Edit(index, row) { //编辑  
      row.editFlag = !row.editFlag;
    },
    locking(index, row) { //锁定
      row.status = "锁定";
    },
    Enabled(index, row) { //启用
      row.status = '启用';
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
    .customerMang {
      margin-bottom: 10px;
    }
    .searchIpt_left {
      float: left;
    }
    .searchIpt {
      float: right;
    }
    .addCustomerFormData {
      .inforBackg {
        height: 40px;
        line-height: 40px;
        background: #eff2f7;
      }
    }
  }
}
</style>
