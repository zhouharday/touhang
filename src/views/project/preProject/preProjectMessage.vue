<template>
<div class="preProjectMessage">
    <div class="title">
        <div class="left">
            <span class="desc">{{title}}</span>
        </div>
        <div class="right">
            <el-button type="danger" :disabled="nextStageDisabled" @click="changeStep">下一阶段</el-button>
            <el-button type="danger" :class="{bgc:suspend}" :disabled="suspend" @click="deleteReminders=true">中止
            </el-button>
        </div>
    </div>
    <div class="step">
        <div v-for="(item,index) in stepLists" :key="item.index" class="step_span" :class="{'step_span_change  step_first step_first_change':(index==0)&&(item.id == stageId),
             'step_first':index==0 ,'step_span_change step_second step_second_change':(index!=0)&&(index!=stepLists.length-1)&&(item.id == stageId),
             'step_second':(index!=0)&&(index!=stepLists.length-1),'step_span_change step_third step_third_change':index==(stepLists.length-1)&&(item.id == stageId),
             'step_third':index==(stepLists.length-1)}">
            <span>{{item.stageName}}</span>
        </div>
    </div>
    <div class="picture">
        <div class="img_wrapper">
            <img src="/static/img/double.png">
        </div>
        <!-- 小双助手 -->
        <div class="prompt_message">
            <span class="prompt">{{prompt}}</span>
            <div class="item_wrapper">
                <div class="item" v-for="(item,index) in module" :key="item.index">
                    <span class="count">{{index +1}}</span>
                    <p class="desc" v-if="item.type == 1">{{item.title}}</p>
                    <p class="desc" v-if="item.type == 2">{{item.title}}</p>
                    <p class="desc" v-if="item.type == 3">{{item.title}}</p>
                    <span v-if="item.status == 1" class="state">已完成</span>
                    <!-- 立即上传 -->
                    <div v-if="item.type == 1 && item.status == 0" style="float: left;position:relative;">
                        <el-button type="text" style="color:#f05e5e">立即上传</el-button>
                        <input type="file" class="fileInput" @change="changeFile($event, item.id)" ref="avatarInput">
                    </div>
                    <!-- 发起申请 -->
                    <el-button v-if="item.type == 2 && item.status == 0" type="text" class="state" @click="openDialog(1, item.id)">发起申请</el-button>
                    <!-- 查看进度 -->
                    <el-button v-if="item.type == 3 && item.status == 0" type="text" class="state" @click="openDialog(2, item.id)">查看进度</el-button>
                </div>
            </div>
        </div>
    </div>
    <div class="tabs">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="详情" name="details" class="tab_list">
                <detail-form :tabs="tabs" :proId="projectId" :basicForm="basicForm" :companyForm="companyForm" :capitalForm="capitalForm">
                </detail-form>
                <table-form :tabs="tabs" :companyForm="companyForm" :memberData="memberData" :structureData="structureData"></table-form>
            </el-tab-pane>
            <el-tab-pane label="团队" name="team" class="tab_list">
                <team-table :tabs="tabs" :proId="projectId" :proUsers="proUsers" :proRoles="proRoles">
                </team-table>
            </el-tab-pane>
            <el-tab-pane label="记录" name="record" class="tab_list">
                <record-form :tabs="tabs" :proId="projectId"></record-form>
            </el-tab-pane>
            <el-tab-pane label="审批" name="approve" class="tab_list">
                <approve-table :tabs="tabs"></approve-table>
            </el-tab-pane>
            <el-tab-pane label="文档" name="file" class="tab_list">
                <file-table :tabs="tabs" :uploaded="uploaded" v-on:listenUploaded="listenUploaded" :proId="projectId" ></file-table>
            </el-tab-pane>
            <el-tab-pane label="风险登记" name="risk" class="tab_list">
                <risk-table :tabs="tabs" :proId="projectId" :proUsers="proUsers"></risk-table>
            </el-tab-pane>
            <el-tab-pane v-if="isManage || isExit" label="管理" name="manage" class="tab_list">
                <manage-table :tabs="tabs" :proId="projectId"></manage-table>
            </el-tab-pane>
            <el-tab-pane v-if="isExit" label="退出" name="outing" class="tab_list">
                <outing-form :tabs="tabs" :proId="projectId"></outing-form>
            </el-tab-pane>
        </el-tabs>
    </div>
    <!-- 中止确认弹框 -->
    <delete-reminders :deleteReminders="deleteReminders" :modal_loading="modal_loading" :message_title="message_title" :message="message" :btnText="btnText" @del="jumpPool" @cancel="deleteReminders=false">
    </delete-reminders>
    <!-- 发起申请 对话框-->

    <!-- <apply-forms :applyModal="applyModal1" :applyForm="applyForm" @submit="submitForm"></apply-forms> -->
    <div class="applyBox">
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
                                    <Icon type="ios-cloud-upload" size="52"></Icon>
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
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button type="danger" @click="applyModal= false">提 交</el-button>
            </div>
        </el-dialog>
    </div>
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

<script type="text/javascript">
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
import Loading from 'element-ui'
import deleteReminders from 'components/deleteReminders'
import {
    getPreDetail,
    slectAllStage,
    getStageUploadDocument,
    nextStage,
    suspendInvestProject
} from 'api/projectPre';
import {
    getProjectUsers
} from 'api/projectSys';
import {
    queryList
} from 'api/fund'

const PROJECT_TYPE = 0; // 项目角色列表参数: 0，是项目角色 1是基金角色

export default {
    name: 'preProjectMessage',
    data() {
        return {
            userId:'',
            file: '',
            stepLists: [],
            projectId: '',
            investProjectId: '',
            stageId: '',
            isExit: false,
            isManage: false,
            deleteReminders: false,
            message_title: '确认中止',
            message: '是否确认中止该项目？',
            btnText: '中止',
            modal_loading: false,
            suspend: false,
            applyModal: false,
            progressModal: false,
            title: '',
            prompt: '任务助手小双温馨提示:',
            activeName: 'details',
            proUsers: [], // 项目用户列表
            proRoles: [], // 项目角色列表
            module: [],     // 该项目当前阶段需要完成的任务
            basicForm: {}, // 基本信息
            companyForm: {}, // 企业信息
            memberData: [], // 董事会成员
            structureData: [], // 股权结构
            uploaded: false,
            tabs: {
                tabList:[true, false, false, false, false, false, false, false]
            },
            capitalForm: {
                startInvestDate:'',
                exitDate:''
            }, // 投资信息
            nextStageDisabled: false,
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
            progressTable: [ //查看进度表单 节点table
                {
                    node: '发起申请',
                    operator: '管理员 2017/8/15 16:25:14',
                    conclusion: '同意',
                    startingTime: '2017/8/15 16:25:14',
                    time: '4秒'
                }
            ],
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
        this.investProjectId = this.$route.params.investProjectId;
        this.projectId = this.$route.params.userId;
        this.init();
    },
    watch: {
        '$route' (to, from) {
            this.investProjectId = this.$route.params.investProjectId;
            this.projectId = this.$route.params.userId;
            if(to.name == 'preProjectMessage'){
                this.init();      //再次调起我要执行的函数
            }
         }
    },
    methods: {
        listenUploaded(uploaded){
            if(uploaded){
                this.getStageUploadDocument(); //获取当前阶段及任务小助
            }
        },
        init() {
            this.initInfo();
            this.getPreProDetail();
            this.getStageUploadDocument(); //获取当前阶段及任务小助
            this.slectAllStage();
        },
        handleClick(val){
            let idx = val.index;
            let _tabList = this.tabs.tabList;
            if(!_tabList[idx]){
                for(var i = 0; i < _tabList.length; i++){
                    if(i == idx){
                        _tabList[i] = true;
                    }else{
                        _tabList[i] = false;
                    }
                }
                let _tabs = {tabList:_tabList}
                this.tabs = _tabs;
            }
        },
        initInfo() {
            let merchants = JSON.parse(window.sessionStorage.getItem('merchants') || '[]');
            this.merchantId = merchants[0].id;
            this.getProUsers(), this.getProRoles();
        },
        slectAllStage() {
            slectAllStage().then(resp => {
                this.stepLists = resp.data.result || [];
                this.projectStage();
            }).catch(e => {
                console.log('slectAllStage() exists error: ', e);
            });
        },
        //控制当前阶段
        projectStage() {
            // console.log("当前阶段："+this.stageId);
            if(this.stageId == undefined || this.stageId == '') return;
            let isExit = this.isExit, isManage = this.isManage;
            let stageId = this.stageId;
            //退出阶段，下一阶段按钮不可用
            let nextStageDisabled = this.nextStageDisabled;
            this.stepLists.forEach(function(item,index) {
                if(item.id == stageId && item.stageKey == 3){
                    nextStageDisabled = true;
                    // console.log("退出阶段, 显示管理、退出标签");
                    isExit = true;
                }
                if(item.id == stageId && item.stageKey == 2){
                    // console.log("管理阶段，显示管理标签");
                    isManage = true;
                }
            });
            if(isExit || isManage) {
                this.suspend = true;
            }
            this.isExit = isExit;
            this.isManage = isManage;
            this.nextStageDisabled = nextStageDisabled;
        },
        /**
         * [getPreProDetail 项目详情]
         * @return {[type]} [description]
         */
        getPreProDetail() {
            getPreDetail(this.projectId).then(resp => {
                if(resp.data.result.enterpriseInfo == null){
                    // console.log('项目详情-企业信息为空 result: '+JSON.stringify(resp.data.result));
                    console.log('项目详情-企业信息为空');
                    this.companyForm = {
                        flag : true
                    };
                } else {
                    this.companyForm = Object.assign({}, {
                        flag: true
                    }, resp.data.result.enterpriseInfo);
                }

                this.basicForm = Object.assign({}, {
                    flag: true
                }, resp.data.result.projectInfo);

                this.capitalForm = Object.assign({}, {
                    flag: true
                }, resp.data.result.projectInvestmentInfo);
                this.memberData = resp.data.result.listBoardMember;
                this.structureData = resp.data.result.listOwnershipStructure;
                this.title = resp.data.result.projectInfo.projectName;

            }).catch(e => {
                console.log('获取项目详情出错: ', e);
            });
            // getStageUploadDocument()
        },
        getStageUploadDocument(){
            let typeId = this.projectId;
            let investProjectId = this.investProjectId;
            let params = {typeId, investProjectId};
            getStageUploadDocument(params).then(resp => {
                this.stageId = resp.data.stageId;
                this.module = resp.data.result;

                this.projectStage();
            }).catch(e => {
                console.log('getStageUploadDocument() exists error: ', e);
            });
        },
        /**
         * [getProUsers 获取项目用户列表]
         * @return {[type]} [description]
         */
        getProUsers() {
            getProjectUsers({
                merchantId: this.merchantId
            }).then(resp => {
                let data = resp.data;
                if (data.status == '200') {
                    this.proUsers = data.result;
                }
            }).catch(e => {
                console.log('getProjectUsers() exists error: ', e);
            });
        },
        /**
         * [getProRoles 获取项目角色列表]
         * @return {[type]} [description]
         */
        getProRoles() {
            queryList(PROJECT_TYPE).then(resp => {
                let data = resp.data;
                if (data.status == '200') {
                    this.proRoles = data.result;
                }
            }).catch(e => {
                console.log('获取项目角色列表 error: ', e);
            });
        },
        // 转至下一阶段 的方法
        changeStep() {
            let typeId = this.projectId, investProjectId = this.investProjectId, stageId = this.stageId;
            let params = {
                typeId,
                investProjectId,
                stageId
            };
            nextStage(params).then(resp => {
                if(resp.data.status === "200"){
                    this.getStageUploadDocument();
                }
            }).catch(e => {
                console.log('changeStep() exists error: ', e);
            });
        },
        // 小双助手 打开不同的对话框
        openDialog(index, id) {
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
        //中止项目
        jumpPool() {
            // console.log("investProjectId" + this.investProjectId);
            suspendInvestProject(this.investProjectId).then(resp => {
                if(resp.data.status === "200"){
                    this.deleteReminders = !this.deleteReminders;
                    this.addTab('项目池', '/home/projectPool', 'projectPool');
                    this.$router.push({name: 'projectPool'});
                }else{
                    reject(data.message);
                    this.deleteReminders = !this.deleteReminders;
                }
            }).catch(e => {
                console.log('changeStep() exists error: ', e);
            });

        },
        addTab(th, url, name) {
            this.$store.commit({
                type: 'addTab',
                title: th,
                url: url,
                name: name
            });
        },
        changeFile(event, fileId) { //上传文件input
            this.file = event.target.files[0];
            let userId = JSON.parse(sessionStorage.getItem('userInfor')).id;
            event.preventDefault();
            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('stageId', this.stageId);
            formData.append('userId', userId);
            formData.append('type', 3);
            formData.append('uploadTypeId', this.projectId);
            formData.append('fileId', fileId);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            this.$http.post(this.api + '/files/uploadProjectDocument', formData, config)
            .then((res)=> {
                // console.log("上传文件结果:"+ JSON.stringify(res.data));
                if (res.status == '200') {
                    if (res.data.status == '200') {
                        this.getStageUploadDocument();
                        this.uploaded = true;
                    } else {
                        this.$Message.error(res.data.message);
                        //loadingInstance.close();  
                    }
                }
            })
            .catch(e => {
                this.$Message.error("上传错误");
                console.log('上传错误: ', e);
               // loadingInstance.close();
            })
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
            color: #000;
            border: 1px solid #000;
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
        }
        .step_first_change {
            color: #f05e5e;
            border: 1px solid #f05e5e;
            &::after {
                border-color: #f05e5e #f05e5e transparent transparent;
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
         .fileInput {
            opacity:0;
            position: absolute;
            left:0px;
            top:0px;
            width:80px;
            height:25px;
            line-height:25px;
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
                overflow: auto;
                .count,
                .desc,
                .state {
                    float: left;
                     // line-height: 36px;
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
    // 小双助手 查看进度对话框中的样式
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
            text-align: center;
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
            width: 100% !important;
            .el-tabs__item {
                width: 12.5% !important;
            }
        }
    }
}
</style>
