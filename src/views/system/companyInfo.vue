<template>
    <div class="companyInfo">
        <el-row style="width:  100%;" class="row">
            <el-col :span="16" :offset="4" class="col">
                <el-form :model="companyInfo" label-position="left" label-width="120px">
                    <el-form-item label="企业名称:">
                        <el-input v-model="companyInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="企业logo:">
                        <!--<Upload  multiple  type="drag"  action="//jsonplaceholder.typicode.com/posts/">-->
                        <!--<div  style="padding:  20px  0">-->
                        <!--<Icon  type="ios-cloud-upload"  size="52"  style="color:  #F05E5E"></Icon>-->
                        <!--<p>点击或将文件拖拽到这里上传</p>-->
                        <!--</div>-->
                        <!--</Upload>-->

                        <!--<el-upload  class="upload-demo"  drag  action="https://jsonplaceholder.typicode.com/posts/"  multiple>-->
                        <!--<i  class="el-icon-upload"></i>-->
                        <!--<div  class="el-upload__text">将文件拖到此处，或-->
                        <!--<em>点击上传</em>-->
                        <!--</div>-->
                        <!--<div  class="el-upload__tip"  slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
                        <!--</el-upload>-->
                        <div>
                            <div class="el-upload__text">
                                <span @click="getFile($event)">
                                    <Icon type="upload" size=100></Icon>
                                </span>
                                <form>
                                    <input type="file" style="display:none" @change="changeImage($event)" ref="avatarInput">
                                    <!--<button  @click="submitForm($event)"  class="cursor">点击上传</button>-->
                                    <span>{{file.name}}</span>
                                </form>
                                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10M</div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item class="btn_wrapper">
                        <el-button class="changeWidth" type="danger" @click="onSubmit">立即创建</el-button>
                        <el-button type="default" class="changeWidth">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script  type="text/ecmascript-6">
import { companyInfo } from 'api/system'
import { Loading } from 'element-ui';
export default {
    data() {
        return {
            companyInfo: {
                'name': JSON.parse(sessionStorage.getItem('merchants'))[0].merchant_name
            },
            fileAddress: 'lll',
            file: '',  //上传文件url
        }
    },
    methods: {
        getFile(event) {  //点击上传文件图像
            this.$refs.avatarInput.click();
        },
        changeImage(e) {  //上传文件input
            this.file = event.target.files[0];
            console.log('this file');
            console.log(this.file);
        },
        onSubmit(event) { //提交上传文件到服务器
            // alert(5656);
            let loadingInstance = Loading.service({ fullscreen: true });
            event.preventDefault();
            let formData = new FormData();
            // formData.append('file', this.file);
            formData.append('files', this.$refs.avatarInput.files[0]);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            this.$http.post(this.api + '/files/upload', formData, config)
                .then((res) => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {
                            this.fileAddress = res.data.filePath
                            //                    this.$Message.success(res.data.message);
                            companyInfo(this.fileAddress).then((res) => {
                                console.log(res)
                                loadingInstance.close();
                            })

                        } else if (res.data.status == '403') {
                            ;
                            this.$Message.error(res.data.message);
                            loadingInstance.close();
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error("请求超时");
                    loadingInstance.close();
                })
        },
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
