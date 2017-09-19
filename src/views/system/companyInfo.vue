<template>
<div class="companyInfo">
    <el-row style="width: 100%;" class="row">
        <el-col :span="16" :offset="4" class="col">
            <el-form :model="companyInfo" label-position="left" label-width="120px">
                <el-form-item label="企业名称:">
                    <el-input v-model="companyInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="企业logo:">
                    <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击或将文件拖拽到这里上传</p>
                        </div>
                    </Upload>
                </el-form-item>
                <el-form-item class="btn_wrapper">
                    <el-button class="changeWidth" type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button class="changeWidth">取消</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            companyInfo: {}
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/mixin.less";
.companyInfo {
    .base-style();
    .row {
        padding-top: @height-small;
        .col {
            border: 1px solid #ddd;
            border-radius: 6px;
            padding: 24px;
        }
        .btn_wrapper {
            text-align: center;
            .changeWidth {
                width: 120px;
            }
        }
    }
}
</style>
