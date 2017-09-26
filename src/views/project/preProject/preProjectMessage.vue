<template>
    <div class="preProjectMessage">
        <div class="title">
            <div class="left">
                <span class="desc">{{title}}</span>
            </div>
            <div class="right">
                <el-button type="danger" @click="changeStep">下一阶段</el-button>
                <el-button type="danger" :class="{bgc:suspend}" :disabled="suspend" @click="deleteReminders=true">中止</el-button>
            </div>
        </div>
        <el-row class="step">
            <el-col :span="4" class="step_first step_span" :class="{'step_span_change step_first_change':!first_step}">
                <span>{{step_first}}</span>
            </el-col>
            <el-col :span="4" class="step_second step_span" :class="{'step_span_change step_second_change':second_step}">
                <span>{{step_second}}</span>
            </el-col>
            <el-col :span="4" class="step_second step_span" :class="{'step_span_change step_second_change':third_step}">
                <span>{{step_third}}</span>
            </el-col>
            <el-col :span="4" class="step_second step_span" :class="{'step_span_change step_second_change':fourth_step}">
                <span>{{step_fourth}}</span>
            </el-col>
            <el-col :span="4" class="step_second step_span" :class="{'step_span_change step_second_change':fiveth_step}">
                <span>{{step_fiveth}}</span>
            </el-col>

            <el-col :span="4" class="step_third step_span" :class="{'step_span_change step_third_change':sixth_step}">
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
                    <div class="item" v-for="(item,index) in module" :key="item.index">
                        <span class="count">{{item.count}}</span>
                        <p class="desc">{{item.desc}}</p>
                        <!-- 立即上传 -->
                        <Upload v-show="index == 0" action="//jsonplaceholder.typicode.com/posts/">
                            <Button type="ghost" icon="ios-cloud-upload-outline">立即上传</Button>
                        </Upload>
                        <!-- 发起申请等 对话框 -->
                        <el-button v-show="index != 0" type="text" class="state" @click="openDialog(index)">
                            {{item.info}}
                        </el-button>
                        <!-- <el-button v-show="index != 0" type="text" :disabled="item.state" :class="{ complete:item.state === true,state:item.state === false}" @click="applyModal= true">
                                                                                                                                                                {{item.info}}
                                                                                                                                                            </el-button> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="tabs">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="详情" name="details" class="tab_list">
<<<<<<< HEAD
                    <detail-form
                        :basicForm="basicForm"
                        :companyForm="companyForm"
                        :capitalForm="capitalForm">
=======
                    <detail-form :basicForm="basicForm" :companyForm="companyForm" :capitalForm="capitalForm">
>>>>>>> 6386457b897c9c398bc09f01b3a068d7930649a5
                    </detail-form>
                    <table-form></table-form>
                </el-tab-pane>
                <el-tab-pane label="团队" name="team" class="tab_list">
                    <team-table :proId="proId" :proUsers="proUsers" :proRoles="proRoles">
                    </team-table>
                </el-tab-pane>
                <!-- <el-tab-pane label="工商信息" name="industry" class="tab_list">
<<<<<<< HEAD
                                                                                                                                                                          <industry-form :industryForm="industryForm">
                                                                                                                                                                          </industry-form>
                                                                                                                                                                        </el-tab-pane>
                  <industry-form :industryForm="industryForm">
                  </industry-form>
                </el-tab-pane> -->
=======
                                <industry-form :industryForm="industryForm"></industry-form>
                            </el-tab-pane> -->
>>>>>>> 6386457b897c9c398bc09f01b3a068d7930649a5
                <el-tab-pane label="记录" name="record" class="tab_list">
                    <record-form :proId="proId"></record-form>
                </el-tab-pane>
                <el-tab-pane label="审批" name="approve" class="tab_list">
                    <approve-table></approve-table>
                </el-tab-pane>
                <el-tab-pane label="文档" name="file" class="tab_list">
                    <file-table></file-table>
                </el-tab-pane>
                <el-tab-pane label="风险登记" name="risk" class="tab_list">
                    <risk-table :proId="proId" :proUsers="proUsers"></risk-table>
                </el-tab-pane>
                <el-tab-pane label="管理" name="manage" class="tab_list">
                    <manage-table :proId="proId"></manage-table>
                </el-tab-pane>
                <el-tab-pane label="退出" name="outing" class="tab_list">
                    <outing-form></outing-form>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 中止确认弹框 -->
        <delete-reminders :deleteReminders="deleteReminders" :modal_loading="modal_loading" :message_title="message_title" :message="message" :btnText="btnText" @del="jumpPool" @cancel="deleteReminders=false">
        </delete-reminders>
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
                        <el-form-item label="备注" prop="notes">
                            <el-input type="textarea" :rows="2" v-model="applyForm.notes" auto-complete="off">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="考察报告" prop="appendix">
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
        <!-- 查看进度 对话框 -->
        <div class="progressBox">
            <el-dialog title="查看进度" :visible.sync="progressModal" :close-on-click-modal="false">
                <div style="height:2px;border-bottom: 1px solid #f05e5e"></div>
                <el-table :data="progressTable" style="margin:15px 0;" :row-class-name="tableRowClassName">
                    <el-table-column prop="node" label="节点" align="center">
                    </el-table-column>
                    <el-table-column prop="operator" label="处理人" align="center">
                    </el-table-column>
                    <el-table-column prop="conclusion" label="结论" align="center">
                    </el-table-column>
                    <el-table-column prop="startingTime" label="开始日期" align="center">
                    </el-table-column>
                    <el-table-column prop="time" label="用时" align="center">
                    </el-table-column>
                </el-table>
                <div>
                    <div class="title_f" style="background:#2a3142;color:#fff">
                        <div class="desc">
                            <span>申请详情</span>
                        </div>
                    </div>
                    <el-form :model="applyForm2" ref="applyForm" style="margin-top:20px" label-width="100px">
                        <el-row>
                            <el-col>
                                <el-form-item label="标题" prop="name">
                                    <el-input v-model="applyForm2.title" placeholder="数据展示" auto-complete="off" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="申请人" prop="person">
                                    <el-input v-model="applyForm2.person" placeholder="数据展示" auto-complete="off" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="申请日期" prop="date">
                                    <el-input v-model="applyForm2.date" placeholder="数据展示" auto-complete="off" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item label="备注" prop="notes">
                                    <el-input type="textarea" :rows="2" v-model="applyForm2.notes" placeholder="数据展示" auto-complete="off" disabled>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="考察报告" prop="reports" style="margin-bottom:10px">
                                    <el-input v-model="applyForm2.reports" placeholder="数据展示" auto-complete="off" disabled>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1">
                                <div style="text-align:center;line-height:35px;">
                                    <a href="/static/img/plan.txt" download="xxxxx" style="color:#f05e5e">下载</a>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div>
                    <div class="title_f" style="background:#2a3142;color:#fff">
                        <div class="desc">
                            <span>意见汇总</span>
                        </div>
                    </div>
                    <div class="comment_box" :class="{bgh: (index%2 == 0),bgl: (index%2 != 0)}" v-for="(item,index) in commentLists" :key="item.index">
                        <p class="comment_left">
                            <span>{{item.comment}}</span>
                        </p>
                        <p class="comment_right">
                            <span style="margin: 0px 0px 15px 8px">{{item.num}}</span>
                            <span>{{item.note}}</span>
                        </p>
                    </div>
                </div>
            </el-dialog>
        </div>
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
import deleteReminders from 'components/deleteReminders'

import { getPreDetail } from 'api/projectPre';
import { getProjectUsers, getProjectRoles } from 'api/projectSys';

const PROJECT_TYPE = 0; // 项目角色列表参数: 0，是项目角色 1是基金角色

export default {
    data() {
        return {
            deleteReminders: false,
            message_title: '确认中止',
            message: '是否确认中止该项目？',
            btnText: '中止',
            modal_loading: false,
            first_step: true,
            second_step: false,
            third_step: false,
            fourth_step: false,
            fiveth_step: false,
            sixth_step: false,
            suspend: false,
            applyModal: false,
            progressModal: false,
            title: '双子金服投资项目',
            step_first: '考察储备',
            step_second: '立项会',
            step_third: '尽职调查',
            step_fourth: '投决会',
            step_fiveth: '管理',
            step_sixth: '退出',
            prompt: '任务助手小双温馨提示:',
            activeName: 'details',
            proUsers: [],   // 项目用户列表
            proRoles: [],   // 项目角色列表
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
            applyForm: { // 发起申请表单
                title: '',
                person: '',
                date: '',
                notes: '',
                appendix: '',
                auditor: ''
            },
            applyForm2: { // 发起申请表单
                title: '',
                person: '',
                date: '',
                notes: '',
                appendix: '',
                auditor: '',
                reports: ''
            },
            auditorOptions: [{ //发起申请表单 审批人列表
                value: '选项1',
                label: '张三'
            }, {
                value: '选项2',
                label: '李四'
            }, {
                value: '选项3',
                label: '王二'
            }],
            progressTable: [//查看进度表单 节点table
                {
                    node: '发起申请',
                    operator: '管理员 2017/8/15 16:25:14',
                    conclusion: '同意',
                    startingTime: '2017/8/15 16:25:14',
                    time: '4秒'
                }
            ],
            commentLists: [ //查看进度表单  意见汇总列表
                {
                    comment: '法务意见',
                    num: '2',
                    note: '【管理员】2017/08/15'
                },
                {
                    comment: '反馈项目负责人',
                    num: '2',
                    note: '【管理员】2017/08/15'
                }
            ]
        }
    },
    components: {
        deleteReminders,
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
            this.initInfo();
            this.getPreProDetail();
        },
        initInfo() {
            let href = window.location.href;
            this.proId = href.substr(href.lastIndexOf('/') + 1, href.length);

            let merchants = JSON.parse(window.sessionStorage.getItem('merchants') || '[]');
            let info = JSON.parse(sessionStorage.getItem('userInfor') || '{}');
            this.merchantId = merchants[0].id;
            this.addProjectUserId = info.id;

            // 项目用户和角色
            Promise.all([this.getProUsers(), this.getProRoles()]).then(values => {
                // console.log('values: ', values);
                this.proUsers = values[0] || [];
                this.proRoles = values[1] || [];
            }).catch(e => {
                console.log('getProUsers() or getProRoles() exists error: ', e);
            });
        },
        /**
         * [getPreProDetail 项目详情]
         * @return {[type]} [description]
         */
        getPreProDetail() {
            getPreDetail(this.proId).then(resp => {
                console.log('prodetail: ', resp);
            }).catch(e => {
                console.log('getProDetail() exists error: ', e);
            });
        },
        /**
         * [getProUsers 获取项目用户列表]
         * @return {[type]} [description]
         */
        getProUsers() {
            return new Promise((resolve, reject) => {
                let proUsers = this.proUsers;
                if (proUsers.length) {
                    resolve(proUsers);
                } else {
                    getProjectUsers({
                        merchantId: this.merchantId
                    }).then(resp => {
                        let data = resp.data;
                        if (+data.status === 200) {
                            resolve(data.result);
                        } else {
                            reject(data.message);
                        }
                        // console.log('users resp', resp);
                    }).catch(reject);
                }
            });
        },
        /**
         * [getProRoles 获取项目角色列表]
         * @return {[type]} [description]
         */
        getProRoles() {
            return new Promise((resolve, reject) => {
                let proRoles = this.proRoles;
                if (proRoles.length) {
                    resolve(proRoles);
                } else {
                    getProjectRoles({
                        merchantId: this.merchantId,
                        roleType: PROJECT_TYPE
                    }).then(resp => {
                        let data = resp.data;
                        if (+data.status === 200) {
                            resolve(data.result);
                        } else {
                            reject(data.message);
                        }
                        // console.log('roles resp', resp);
                    }).catch(reject);
                }
            });
        },
        // 转至下一阶段 的方法
        changeStep() {
            if (this.first_step) {
                this.first_step = !this.first_step;
                this.second_step = !this.second_step;
            } else if (this.second_step) {
                this.second_step = !this.second_step;
                this.third_step = !this.third_step;
            } else if (this.third_step) {
                this.third_step = !this.third_step;
                this.fourth_step = !this.fourth_step;
            } else if (this.fourth_step) {
                this.fourth_step = !this.fourth_step;
                this.fiveth_step = !this.fiveth_step;
                this.suspend = true;
            } else if (this.fiveth_step) {
                this.fiveth_step = !this.fiveth_step;
                this.sixth_step = !this.sixth_step;
            }
        },
        // 小双助手 打开不同的对话框
        openDialog(index) {
            if (index == 1) {
                this.applyModal = true;
            } else if (index == 2) {
                this.progressModal = true;
            }
            // switch (index) {
            //    case 1:
            //      this.applyModal = true;
            //      break;
            //    case 2:
            //      this.progressModal = true;
            //      break;
            // }
        },
        disable(name) {
            if (name.flag === false) {
                return name.flag = true
            } else {
                return name.flag = false
            }
        },
        // 设置table间隔行的background-color
        tableRowClassName(row, index) {
            if ((index % 2) == 0) {
                return 'info-row';
            } else {
                return 'positive-row';
            }
            return '';
        },
        jumpPool() {
            this.deleteReminders = !this.deleteReminders;
            this.addTab('项目池', '/home/projectPool', 'projectPool');
            this.$router.push({ name: 'projectPool' });
        },
        addTab(th, url, name) {
            this.$store.commit({ type: 'addTab', title: th, url: url, name: name });
        }
    }
}
</script>




<style lang="less" scoped>
.preProjectMessage {
    width: 100%;
    min-height: 100%;
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
        .bgc {
            background: #a0a3aa;
            border: 1px solid #a0a3aa;
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
        .step_span_change {
            border: 1px solid #f05e5e;
        }
        .step_first {
            color: #F05E5E;
            border: 1px solid #f05e5e;
            &::after {
                content: '';
                width: 36px;
                height: 36px;
                background: #FFF;
                position: absolute;
                top: 7px;
                right: -19px;
                border: 1px solid;
                border-color: #f05e5e #f05e5e transparent transparent;
                transform: rotate(45deg);
                z-index: 1;
            }
        }
        .step_first_change {
            color: #000;
            border: 1px solid #000;
            &::after {
                border-color: black black transparent transparent;
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
        .step_second_change {
            color: #f05e5e;
            &::after {
                border-color: #f05e5e #f05e5e transparent transparent;
            }
            &::before {
                border-color: #f05e5e #f05e5e transparent transparent;
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
        .step_third_change {
            color: #f05e5e;
            &::before {
                border-color: #f05e5e #f05e5e transparent transparent;
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
    } // 小双助手 查看进度对话框中的样式
    .title_f {
        margin-top: 30px;
        width: 100%;
        height: 42px;
        display: flex;
        align-items: center;
        .desc {
            flex: 1;
            text-align: left;
            span {
                color: #fff;
                margin-left: 90px;
            }
        }
    }
    .comment_box {
        height: 80px;
        display: flex;
        align-items: center;
        padding-left: 90px;
        .comment_left {
            width: 100px;
            margin-right: 150px;
            text-align: center
        }
        .comment_right {
            display: flex;
            flex-direction: column;
        }
    }
    .bgh {
        background: #fff;
    }
    .bgl {
        background: #EEF0F4;
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
