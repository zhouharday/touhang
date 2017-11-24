<template>
    <div>
        <section class="fileTable" v-show="isShow">
            <tabel-header :data="headerInfo_file" @add="fileDialog"></tabel-header>
            <el-table :data="fileData" border style="width: 100%" align="center">
                <el-table-column label="文档名称" prop="documentName" align="center" resizable="false">
                </el-table-column>
                <el-table-column label="用户" prop="uploadUser" align="center" resizable="false">
                </el-table-column>
                <el-table-column label="上传日期" prop="createDate" align="center" resizable="false">
                    <template scope="scope">{{scope.row.createDate | formatDate}}</template>
                </el-table-column>
                <el-table-column label="操作" align="center" resizable="false">
                    <template scope="scope">
                        <a v-if="scope.row.id != '' && scope.row.id != undefined" :href="scope.row.documentUrl" style="font-size:12px;" download="scope.row.documentName">下载</a>
                        <el-button v-if="scope.row.id != null && scope.row.previewPath != null" type="text"   class="btn_border" @click="preview(scope.row.previewPath)">预览</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 上传文档 对话框-->
            <el-dialog title="上传文档" :visible.sync="modalAdd">
                <el-form :model="fileForm" label-position="left" label-width="80px">
                    <el-form-item label="用户">
                        <el-input v-model="userName" placeholder="默认当前登录用户" auto-complete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="上传日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="createDate" style="width: 100%;" disabled>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="上传文件">
                        <!-- action 上传的地址，必填 -->
                        <Upload ref="upload" multiple type="drag":on-success="handleSuccess" :headers ="headers":data="uploadInfo" :action="actionUrl">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAdd = false">取 消</el-button>
                    <!-- <el-button type="danger" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</el-button> -->
                </div>
            </el-dialog>
        </section>
        <show-pdf v-show="isshowpdf" @closepdf="closepdf" :pdfurl="pdfurls" @pdferr="pdferr"></show-pdf>
    </div>
</template>


<script>
import tabelHeader from 'components/tabelHeader'
import 'common/js/filter'
import showPdf from 'components/showPdf'
import { changeDate } from 'common/js/config'
import { getEarlierDoc } from 'api/project'
import { delDocument } from 'api/projectPre'
export default {
    data() {
        return {
            pdfurls:'',
            isshowpdf:false,
            isShow: true,
            isHide: false,
            file: null,
            loadingStatus: false,
            modalAdd: false,
            fileForm: {
                user: '',
                date: ''
            },
            fileData: [{
                fileName: 'AAAAAAAAA',
                user: '张三',
                date: '2017-09-09'
            }
            ],
            headerInfo_file: {
                desc: '前期文档',
                btnGroup: [{
                    icon: 'upload',
                    explain: '上传'
                }]
            },
            createDate: changeDate(new Date()),
            userName: JSON.parse(sessionStorage.getItem('userInfor')).name, //当前用户
            actionUrl: this.api + '/files/uploadProjectDocument',
             // actionUrl: "//192.168.0.118:9091"+ '/files/uploadProjectDocument',
            headers: {
                Authorization: JSON.parse(sessionStorage.getItem('token')) || ''
            },
            uploadInfo: {
                file: '',
                stageId: '1',
                uploadTypeId: this.projectId,
                fileId: '',
                type: 3,
                userId: JSON.parse(sessionStorage.getItem('userInfor')).id
            },
        }
    },
    props: {
        tabs: {
            type: Object,
            default: {}
        },
        projectId:{
            type:String,
            default: ''
        }
    },
    created() { 
        // this.init();
    },
    watch: {
        'tabs':function (to,from){
            if(to.tabList[3]){
                this.init();
            }
        }
    },
    methods: {
        init(){
            getEarlierDoc(this.projectId).then(resp => {
                if (resp.data.status === '200') {
                    this.fileData = resp.data.result.dataDocumentResult;
                } else if (resp.data.status === '49999') {
                    this.fileData = [];
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('获取前期文档列表error: ', e);
            })
            
        },
        fileDialog() {
            this.modalAdd = true
        },
        handleSuccess(res, file) {
            if(res.status == '200') {
                this.$Message.success(res.message || '上传成功！')
                this.modalAdd = false;
                this.$refs.upload.clearFiles();
                this.init();
            }
        },
        preview(url) {
            this.pdfurls = url;
            this.isshowpdf = true;
        },
        pdferr(err){
            console.log("pdferr!! ", err);
            this.$Message.error('读取预览文件出错！');
        },
        closepdf(){
            this.isshowpdf = false;
        },
        handleDelete(id) {
            delDocument(id).then((res) => {
                if (res.data.status == '200') {
                    this.$Message.success(res.data.message || '删除成功！');
                    this.init();
                }
            });
        }
    },
    components: {
        tabelHeader,
        showPdf
    }

}
</script>



<style lang="less" scoped>
.fileTable {
    width: 100%;
    height: 100%;
    .el-table {
        a {
            margin-right: 10px;
        }
        .btn_border {
            border-right: 1px solid #ddd;
            border-left: 1px solid #ddd;
            border-radius: 0;
            padding: 0 12px;
        }
    }
}

</style>
