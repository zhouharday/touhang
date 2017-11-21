<template>
    <div class="uploadFiles">
        <Upload multiple type="drag" name="files" :action="actionUrl" :default-file-list="documentInfo" :headers="headers" :show-upload-list="true" :on-success="handleSuccess" :on-remove="handleRemove" :on-error="handleError" class="upload">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52"></Icon>
                <p>点击或将文件拖拽到这里上传</p>
            </div>
        </Upload>
    </div>
</template>
<script>
export default {
    props: {
        //默认文件列表 编辑时展示
        documentInfo: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            headers: {
                Authorization: JSON.parse(sessionStorage.getItem('token')) || ''
            },
            actionUrl: this.api + '/files/upload'
        }
    },
    created(){
    },
    watch: {
        'documentInfo':function (to,from){
        }
    },
    methods: {
        handleSuccess(resp, file, fileList) {
            if (resp.status == '200') {
                fileList.forEach(item => {
                    if (item.uid === file.uid) {
                        item.filePath = resp.filePath;
                        item.fileName = resp.fileName;
                        item.type = '1';
                    }
                });
                this.documentInfo = fileList;
                this.$emit('uploadSuccess', fileList);
            }
        },
        handleRemove(file, fileList) {
            this.documentInfo.forEach((item) => {
                if (item.uid === file.uid) {
                    item.type = '2';
                }
            });
            this.$emit('uploadSuccess', this.documentInfo);
        },
        handleError(error, file, fileList){
            this.$message.error("上传失败");
        }
    }
}

</script>
<style lang="css">
.upload /deep/ .ivu-upload-list {
    display: block!important;
}

.upload .ivu-upload-list {
    display: block!important;
}
</style>
