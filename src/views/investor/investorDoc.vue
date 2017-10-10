<template>
<div class="file">
    <el-row class="file_wrapper">
        <el-col :span="24">
            <div class="listHeader">
                <div class="list" v-for="(list, index) of listHeader">{{list}}</div>
            </div>
        </el-col>
        <el-col :span="24" v-for="(file, index) of investmentData" :key="index">
            <div class="title">
                <div class="left">{{file.title}}</div>
                <div class="right"></div>
            </div>
            <el-table :data="file.dataDocumentResult" border :show-header="false" style="width: 100%">
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
                                    v-show="!scope.row.id">上传</el-button>
                            <el-button type="text"
                                       size="small"
                                       v-show="scope.row.id"
                                       class="scopeBtn">下载</el-button>
                            <el-button type="text"
                                       size="small"
                                       class="btn_border scopeBtn">预览</el-button>
                            <el-button type="text"
                                       size="small"
                                       class="scopeBtn">删除</el-button>
                          </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <!-- 上传基金设立报表-->
    <el-dialog title="基金设立报告" :visible.sync="modalAdd" :close-on-click-modal="false">
        <el-form :model="reportForm">
            <el-form-item label="用户" :label-width="formLabelWidth">
                <el-input v-model="reportForm.user" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="上传日期" :label-width="formLabelWidth">
                <el-date-picker type="date" placeholder="选择日期" v-model="reportForm.date" style="width: 100%;">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="上传文件" :label-width="formLabelWidth">
                <!-- action需要修改为实际线上地址 -->
                <Upload multiple type="drag" :before-upload="false" action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52"></Icon>
                        <p>点击或将文件拖拽到这里上传</p>
                    </div>
                </Upload>
                <!-- <div v-if="file !== null">待上传文件：{{ file.name }}</div> -->
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalAdd = false">取 消</el-button>
            <el-button type="primary" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        investmentData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            listHeader: ['基金阶段', '文档名称', '用户', '上传日期', '操作'],
            modalAdd: false,
            formLabelWidth: '80px',
            reportForm: {
                uesr: '',
                date: ''
            },
            file: null, // 上传
            loadingStatus: false, // 上传
        }
    },
    methods: {
        reportDialog() {
            this.modalAdd = true
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
        }
    },
    // created() {
    //     this.fileListData.map((x, index) => {
    //         this.headerInfo.desc = x[index].title
    //     })
    // },
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
.file {
    width: 100%;
    height: 100%;
    .listHeader{
        width: 100%;
        height: 42px;
        display: flex;
        .list{
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
        .scopeBtn{
            padding: 0 12px;
            margin-left: 0;
            border-radius: 0;
        }
        .btn_border{
            border-left: 1px solid #ddd;
            border-right: 1px solid #ddd;
        }
    }
    .title{
        width: 100%;
        height: 42px;
        padding-right: 24px;
        padding-left: 24px;
        background-color: #eef1f6;
        .left,
        .right {
            flex: 1;
            color: #1f2d3d;
            font-weight: blod;
            line-height: 42px;
        }
    }
}
</style>
