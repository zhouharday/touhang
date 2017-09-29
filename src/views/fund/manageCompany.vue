<template>
    <div class="manageCompany">
        <table-header :data="headerInfo" @add="alertModle" :theme="theme" class="addPadding">
        </table-header>
        <!-- table_content start-->
        <div class="table_content">
            <el-table :data="companyData" border style="width: 100%">
                <el-table-column label="名称" prop="companyName" align="center">
                </el-table-column>
                <el-table-column label="备注" prop="companyDescribe" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="companyEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="companyDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- table_content end-->
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
            </el-pagination>
        </div>
        <el-dialog title="管理公司" :visible.sync="manageCompany" :close-on-click-modal="false">
            <el-form :model="companyInfo" :rules="rules" ref="companyInfo">
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-form-item label="名称" :label-width="formLabelWidth" :autofocus="autofocus" prop="companyName">
                            <el-input v-model="companyInfo.companyName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注" :label-width="formLabelWidth" prop="companyDescribe">
                            <el-input type="textarea" v-model="companyInfo.companyDescribe"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button type="danger" @click="confirmIncome">确 定</el-button>
            </div>
        </el-dialog>
        <delete-reminders :deleteReminders="deleteReminders"
                          :modal_loading="modal_loading"
                          @del="confirmDel"
                          @cancel="confirmCancel">
        </delete-reminders>
    </div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
import deleteReminders from 'components/deleteReminders'
import {selectManageCompany, addOrUpdateManagerCompany, deleteManagerCompany} from 'api/fund'

export default {
    data() {
        return {
            theme: '#fff',
            formLabelWidth: '120px',
            manageCompany: false,
            addOrEdit: true,
            deleteReminders: false,
            managerId: '',
            deleteId: '', // 删除时候传参
            headerInfo: {
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            companyInfo: {
                companyName: '',
                companyDescribe: ''
            }, //表单数据
            companyData: [],
            rules: {
                companyName: [{
                    required: true,
                    message: '请输入公司名称',
                    trigger: 'blur'
                }, {
                    min: 3,
                    max: 20,
                    message: '长度在 3 到 5 个字符',
                    trigger: 'blur'
                }],
                companyDescribe: [{
                    required: true,
                    message: '请输入公司备注',
                    trigger: 'blur'
                }]
            },
            totalPage: '',
            page: 1,
            pageSize: 10,
        }
    },
    methods: {
        alertModle() {
            this.manageCompany = true
            this.addOrEdit == true
        },
        companyEdit(index, row) {
            this.addOrEdit = false
            this.manageCompany = true
            this.managerId = row.id
            this.companyInfo = row
        },
        confirmIncome() {
            if(this.addOrEdit == true) {
                this.$refs.companyInfo.validate((valid) => {
                    if (valid) {
                        addOrUpdateManagerCompany(this.managerId, this.companyInfo.companyName, this.companyInfo.companyDescribe).then((res) => {
                            if(res.status == '200') {
                                this.addOrEdit = false
                                selectManageCompany(this.page, this.pageSize).then((res) => {
                                    if(res.status == '200') {
                                        this.companyData = res.data.result.list
                                        this.totalPage = res.data.result.total
                                        this.$Message.success(res.data.message || '添加成功！')
                                        this.manageCompany = false
                                        this.addOrEdit = false
                                    }
                                })
                            }
                        })
                    } else {
                        this.$Message.error('校验不通过')
                    }
                })

            } else {
                this.$refs.companyInfo.validate((valid) => {
                    if (valid) {
                        addOrUpdateManagerCompany(this.managerId, this.companyInfo.companyName, this.companyInfo.companyDescribe).then((res) => {
                            if(res.status == '200') {
                                this.$Message.success(res.data.message || '添加成功！')
                                this.manageCompany = false
                                this.addOrEdit = false
                            }
                        })
                    } else {
                        this.$Message.error('校验不通过')
                    }
                })
            }
        },
        cancelForm() {
            this.manageCompany = false
        },
        companyDelete(index, row) {
            this.deleteReminders = true
            this.deleteId = row.id
        },
        confirmDel() {
            deleteManagerCompany(this.deleteId).then((res) => {
                if(res.status == '200') {
                    this.$Message.success(res.data.message || '删除成功')
                    selectManageCompany(this.page, this.pageSize).then((res) => {
                        if(res.status == '200') {
                            this.companyData = res.data.result.list
                            this.totalPage = res.data.result.total
                            this.deleteReminders = false
                        }
                    })
                }
            })
        },
        confirmCancel() {
            this.deleteReminders = false
        },
        handleSizeChange(val) {
            this.pageSize = val
            selectManageCompany(this.page, this.pageSize).then((res) => {
                if(res.status == '200') {
                    this.companyData = res.data.result.list
                    this.totalPage = res.data.result.total
                }
            })
        },
        handleCurrentChange(val) {
            this.page = val
            selectManageCompany(this.page, this.pageSize).then((res) => {
                if(res.status == '200') {
                    this.companyData = res.data.result.list
                    this.totalPage = res.data.result.total
                }
            })
        },
    },
    created() {
        selectManageCompany(this.page, this.pageSize).then((res) => {
            if(res.status == '200') {
                this.companyData = res.data.result.list
                this.totalPage = res.data.result.total
            }
        })
    },
    components: {
        tableHeader,
        deleteReminders
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
.manageCompany {
    width: 100%;
    min-height: 100%;
    position: relative;
    padding: 24px;
    background: #fff;
    .addPadding {
        padding-bottom: 12px;
    }
    .table_content {
        width: 100%;
        padding-bottom: @height-large;
    }
    .page {
        width: 100%;
        padding: 15px 30px;
        text-align: right;
        position: absolute;
        bottom: 0;
        right: 0;
    }
}
</style>
