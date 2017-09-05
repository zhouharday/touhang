<template>
    <div>
        <section class="riskTable">
            <tabel-header :data="headerInfo_risk" ></tabel-header>
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
                        <el-button type="text" size="small" @cilck="modalTracking = true">跟踪</el-button>
                        <el-button type="text" size="small" class="btn_border">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,riskData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 风险跟踪 对话框-->
            <el-dialog title="风险跟踪" :visible.sync="modalTracking" :close-on-click-modal="false">
                <el-form :model="trackingForm" :label-width="formLabelWidth">
                    <el-row>
                        <el-col>
                            <el-form-item label="风险主题">
                                <el-input v-model="trackingForm.theme" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="风险描述">
                                <el-input type="textarea" :rows="3" v-model="trackingForm.description" auto-complete="off">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="提出人">
                                <el-input v-model="trackingForm.proposer" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="提出时间">
                                <el-input v-model="trackingForm.startingDate" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="接收人">
                                <el-input v-model="trackingForm.recipient" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="完成时间">
                                <el-input v-model="trackingForm.endingDate" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="附件">
                                <el-input v-model="trackingForm.appendix" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="处理记录">
                                <el-input type="textarea" :rows="3" v-model="trackingForm.Records" auto-complete="off">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-row>
                        <el-col style="display:flex;justify-content:flex-end;">
                            <el-button @click="modalTracking = false">取 消</el-button>
                            <el-button type="primary" @click="confirmTracking">确 定</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-dialog>
        </section>
    </div>
</template>


<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            modalTracking: false,
            formLabelWidth: '80px',
            headerInfo_risk: {
                desc: '风险登记',
                btnGroup: [{
                        icon: 'plus-round',
                        explain: '添加'
                    }]
            },
            trackingForm: [
                {
                    theme: '',
                    description: '',
                    proposer: '',
                    startingDate: '',
                    recipient: '',
                    endingDate: '',
                    appendix: '',
                    Records: ''
                }
            ],
            riskData: [{
                riskTheme: 'AAAAAAAAAA',
                handlePerson: '',
                assignor: '',
                startingDate: '',
                endingDate: '',
                state: ''
            }, {
                riskTheme: '',
                handlePerson: '',
                assignor: '',
                startingDate: '',
                endingDate: '',
                state: ''
            }, {
                riskTheme: '',
                handlePerson: '',
                assignor: '',
                startingDate: '',
                endingDate: '',
                state: ''
            }],
        }
    },
    methods: {
        // 删除当前行
        handleDelete(index, rows) {
            rows.splice(index, 1);
        }
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
    .el-table {
        .btn_border {
            border-right: 1px solid #ddd;
            border-left: 1px solid #ddd;
            border-radius: 0;
            padding: 0 12px;
        }
    }
}
</style>
