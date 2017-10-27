<template>
    <div>
        <section class="riskTable">
            <tabel-header :data="headerInfo_risk" @add="openAddModal"></tabel-header>
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
                            <el-form-item label="提出人" prop="userName">
                                <el-input v-model="userName" placeholder="当前用户" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="提出时间" prop="createDate">
                                <el-input v-model="AddForm.createDate" disabled>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="接收人" prop="receivedUserId">
                                <el-select value-key="value" v-model="AddForm.receivedUserId" placeholder="请选择接收人" style="width:100%">
                                    <el-option v-for="item in proTeam" :key="item.userId" :label="item.userName" :value="item.userId">
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
                            <el-form-item label="附件" prop="documentInfo">
                                <upload-files @uploadSuccess="uploadSuccess($event, 'documentInfo')" @removeSucess="removeSucess($event, 'documentInfo')" :documentInfo="documentInfo"></upload-files>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAdd = false">取 消</el-button>
                    <el-button type="danger" @click="confirmAdd">保 存</el-button>
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
                        <template scope="scope">
                            <p v-for="item in scope.row.documentInfo">
                                <a :href="item.filePath" style="font-size:12px;" :download="item.fileName">{{item.fileName}}</a></p>
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
                                <a :href="doc.filePath" style="font-size:12px;" :download="doc.fileName">{{doc.fileName}}</a>
                            </span>
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
                        <template scope="scope">
                            <p v-for="item in scope.row.documentInfo">
                                <a :href="item.filePath" style="font-size:12px;" :download="item.fileName">{{item.fileName}}</a></p>
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
                                <a :href="doc.filePath" style="font-size:12px;" :download="doc.fileName">{{doc.fileName}}</a></span>
                            </span>
                        </p>
                    </div>
                </div>
                <el-form :model="trackingForm" :rules="rules2" ref="trackingForm" style="margin-top:20px;background:#eef1f6;padding:10px;">
                    <el-form-item label="处理结果" prop="disposeResult" :label-width="formLabelWidth">
                        <el-select v-model="trackingForm.disposeResult" placeholder="请选择处理状态">
                            <el-option v-for="item in resultOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="汇报内容" prop="recordDetails" :label-width="formLabelWidth">
                        <el-input type="textarea" :rows="2" v-model="trackingForm.recordDetails" auto-complete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="处理方案" :label-width="formLabelWidth">
                        <upload-files @uploadSuccess="uploadSuccess($event, recordDocInfo)" :documentInfo="recordDocInfo"></upload-files>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalTracking= false">取 消</el-button>
                    <el-button type="danger" @click="confirmTracking('trackingForm')">保 存</el-button>
                </div>
            </el-dialog>
        </section>
    </div>
</template>


<script>
import tabelHeader from 'components/tabelHeader'
import { changeDate } from 'common/js/config'
import uploadFiles from 'components/uploadFiles'
import { dangers, addDanger, editDanger, delDanger, insertRiskFollower, selectRiskRegister, getTeams } from 'api/projectPre'

export default {
    props: {
        tabs: {
            type: Object,
            default: {}
        },
        proId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            userName: JSON.parse(sessionStorage.getItem('userInfor')).name,
            createDate: changeDate(new Date()),

            actionUrl:this.api + '/files/upload',
            showUploadAlert: false,
            uploadMessage: '',

            riskId: '',
            projectId: '',
            modalAdd: false,
            modalRiskView: false,
            modalTracking: false,
            formLabelWidth: '80px',
            file: null,
            loadingStatus: false,
            headerInfo_risk: {
                desc: '风险登记',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            AddForm: {
                theme: '',
                description: '',
                proposer: '',
                createDate: '',
                receivedUserId: '',
                completeDate: '',
                appendix: '',
                Records: ''
            },
            proTeam: [
                {
                    id:'',
                    name:''
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
            tableData: [],
            recordList: [],
            trackingForm: {
                disposeResult: '',
                content: '',
                appendix: ''
            },
            rules2: {
                disposeResult: [
                    { required: true, message: '请选择处理结果', trigger: 'change' }
                ],
                recordDetails: [
                    { required: true, message: '请输入汇报内容', trigger: 'change' }
                ]
            },
            resultOptions: [
                { //处理结果列表
                    value: '1',
                    label: '处理中'
                },
                { //处理结果列表
                    value: '2',
                    label: '已完成'
                }
            ],
            riskData: [
                {
                    riskTheme: 'AAAAAAAAAA',
                    handlePerson: '',
                    assignor: '',
                    startingDate: '',
                    endingDate: '',
                    state: ''
                }
            ],
            documentInfo:[
                {
                    type: '1',
                    name: '111.jpg',
                    url: 'http://www.xxx.com/img1.jpg',
                    fileName: '111.jpg',
                    filePath: 'http://www.xxx.com/img1.jpg'
                },
                {
                    type: '1',
                    name: '222.jpg',
                    url: 'http://www.xxx.com/img2.jpg',
                    fileName: '222.jpg',
                    filePath: 'http://www.xxx.com/img1.jpg'
                },
                {
                    type: '1',
                    name: '333.jpg',
                    url: 'http://www.xxx.com/img2.jpg',
                    fileName: '333.jpg',
                    filePath: 'http://www.xxx.com/img1.jpg'
                }
            ],
            recordDocInfo:[
                {
                    type: '1',
                    name: '111.jpg',
                    url: 'http://www.xxx.com/img1.jpg',
                    fileName: '111.jpg',
                    filePath: 'http://www.xxx.com/img1.jpg'
                },
                {
                    type: '1',
                    name: '222.jpg',
                    url: 'http://www.xxx.com/img2.jpg',
                    fileName: '222.jpg',
                    filePath: 'http://www.xxx.com/img1.jpg'
                }
            ]
        }
    },
    components: {
        tabelHeader,
        uploadFiles
    },
    created() {
    },
    watch:{
        'tabs':function (to,from){
            if(to.tabList[5]){
                this.init();
            }
        }
    },
    methods: {
        init() {
            this.initInfo();
            this.getDatas();
            this.getProTeam();
        },
        //查询项目团队成员
        getProTeam(){
            console.log(this.$route.params.investProjectId);
            getTeams(this.$route.params.investProjectId).then(resp => {
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
        initInfo() {
            this.projectId = this.proId;
        },
        handleToOptions(datas = []) {
            datas.forEach(item => {
                item.value = item.id;
                item.label = item.name;
            })
            return datas;
        },
        openAddModal() {
            let new_addForm = {
                riskTheme: '',
                riskDescribe: '',
                proposer: '',
                createDate: this.createDate,
                receivedUserId: '',
                completeDate: '',
                appendix: '',
                Records: ''
            };
            this.documentInfo = [];
            this.AddForm = new_addForm;
            this.modalAdd = true;
        },
        //查看风险详情
        getRiskInfo(riskId, optType) {
            //当前处理风险ID
            this.riskId = riskId;
            selectRiskRegister(riskId).then(resp => {
                // console.log("hola datevid"+JSON.stringify(resp.data));
                if(resp.data.status == '200'){
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
                }else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('dangers exists error: ', e);
            })
        },
        getDatas() {
            dangers(this.proId).then(resp => {
                this.riskData = resp.data.result.list;
            }).catch(e => {
                console.log('dangers exists error: ', e);
            })
        },
        // 删除当前行
        handleDelete(id) {
            delDanger(id).then(resp => {
                if (resp.data.status == '200') {
                    this.getDatas();
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('delDanger() exists error: ', e);
            })
        },
        //添加风险
        confirmAdd() {
            this.$refs["AddForm"].validate((valid) => {
                if(valid) {
                    this.AddForm.completeDate = changeDate(this.AddForm.completeDate);
                    let userId = JSON.parse(sessionStorage.getItem('userInfor')).id;
                    let risk = {
                        projectId: this.projectId,
                        riskTheme: this.AddForm.riskTheme,
                        seedUserId: userId,
                        receivedUserId: this.AddForm.receivedUserId,
                        completeDate: this.AddForm.completeDate,
                        riskDescribe: this.AddForm.riskDescribe,
                        documentInfo: this.documentInfo
                    };
                    console.log("添加风险::"+JSON.stringify(risk));
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
        confirmTracking(formName) {
            this.$refs[formName].validate((valid) => {
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
                    console.log("添加风险跟踪 params::"+JSON.stringify(params));
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
                } else {
                    return false;
                }
            });
        },
        uploadSuccess(documentInfo, dataName){
            // console.log("fileList--"+JSON.stringify(documentInfo));
            this.$set(this.$data, dataName, documentInfo);
            // console.log("this.documentInfo--"+JSON.stringify(this.documentInfo));
        },
        removeSucess(documentInfo, dataName){
            this.$set(this.$data, dataName, documentInfo);
            // console.log("this.documentInfo--"+JSON.stringify(this.documentInfo));
        }
    }
}
</script>



<style lang="less" scoped>
.riskTable {
    width: 100%;
    height: 100%;
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
</style>
