<template>
<div class="file">
    <el-row class="file_wrapper">
        <el-col :span="24">
            <div class="listHeader">
                <div class="list" v-for="(list, index) of listHeader">{{list}}</div>
            </div>
        </el-col>
        <el-col :span="24" v-for="(file, index) of fileListData" :key="index">
            <div class="title">
                <div class="left">{{file.title}}</div>
                <div class="right"></div>
            </div>
            <el-table :data="file.dataDocumentResult" :show-header="false" style="width: 100%">
                <el-table-column label="基金阶段" prop="allocationDocumentName">
                </el-table-column>
                <el-table-column label="文档名称" prop="documentName">
                </el-table-column>
                <el-table-column label="上传人" prop="uploadUser">
                </el-table-column>
                <el-table-column label="上传日期" prop="createDate">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                            <el-button type="text"
                                    size="small"
                                    class="scopeBtn"
                                    v-if="haveJurisdiction('GL-JJWD-SCH')"
                                    v-show="!scope.row.id"
                                    @click="uploadFundDoc(scope.$index, scope.row)">
                                    上传
                            </el-button>
                            <a :href="scope.row.documentUrl"
                                style="font-size:12px;color: #F05E5E;"
                                v-if="haveJurisdiction('GL-JJWD-XZ')"
                                v-show="scope.row.id"
                                class="scopeBtn">
                                下载
                            </a>
                            <el-button type="text"
                                       size="small"
                                       v-if="haveJurisdiction('GL-JJWD-YL')"
                                       v-show="scope.row.id"
                                       class="btn_border scopeBtn" @click="previewFundDoc(scope.$index, scope.row)">
                                       预览
                            </el-button>
                            <el-button type="text"
                                       size="small"
                                       v-if="haveJurisdiction('GL-JJWD-SC')"
                                       class="scopeBtn" @click="deleteFundDoc(scope.$index, scope.row)">
                                       删除
                            </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <!-- 预览 -->
    <show-pdf :pdfurl="pdfurl" class="showpdf" v-show="showOrhiddren" @pdferr="errorHaddle" @closepdf="closepdf"></show-pdf>
    <!-- 上传基金设立报表-->
    <el-dialog title="基金文档" :visible.sync="modalAdd" :close-on-click-modal="false" :show-close="false">
        <Upload ref="upload" multiple type="drag" :headers="headerData" :action="actionUrl" :data="uploadInfo" :on-success="handleSuccess">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52"></Icon>
                <p>点击或将文件拖拽到这里上传</p>
            </div>
        </Upload>
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalCancel">取 消</el-button>
        </div>
    </el-dialog>
    <delete-reminders @cancel="confirmCancel" @del="confirmDel" :modal_loading="modal_loading" :deleteReminders="reminders">
    </delete-reminders>
</div>
</template>

<script type="text/ecmascript-6">
import deleteReminders from 'components/deleteReminders'
import {deleteDocument,selectProjectOrFundDocument} from 'api/fund'
import {API_ROOT} from '../../config'
import {checkFundAuth} from 'common/js/config'
import showPdf from 'components/showPdf'
export default {
    props: {
        fileListData: {
            type: Array,
            default: []
        },
        authList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            listHeader: ['基金阶段', '文档名称', '用户', '上传日期', '操作'],
            headerInfo: {
                desc: '基金设立报告',
                btnGroup: [{
                    icon: 'upload',
                    explain: '上传'
                }]
            },
            headerData: {
                Authorization: JSON.parse(sessionStorage.getItem('token')) || ''
            },
            modalAdd: false,
            file: null, // 上传
            loadingStatus: false, // 上传
            fileData: [],
            registrationData: [],
            deleteId: '',
            pdfurl: '', // 预览路径
            showOrhiddren: false, // 是否显示预览
            upload: false, // 上传
            reminders: false, // 确认删除模态框
            modal_loading: false, // 确认删除loading效果
            actionUrl: API_ROOT + '/files/uploadProjectDocument',
            uploadInfo: {
                file: '',
                stageId: '',
                uploadTypeId: this.$route.params.id,
                fileId: '',
                type: 1,
                userId: JSON.parse(sessionStorage.getItem('userInfor')).id
            },
        }
    },
    methods: {
        uploadFundDoc(index, row) {
            this.modalAdd = true
            this.upload = true
            this.uploadInfo.stageId = row.stageId
            this.uploadInfo.fileId = row.fileId
        },
        closepdf() {
            this.showOrhiddren = false
        },
        errorHaddle() {
            this.$Message.error('文件无法预览，请重新上传！')
            this.showOrhiddren = false
        },
        handleSuccess(res, file) {
            if(res.status == '200') {
                this.$Message.success(res.message || '上传成功！')
                this.modalAdd = false
                this.upload = false
                this.preview = false
                this._getFundDoc()
            }
        },
        deleteFundDoc(index, row) {
            this.reminders = true
            this.deleteId = row.id
        },
        confirmDel() {
            console.log(this.deleteId)
            if (this.deleteId == '') {
                this.$Message.info('请上传文档！')
                this.reminders = false
            } else {
                deleteDocument(this.deleteId).then((res) => {
                    if (res.status == '200') {
                        this.$Message.success(res.data.message || '删除成功！')
                        this.reminders = false
                        this._getFundDoc()
                    }
                }).catch(err => {
                    this.$Message.success(err.data.message || '删除失败！')
                    this.reminders = false
                })
            }
        },
        previewFundDoc(index, row) {
            console.log(row)
            this.pdfurl = row.previewPath
            this.showOrhiddren = true
            console.log(row.documentUrl.split('?')[0])
        },
        modalCancel() {
            this.modalAdd = false
            this.preview = false
            this.upload = false
        },
        confirmCancel() {
            this.reminders = false
        },
        haveJurisdiction(str) {
            if (!this.authList) {
                return false
            } else {
                if (checkFundAuth(str, this.authList)) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        _getFundDoc() {
            selectProjectOrFundDocument(this.$route.params.id, 2).then((res) => {
                if (res.status == '200') {
                    this.fileListData = res.data.result
                }
            })
        }
    },
    mounted() {
        console.log(this.authList)
    },
    components: {
        deleteReminders,
        showPdf
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
.file {
    width: 100%;
    height: 100%;
    .listHeader {
        width: 100%;
        height: 42px;
        display: flex;
        .list {
            flex: 1;
            color: @color-base;
            font-size: 16px;
            text-align: center;
            line-height: 42px;
            background: @color-theme;
        }
    }
    .el-table {
        .border-right,
        .scopeBtn {
            padding: 0 12px;
            margin-left: 0;
            border-radius: 0;
        }
        .btn_border {
            border-left: 1px solid #ddd;
            border-right: 1px solid #ddd;
        }
    }
    .title {
        width: 100%;
        height: 42px;
        padding-right: 24px;
        padding-left: 24px;
        background-color: #eef1f6;
        .left,
        .right {
            flex: 1;
            color: #1f2d3d;
            font-weight: bold;
            line-height: 42px;
        }
    }
    .img_wrapper{
        text-align: center;
    }
}
</style>
