<template>
    <div>
        <!-- 前期文档部分 -->
        <div class="fileTable" v-show="isShow">
            <!-- <tabel-header :data="headerInfo_file"></tabel-header> -->
            <div class="title_f" style="background:#2a3142;color:#fff">
                <div class="desc">
                    <span>项目阶段</span>
                </div>
                <div class="desc">
                    <span>文档名称</span>
                </div>
                <div class="desc">
                    <span>上传人</span>
                </div>
                <div class="desc">
                    <span>上传时间</span>
                </div>
                <div class="desc">
                    <span>操作</span>
                </div>
            </div>
            <template v-for="(docList, index) in projectDocList">
                <el-table :data="docList.dataDocumentResult" border style="width: 100%" align="center">
                    <el-table-column :label="docList.title" prop="allocationDocumentName" align="center" resizable="false">
                    </el-table-column>
                    <el-table-column prop="documentName" align="center" resizable="false">
                    </el-table-column>
                    <el-table-column prop="uploadUser" align="center" resizable="false">
                    </el-table-column>
                    <el-table-column prop="createDate" align="center" resizable="false">
                    </el-table-column>
                    <el-table-column align="center" resizable="false">
                        <template scope="scope">
                            <!-- 上传 -->
                            <div v-if="checkProjectAuth('WD-shangchuan') && (index != 0 && (scope.row.id == null || scope.row.id == undefined || scope.row.id == ''))" style=" position:relative;">
                                <el-button type="text">上传</el-button>
                                <input type="file" class="fileInput" @change="changeFile($event, scope.row.fileId, scope.row.stageId)" ref="avatarInput">
                            </div>
                            <a v-if="checkProjectAuth('WD-xiazai') && (scope.row.id != null)" :href="scope.row.documentUrl" style="font-size:12px;" download="scope.row.documentName">下载</a>
                            <el-button v-if="checkProjectAuth('WD-yulan') && (scope.row.id != null && scope.row.previewPath != null)" type="text"   class="btn_border" @click="preview(scope.row.previewPath)">预览</el-button>
                            <el-button v-if="checkProjectAuth('WD-shanchu') && (scope.row.id != '' && scope.row.id != undefined)" type="text"   @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div><show-pdf v-show="isshowpdf" @closepdf="closepdf" :pdfurl="pdfurls" @pdferr="pdferr"></show-pdf></div>
    </div>
</template>

<script>
import showPdf from 'components/showPdf'
import {checkProjectAuth } from 'common/js/config'
import {
    getProjectDoc, delDocument
} from 'api/projectPre';

export default {
    props: {
        uploaded: {
            type: Boolean,
            default: false
        },
        tabs: {
            type: Object,
            default: {}
        },
        proId: {
            type: String,
            default: ''
        },
        projectId: {
            type: String,
            default: ''
        },
        isInTeam: {
            type: Boolean,
            default: false
        }
    },
    components: {
        showPdf
    },
    data() {
        return {
            pdfurls:'',
            isshowpdf:false,

            projectDocList: [],
            isShow: true,
            isHide: false,
            file: null,
            loadingStatus: false,
            formLabelWidth: '80px',
            fileForm: {
                user: '',
                date: ''
            },
            fileData: [],
            projectForm: {
                user: '',
                date: ''
            }
        }
    },
    created() {
        // this.init();
    },
    watch: {
        'tabs':function (to,from){
            if(to.tabList[4]){
                this.init();
            }
        },
        'uploaded':function(to,from){
            if(this.tabs.tabList[4] && to){
                this.uploaded = false;
                this.init();
            }
        }
    },
    methods: {
        checkProjectAuth(code){
            return checkProjectAuth(code) && this.isInTeam;
        },
        init() {
            this.projectId = this.proId;
            this.getProjectDocument();
        },
        getProjectDocument() {
            getProjectDoc(this.projectId).then(resp => {
                if(resp.data.status == '200'){
                    this.projectDocList = resp.data.result || [];
                }
            }).catch(e => {
                console.log('getProjectDoc() exists error: ', e);
            });
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
            console.log("closepdf");
            this.isshowpdf = false;
        },
        handleDelete(docId) {
            console.log('删除文档ID: ' + JSON.stringify(docId));
            delDocument(docId).then((res) => {
                console.log('删除文档: ' + JSON.stringify(res.data));
                if (res.data.status == '200') {
                    this.$Message.success(res.data.message || '删除成功！');
                    
                    this.uploaded = true;
                    this.$emit("listenUploaded",true);
                }
            });
        },
        changeFile(event, fileId, stageId) { //上传文件input
            event.preventDefault();
            console.log("fileId"+fileId);
            let userId = JSON.parse(sessionStorage.getItem('userInfor')).id;
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            formData.append('stageId', stageId);
            formData.append('userId', userId);
            formData.append('type', 3);
            formData.append('uploadTypeId', this.projectId);
            // formData.append('fileId', '');
            formData.append('fileId', fileId);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            // this.$http.post('http://192.168.0.136:9091' + '/files/uploadProjectDocument', formData, config)
            this.$http.post(this.api + '/files/uploadProjectDocument', formData, config)
            .then((res)=> {
                console.log("上传文件结果:"+ JSON.stringify(res.data));
                if (res.data.status == '200') {
                    // this.getProjectDocument();

                    this.uploaded = true;
                    this.$emit("listenUploaded",true);
                } else {
                    this.$Message.error(res.data.message);
                }
            })
            .catch(e => {
                this.$Message.error("上传错误");
                console.log('上传错误: ', e);
               // loadingInstance.close();
            })
        }
    }
}
</script>



<style lang="less" scoped>
.fileTable {
    width: 100%;
    height: 100%;
    .title_f {
        margin-top: 20px;
        width: 100%;
        height: 42px;
        display: flex;
        align-items: center;
        .desc {
            width: 20%;
            flex: 1;
            text-align: center;
            span {
                color: #fff;
                font-weight: 700;
                margin-left: 24px;
            }
        }
    }
    .title {
        margin-top: 30px;
    }
    .el-table {
        a {
            margin: 0 10px;
        }
        .border_right {
            border-right: 1px solid #ddd;
            padding: 0 12px;
            font-size: 12px;
        }
        .btn_border {
            border-right: 1px solid #ddd;
            border-left: 1px solid #ddd;
            padding: 0 12px;
        }
    }
}
 .fileInput {
    opacity:0;
    position: absolute;
    left:10%;
    top:0px;
    width:80%;
    height:25px;
    line-height:25px;
}
</style>
