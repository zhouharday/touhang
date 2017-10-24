<template>
    <div class="uploadFiles">
           <Upload multiple type="drag" name="files" :action="actionUrl"  show-upload-list="true" :on-success="handleSuccess">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52"></Icon>
            <p>点击或将文件拖拽到这里上传</p>
        </div>
    </Upload>
    </div>
</template>

<script>
export default {
    data() {
        return {
            actionUrl:this.api + '/files/upload'
        }
    },
    methods: {
        handleSuccess(resp, file, fileList){
            if(resp.status == '200'){
                this.$emit('uploadSuccess', resp);
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .uploadFiles{
        width: 100%;
        height: 100%;
    }
</style>