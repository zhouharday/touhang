<template>
    <div>
        <section class="riskTable">
            <tabel-header :data="headerInfo_risk" @add="modalAdd = true"></tabel-header>
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
                        <el-button type="text" size="small" @click="getRiskInfo(scope.row.id, '2')">查看详情</el-button>
                        <el-button v-if="status != '已完成'" type="text" size="small" @click="getRiskInfo(scope.row.id, '1')">跟踪</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 添加风险 对话框-->
            <el-dialog title="添加风险" :visible.sync="modalAdd" :close-on-click-modal="false">
                <el-form :model="AddForm" :label-width="formLabelWidth">
                    <el-row>
                        <el-col>
                            <el-form-item label="风险主题">
                                <el-input v-model="AddForm.riskTheme" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="风险描述">
                                <el-input type="textarea" :rows="3" v-model="AddForm.riskDescribe" auto-complete="off">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="处理人">
                                <el-select v-model="AddForm.receivedUserId" placeholder="请选择接收人" style="width:100%">
                                    <el-option v-for="item in recipientOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>    
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="完成时间">
                                <el-date-picker type="date" placeholder="完成时间" v-model="AddForm.completeDate">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="附件">
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
                <el-form :model="trackingForm" style="margin-top:20px;background:#eef1f6;padding:10px;">
                    <el-form-item label="处理结果" :label-width="formLabelWidth">
                        <el-select v-model="trackingForm.disposeResult" placeholder="请选择处理状态">
                            <el-option v-for="item in resultOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="汇报内容" :label-width="formLabelWidth">
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
        </section>
    </div>
</template>


<script>
import tabelHeader from 'components/tabelHeader'
import { changeDate } from 'common/js/config'

import { dangers, addDanger, editDanger, delDanger, insertRiskFollower, selectRiskRegister } from 'api/projectPre'

export default {
    props: {
        proId: {
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
            riskId:'',
            projectId:'',
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
                startingDate: '',
                recipient: '',
                endingDate: '',
                appendix: '',
                Records: ''
            },
            recipientOptions: [
                { //接收人列表
                    value: '选项1',
                    label: '研发李一'
                }
            ],
            tableData: [],
            recordList: [],
            trackingForm: {
                result: '',
                content: '',
                appendix: ''
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
            this.projectId = this.proId;
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
            dangers(this.proId).then(resp => {
                this.riskData = resp.data.result.list;
            }).catch(e => {
                console.log('dangers exists error: ', e);
            })
        },
        // 删除当前行
        handleDelete(id) {
            console.log(" 删除风险数据id：" + id);
            delDanger(id).then(resp => {
                console.log("删除风险结果："+ JSON.stringify(resp.data));
                this.getDatas();
            }).catch(e => {
                console.log('delDanger() exists error: ', e);
            })
        },
        //添加风险
        confirmAdd() {
            this.AddForm.completeDate = changeDate(this.AddForm.completeDate);
            let userId = JSON.parse(sessionStorage.getItem('userInfor')).id;

            console.log("projectId" + this.projectId);
            let risk = {
                projectId: this.projectId,
                riskTheme: this.AddForm.riskTheme,
                seedUserId: userId,
                receivedUserId: this.AddForm.receivedUserId,
                completeDate: this.AddForm.completeDate,
                riskDescribe: this.AddForm.riskDescribe
            };
            console.log("add----risk :" + JSON.stringify(risk));
            addDanger(risk).then(resp => {
                console.log("addDanger result:" + JSON.stringify(resp.data));
                this.modalAdd = false;
                this.getDatas();
            }).catch(e => {
                console.log('addRecord exists error: ', e)
            });

        },
        //添加风险跟踪
        confirmTracking() {
            console.log("122121323");
            let riskRegisterId = this.riskId,
                disposeResult = this.trackingForm.disposeResult,
                recordDetails = this.trackingForm.recordDetails;
            let params = {
                riskRegisterId,
                disposeResult,
                recordDetails
            };
            console.log('添加风险跟踪参数: ',  + JSON.stringify(params));
            insertRiskFollower(params).then(resp => {
                this.modalTracking = false;
                this.getDatas();
            }).catch(e => {
                console.log('confirmTracking() exists error: ', e);
            })
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
    },
    components: {
        tabelHeader
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
