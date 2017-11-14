<template>
    <div class="table">
        <div class="topBtn">
            <div class="leftBtn">
                <el-button @click="changeRisk1" :class="{active:f_show}">风险上报</el-button>
                <el-button @click="changeRisk2" :class="{active:s_show}">风险预警</el-button>
            </div>
            <div v-if="checkProjectAuth('FXGL-tianjia')" class="rightBtn">
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
                        <el-button v-if="checkProjectAuth('FXGL-genzong') && (scope.row.status != '已完成' && userId == scope.row.receivedUserId)" type="text" @click="getRiskInfo(scope.row.id, '1')">跟踪</el-button>
                        <el-button v-if="checkProjectAuth('FXGL-shanchu') && (userId == scope.row.seedUserId)" type="text" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加风险 对话框-->
            <el-dialog title="添加风险" :visible.sync="modalAdd" :close-on-click-modal="false">
                <el-form :model="addForm" :rules="rules1" ref="addForm" :label-width="formLabelWidth">
                    <el-row>
                        <el-col>
                            <el-form-item label="风险主题" prop="riskTheme">
                                <el-input v-model="addForm.riskTheme" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="风险描述" prop="riskDescribe">
                                <el-input type="textarea" :rows="3" v-model="addForm.riskDescribe" auto-complete="off">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="提出人" prop="userName">
                                <el-input v-model="userName" placeholder="当前用户" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="提出时间" prop="createDate">
                                <el-input v-model="addForm.createDate" disabled>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="接收人" prop="receivedUserId">
                                <el-select v-model="addForm.receivedUserId" placeholder="请选择处理人" style="width:100%">
                                    <el-option v-for="item in proTeam" :key="item.userId" :label="item.userName" :value="item.userId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="完成时间" prop="completeDate">
                                <el-date-picker type="date" placeholder="完成时间" v-model="addForm.completeDate" style="width: 100%;">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="附件" prop="appendix">
                                <upload-files @uploadSuccess="uploadSuccess($event, 'documentInfo')" @removeSucess="removeSucess($event, 'documentInfo')" :documentInfo="documentInfo"></upload-files>
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
            <el-dialog :title="titleMsg" :visible.sync="modalRiskView" :close-on-click-modal="false">
                <el-form :model="viewForm" ref="addForm" :label-width="formLabelWidth">
                    <el-row>
                        <el-col>
                            <el-form-item label="风险主题" prop="riskTheme">
                                <el-input v-model="viewForm.riskTheme" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="风险描述" prop="riskDescribe">
                                <el-input type="textarea" :rows="3" v-model="viewForm.riskDescribe" disabled>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="提出人" prop="userName">
                                <el-input v-model="userName" placeholder="当前用户" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="提出时间" prop="createDate">
                                <el-input v-model="viewForm.createDate" disabled>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="接收人" prop="receivedUserId">
                                <el-select v-model="viewForm.receivedUserId" style="width:100%" disabled>
                                    <el-option v-for="item in proTeam" :key="item.userId" :label="item.userName" :value="item.userId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="完成时间" prop="completeDate">
                                <el-date-picker type="date" placeholder="完成时间" v-model="viewForm.completeDate" style="width: 100%;" disabled>
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="附件" prop="documentInfo">
                                <p v-for="doc in viewForm.documentInfo">
                                    <a :href="doc.filePath" style="font-size:12px;" :download="doc.fileName">{{doc.fileName}}</a>
                                </p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- <el-table :data="tableData" border style="width: 100%">
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
                                            <template scope="scope">
                                                <p v-for="item in scope.row.documentInfo">
                                                    <a :href="item.filePath" style="font-size:12px;" :download="item.fileName">{{item.fileName}}</a>
                                                </p>
                                            </template>
                                        </el-table-column>
                                    </el-table> -->
                <div class="operationBox">
                    <div class="left">
                        <div>处理记录</div>
                    </div>
                    <div class="right">
                        <p v-for="item in recordList" :key="item.id">
                            <span>{{item.disposeResult == '1' ? '【处理中】' : '【已完成】'}}</span>
                            <span>{{item.recordDetails}}</span>
                            <span v-for="doc in item.documentInfo">
                                <a :href="doc.filePath" style="font-size:12px;" download="doc.fileName">{{doc.fileName}}</a>
                            </span>
                            </span>
                        </p>
                    </div>
                </div>
                <!-- 跟踪对话框的处理表单 -->
                <div v-show="isTrack">
                    <el-form :model="trackingForm" :rules="rules2" ref="trackingForm" style="margin-top:20px;background:#eef1f6;padding:10px;">
                        <el-form-item label="处理结果" prop="disposeResult" :label-width="formLabelWidth">
                            <el-select v-model="trackingForm.disposeResult" placeholder="请选择处理状态">
                                <el-option v-for="item in resultOptions" :key="item.key" :label="item.value" :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="汇报内容" prop="recordDetails" :label-width="formLabelWidth">
                            <el-input type="textarea" :rows="2" v-model="trackingForm.recordDetails" auto-complete="off">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="处理方案" :label-width="formLabelWidth">
                            <upload-files @uploadSuccess="uploadSuccess($event, 'recordDocInfo')" @removeSucess="removeSucess($event, 'recordDocInfo')" :documentInfo="recordDocInfo"></upload-files>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer formBtn">
                        <el-button @click="modalRiskView= false">取 消</el-button>
                        <el-button type="danger" @click="confirmTracking()">保 存</el-button>
                    </div>
                </div>
            </el-dialog>
            <!-- 风险跟踪  对话框 -->
            <!-- <el-dialog title="风险跟踪" :visible.sync="modalTracking" :close-on-click-modal="false">
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
                                <template scope="scope">
                                    <p v-for="item in scope.row.documentInfo">
                                        <a :href="item.filePath" style="font-size:12px;" :download="item.fileName">{{item.fileName}}</a>
                                    </p>
                                </template>
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
                                    <span v-for="doc in item.documentInfo">
                                        <a :href="doc.filePath" style="font-size:12px;" download="doc.fileName">{{doc.fileName}}</a>
                                    </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <el-form :model="trackingForm" :rules="rules2" ref="trackingForm" style="margin-top:20px;background:#eef1f6;padding:10px;">
                            <el-form-item label="处理结果" prop="disposeResult" :label-width="formLabelWidth">
                                <el-select v-model="trackingForm.disposeResult" placeholder="请选择处理状态">
                                    <el-option v-for="item in resultOptions" :key="item.key" :label="item.value" :value="item.key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="汇报内容" prop="recordDetails" :label-width="formLabelWidth">
                                <el-input type="textarea" :rows="2" v-model="trackingForm.recordDetails" auto-complete="off">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="处理方案" :label-width="formLabelWidth">
                                <upload-files @uploadSuccess="uploadSuccess($event, 'recordDocInfo')" @removeSucess="removeSucess($event, 'recordDocInfo')" :documentInfo="recordDocInfo"></upload-files>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="modalTracking= false">取 消</el-button>
                            <el-button type="danger" @click="confirmTracking()">保 存</el-button>
                        </div>
                    </el-dialog> -->
        </div>

        <div class="s_risk" v-show="s_show">
            <el-table :data="alarmData" border style="width: 100%" align="center">
                <el-table-column label="数据名称" prop="dataSourceType" align="center">
                    <template scope="scope">{{scope.row.dataSourceType | key2value(dataSourcesOptions, scope.row.dataSourceType)}}</template>
                </el-table-column>
                <el-table-column label="类型" prop="projectManagerId" align="center">
                    <template scope="scope">{{scope.row.projectManagerId | key2value(sortOptions, scope.row.projectManagerId)}}</template>
                </el-table-column>
                <el-table-column label="基准日" prop="baseDay" align="center">
                </el-table-column>
                <el-table-column label="状态" prop="warningStatus" align="center">
                    <template scope="scope">{{scope.row.warningStatus | key2value(resultOptions, scope.row.warningStatus)}}</template>
                </el-table-column>
                <el-table-column label="预警" prop="alarm" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="getWarningDetail(scope.row.id, '2')">查看详情</el-button>
                        <el-button type="text" @click="getWarningDetail(scope.row.id, '1')">立即处理</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 查看风险预警详情 对话框-->
            <el-dialog title="查看风险预警详情" :visible.sync="modalAlarmView" :close-on-click-modal="false">
                <el-form :model="Form1" label-position="left" :label-width="formLabelWidth">
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="数据来源" prop="dataSourceType">
                                <el-select v-model="Form1.dataSourceType" style="width: 100%" disabled>
                                    <el-option v-for="item in dataSourcesOptions" :key="item.key" :label="item.value" :value="item.key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="类型" prop="projectManagerId">
                                <el-select v-model="Form1.projectManagerId" style="width: 100%" disabled>
                                    <el-option v-for="item in sortOptions" :key="item.key" :label="item.value" :value="item.key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="基准日" prop="baseDay">
                                <el-input v-model="Form1.baseDay" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table :data="alarmDetail" border style="width: 100%">
                    <el-table-column prop="indexName" label="指标名称" align="center">
                    </el-table-column>
                    <el-table-column prop="riskRule" label="预警规则" align="center">
                        <template scope="scope">{{scope.row.riskRule | key2value(ruleOptions, scope.row.riskRule)}}</template>
                    </el-table-column>
                    <el-table-column prop="thresholdValue" label="阈值" align="center">
                    </el-table-column>
                    <el-table-column prop="actualValue" label="实际值" align="center">
                    </el-table-column>
                </el-table>
                <div class="operation-box">
                    <div class="left">
                        <div>处理记录</div>
                    </div>
                    <div class="right">
                        <p v-for="(item,index) in  alarmRecords" :key="item.index">
                            <!-- <span>{{item.disposeDate | formatDate}}</span> -->
                            <span>{{item.disposeResult == 1 ? '【处理中】' : '【已完成】'}}</span>
                            <span>{{item.disposeDescribe}}</span>
                            <span v-for="doc in item.documentInfo">
                                <a :href="doc.filePath" style="font-size:12px;" download="doc.fileName">{{doc.fileName}}</a>
                            </span>
                            </span>
                        </p>
                    </div>
                </div>
            </el-dialog>
            <!-- 风险预警处理 对话框-->

            <el-dialog title="风险预警处理" :visible.sync="modalAlarm" :close-on-click-modal="false">
                <el-form :model="Form1" label-position="left" :label-width="formLabelWidth">
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="数据来源" prop="dataSourceType">
                                <el-select v-model="Form1.dataSourceType" style="width: 100%" disabled>
                                    <el-option v-for="item in dataSourcesOptions" :key="item.key" :label="item.value" :value="item.key">
                                    </el-option>
                                </el-select>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="类型" prop="projectManagerId">
                                <el-select v-model="Form1.projectManagerId" style="width: 100%" disabled>
                                    <el-option v-for="item in sortOptions" :key="item.key" :label="item.value" :value="item.key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="基准日" prop="baseDay">
                                <el-input v-model="Form1.baseDay" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table :data="alarmDetail" border style="width: 100%">
                    <el-table-column prop="indexName" label="指标名称" align="center">
                    </el-table-column>
                    <el-table-column prop="riskRule" label="预警规则" align="center">
                        <template scope="scope">{{scope.row.riskRule | key2value(ruleOptions, scope.row.riskRule)}}</template>
                    </el-table-column>
                    <el-table-column prop="thresholdValue" label="阈值" align="center">
                    </el-table-column>
                    <el-table-column prop="actualValue" label="实际值" align="center">
                    </el-table-column>
                </el-table>
                <div class="operation-box">
                    <div class="left">
                        <div>处理记录</div>
                    </div>
                    <div class="right">
                        <p v-for="(item,index) in  alarmRecords" :key="item.index">
                            <!-- <span>{{item.disposeDate | formatDate}}</span> -->
                            <span>{{item.disposeResult == 1 ? '【处理中】' : '【已完成】'}}</span>
                            <span>{{item.disposeDescribe}}</span>
                            <span v-for="doc in item.documentInfo">
                                <a :href="doc.filePath" style="font-size:12px;" download="doc.fileName">{{doc.fileName}}</a>
                            </span>
                            </span>
                        </p>
                    </div>
                </div>
                <el-form :model="alarmForm" :rules="rules3" ref="alarmForm" style="margin-top:20px;background:#eef1f6;padding:10px;" :label-width="formLabelWidth">
                    <el-form-item label="处理结果" prop="disposeResult">
                        <el-select v-model="alarmForm.disposeResult" placeholder="请选择处理状态">
                            <el-option v-for="item in resultOptions" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="汇报内容" prop="disposeDescribe">
                        <el-input type="textarea" :rows="2" v-model="alarmForm.disposeDescribe" auto-complete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="处理方案">
                        <upload-files @uploadSuccess="uploadSuccess($event, 'alarmRecordDocInfo')" @removeSucess="removeSucess($event, 'alarmRecordDocInfo')" :documentInfo="alarmRecordDocInfo"></upload-files>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAlarm = false">取 消</el-button>
                    <el-button type="danger" @click="confirmAlarm()">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import tabelHeader from 'components/tabelHeader'
import 'common/js/filter'
import uploadFiles from 'components/uploadFiles'
import { changeDate, checkProjectAuth } from 'common/js/config'

import {
    dangers, addDanger, editDanger, delDanger, insertRiskFollower, selectRiskRegister, getTeams
} from 'api/projectPre'
import { getWarningList, getWarningDetail, insertwarnRecords } from 'api/projectAfter';
export default {
    props: {
        tabs: {
            type: Object,
            default: {}
        },
        projectId: {
            type: String,
            default: ''
        },
        proUsers: {
            type: Array,
            default: []
        },
        isInTeam: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        'tabs': function(to, from) {
            if (to.tabList[5]) {
                this.init();
            }
        }
    },
    components: {
        tabelHeader,
        uploadFiles
    },
    data() {
        return {
            addBtn: true,
            f_show: true,
            s_show: false,
            isTrack: false,
            titleMsg: '查看风险上报详情',
            modalAdd: false,
            modalRiskView: false,
            modalTracking: false,
            modalAlarmView: false,
            modalAlarm: false,
            formLabelWidth: '120px',
            file: null,
            loadingStatus: false,
            // 风险上报 添加表单
            addForm: {
                receivedUserId: '',
                completeDate: ''
            },
            //查看风险上报详情 对话框表单
            viewForm: {
            },
            investProjectId: this.$route.params.investProjectId,
            userName: JSON.parse(sessionStorage.getItem('userInfor')).name,
            userId: JSON.parse(sessionStorage.getItem('userInfor')).id,
            createDate: changeDate(new Date()),
            proTeam: [
                {
                    id: '',
                    name: ''
                },
            ],
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
                    { type: "date", required: true, message: '请选择完成时间', trigger: 'change' }
                ]
            },
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
            riskRecords: [],
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
            dataSourcesOptions: [
                { //数据来源列表
                    key: 1,
                    value: '运营数据'
                },
                {
                    key: 2,
                    value: '资产负债表'
                }, {
                    key: 3,
                    value: '利润表'
                }, {
                    key: 4,
                    value: '现金流量表'
                }
            ],
            sortOptions: [
                { //数据类型列表
                    key: '1',
                    value: '年报'
                }, {
                    key: '2',
                    value: '半年报'
                }, {
                    key: '3',
                    value: '季报'
                }, {
                    key: '4',
                    value: '月报'
                }
            ],
            //预警规则列表
            ruleOptions: [
                {
                    key: 1,
                    value: '小于'
                },
                {
                    key: 2,
                    value: '大于'
                }
            ],
            //处理结果列表
            resultOptions: [
                {
                    key: '1',
                    value: '处理中'
                },
                {
                    key: '2',
                    value: '已完成'
                }
            ],
            riskData: [],
            // 风险预警 立即处理table
            alarmDetail: [
                {
                    targetName: '',
                    alarmRule: '',
                    threshold: '',
                    realValue: ''
                }
            ],
            // 风险预警查看表单
            Form1: {
                dataSources: '',
                dataSort: '',
                date: ''
            },
            // 风险预警 处理记录
            alarmRecords: [],
            // 风险预警 立即处理表单
            alarmForm: {
                disposeResult: '',
                disposeDescribe: '',
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
            alarmData: [],
            documentInfo: [],
            recordDocInfo: [],
            alarmRecordDocInfo: []
        }
    },
    created() {
    },
    watch: {
        'tabs': function(to, from) {
            if (to.tabList[5]) {
                this.init();
            }
        }
    },
    methods: {
        checkProjectAuth(code) {
            return checkProjectAuth(code) && this.isInTeam;
        },
        init() {
            this.getDatas();
            this.getWarningList();
            this.getProTeam();
        },
        //查询项目团队成员
        getProTeam() {
            getTeams(this.investProjectId).then(resp => {
                // console.log("项目团队成员:"+JSON.stringify(resp.data));
                if (resp.data.status == '200') {
                    this.proTeam = resp.data.result;
                } else if (resp.data.status == '49999') {
                    this.proTeam = [];
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('项目团队成员 error: ', e);
            })
        },
        //查询预警列表
        getWarningList() {
            getWarningList(this.projectId).then(resp => {
                // console.log("warningList:"+JSON.stringify(resp.data));
                if (resp.data.status == '200') {
                    this.alarmData = resp.data.result;
                } else if (resp.data.status == '49999') {
                    this.alarmData = [];
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('查询预警列表 error: ', e);
            })
        },
        //查看预警详情
        getWarningDetail(id, optType) {
            getWarningDetail(id).then(resp => {
                // console.log("warning:"+JSON.stringify(resp.data));
                if (resp.data.status == '200') {
                    let result = resp.data.result;
                    this.Form1 = result.warning;
                    this.alarmDetail = result.warnDetails;
                    this.alarmRecords = result.warnRecords;
                    this.alarmRecordDocInfo = [];
                    if (optType == '1') {
                        this.modalAlarm = true;
                        this.alarmForm = {
                            disposeResult: '',
                            disposeDescribe: '',
                            appendix: ''
                        };
                    } else {
                        this.modalAlarmView = true;
                    }
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('查看预警详情 error: ', e);
            })
        },
        // 预警处理 的保存按钮
        confirmAlarm() {
            let documentInfo = [];
            let params = {
                riskWarnId: this.Form1.id,
                disposeResult: this.alarmForm.disposeResult,
                disposeDescribe: this.alarmForm.disposeDescribe,
                documentInfo: this.alarmRecordDocInfo
            }
            insertwarnRecords(params).then(resp => {
                if (resp.data.status == '200') {
                    this.getWarningList();
                    this.modalTracking = false;
                    this.alarmRecords = [];
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('预警处理 的保存 error: ', e);
            })

            this.modalAlarm = false;
        },
        //查看风险详情
        getRiskInfo(riskId, optType) {
            //当前处理风险ID

            this.riskId = riskId;
            selectRiskRegister(riskId).then(resp => {
                if (resp.data.status == '200') {

                    this.tableData = [];
                    this.recordList = [];
                    this.tableData.push(resp.data.result);
                    this.recordList = resp.data.result.record;
                    this.recordDocInfo = [];
                    this.recordList.push();
                    if (optType == '1') {
                        //跟踪风险
                        // this.modalTracking = true;
                        this.modalRiskView = true;
                        this.isTrack = true;
                        this.titleMsg = '查看风险跟踪';
                        this.$set(this.$data.trackingForm, 'disposeResult', '');
                        this.$set(this.$data.trackingForm, 'recordDetails', '');
                    }
                    else {
                        //查看风险

                        this.modalRiskView = true;
                        this.isTrack = false;
                        this.titleMsg = '查看风险上报详情';
                    }
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('查看风险详情 error: ', e);
            })
        },
        //查询风险列表
        getDatas() {
            dangers(this.projectId).then(resp => {
                if (resp.data.status == '200') {
                    this.riskData = resp.data.result.list;
                } else if (resp.data.status == '49999') {
                    this.riskData = [];
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('查询风险列表 error: ', e);
            })
        },
        //删除风险
        handleDelete(id) {
            delDanger(id).then(resp => {
                if (resp.data.status == '200') {
                    this.getDatas();
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('删除风险 error: ', e);
            })
        },
        //添加风险
        confirmAdd() {
            this.$refs["addForm"].validate((valid) => {
                if (valid) {
                    this.addForm.completeDate = changeDate(this.addForm.completeDate);
                    let userId = JSON.parse(sessionStorage.getItem('userInfor')).id;
                    let risk = {
                        projectId: this.projectId,
                        riskTheme: this.addForm.riskTheme,
                        seedUserId: userId,
                        receivedUserId: this.addForm.receivedUserId,
                        completeDate: this.addForm.completeDate,
                        riskDescribe: this.addForm.riskDescribe,
                        documentInfo: this.documentInfo
                    };
                    addDanger(risk).then(resp => {
                        if (resp.data.status == '200') {
                            this.getDatas();
                            this.modalAdd = false;
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('addRecord exists error: ', e)
                    });
                }
            });
        },
        //添加风险跟踪
        confirmTracking() {
            this.$refs['trackingForm'].validate((valid) => {
                if (valid) {
                    let riskRegisterId = this.riskId,
                        disposeResult = this.trackingForm.disposeResult,
                        recordDetails = this.trackingForm.recordDetails,
                        documentInfo = this.recordDocInfo;
                    let params = {
                        riskRegisterId,
                        disposeResult,
                        recordDetails,
                        documentInfo
                    };
                    insertRiskFollower(params).then(resp => {
                        if (resp.data.status == '200') {
                            this.getDatas();
                            this.modalTracking = false;
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('confirmTracking() exists error: ', e);
                    })
                }
            });
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
                riskDescribe: '',
                proposer: '',
                createDate: this.createDate,
                receivedUserId: '',
                completeDate: ''
            };
            this.documentInfo = [];
            this.addForm = new_addForm;
            this.modalAdd = true;
        },
        uploadSuccess(documentInfo, dataName) {
            this.$set(this.$data, dataName, documentInfo);
        },
        removeSucess(documentInfo, dataName) {
            this.$set(this.$data, dataName, documentInfo);
        }
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
    border-top: none;
    .left {
        width: 122px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #1f2d3d;
    }
    .right {
        width: 983px;
        background-color: #eef1f6;
        border: 1px solid #d1dbe5;
        border-radius: 4px;
        padding: 10px 15px;
        span {
            margin-left: 20px;
        }
    }
}
.operation-box {
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

.formBtn {
    margin-top: 15px;
    text-align: center;
}
</style>
