<template>
    <div class="table">
        <div class="topBtn">
            <div class="leftBtn">
                <el-button @click="changeRisk1" :class="{active:f_show}">风险上报</el-button>
                <el-button @click="changeRisk2" :class="{active:s_show}">风险预警</el-button>
            </div>
            <div class="rightBtn">
                <el-button type="danger" size="small" @click="openAddModal" v-if="addBtn">添加</el-button>
            </div>
        </div>
        <div class="f_risk" v-show="f_show">
            <el-table :data="riskData" border style="width: 100%" align="center">
                <el-table-column label="主题" prop="riskTheme" align="center">
                </el-table-column>
                <el-table-column label="处理人" prop="receivedUserName" align="center">
                </el-table-column>
                <el-table-column label="指派人" prop="seedUserName" align="center">
                </el-table-column>
                <el-table-column label="开始时间" prop="createDate" align="center">
                </el-table-column>
                <el-table-column label="完成时间" prop="completeDate" align="center">
                </el-table-column>
                <el-table-column label="状态" prop="status" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="getRiskInfo(scope.row.id, '2')">查看详情</el-button>
                        <el-button v-if="scope.row.status != '已完成'" type="text" @click="getRiskInfo(scope.row.id, '1')">跟踪</el-button>
                        <el-button type="text" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加风险 对话框-->
            <el-dialog title="添加风险" :visible.sync="modalAdd" :close-on-click-modal="false">
                <el-form :model="AddForm" :rules="rules1" ref="AddForm" :label-width="formLabelWidth">
                    <el-row>
                        <el-col>
                            <el-form-item label="风险主题" prop="riskTheme">
                                <el-input v-model="AddForm.riskTheme" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="风险描述" prop="riskDescribe">
                                <el-input type="textarea" :rows="3" v-model="AddForm.riskDescribe" auto-complete="off">
                                </el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="12">
                            <el-form-item label="提出人" prop="seedUserId">
                                <el-input v-model="AddForm.seedUserId" placeholder="当前用户" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="提出时间" prop="createDate">
                                <el-input type="date" v-model="AddForm.createDate" style="width: 100%;" disabled>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="接收人" prop="receivedUserId">
                                <el-select v-model="AddForm.receivedUserId" placeholder="请选择处理人" style="width:100%">
                                    <el-option v-for="item in recipientOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>    
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="完成时间" prop="completeDate">
                                <el-date-picker type="date" placeholder="完成时间" v-model="AddForm.completeDate" style="width: 100%;">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="附件" prop="appendix">
                                <!-- action 上传的地址，必填 -->
                                <Upload multiple type="drag" :before-upload="handleUpload" v-model="AddForm.appendix" action="//jsonplaceholder.typicode.com/posts/">
                                    <div style="padding: 20px 0">
                                        <Icon type="ios-cloud-upload" size="52"></Icon>
                                        <p>点击或将文件拖拽到这里上传</p>
                                    </div>
                                </Upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAdd = false">取 消</el-button>
                    <el-button type="danger" @click="confirmAdd()">保 存</el-button>
                </div>
            </el-dialog>
            <!-- 查看风险详情 对话框 -->
            <el-dialog title="查看风险上报详情" :visible.sync="modalRiskView" :close-on-click-modal="false">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="riskTheme" label="风险主题" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="riskDescribe" label="风险描述" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="seedUserName" label="指派人" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="createDate" label="提出时间" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="receivedUserName" label="处理人" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="completeDate" label="完成时间" width="200px" align="center">
                    </el-table-column>
                    <el-table-column prop="documentInfo" label="附件" width="150px" align="center">
                    </el-table-column>
                </el-table>
                <div class="operationBox">
                    <div class="left">
                        <div>处理记录</div>
                    </div>
                    <div class="right">
                        <p v-for="item in recordList" :key="item.id">
                            <span>{{item.disposeResult == '1' ? '处理中' : '已完成'}}</span>
                            <span>{{item.recordDetails}}</span>
                        </p>
                    </div>
                </div>
            </el-dialog>
            <!-- 风险跟踪  对话框 -->
            <el-dialog title="风险跟踪" :visible.sync="modalTracking" :close-on-click-modal="false">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="riskTheme" label="风险主题" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="riskDescribe" label="风险描述" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="seedUserName" label="指派人" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="createDate" label="提出时间" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="receivedUserName" label="处理人" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="completeDate" label="完成时间" width="200px" align="center">
                    </el-table-column>
                    <el-table-column prop="documentInfo" label="附件" width="150px" align="center">
                    </el-table-column>
                </el-table>
                <div class="operationBox">
                    <div class="left">
                        <div>处理记录</div>
                    </div>
                    <div class="right">
                        <p v-for="item in recordList" :key="item.id">
                            <span>{{item.disposeResult == '1' ? '处理中' : '已完成'}}</span>
                            <span>{{item.recordDetails}}</span>
                        </p>
                    </div>
                </div>
                <el-form :model="trackingForm" :rules="rules2" ref="trackingForm" style="margin-top:20px;background:#eef1f6;padding:10px;">
                    <el-form-item label="处理结果" prop="disposeResult" :label-width="formLabelWidth">
                        <el-select v-model="trackingForm.disposeResult" placeholder="请选择处理状态">
                            <el-option v-for="item in resultOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="汇报内容" prop="recordDetails" :label-width="formLabelWidth">
                        <el-input type="textarea" :rows="2" v-model="trackingForm.recordDetails" auto-complete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="处理方案" :label-width="formLabelWidth">
                        <!-- action 上传的地址，必填 -->
                        <Upload multiple type="drag" :before-upload="handleUpload" v-model="trackingForm.documentInfo" action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button  @click="modalTracking= false">取 消</el-button>
                    <el-button type="danger" @click="confirmTracking()">保 存</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="s_risk" v-show="s_show">
            <el-table :data="alarmData" border style="width: 100%" align="center">
                <el-table-column label="数据名称" prop="dataName" align="center">
                </el-table-column>
                <el-table-column label="类型" prop="dataSort" align="center">
                </el-table-column>
                <el-table-column label="基准日" prop="date" align="center">
                </el-table-column>
                <el-table-column label="状态" prop="state" align="center">
                </el-table-column>
                <el-table-column label="预警" prop="alarm" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="modalAlarmView=true">查看详情</el-button>
                        <el-button type="text" @click="modalAlarm=true">立即处理</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 查看风险预警详情 对话框-->
            <el-dialog title="查看风险预警详情" :visible.sync="modalAlarmView" :close-on-click-modal="false">
                <el-table :data="alarmData1" border style="width: 100%">
                    <el-table-column prop="dataSources" label="数据来源" width="147px" align="center">
                    </el-table-column>
                    <el-table-column prop="dataSort" label="类型" align="center">
                    </el-table-column>
                    <el-table-column prop="date" label="基准日" align="center">
                    </el-table-column>
                    <el-table-column prop="targetName" label="指标名称" align="center">
                    </el-table-column>
                    <el-table-column prop="alarmRule" label="预警规则" align="center">
                    </el-table-column>
                    <el-table-column prop="threshold" label="阈值" align="center">
                    </el-table-column>
                    <el-table-column prop="realValue" label="实际值" align="center">
                    </el-table-column>
                </el-table>
                <div class="operationBox">
                    <div class="left">
                        <div>处理记录</div>
                    </div>
                    <div class="right">
                        <p v-for="(item,index) in  alarmRecords" :key="item.index">
                            <span>{{item.record}}</span>
                            <span>{{item.file}}</span>
                        </p>
                    </div>
                </div>
            </el-dialog>
            <!-- 风险处理 对话框-->
            <el-dialog title="风险处理" :visible.sync="modalAlarm" :close-on-click-modal="false">
                <el-table :data="alarmData1" border style="width: 100%">
                    <el-table-column prop="dataSources" label="数据来源" width="147px" align="center">
                    </el-table-column>
                    <el-table-column prop="dataSort" label="类型" align="center">
                    </el-table-column>
                    <el-table-column prop="date" label="基准日" align="center">
                    </el-table-column>
                    <el-table-column prop="targetName" label="指标名称" align="center">
                    </el-table-column>
                    <el-table-column prop="alarmRule" label="预警规则" align="center">
                    </el-table-column>
                    <el-table-column prop="threshold" label="阈值" align="center">
                    </el-table-column>
                    <el-table-column prop="realValue" label="实际值" align="center">
                    </el-table-column>
                </el-table>
                <div class="operationBox">
                    <div class="left">
                        <div>处理记录</div>
                    </div>
                    <div class="right">
                        <p v-for="(item,index) in  alarmRecords" :key="item.index">
                            <span>{{item.record}}</span>
                            <span>{{item.file}}</span>
                        </p>
                    </div>
                </div>
                <el-form :model="alarmForm" :rules="rules3" ref="alarmForm" style="margin-top:20px;background:#eef1f6;padding:10px;" :label-width="formLabelWidth">
                    <el-form-item label="处理结果" prop="disposeResult">
                        <el-select v-model="alarmForm.disposeResult" placeholder="请选择处理状态">
                            <el-option v-for="item in resultOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="汇报内容" prop="recordDetails">
                        <el-input type="textarea" :rows="2" v-model="alarmForm.recordDetails" auto-complete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="处理方案">
                        <!-- action 上传的地址，必填 -->
                        <Upload multiple type="drag" :before-upload="handleUpload" v-model="alarmForm.appendix" action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAlarm = false">取 消</el-button>
                    <el-button type="danger" @click="confirmAlarm">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import tabelHeader from 'components/tabelHeader'
import { changeDate } from 'common/js/config'

import { dangers, addDanger, editDanger, delDanger, insertRiskFollower, selectRiskRegister } from 'api/projectPre'

export default {
    props: {
        projectId: {
            type: String,
            default: ''
        },
        proUsers: {
            type: Array,
            default: []
        }
    },
    watch: {
        proUsers(val, oldVal) {
            this.initInfo();
        }
    },
    data() {
        return {
            addBtn: true,
            f_show: true,
            s_show: false,
            modalAdd: false,
            modalRiskView: false,
            modalTracking: false,
            modalAlarmView: false,
            modalAlarm: false,
            formLabelWidth: '80px',
            file: null,
            loadingStatus: false,
            // 风险上报 添加表单
            AddForm: {
                receivedUserId: '',
                completeDate: ''
            },
            rules1: {
               riskTheme: [
                    { required: true, message: '请输入风险主题', trigger: 'change' }
                ],
                riskDescribe: [
                    { required: true, message: '请输入风险描述', trigger: 'change' }
                ],
                receivedUserId: [
                    { required: true, message: '请选择接收人', trigger: 'change' }
                ],
                completeDate: [
                    { required: true, message: '请选择完成时间', trigger: 'change' }
                ]
            },
            recipientOptions: [
                { //接收人列表
                    value: '选项1',
                    label: '研发李一'
                }, {
                    value: '选项2',
                    label: '研发张三'
                }
            ],
            // 风险跟踪 table
            riskData1: [
                {
                    riskTheme: '',
                    description: '',
                    proposer: '',
                    startingDate: '',
                    recipient: '',
                    endingDate: '',
                    appendix: '',
                }
            ],
            // 风险跟踪 处理记录
            riskRecords: [
                {
                    record: '2017-06-28 18:42:55   刘备  【处理中】已经提交相应处理方案',
                    file: 'AAA.doc'
                },
                {
                    record: '2017-06-28 18:42:55   刘备  【已完成】 已经完成处理',
                    file: 'AAA.PDF'
                }
            ],
            // 风险跟踪 处理表单
            trackingForm: {
                disposeResult: ''
            },
            rules2: {
                disposeResult: [
                    { required: true, message: '请选择处理结果', trigger: 'change' }
                ],
                recordDetails: [
                    { required: true, message: '请输入汇报内容', trigger: 'change' }
                ]
            },
            //处理结果列表
            resultOptions: [
                {
                    value: '1',
                    label: '处理中'
                },
                {
                    value: '2',
                    label: '已完成'
                }
            ],
            riskData: [
                {
                    riskTheme: '京东',
                    handlePerson: '刘经理',
                    assignor: '王二毛',
                    startingDate: '2017-02-03',
                    endingDate: '2019-02-02',
                    state: '立项会'
                }, {
                    riskTheme: '一号店',
                    handlePerson: '王经理',
                    assignor: '张科',
                    startingDate: '2017-02-03',
                    endingDate: '2019-02-02',
                    state: '管理'
                }
            ],
            // 风险预警 立即处理table
            alarmData1: [
                {
                    dataSources: '',
                    dataSort: '',
                    date: '',
                    targetName: '',
                    alarmRule: '',
                    threshold: '',
                    realValue: ''
                }
            ],
            // 风险预警 处理记录
            alarmRecords: [
                {
                    record: '2017-06-28 18:42:55   张三  【处理中】已经提交相应处理方案',
                    file: 'BBB.doc'
                },
                {
                    record: '2017-06-28 18:42:55   张三  【已解决】 已经解决该预警',
                    file: 'BBB.PDF'
                }
            ],
            // 风险预警 立即处理表单
            alarmForm: {
                result: '',
                content: '',
                appendix: ''
            },
            rules3: {
                disposeResult: [
                    { required: true, message: '请选择处理结果', trigger: 'change' }
                ],
                recordDetails: [
                    { required: true, message: '请输入汇报内容', trigger: 'change' }
                ] 
            },
            alarmData: [
                {
                    dataName: '资产负债表',
                    dataSort: '年报',
                    date: '2017',
                    state: '已处理',
                    alarm: '正常'
                }
            ],
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.initInfo();
            this.getDatas();
        },
        initInfo() {
            let proUsers = this.proUsers;
            this.handleToOptions(proUsers);
            this.recipientOptions = proUsers;
        },
        handleToOptions(datas = []) {
            datas.forEach(item => {
                item.value = item.id;
                item.label = item.name;
            })
            return datas;
        },
        //查看风险详情
        getRiskInfo(riskId,optType) {
            //当前处理风险ID
            this.riskId = riskId;
            selectRiskRegister(riskId).then(resp => {
                this.tableData = [];
                this.recordList = [];
                this.tableData.push(resp.data.result);
                this.recordList = resp.data.result.record;
                this.recordList.push();
                if(optType == '1'){
                    //跟踪风险
                    this.modalTracking=true;
                }
                else{
                    //查看风险
                    this.modalRiskView=true;
                }
            }).catch(e => {
                console.log('dangers exists error: ', e);
            })
        },
        getDatas() {
            dangers(this.projectId).then(resp => {
                this.riskData = resp.data.result.list;
            }).catch(e => {
                console.log('dangers exists error: ', e);
            })
        },
        // 删除当前行
        handleDelete(id) {
            delDanger(id).then(resp => {
                if(resp.data.status == '200') {
                    this.getDatas();
                }else{
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('delDanger() exists error: ', e);
            })
        },
        //添加风险
        confirmAdd() {
            this.AddForm.completeDate = changeDate(this.AddForm.completeDate);
            let userId = JSON.parse(sessionStorage.getItem('userInfor')).id;
            let risk = {
                projectId: this.projectId,
                riskTheme: this.AddForm.riskTheme,
                seedUserId: userId,
                receivedUserId: this.AddForm.receivedUserId,
                completeDate: this.AddForm.completeDate,
                riskDescribe: this.AddForm.riskDescribe
            };
            addDanger(risk).then(resp => {
                if(resp.data.status == '200') {
                    this.getDatas();
                    this.modalAdd = false;
                }else{
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('addRecord exists error: ', e)
            });

        },
        //添加风险跟踪
        confirmTracking() {
            let riskRegisterId = this.riskId,
                disposeResult = this.trackingForm.disposeResult,
                recordDetails = this.trackingForm.recordDetails;
            let params = {
                riskRegisterId,
                disposeResult,
                recordDetails
            };
            insertRiskFollower(params).then(resp => {
                if(resp.data.status == '200') {
                    this.getDatas();
                    this.modalTracking = false;
                }else{
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('confirmTracking() exists error: ', e);
            })
        },
        // 添加预警 的保存按钮
        confirmAlarm() {
            this.modalAlarm = false;
        },
        // 切换 上报/预警 的显示隐藏
        changeRisk1() {
            this.f_show = true;
            this.s_show = false;
            this.addBtn = true;
        },
        changeRisk2() {
            this.f_show = false;
            this.s_show = true;
            this.addBtn = false;
        },
        // 添加风险的 添加按钮方法
        openAddModal() {
            let new_addForm = {
                riskTheme: '',
                description: '',
                proposer: '',
                startingDate: '',
                recipient: '',
                endingDate: '',
                appendix: '',
                Records: ''
            };
            this.addForm = new_addForm;
            this.modalAdd = true;
        },
        // 添加风险的 保存按钮方法
        submitaddForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // this.addForm.endingDate = changeDate(this.addForm.endingDate);
                    this.modalAdd = false;
                } else {
                    return false;
                }
            });
        },
        // 风险跟踪的 保存按钮方法
        submitTracking(formName) {
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.modalTracking = false;
                } else {
                    return false;
                }
            });
        },
        // 上传附件的方法
        handleUpload(file) {
            this.file = file;
            return false;
        },
        upload() {
            this.loadingStatus = true;
            setTimeout(() => {
                this.file = null;
                this.loadingStatus = false;
                this.$Message.success('上传成功')
            }, 1500);
        },
    }
}
</script>



<style lang="less" scoped>
.table {
    .topBtn {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        .leftBtn {
            margin-right: 15px;
        }
    }
}

.operationBox {
    width: 1102px;
    display: flex;
    border: 1px solid #dfe6ec;
    border-top: none;
    .left {
        width: 149px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
        color: #1f2d3d;
        background-color: #eef1f6;
    }
    .right {
        border-left: 1px solid #dfe6ec;
        padding: 10px 50px;
        span {
            margin-left: 20px;
        }
    }
}

.active {
    background: #dfe6ec;
}
</style>
