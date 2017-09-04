<template>
    <div class="preProjectMessage">
        <div class="title">
            <div class="left">
                <span class="desc">{{title}}</span>
                <img src="static/img/icon-中止-.png" alt="" class="termination">
            </div>
            <div class="right">
                <el-button type="danger">&nbsp;返回&nbsp;</el-button>
                <el-button type="danger">下一步</el-button>
                <img src="static/img/icon-重启.png" alt="" class="restart">
            </div>
        </div>
        <el-row class="step">
            <el-col :span="4" class="step_first step_span">
                <span>{{step_first}}</span>
            </el-col>
            <el-col :span="4" class="step_second step_span">
                <span>{{step_second}}</span>
            </el-col>
            <el-col :span="4" class="step_second step_span">
                <span>{{step_third}}</span>
            </el-col>
            <el-col :span="4" class="step_second step_span">
                <span>{{step_fourth}}</span>
            </el-col>
            <el-col :span="4" class="step_second step_span">
                <span>{{step_fiveth}}</span>
            </el-col>
            </el-col>
            <el-col :span="4" class="step_third step_span">
                <span>{{step_sixth}}</span>
            </el-col>
        </el-row>
        <div class="picture">
            <div class="img_wrapper">
                <img src="static/img/double.png" alt="">
            </div>
            <div class="prompt_message">
                <span class="prompt">{{prompt}}</span>
                <div class="item_wrapper">
                    <div class="item" v-for="(item, index) in module" :key="item.index">
                        <span class="count">{{item.count}}</span>
                        <p class="desc">{{item.desc}}</p>
                        <span class="state" :class="{complete:item.state === true}">{{item.info}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="tabs">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="详情" name="details" class="tab_list">
                    <detail-form :basicForm="basicForm" :companyForm="companyForm" :capitalForm="capitalForm">
                    </detail-form>
                    <table-form></table-form>
                </el-tab-pane>
                <el-tab-pane label="团队" name="team" class="tab_list">
                    <team-table></team-table>
                </el-tab-pane>
                <el-tab-pane label="工商信息" name="industry" class="tab_list">
                    <industry-form :industryForm="industryForm">
                    </industry-form>
                </el-tab-pane>
                <el-tab-pane label="审批" name="approve" class="tab_list">
                </el-tab-pane>
                <el-tab-pane label="文档" name="file" class="tab_list">
                    <file-table></file-table>
                </el-tab-pane>
                <el-tab-pane label="风险登记" name="risk" class="tab_list">
                </el-tab-pane>
                <el-tab-pane label="管理" name="manage" class="tab_list">
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>





<script type="text/ecmascript-6">
import detailForm from './details'
import tableForm from './tables'
import teamTable from './team'
import industryForm from './industry'
export default {
  data() {
    return {
      title: '双子金服投资项目',
      step_first: '考察储备',
      step_second: '立项会',
      step_third: '尽职调查',
      step_fourth: '投决会',
      step_fiveth: '管理',
      step_sixth: '退出',
      prompt: '任务助手小双温馨提示:',
      activeName: 'details',
      module: [{
        count: 1,
        desc: '上传项目考察报告',
        state: true,
        info: '已完成'
      }, {
        count: 2,
        desc: '进行保密协议申请',
        state: true,
        info: '已发起申请'
      }, {
        count: 3,
        desc: '您的保密协议正在申请中',
        state: false,
        info: '查看进度'
      }],
      basicForm: {
        baseInfo: '基本信息',
        flag: true
      },
      companyForm: {
        baseInfo: '企业信息',
        flag: true
      },
      capitalForm: {
        baseInfo: '投资信息',
        flag: true
      },
      industryForm: {
        baseInfo: '工商信息',
        flag: true
      }
    }
  },
  methods: {
    disable(name) {
      if (name.flag === false) {
        return name.flag = true
      } else {
        return name.flag = false
      }
    }
  },
  components: {
    detailForm,
    tableForm,
    teamTable,    
    industryForm

  }
}

</script>





<style lang="less" scoped>
.preProjectMessage {
  width: 100%;
  /*height: 100%;*/
  background-color: #fff;
  padding: 24px;
  .title {
    width: 100%;
    height: 64px;
    line-height: 64px;
    background-color: #2a3142;
    .left {
      height: 100%;
      float: left;
      margin-left: 24px;
      font-size: 0;
      .desc {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
        vertical-align: top;
      }
      .termination {
        margin-left: 24px;
        vertical-align: middle;
      }
    }
    .right {
      height: 100%;
      float: right;
      margin-right: 24px;
      .el-button {
        border-radius: 24px;
        padding: 5px 15px;
      }
      .restart {
        margin-left: 24px;
        vertical-align: middle;
      }
    }
  }
  .step {
    width: 100%;
    height: 52px;
    margin-top: 24px;
    .step_span {
      line-height: 52px;
      text-align: center;
      width: 14%;
      height: 52px;
      float: left;
      border: 1px solid #000;
      position: relative;
    }
    .step_first {
      color: #F05E5E;
      border: 1px solid red;
      &::after {
        content: '';
        width: 36px;
        height: 36px;
        background: #FFF;
        position: absolute;
        top: 7px;
        right: -19px;
        border: 1px solid;
        border-color: red red transparent transparent;
        transform: rotate(45deg);
        z-index: 1;
      }
    }
    .step_second {
      margin-left: 3.2%;
      padding-left: 2%;
      &::after {
        content: '';
        width: 36px;
        height: 36px;
        background: #FFF;
        position: absolute;
        top: 7px;
        right: -19px;
        border: 1px solid;
        border-color: #000 #000 transparent transparent;
        transform: rotate(45deg);
        z-index: 1;
      }
      &::before {
        content: '';
        width: 36px;
        height: 36px;
        background: #FFF;
        position: absolute;
        top: 7px;
        left: -19px;
        border: 1px solid;
        border-color: #000 #000 transparent transparent;
        transform: rotate(45deg);
      }
    }
    .step_third {
      margin-left: 3%;
      &::before {
        content: '';
        width: 36px;
        height: 36px;
        background: #FFF;
        position: absolute;
        top: 7px;
        left: -19px;
        border: 1px solid;
        border-color: #000 #000 transparent transparent;
        transform: rotate(45deg);
      }
    }
  }
  .picture {
    width: 100%;
    text-align: center;
    padding: 54px 0;
    .img_wrapper {
      height: 100%;
      margin-right: 34px;
      display: inline-block;
      vertical-align: middle;
    }
    .prompt_message {
      width: 48%; // height: 140px;
      display: inline-block;
      vertical-align: middle;
      background: #eef0f4;
      padding: 18px 24px;
      text-align: left;
      border-radius: 10px;
      position: relative;
      &::before {
        content: '';
        width: 0;
        height: 0;
        border-bottom: 20px solid #eef0f4;
        border-left: 20px solid transparent;
        position: absolute;
        top: 40px;
        left: -19px;
      }
      .prompt {
        line-height: 36px;
      }
      .item {
        width: 100%;
        height: 36px;
        margin-left: 24px;
        line-height: 36px;
        .count,
        .desc,
        .state {
          float: left;
          line-height: 36px;
        }
        .count {
          width: 20px;
          height: 20px;
          line-height: 20px;
          border-radius: 100%;
          color: #fff;
          background: #f05e5e;
          text-align: center;
          margin-top: 8px;
        }
        .desc {
          margin: 0 24px 0 20px;
        }
        .state {
          color: #f05e5e;
        }
        .complete {
          color: #a0a3aa;
        }
      }
    }
  }
  .tabs {
    width: 100%;
    padding-bottom: 54px;
    .el-tabs__nav {
      width: 100%!important;
      .el-tabs__item {
        width: 12.5%!important;
      }
    }
  }
}
</style>