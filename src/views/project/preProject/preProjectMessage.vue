<template>
    <div class="preProjectMessage">
        <div class="title">
            <div class="left">
                <span class="desc">{{title}}</span>
            </div>
            <div class="right">
                <el-button type="danger">下一阶段</el-button>
                <el-button type="danger">中止</el-button>
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
                <img src="/static/img/double.png">
            </div>
            <!-- 小双助手 -->
            <div class="prompt_message">
                <span class="prompt">{{prompt}}</span>
                <div class="item_wrapper">
                    <div class="item" v-for="(item, index) in module" :key="item.index">
                        <!-- 立即上传 -->
                        <!-- 发起申请等 对话框 -->
                        <span class="count">{{item.count}}</span>
                        <p class="desc">{{item.desc}}</p>
                        <el-button type="text" :disabled=item.state :class="{ complete:item.state === true,state:item.state === false}" @click="applyModal= true">
                            {{item.info}}
                        </el-button>
                        <!-- <span class="state" :class="{complete:item.state === true}">{{item.info}}</span> -->
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
                <!-- <el-tab-pane label="工商信息" name="industry" class="tab_list">
                          <industry-form :industryForm="industryForm">
                          </industry-form>
                        </el-tab-pane> -->
                <el-tab-pane label="记录" name="record" class="tab_list">
                    <record-Form></record-Form>
                </el-tab-pane>
                <el-tab-pane label="审批" name="approve" class="tab_list">
                    <approve-Table></approve-Table>
                </el-tab-pane>
                <el-tab-pane label="文档" name="file" class="tab_list">
                    <file-table></file-table>
                </el-tab-pane>
                <el-tab-pane label="风险登记" name="risk" class="tab_list">
                    <risk-table></risk-table>
                </el-tab-pane>
                <el-tab-pane label="管理" name="manage" class="tab_list">
                    <manage-table></manage-table>
                </el-tab-pane>
                <el-tab-pane label="退出" name="outing" class="tab_list">
                    <outing-form></outing-form>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 发起申请 对话框-->
        <el-dialog title="发起申请" :visible.sync="applyModal" :close-on-click-modal="false">
            <el-form :model="applyForm" ref="applyForm" label-width="100px">
                <el-row>
                    <el-col>
                        <el-form-item label="标题" prop="name">
                            <el-input v-model="applyForm.title" placeholder="标题自动生成" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="申请人" prop="person">
                            <el-input v-model="applyForm.person" placeholder="当前用户" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="申请日期" prop="date">
                            <el-input v-model="applyForm.date" placeholder="当前日期" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="备注">
                            <el-input type="textarea" :rows="2" v-model="applyForm.notes" auto-complete="off">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="考察报告">
                            <!-- action 上传的地址，必填 -->
                            <Upload multiple type="drag" :before-upload="handleUpload" v-model="applyForm.appendix" action="//jsonplaceholder.typicode.com/posts/">
                                <div style="padding: 20px 0">
                                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                    <p>点击或将文件拖拽到这里上传</p>
                                </div>
                            </Upload>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="选择审批人" prop="date">
                            <el-select v-model="applyForm.auditor " filterable placeholder="请选择" style="width: 50%">
                                <el-option v-for="item in auditorOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:left">
                <el-button @click="applyModal= false">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import detailForm from './details'
import tableForm from './tables'
import teamTable from './team'
// import industryForm from './industry'
import recordForm from './record'
import approveTable from './approve'
import fileTable from './file'
import riskTable from './risk'
import manageTable from './manage'
import outingForm from './outing'

export default {
    data() {
        return {
            applyModal: false,
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
                state: false,
                info: '立即上传'
            }, {
                count: 2,
                desc: '进行保密协议申请',
                state: false,
                info: '发起申请'
            }, {
                count: 3,
                desc: '您的保密协议正在申请中',
                state: true,
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
            },
            applyForm: {
                title: '',
                person: '',
                date: '',
                notes: '',
                appendix: '',
                auditor: ''
            },
            auditorOptions: [{ //审批人列表
                value: '选项1',
                label: '张三'
            }, {
                value: '选项2',
                label: '李四'
            }, {
                value: '选项3',
                label: '王二'
            }]
        }
    },
    components: {
        detailForm,
        tableForm,
        teamTable,
        // industryForm,
        recordForm,
        approveTable,
        fileTable,
        riskTable,
        manageTable,
        outingForm
    },
    created() {
        this.init();
    },
    methods: {
        init() {

        },
        disable(name) {
            if (name.flag === false) {
                return name.flag = true
            } else {
                return name.flag = false
            }
        }
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
        }
        .right {
            height: 100%;
            float: right;
            margin-right: 24px;
            .el-button {
                padding: 5px 15px;
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
                    float: left; // line-height: 36px;
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
