<template>
    <div>
        <section class="fileTable" v-show="isShow">
            <tabel-header :data="headerInfo_file" @add="fileDialog"></tabel-header>
            <el-table :data="fileData" border style="width: 100%" align="center">
                <el-table-column label="文档名称" prop="documentName" align="center">
                </el-table-column>
                <el-table-column label="用户" prop="uploadUser" align="center">
                </el-table-column>
                <el-table-column label="上传日期" prop="createDate" align="center">
                    <template scope="scope">{{scope.row.createDate | formatDate}}</template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <a v-if="scope.row.id != '' && scope.row.id != undefined" :href="scope.row.documentUrl" style="font-size:12px;" download="scope.row.documentName">下载</a>
                        <el-button type="text" size="small" class="btn_border" @click="preview(scope.row)">预览</el-button>
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
                        <Upload ref="upload" multiple type="drag":on-success="handleSuccess" :data="uploadInfo" :action="actionUrl">
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
        <section class="viewFiles" v-show="isHide">
            <div class="closeView" @click="closeView">
                <img src="/static/img/close.png">
            </div>
            <div class="fileArea">
                不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。 v-show 是简单地切换元素的 CSS 属性 display 。 注意， v-show 不支持 语法，也不支持 v-else。v-if vs v-show v-if 是“真正的”条件渲染，因为它会确保在 切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。 惰性的：如果在初始渲染时条件为假，则什么也不做 ——直到条件第一次变为真时，才会开始渲染条件块。 相比之下， v-show 就简单得多——不管初始条件是什么，元素总是 会被渲染，并且只是简单地基于 CSS 进行切换。 一般来说， v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。 因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件不太可能改变，则使用 v-if 较好。 v-if 与 v-for 一起使用 当 v-if 与 v-for 一起使v-if 也是用时，v-for 具有比 v-if 更高的优先级。 请查阅 列表渲染指南 以获取详细信息。 ← Class 与 Style 绑定 列表渲染 → 发现错误？想参与编辑？ 在 Github 上编辑此页！
            </div>
        </section>
    </div>
</template>


<script>

import {API_ROOT} from 'config'
import tabelHeader from 'components/tabelHeader'
import 'common/js/filter'
import { changeDate } from 'common/js/config'
import { getEarlierDoc } from 'api/project'
import { delDocument } from 'api/projectPre'
export default {
    data() {
        return {
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
            actionUrl: API_ROOT + '/files/uploadProjectDocument',
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
        preview(row) {
            this.isShow = false,
                this.isHide = true,
                console.log(row.fileName)
        },
        closeView() {
            this.isShow = true,
                this.isHide = false
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
        tabelHeader
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
