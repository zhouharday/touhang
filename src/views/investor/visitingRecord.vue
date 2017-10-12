<template>
<div class="visitingRecord">
    <tableHeader :theme="theme" :data="headerInfo" @add="showVisiting"></tableHeader>
    <el-table :data="visitingRecord" border style="width: 100%">
        <el-table-column prop="manageName" label="拜访人">
        </el-table-column>
        <el-table-column prop="seeDate" label="拜访时间">
        </el-table-column>
        <el-table-column prop="seeContent" label="拜访内容">
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
    <Modal v-model="modelVisiting" title="新增拜访人" @on-ok="confirmVisiting" @on-cancel="cancel" width="800">
        <el-form :model="addVisiting" label-position="left" label-width="120px">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="拜访人">
                        <el-select v-model="addVisiting.merchantId" style="width:100%">
                            <el-option :key="addVisiting.merchantId" :label="addVisiting.manageName" :value="addVisiting.merchantId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="拜访时间" style="width: 100%;">
                        <el-date-picker v-model="addVisiting.seeDate" type="date" placeholder="选择日期" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="拜访内容">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="addVisiting.seeContent">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="拜访记录附件">
                        <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </Modal>
    <!-- 确实删除模态框 -->
    <delete-reminders :deleteReminders="deleteModal" @del="comfirmDel" @cancel="comfirmDelete"></delete-reminders>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from "components/tabelHeader"
import deleteReminders from "components/deleteReminders"
import {
    getVisitingRecordList,
    addVisitingRecord,
    updateVisitingRecord,
    deleteVisitingRecord
} from "api/investor"
export default {
    props: {
        visitingRecord: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            theme: '#fff',
            headerInfo: {
                btnGroup: [{
                    explain: '添加'
                }]
            },
            id: '',
            deleteModal: false,
            modelVisiting: false,
            addVisiting: {
                id: '',
                inverstorId: this.$route.params.userId,
                manageName: '',
                merchantId: '',
                seeContent: '',
                seeDate: '',
            },
            addOrEdit: true // 用来判断点击了添加还是编辑
        }
    },
    methods: {
        showVisiting() {
            this.modelVisiting = true
            this.addOrEdit = true
            this.addVisiting = {
                inverstorId: this.$route.params.userId,
                manageName: JSON.parse(sessionStorage.getItem('userInfor')).name,
                merchantId: JSON.parse(sessionStorage.getItem('userInfor')).id,
                seeContent: '',
                seeDate: '',
            }
        },
        editRow(index, row) {
            this.modelVisiting = true
            this.addVisiting = row
            this.addOrEdit = false
        },
        deleteRow(index, row) {
            this.deleteModal = !this.deleteModal
            this.id = row.id
        },
        confirmVisiting() {
            if (this.addOrEdit == true) {
                console.log(this.$route.params.userId)
                addVisitingRecord(this.addVisiting).then((res) => {
                    this.$Message.success(res.data.message || '添加拜访记录成功')
                    this.visitingRecordList()
                }).catch(err => {
                    let res = err.data
                    this.$Message.success(res.message || '添加拜访记录失败')
                })
            } else {
                updateVisitingRecord(this.addVisiting).then((res) => {
                    this.$Message.success(res.data.message || '修改拜访记录成功')
                    this.visitingRecordList()
                }).catch(err => {
                    console.log(err)
                    this.$Message.success(res.message || '修改拜访记录失败')
                })
            }
        },
        comfirmDel(el) {
            deleteVisitingRecord(this.id).then((res) => {
                if (res.status == '200') {
                    this.$Message.info(res.data.message || '删除成功！')
                    this.deleteModal = false
                }
            })
        },
        comfirmDelete() {
            this.deleteModal = false
        },
        visitingRecordList() {
            getVisitingRecordList(this.$route.params.userId).then((res) => {
                if (res.status == '200') {
                    this.visitingRecord = res.data.result.list
                }
            }).catch(err => {
                let response = err.data
                this.$Message.error(response.message || '获取拜访记录失败！')
            })
        }
    },
    components: {
        tableHeader,
        deleteReminders
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
.visitingRecord {
    width: 100%;
    height: 100%;
}
</style>
