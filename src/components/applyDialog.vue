<template>
    <!-- 发起申请 对话框-->
    <div class="applyBox">
        <el-dialog title="发起申请" :visible.sync="applyModal">
            <i class="bottomLine"></i>
            <el-form :model="applyForm" ref="applyForm" label-width="60px">
                <el-row>
                    <el-col :span="13">
                        <el-form-item label="标题" prop="name">
                            <el-input v-model="applyForm.title" placeholder="标题自动生成" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="审批人" prop="auditor">
                            <el-select v-model="applyForm.auditor" filterable placeholder="请选择" style="width: 50%">
                                <el-option v-for="item in auditorOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注" prop="notes">
                            <el-input type="textarea" v-model="applyForm.notes" :rows="4"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button size="large" type="danger" class="footer-btn" @click="submitHandler($event)">提交</el-button>
                <el-button size="large" type="default" class="footer-btn" @click="cancleHandler($event)">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        applyModal: {
            type: Boolean,
            default: false
        },
        applyForm: {
            type: Object
        },
        auditorOptions: {
            type: Array
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
.bottomLine {
    display: inline-block;
    width: 100%;
    margin-bottom: 20px;
    border-bottom: 1px solid #f05e5e;
}

.footer-btn {
    width: 125px;
    padding: 10px 15px;
    border-radius: 8px;
}
</style>
