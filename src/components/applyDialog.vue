<template>
    <!-- 发起申请 对话框-->
    <div class="applyBox">
        <el-dialog title="发起申请" :visible.sync="applyModal" :close-on-click-modal="false">
            <el-form :model="applyForm" ref="applyForm" label-width="100px">
                <el-row>
                    <el-col>
                        <el-form-item label="标题" prop="name">
                            <el-input v-model="applyForm.title" placeholder="标题自动生成" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="申请人" prop="person">
                            <el-input v-model="applyForm.person" placeholder="当前用户" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="申请日期" prop="date">
                            <el-input v-model="applyForm.date" placeholder="当前日期" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="备注" prop="notes">
                            <el-input type="textarea" :rows="2" v-model="applyForm.notes" auto-complete="off">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="考察报告" prop="appendix">
                            <!-- action 上传的地址，必填 -->
                            <Upload multiple type="drag" :before-upload="handleUpload" v-model="applyForm.appendix" action="//jsonplaceholder.typicode.com/posts/">
                                <div style="padding: 20px 0">
                                    <Icon type="ios-cloud-upload" size="52"></Icon>
                                    <p>点击或将文件拖拽到这里上传</p>
                                </div>
                            </Upload>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="选择审批人" prop="date">
                            <el-select v-model="applyForm.auditor " filterable placeholder="请选择" style="width: 50%">
                                <el-option v-for="item in auditorOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button type="danger" @click="submitHandler($event)">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        applyModal: {
            type:  Boolean,
            default: false
        },
        applyForm: {
            type: Object
        }
    },
     methods: {
        submitHandler() {
            this.$emit('submit', event)
        }
    }
}
</script>