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
              <span>状态</span>
            </div>
          </el-col>
          <el-col :span="6" class="roleMang_tab_boder">
            <div class="grid-content bg-purple-dark">
              <el-select v-model="value4" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-table id="userListTabData" :data="userListTabData" style="width: 100%" ref="userListTabData">
        <el-table-column prop="userName" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="account" label="账号" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button @click="edit" type="text" size="small">编辑</el-button>
            <el-button @click="remove" type="text" size="small">锁定/启用</el-button>
            <el-button @click="remove" type="text" size="small">密码初始化</el-button>
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
      options: [{
        value: '选项1',
        label: '所有'
      }, {
        value: '选项2',
        label: '启用'
      }, {
        value: '选项3',
        label: '锁定'
      }],
      value4: '所有',
      userListTabData: [
        {
          userName: "习近平",
          account: "12564998525215",
          email: "12345678@qq.com"
        }
      ]
    }
  },
  methods: {
    addTab(){
      let tr = 
      `<tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>`;
      // this.$refs.userListTabData.append(tr);
      console.log(this.$refs.userListTabData.toggleRowSelection());
      let tab = document.getElementById('userListTabData');
      // console.log(tab);
      // tab.append(tr);
    }
  },
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
        border: 1px solid #cccccc;
        height: 40px;
        line-height: 40px;
      }
      .grid-content {}
    }
  }
}
</style>
