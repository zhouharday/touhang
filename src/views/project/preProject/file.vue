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
                            <!-- 上传 -->
                            <div v-if="index != 0 && (scope.row.id == null || scope.row.id == undefined || scope.row.id == '')" style=" position:relative;">
                                <el-button type="text">上传</el-button>
                                <input type="file" class="fileInput" @change="changeFile($event, scope.row.fileId, scope.row.stageId)" ref="avatarInput">
                            </div>
                            <a v-if="scope.row.id != '' && scope.row.id != undefined" :href="scope.row.documentUrl" style="font-size:12px;" download="scope.row.documentName">下载</a>
                            <el-button v-if="scope.row.id != '' && scope.row.id != undefined" type="text"   class="btn_border" @click="preview(scope.row)">预览</el-button>
                            <el-button v-if="scope.row.id != '' && scope.row.id != undefined" type="text"   @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <!-- 文件预览功能 -->
        <div class="viewFiles" v-show="isHide">
            <div class="closeView" @click="closeView">
                <img src="/static/img/close.png">
            </div>
            <div class="fileArea">
                不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。 v-show 是简单地切换元素的 CSS 属性 display 。 注意， v-show 不支持 语法，也不支持 v-else。v-if vs v-show v-if 是“真正的”条件渲染，因为它会确保在 切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。 惰性的：如果在初始渲染时条件为假，则什么也不做 ——直到条件第一次变为真时，才会开始渲染条件块。 相比之下， v-show 就简单得多——不管初始条件是什么，元素总是 会被渲染，并且只是简单地基于 CSS 进行切换。 一般来说， v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。 因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件不太可能改变，则使用 v-if 较好。 v-if 与 v-for 一起使用 当 v-if 与 v-for 一起使v-if 也是用时，v-for 具有比 v-if 更高的优先级。 请查阅 列表渲染指南 以获取详细信息。 ← Class 与 Style 绑定 列表渲染 → 发现错误？想参与编辑？ 在 Github 上编辑此页！
            </div>
        </div>
    </div>
</template>

<script>
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
        }
    },
    data() {
        return {
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
            fileData: [{
                stageFile: 'BBBBBBBB.PDF',
                fileName: 'AAAAAAAAA.PDF',
                user: '张三',
                date: '2017-09-09'
            }],
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
        handleUpload(file) {
            this.file = file;
            return false;
        },
        upload() {
            this.loadingStatus = true;
            setTimeout(() => {
                this.file = null;
                this.loadingStatus = false;
                this.$Message.success('上传成功')
            }, 1500);
        },
        preview(row) {
            this.isShow = false,
                this.isHide = true,
                console.log(row.fileName)
        },
        closeView() {
            this.isShow = true,
                this.isHide = false
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
