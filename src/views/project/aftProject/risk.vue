<template>
    <div class="table">
        <div class="topBtn">
            <div class="leftBtn">
                <el-button @click="changeRisk1" :class="{active:f_show}">风险上报</el-button>
                <el-button @click="changeRisk2" :class="{active:s_show}">风险预警</el-button>
            </div>
            <div class="rightBtn">
                <el-button @click="modalAdd=true" v-if="addBtn">添加</el-button>
            </div>
        </div>
        <div class="f_risk" v-show="f_show">
            <el-table :data="riskData" border style="width: 100%" align="center">
                <el-table-column label="主题" prop="riskTheme" align="center">
                </el-table-column>
                <el-table-column label="处理人" prop="handlePerson" align="center">
                </el-table-column>
                <el-table-column label="指派人" prop="assignor" align="center">
                </el-table-column>
                <el-table-column label="开始时间" prop="startingDate" align="center">
                </el-table-column>
                <el-table-column label="完成时间" prop="endingDate" align="center">
                </el-table-column>
                <el-table-column label="状态" prop="state" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="modalRiskView=true">查看详情</el-button>
                        <el-button type="text" size="small" @click="modalTracking=true">跟踪</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,riskData)">删除</el-button>
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
                                <el-input type="textarea" :rows="3" v-model="AddForm.description" auto-complete="off">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="提出人">
                                <el-input v-model="AddForm.proposer" auto-complete="off" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="提出时间">
                                <el-input placeholder="当前默认时间" v-model="AddForm.startingDate" disabled>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="接收人">
                                <el-select v-model="AddForm.recipient" placeholder="请选择接收人" style="width:100%">
                                    <el-option v-for="item in recipientOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="完成时间">
                                <el-date-picker type="date" placeholder="完成时间" v-model="AddForm.endingDate" style="width: 100%;">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="附件">
                                <!-- action 上传的地址，必填 -->
                                <Upload multiple type="drag" :before-upload="handleUpload" v-model="AddForm.appendix" action="//jsonplaceholder.typicode.com/posts/">
                                    <div style="padding: 20px 0">
                                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                        <p>点击或将文件拖拽到这里上传</p>
                                    </div>
                                </Upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAdd = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd">保存</el-button>
                </div>
            </el-dialog>
            <!-- 查看风险详情 对话框 -->
            <el-dialog title="查看风险上报详情" :visible.sync="modalRiskView" :close-on-click-modal="false">
                <el-table :data="riskData1" border style="width: 100%">
                    <el-table-column prop="riskTheme" label="风险主题" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="description" label="风险描述" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="proposer" label="提出人" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="startingDate" label="提出时间" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="recipient" label="接收人" width="150px" align="center">
                    </el-table-column>
                    <el-table-column label="完成时间" width="200px" align="center">
                    </el-table-column>
                    <el-table-column prop="appendix" label="附件" width="150px" align="center">
                    </el-table-column>
                </el-table>
                <div class="operationBox">
                    <div class="left">
                        <div>处理记录</div>
                    </div>
                    <div class="right">
                        <p v-for="(item,index) in riskRecords" :key="item.index">
                            <span>{{item.record}}</span>
                            <span>{{item.file}}</span>
                        </p>
                    </div>
                </div>
            </el-dialog>
            <!-- 风险跟踪  对话框 -->
            <el-dialog title="风险跟踪" :visible.sync="modalTracking" :close-on-click-modal="false">
                <el-table :data="riskData1" border style="width: 100%">
                    <el-table-column prop="riskTheme" label="风险主题" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="description" label="风险描述" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="proposer" label="提出人" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="startingDate" label="提出时间" width="150px" align="center">
                    </el-table-column>
                    <el-table-column prop="recipient" label="接收人" width="150px" align="center">
                    </el-table-column>
                    <el-table-column label="完成时间" width="200px" align="center">
                    </el-table-column>
                    <el-table-column prop="appendix" label="附件" width="150px" align="center">
                    </el-table-column>
                </el-table>
                <div class="operationBox">
                    <div class="left">
                        <div>处理记录</div>
                    </div>
                    <div class="right">
                        <p v-for="(item,index) in riskRecords" :key="item.index">
                            <span>{{item.record}}</span>
                            <span>{{item.file}}</span>
                        </p>
                    </div>
                </div>
                <el-form :model="trackingForm" style="margin-top:20px;background:#eef1f6;padding:10px;">
                    <el-form-item label="处理结果" :label-width="formLabelWidth">
                        <el-select v-model="trackingForm.result" placeholder="请选择处理状态">
                            <el-option label="处理中" value="处理中"></el-option>
                            <el-option label="已解决" value="已解决"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="汇报内容" :label-width="formLabelWidth">
                        <el-input type="textarea" :rows="2" v-model="trackingForm.content" auto-complete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="处理方案" :label-width="formLabelWidth">
                        <!-- action 上传的地址，必填 -->
                        <Upload multiple type="drag" :before-upload="handleUpload" v-model="trackingForm.appendix" action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalTracking= false">取 消</el-button>
                    <el-button type="primary" @click="confirmTracking">保存</el-button>
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
                        <el-button type="text" size="small" @click="modalAlarmView=true">查看详情</el-button>
                        <el-button type="text" size="small" @click="modalAlarm=true">立即处理</el-button>
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
                <el-form :model="alarmForm" style="margin-top:20px;background:#eef1f6;padding:10px;" :label-width="formLabelWidth">
                    <el-form-item label="处理结果">
                        <el-select v-model="alarmForm.result" placeholder="请选择处理状态">
                            <el-option v-for="item in resultOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="汇报内容">
                        <el-input type="textarea" :rows="2" v-model="alarmForm.content" auto-complete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="处理方案">
                        <!-- action 上传的地址，必填 -->
                        <Upload multiple type="drag" :before-upload="handleUpload" v-model="alarmForm.appendix" action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAlarm = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAlarm">保存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>





<script type="text/ecmascript-6">
export default {
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
                riskTheme: '',
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
                result: '',
                content: '',
                appendix: ''
            },
            resultOptions: [
                { //处理结果列表
                    value: '选项1',
                    label: '处理中'
                }, {
                    value: '选项2',
                    label: '已解决'
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
    methods: {
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
        // 删除当前行
        handleDelete(index, rows) {
            rows.splice(index, 1);
        },
        confirmAdd() {
            this.modalAdd = false;
            this.AddForm.startingDate = changeDate(this.AddForm.startingDate);
            this.AddForm.endingDate = changeDate(this.AddForm.endingDate);
        },
        confirmTracking() {
            this.modalTracking = false;
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
        .rightBtn {}
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
