<template>
    <!-- 查看进度 对话框 -->
    <div class="progressBox">
        <el-dialog :title="dialogTitle" :visible.sync="progressModal">
            <div style="height:2px;border-bottom: 1px solid #f05e5e;margin-bottom:20px"></div>
            <el-table :data="table1.appendixList">
                <el-table-column :label="table1.progressName" width="250">
                    <template scope="scope">
                        <span v-if="scope.$index==0">附件</span>
                    </template>
                </el-table-column>
                <el-table-column prop="fileName">
                </el-table-column>
                <el-table-column align="left">
                    <template scope="scope">
                        <el-button type="text">预览</el-button>
                        <a :href="scope.row.url" style="font-size:12px;color:#f05e5e;margin-left:10px" :download="scope.row.fileName">下载</a>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="table2" style="margin:15px 0;" :row-class-name="tableRowClassName">
                <el-table-column prop="node" label="审批节点" align="center">
                </el-table-column>
                <el-table-column prop="operator" label="处理人" align="center">
                </el-table-column>
                <el-table-column prop="startingTime" label="开始时间" align="center" width="210">
                </el-table-column>
                <el-table-column prop="conclusion" label="结论" align="center">
                </el-table-column>
                <el-table-column label="意见备注" align="center">
                    <template scope="scope">
                        <el-popover ref="popover1" trigger="hover" placement="top">
                            <p style="width:400px;text-indent:28px">{{ scope.row.notes }}</p>
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
                <el-form :model="approvalForm" label-position="right" style="padding: 10px 0 0 50px">
                    <el-form-item>
                        <el-radio v-model="approvalForm.radio" label="1">同意</el-radio>
                    </el-form-item>
                    <el-form-item label="审批人">
                        <el-select v-model="approvalForm.auditor" placeholder="请选择审批人">
                            <el-option v-for="item in auditorOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-radio v-model="approvalForm.radio" label="2">不同意</el-radio>
                    </el-form-item>
                    <el-form-item label="审批意见">
                        <el-input type="textarea" v-model="approvalForm.approvalNotes" :rows="4" style="width:75%"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align:center">
                    <el-button size="large" type="danger" class="footer-btn" @click="submitHandler($event)">提交</el-button>
                    <el-button size="large" type="default" class="footer-btn" @click="cancleHandler($event)">取消</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>


<script type="text/ecmascript-6">
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
        table1: {
            type: Object,
            default: {} /*table1默认格式 table1: { progressName: 'xxx',appendixList: [{fileName:'', url: ''}]} */
        },
        table2: {
            type: Array
        },
        approvalForm: {
            type: Object
        },
        auditorOptions: {
            type: Array
        },
        isBlock: { // false时 查看进度对话框， true时 审批对话框
            type: Boolean,
            default: false
        }
    },
    methods: {
        submitHandler(event) {
            this.$emit('submit', event.target)
        },
        cancleHandler(event) {
            this.$emit('cancle', event.target)
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