<template>
    <div>
        <section class="riskTable">
            <tabel-header :data="headerInfo_risk" @add="modalAdd = true"></tabel-header>
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
                                <el-input v-model="AddForm.theme" auto-complete="off"></el-input>
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
                                <el-input v-model="AddForm.proposer" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="提出时间">
                                <el-date-picker type="date" placeholder="提出时间" v-model="AddForm.startingDate">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="接收人">
                                <el-input v-model="AddForm.recipient" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="完成时间">
                                <el-date-picker type="date" placeholder="完成时间" v-model="AddForm.endingDate">
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
            <!-- 风险跟踪  对话框 -->
            <el-dialog title="风险跟踪" :visible.sync="modalTracking" :close-on-click-modal="false">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="theme" label="风险主题" width="150px" align="center">
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
                        <p v-for="(item,index) in Records" :key="item.index">
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
        </section>
    </div>
</template>


<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
import { changeDate } from 'common/js/config'
export default {
    data() {
        return {
            modalAdd: false,
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
            tableData: [
                {
                    theme: 'AAAAAA',
                    description: '',
                    proposer: '',
                    startingDate: '',
                    recipient: '',
                    endingDate: '',
                    appendix: '',
                }
            ],
            Records: [
                {
                    record: '2017-06-28 18:42:55   刘备  【处理中】已经提交相应处理方案',
                    file: 'AAA.doc'
                },
                {
                    record: '2017-06-28 18:42:55   刘备  【已完成】 已经完成处理',
                    file: 'AAA.PDF'
                }
            ],
            trackingForm: {
                result: '',
                content: '',
                appendix: ''
            },
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
    methods: {
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
