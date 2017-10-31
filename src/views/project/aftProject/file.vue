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
                    <el-table-column :label="docList.title" prop="allocationDocumentName" align="center">
                    </el-table-column>
                    <el-table-column prop="documentName" align="center">
                    </el-table-column>
                    <el-table-column prop="uploadUser" align="center">
                    </el-table-column>
                    <el-table-column prop="createDate" align="center">
                    </el-table-column>
                    <el-table-column align="center">
                        <template scope="scope">
                            <a v-if="checkProjectAuth('WD-xiazai') && (scope.row.id != null)" :href="scope.row.documentUrl" style="font-size:12px;" download="scope.row.documentName">下载</a>
                            <el-button v-if="checkProjectAuth('WD-yulan') && (scope.row.id != null && scope.row.previewPath != '')" type="text"   class="btn_border" @click="preview(scope.row.previewPath)">预览</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <show-pdf v-show="isshowpdf" @closepdf="closepdf" :pdfurl="pdfurls" @pdferr="pdferr" maxscale='4' minscale='0.6' scale='1.1' ></show-pdf>
    </div>
</template>


<script>
import showPdf from 'components/showPdf'
import {checkProjectAuth } from 'common/js/config'
import {
    getProjectDoc
} from 'api/projectPre';

export default {
    props: {
        tabs: {
            type: Object,
            default: {}
        },
        projectId: {
            type: String,
            default: ''
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
            formLabelWidth: '80px',
            fileData: [{
                stageFile: 'BBBBBBBB.PDF',
                fileName: 'AAAAAAAAA.PDF',
                user: '张三',
                date: '2017-09-09'
            }],
            inspectionData: [{
                stageFile: 'AAAAAAAAA.PDF',
                inspectionName: 'AAAAAAAAA.PDF',
                user: '张三',
                date: '2017-09-09'
            }],
            projectData: [{
                stageFile: 'AAAAAAAAA.PDF',
                projectName: 'AAAAAAAAA.PDF',
                user: '张三',
                date: '2017-09-09'
            },
            {
                stageFile: 'AAAAAAAAA.PDF',
                projectName: 'AAAAAAAAA.PDF',
                user: '张三',
                date: '2017-09-09'
            }]
        }
    },
    created() {
    },
    watch: {
        'tabs':function (to,from){
            if(to.tabList[2]){
                this.init();
            }
        }
    },
    methods: {
        checkProjectAuth(code){
            return checkProjectAuth(code);
        },
        init() {
            this.getProjectDocument();
        },
        getProjectDocument() {
            getProjectDoc(this.projectId).then(resp => {
                if(resp.data.status == '200'){
                    this.projectDocList = resp.data.result || [];
                }else{
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('getProjectDoc() exists error: ', e);
            });
        },
        preview(url) {
            this.pdfurls = url.replace('http://47.90.120.190:8086', '/file');
            this.isshowpdf = true;
        },
        pdferr(err){
            console.log("pdferr!! ", err);
            this.$Message.error('读取预览文件出错！');
        },
        closepdf(){
            console.log("closepdf");
            this.isshowpdf = false;
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
        }
        .btn_border {
            border-right: 1px solid #ddd;
            border-left: 1px solid #ddd;
            padding: 0 12px;
        }
    }
}


.viewFiles {
    position: relative;
    width: 100%;
    padding: 20px 30px;
    box-sizing: border-box;
    background: #fff;
    .closeView {
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        img {
            width: 35px;
            height: 35px;
            border: 1px solid #fff;
            border-radius: 50%;
            background: #F05E5E;
        }
    }
}
</style>
