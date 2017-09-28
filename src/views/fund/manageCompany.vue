<template>
    <div class="manageCompany">
        <table-header :data="headerInfo" @add="alertModle" :theme="theme" class="addPadding">
            <el-input placeholder="请输入搜索内容" icon="search" v-model="searchValue" :on-icon-click="handleIconClick" style="width: 320px;" @click="submitSearch" @blur="submitSearch" :autofocus="true">
            </el-input>
        </table-header>
        <!-- table_content start-->
        <div class="table_content">
            <el-table :data="companyData" border style="width: 100%">
                <el-table-column label="名称" prop="comName" align="center">
                </el-table-column>
                <el-table-column label="备注" prop="comNotes" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除
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
                        <el-form-item label="名称" :label-width="formLabelWidth" prop="comName" :autofocus="autofocus">
                            <el-input v-model="companyInfo.comName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注" :label-width="formLabelWidth" prop="comNotes">
                            <el-input v-model="companyInfo.comNotes" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button type="danger" @click="confirmIncome">确 定</el-button>
            </div>
        </el-dialog>
        <delete-reminders :deleteReminders="deleteReminders" :modal_loading="modal_loading" @del="confirmDel" @cancel="confirmCancel">
        </delete-reminders>
    </div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
import deleteReminders from 'components/deleteReminders'
import {
    getOrgList,
    getAllOrgList,
    deleteOrg
} from 'api/fund'

export default {
    data() {
        return {
            theme: '#fff',
            manageCompany: false,
            autofocus: false,
            formLabelWidth: '80px',
            deleteReminders: false,
            modal_loading: false,
            currentPage: 1,
            totalPage: '',
            page: 1,
            pageSize: 10,
            searchValue: '',
            message: '是否确认删除该条公司信息？',
            id: '',
            headerInfo: {
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            companyInfo: {
                comName: '',
                comNotes: ''
            },
            companyData: [],
            rules: {
                comName: [{
                    required: true,
                    message: '请输入公司名称',
                    trigger: 'blur'
                }, {
                    min: 3,
                    max: 20,
                    message: '长度在 3 到 5 个字符',
                    trigger: 'blur'
                }],
                comNotes: [{
                    required: true,
                    message: '请输入公司备注',
                    trigger: 'blur'
                }, {
                    min: 3,
                    max: 20,
                    message: '长度在 3 到 5 个字符',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        alertModle(el) {
            this.manageCompany = true
        },
        handleEdit(index, row) {
            this.manageCompany = true
            this.companyInfo = row
            this.trueOrFalse = false
        },
        handleDelete(index, row) {
            this.deleteReminders = !this.deleteReminders
            this.id = row.id
        },
        confirmIncome() {
            if (this.trueOrFalse == true) {
                this.$refs.cooperativeInfo.validate((valid) => {
                    if (valid) {
                        this.$http.post(this.api + '/organization/addOrganization', this.cooperativeInfo).then((response) => {
                            if (response.status == '200') {
                                this.$Message.success(response.data.message || '操作成功')
                            } else if (response.status == '9005') {
                                return Promise.reject(error)
                            }
                            this.cooperativeOrg = false
                        }).catch(error => {
                            this.$Message.error(response.data.message || '机构名称已经存在!')
                        })
                    } else {
                        return false
                    }
                })
            } else {
                this.$refs.cooperativeInfo.validate((valid) => {
                    if (valid) {
                        this.$http.post(this.api + '/organization/updateOrg', this.cooperativeInfo).then((response) => {
                            if (response.status == '200') {
                                this.cooperativeOrg = false
                                this.$Message.success(response.data.message || '操作成功')
                            } else {
                                return Promise.reject(error)
                            }
                        }).catch(error => {
                            let response = response.data
                            if (response.status == '9005') {
                                this.$Message.error(response.data.message || '机构名称已经存在!')
                            }
                        })
                    } else {
                        return false
                    }
                })
            }
        },
        cancelForm() {
            this.$refs.companyInfo.resetFields()
            this.manageCompany = false
        },
        confirmDel() {
            this.modal_loading = true
            deleteOrg(this.id).then((res) => {
                if (res.status == '200') {
                    this.$Message.success(res.data.message || '删除成功！')
                    this.modal_loading = false
                    this.deleteReminders = false
                }
            })
        },
        confirmCancel() {
            this.deleteReminders = false
        },
        handleSizeChange(val) { // 下拉选择每页显示多少条数据
            this.pageSize = val
            getOrgList(this.searchValue, this.page, this.pageSize).then((response) => {
                if (response.data.status == '200') {
                    this.totalPage = response.data.result.total
                    this.teamData = response.data.result.list
                }
            })
        },
        handleCurrentChange(val) { // 获取当前页码
            this.page = val
            getOrgList(this.searchValue, this.page, this.pageSize).then((response) => {
                if (response.data.status == '200') {
                    this.totalPage = response.data.result.total
                    this.teamData = response.data.result.list
                }
            })
        },
        submitSearch() {
            getOrgList(this.searchValue, this.page, this.pageSize).then((response) => {
                if (response.data.status == '200') {
                    this.totalPage = response.data.result.total
                    this.teamData = response.data.result.list
                }
            })
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.autofocus = true
        })
    },
    created() {
        getAllOrgList().then((res) => {
            if (res.data.status == '200') {
                this.setOrgType = res.data.result
            }
        })
        getOrgList(this.searchValue, this.page, this.pageSize).then((response) => {
            if (response.data.status == '200') {
                console.log(response.data.result)
                this.totalPage = response.data.result.total
                this.teamData = response.data.result.list
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
