<template>
    <div class="uploadFiles">
        <Upload multiple type="drag" name="files" :action="actionUrl" :default-file-list="documentInfo" :show-upload-list="true" :on-success="handleSuccess" :on-remove="handleRemove" class="upload">
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
            actionUrl: this.api + '/files/upload'
        }
    },
    created(){
        console.log(this.documentInfo)
    },
    methods: {
        handleSuccess(resp, file, fileList) {
            if (resp.status == '200') {
                fileList.forEach(item => {
                    item.filePath = resp.filePath;
                    item.fileName = resp.fileName;
                    item.type = '1';
                });
                this.documentInfo = fileList;
                this.$emit('uploadSuccess', fileList);
                // console.log("handleSuccess fileList-"+JSON.stringify(fileList));
            }
        },
        handleRemove(file, fileList) {
            this.documentInfo.forEach((item) => {
                if (item.uid === file.uid) {
                    item.type = '2'
                    item.fileName = item.name,
                    item.filePath = item.url
                }
            });
            // console.log("remove documentInfo ***"+JSON.stringify(this.documentInfo));
            this.$emit('uploadSuccess', this.documentInfo);
        }
    }
}

</script>
<style lang="css">
.upload /deep/ .ivu-upload-list {
    display: block!important;
}
</style>
