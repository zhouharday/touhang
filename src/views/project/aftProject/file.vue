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
                            <a v-if="id != '' && id != null" href="documentUrl" style="font-size:12px;" download="xxxxx文档">下载</a>
                            <el-button v-if="id != '' && id != null" type="text" size="small" class="btn_border" @click="preview(scope.row)">预览</el-button>
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
    getProjectDoc
} from 'api/projectPre';

export default {
    props: {
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
        this.init();
    },
    methods: {
        init() {
            this.projectId = this.proId;
            this.getProjectDocument();
        },
        getProjectDocument() {
            getProjectDoc(this.projectId).then(resp => {
                this.projectDocList = resp.data.result || [];
            }).catch(e => {
                console.log('getPreDetail() exists error: ', e);
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
