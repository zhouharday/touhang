<template>
  <section>
    <!-- 这是消息公告页面 -->
    <div>
      <el-row class="searchBox">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button @click="newAdd" class="searchIpt" type="primary">新增</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 新增消息 Dialog -->
      <el-dialog title="新增消息" :visible.sync="newsFormVisible">
        <el-form :model="form" :data="newsFormData" ref="newsFormData">
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item label="标题">
                  <el-input v-model="newsFormData.title" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item label="内容">
                  <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="newsFormData.content">
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item label="发布人">
                  <el-input v-model="newsFormData.publisher" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item label="发布日期">
                  <el-input v-model="newsFormData.publisherDate" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="newsFormSave">保 存</el-button>
          <el-button type="primary" @click="newsFormRelease">发 布</el-button>
        </div>
      </el-dialog>
      <!-- Dialog end -->
      <el-table :data="newsTabData" ref="newsTabData" border style="width: 100%">
        <el-table-column prop="title" label="标题" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.title }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.title" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="publisher" label="发布人" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.publisher }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.publisher" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="publisherDate" label="发布日期" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.publisherDate }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.publisherDate" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button @click="checkEdit(scope.$index,scope.row)" v-if="scope.row.status == '已发布'? isRelease = false : isRelease = true " type="primary" size="small">{{edit}}</el-button>
            <!-- <el-button v-if="scope.row.editFlag" @click="scope.row.editFlag = false" type="primary" size="small">保 存</el-button> -->
            <el-button type="primary" size="small" @click.native.prevent="newsTabData.splice(scope.$index,1)">删除</el-button>
            <el-button type="primary" size="small" :disabled="scope.row.status == '已发布'? isRelease = true : isRelease = false " @click="scope.row.status = '已发布'">发布</el-button>
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
      newsTabData: [
        {
          title: '系统维护通知', //标题
          publisher: '李克强', //发布人
          publisherDate: '2017-09-10', //发布日期
          status: "未发布", //状态
          editFlag: false
        }
      ],
      newsFormData: {
        title: '', //标题
        content: "", //内容
        publisher: '', //发布人
        publisherDate: '', //发布日期
        status: "", //状态
        editFlag: false
      },
      newsFormVisible: false,
      isRelease: false,
      edit: "编辑"
    }
  },
  methods: {
    newAdd() { //Add New Row
      this.newsFormVisible = true;
      console.log('下面这个error(resetFields) 可以忽略!!!');
      this.$refs.newsFormData.resetFields();
    },
    newsFormSave() { //Save
      this.newsFormData.status = '未发布';
      this.newsTabData.push(this.newsFormData);
      // console.log(this.userListFormData.rolePeople);
      this.newsFormData = {};
      this.newsFormVisible = false;

    },
    newsFormRelease() { //Form Release
      this.newsFormData.status = '已发布';
      this.newsTabData.push(this.newsFormData);
      this.newsFormData = {};
      this.newsFormVisible = false;
    },
    checkEdit(index,row){
      if( this.edit == '编辑' ){
        this.edit = '保存';
        row.editFlag = true;
      } else {
        this.edit = '编辑';
        row.editFlag = false;
      }
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
    .searchIpt {
      float: right;
    }
  }
}
</style>
