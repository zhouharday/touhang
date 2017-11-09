<template>
    <!-- 查看进度 对话框 -->
    <div class="progressBox">
        <el-dialog :title="dialogTitle" :visible.sync="progressModal" :close-on-click-modal="false" @close="closeModal">
            <div style="height:2px;border-bottom: 1px solid #f05e5e;margin-bottom:20px"></div>
            <el-table :data="documentInfo">
                <el-table-column label="文档列表" prop="allocationDocumentName" width="250">
                </el-table-column>
                <el-table-column prop="documentName">
                </el-table-column>
                <el-table-column align="left">
                    <template scope="scope">
                        <el-button v-if="scope.row.previewPath != null" type="text" @click="preview(scope.row.previewPath)">预览</el-button>
                        <a :href="scope.row.documentUrl" style="font-size:12px;color:#f05e5e;margin-left:10px" :download="scope.row.documentName">下载</a>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="table2" style="margin:15px 0;" :row-class-name="tableRowClassName">
                <el-table-column prop="roleName" label="审批节点" align="center">
                </el-table-column>
                <el-table-column prop="approveUserName" label="处理人" align="center">
                </el-table-column>
                <el-table-column prop="disposeDate" label="开始时间" align="center" width="210">
                </el-table-column>
                <el-table-column prop="disposeResult" label="结论" align="center">
                    <template scope="scope">
                        {{scope.row.disposeResult |key2value(resultOptions, scope.row.disposeResult)}}
                    </template>
                </el-table-column>
                <el-table-column label="意见备注" align="center">
                    <template scope="scope">
                        <el-popover ref="popover1" trigger="hover" placement="top">
                            <p style="width:400px;text-indent:28px">{{ scope.row.remark }}</p>
                        </el-popover>
                        <el-button type="text" v-popover:popover1>查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 审批 对话框-->
            <div v-if="isBlock">
                <div class="title_f" style="background:#2a3142;color:#fff">
                    <div class="desc">
                        <span>审批意见</span>
                    </div>
                </div>
                <el-form :model="approvalForm" :rules="rule" ref="approvalForm" label-position="right" style="padding: 10px 0 0 50px">
                    <el-form-item label="审批结果">
                        <el-redio-group @change="changeResult">
                            <el-radio v-model="approvalForm.disposeResult" label="1">同意</el-radio>
                            <el-radio v-model="approvalForm.disposeResult" label="2">不同意</el-radio>
                        </el-redio-group>
                    </el-form-item>
                    <el-form-item v-if="approvalForm.roleId && approvalForm.disposeResult == '1'" prop="approveUserId" label="审  批  人">
                        <el-select v-model="approvalForm.approveUserId" placeholder="请选择审批人">
                            <el-option v-for="item in auditorOptions" :key="item.userId" :label="item.userName" :value="item.userId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审批意见">
                        <el-input type="textarea" v-model="approvalForm.remark" :rows="4" style="width:75%"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align:center">
                    <el-button size="large" type="danger" class="footer-btn" @click="submitHandler($event)">提交</el-button>
                    <el-button size="large" type="default" class="footer-btn" @click="cancleHandler($event)">取消</el-button>
                </div>
            </div>
        </el-dialog>
        <show-pdf v-show="isshowpdf" @closepdf="closepdf" :pdfurl="pdfurls" @pdferr="pdferr"></show-pdf>
    </div>
</template>


<script>
import 'common/js/filter'
import showPdf from 'components/showPdf'
export default {
    props: {
        progressModal: {
            type: Boolean,
            default: false
        },
        dialogTitle: {
            type: String,
            default: '查看进度'
        },
        documentInfo: {
            type: Array,
            default: []
        },
        table2: {
            type: Array,
            default: []
        },
        approvalForm: {
            type: Object,
            default:{}
        },
        auditorOptions: {
            type: Array,
            default:[]
        },
        isBlock: { // false时 查看进度对话框， true时 审批对话框
            type: Boolean,
            default: false
        }
    },
    components: {
        showPdf
    },
    data() {
        return {
            pdfurls:'',
            isshowpdf:false,
            resultOptions: [
                {
                    key: -1,
                    value: '发起申请'
                }, {
                    key: 0,
                    value: '待审批'
                },
                {
                    key: 1,
                    value: '同意'
                }, {
                    key: 2,
                    value: '不同意'
                }
            ],
            rule: {
                approveUserId: [
                    { required: true, message: '请选择下一级审批人', trigger: 'blur' }
                ]    
            },
        }
    },
    methods: {
        submitHandler(event) {
            this.$refs["approvalForm"].validate((valid) => {
                if (valid) {
                    this.$emit('submit', this.approvalForm);
                }
            });
        },
        cancleHandler(event) {
            this.$emit('cancle', event.target);
        },
        preview(url) {
            this.pdfurls = url;
            this.isshowpdf = true;
        },
        pdferr(err){
            console.log("pdferr!! ", err);
            this.$Message.error('读取预览文件出错！');
        },
        closeModal() { // 预览关闭按钮
            this.$emit('closeShowModal')
        },
        closepdf(){
            this.isshowpdf = false;
        }
    }
}
</script>

<style lang="less" scoped>
// 小双助手 查看进度对话框中的样式
.title_f {
    margin-top: 20px;
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    .desc {
        flex: 1;
        text-align: left;
        span {
            color: #fff;
            margin-left: 50px;
        }
    }
}

.footer-btn {
    width: 125px;
    padding: 8px 15px;
    border-radius: 8px;
}
</style>
