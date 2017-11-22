<template>
    <!-- 发起申请 对话框-->
    <div class="applyBox">
        <el-dialog title="发起申请" :visible.sync="applyModal">
            <i class="bottomLine"></i>
            <el-form :model="applyForm" :rules="applyRule" ref="applyForm" label-width="100px">
                <el-row>
                    <el-col :span="13">
                        <el-form-item label="标题" prop="approveTitle">
                            <el-input v-model="applyForm.approveTitle" placeholder="标题自动生成" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="审批人" prop="approveUserId">
                            <el-select v-model="applyForm.approveUserId" filterable no-data-text="该角色无用户" placeholder="请选择" style="width: 50%">
                                <el-option v-for="item in auditorOptions" :key="item.userId" :label="item.userName" :value="item.userId">
                                </el-option>
                            </el-select>
                            <Alert type="warning" v-if="noApproveUser" style="width: 50%" show-icon>此项目中没有属于该角色的成员！</Alert>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注" prop="remark">
                            <el-input type="textarea" v-model="applyForm.remark" :rows="4"></el-input>
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

<script>
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
            type: Array,
            default: []
        }
    },
    data(){
        return {
            noApproveUser: false,
            applyRule:{
                approveUserId: [
                    { required: true, message: '请选择审批人' }
                ]
            }
        };
    },
    watch: {
        'auditorOptions':function (to,from){
            if(to.length == 0){
                this.noApproveUser = true;
            }
        },
    },
    methods: {
        submitHandler(event) {
            this.$refs["applyForm"].validate((valid) => {
                if (valid) {
                    this.$emit('submit', this.applyForm)
                }
            });
        },
        cancleHandler(event) {
            this.applyForm = {};
            this.auditorOptions = [];
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
