<template>
<div class="upload">
    <el-dialog title="基金设立报告" :visible.sync="modalUpload" :close-on-click-modal="false" :show-close="false">
        <Upload ref="upload" multiple type="drag" :action="actionUrl" :on-success="handleSuccess" :data="uploadInfo">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52"></Icon>
                <p>点击或将文件拖拽到这里上传</p>
            </div>
        </Upload>
        <div v-if="file !== null">待上传文件：{{ file.name }}</div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalCancel">取 消</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
import {API_ROOT} from '../config'
export default {
    props: {
        modalUpload: {
            type: Boolean,
            default: false
        },
        uploadInfo: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            file: null,
            actionUrl: API_ROOT + '/files/uploadProjectDocument'
        }
    },
    methods: {
        modalCancel() {
            this.$emit('cancelModal')
        },
        modalSubmit() {
            this.loadingStatus = true
        },
        handleSuccess() {
            this.$emit('uploadSuccess')
        }
    }
}
</script>

<style lang="less" scoped>
</style>
