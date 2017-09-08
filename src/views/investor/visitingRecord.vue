<template>
    <div class="visitingRecord">
        <tableHeader :theme="theme" :data="headerInfo" @add="showVisiting"></tableHeader>
        <el-table :data="visitingRecord" border style="width: 100%">
            <el-table-column prop="name" label="拜访人">
            </el-table-column>
            <el-table-column prop="date" label="拜访时间">
            </el-table-column>
            <el-table-column prop="content" label="拜访内容">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button
                      @click.native.prevent="editRow(scope.$index, scope.row)"
                      type="text"
                      size="small">
                      编辑
                    </el-button>
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, scope.row)"
                      type="text"
                      size="small">
                      删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加拜访人 -->
        <el-dialog title="新增拜访人" :visible.sync="modelVisiting" :close-on-click-modal="false">
            <el-form :model="addVisiting" label-position="left">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="拜访人" :label-width="formLabelWidth">
                            <el-input v-model="addVisiting.name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="拜访时间" :label-width="formLabelWidth" width="100">
                            <el-date-picker v-model="addVisiting.date"
                                            type="date"
                                            placeholder="选择日期"
                                            style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="拜访内容" :label-width="formLabelWidth">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="addVisiting.content">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="拜访记录附件" :label-width="formLabelWidth">
                            <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
                                <div style="padding: 20px 0">
                                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                    <p>点击或将文件拖拽到这里上传</p>
                                </div>
                            </Upload>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modalIncome = false">取 消</el-button>
                <el-button type="primary" @click="confirmIncome">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import tableHeader from "components/tabelHeader"
export default {
    data() {
        return {
            theme: '#fff',
            headerInfo: {
                btnGroup: [{
                    explain : '添加'
                }]
            },
            visitingRecord: [{
                name: '张三',
                date: '2016-09-08',
                content: '安红, 俺想你'
            }, {
                name: '李四',
                date: '2016-09-08',
                content: '安红, 俺想你'
            }, {
                name: '王五',
                date: '2016-09-08',
                content: '老司机'
            }],
            formLabelWidth: '120px',
            modelVisiting: false,
            addVisiting: {
                name: '蓝瘦香菇',
                data: new Date(),
                content: ''
            }
        }
    },
    methods: {
        showVisiting() {
            this.modelVisiting = true
        },
        editRow(index, row) {
            // console.log(row)
            this.modelVisiting = true
            this.addVisiting = row
        },
        deleteRow(index, row) {
            // console.log(index)
            this.visitingRecord.splice(index, 1)
        }
    },
    components: {
        tableHeader
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
.visitingRecord{
    width: 100%;
    height: 100%;
}
</style>
