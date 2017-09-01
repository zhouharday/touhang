<template>
<div class="file">
    <tabel-header :data="headerInfo" @ensure="reportDialog"></tabel-header>
    <el-table :data="fileData" border style="width: 100%">
        <el-table-column label="文档名称" prop="name">
        </el-table-column>
        <el-table-column label="用户" prop="user">
        </el-table-column>
        <el-table-column label="上传日期" prop="date">
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
                    <el-button type="text" size="small">下载</el-button>
                    <el-button type="text" size="small" class="btn_border">预览</el-button>
                    <el-button type="text" size="small">删除</el-button>
                  </template>
        </el-table-column>
    </el-table>
    <tabel-header :data="registrationInfo"></tabel-header>
    <el-table :data="registrationData" border style="width: 100%">
        <el-table-column label="文档名称" prop="name">
        </el-table-column>
        <el-table-column label="上传人" prop="user">
        </el-table-column>
        <el-table-column label="上传日期" prop="date">
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
                    <el-button type="text" size="small">下载</el-button>
                    <el-button type="text" size="small" class="btn_border">预览</el-button>
                    <el-button type="text" size="small">删除</el-button>
                  </template>
        </el-table-column>
    </el-table>
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
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
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
import tabelHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            headerInfo: {
                desc: '基金设立报告',
                icon_a: 'upload',
                explain_a: '上传'
            },
            registrationInfo: {
                desc: '基金注册文件',
                icon_a: 'upload',
                explain_a: '上传'
            },
            modalAdd: false,
            formLabelWidth: '80px',
            reportForm: {
                uesr: '',
                date: ''
            },
            file: null, // 上传
            loadingStatus: false, // 上传
            fileData: [{
                name: 'aaa.doc',
                user: '安红',
                date: '2017-09-01'
            }, {
                name: 'aaa.doc',
                user: '安红',
                date: '2017-09-01'
            }, {
                name: 'aaa.doc',
                user: '安红',
                date: '2017-09-01'
            }, {
                name: 'aaa.doc',
                user: '安红',
                date: '2017-09-01'
            }],
            registrationData: [{
                name: 'aaa.doc',
                user: '安红',
                date: '2017-09-01'
            }, {
                name: 'aaa.doc',
                user: '安红',
                date: '2017-09-01'
            }, {
                name: 'aaa.doc',
                user: '安红',
                date: '2017-09-01'
            }, {
                name: 'aaa.doc',
                user: '安红',
                date: '2017-09-01'
            }]
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
    components: {
        tabelHeader
    }
}
</script>

<style lang="less" scoped>
.file {
    width: 100%;
    height: 100%;
    .el-table {
        .btn_border {
            border-right: 1px solid #ddd;
            border-left: 1px solid #ddd;
            border-radius: 0;
            padding: 0 12px;
        }
    }
}
</style>
