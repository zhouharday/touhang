<template>
<div class="visitingRecord">
    <div style="text-align:right;margin-bottom:10px">
        <el-button type="danger" style="background-color:#fff;padding:8px 15px;" @click="showVisiting">添加</el-button>
    </div>
    <el-table :data="visitingRecord" style="width: 100%">
        <el-table-column prop="manageName" label="拜访人" align="center">
        </el-table-column>
        <el-table-column label="拜访时间" align="center">
            <template scope="scope">
                    <div>{{scope.row.seeDate | formatDateDetails}}</div>
                </template>
        </el-table-column>
        <el-table-column prop="seeContent" label="拜访内容" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template scope="scope">
                    <el-button @click.native.prevent="editRow(scope.$index, scope.row)" type="text" size="small">
                        编辑
                    </el-button>
                    <el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" type="text" size="small">
                        删除
                    </el-button>
                </template>
        </el-table-column>
    </el-table>
    <!-- 添加拜访人 -->
    <Modal v-model="modelVisiting" title="新增拜访人" width="800">
        <el-form :model="addVisiting" :rules="rules1" ref="addVisiting" label-position="left" label-width="120px">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="拜访人" prop="merchantId">
                        <el-select v-model="addVisiting.merchantId" style="width:100%">
                            <el-option :key="addVisiting.merchantId" :label="addVisiting.manageName" :value="addVisiting.merchantId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="拜访时间" prop="seeDate" style="width: 100%;">
                        <el-date-picker v-model="addVisiting.seeDate" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="拜访内容" prop="seeContent">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="addVisiting.seeContent">
                        </el-input>
                    </el-form-item>
                </el-col>
<!--                 <el-col :span="24">
                    <el-form-item label="拜访记录附件">
                        <upload-files @uploadSuccess="handleSuccess" :documentInfo="addVisiting.documentInfo"></upload-files>
                    </el-form-item>
                </el-col> -->
            </el-row>
        </el-form>
        <div slot="footer">
            <Button type="text" @click="cancel">取消</Button>
            <Button type="primary" @click="confirmVisiting">确认</Button>
        </div>
    </Modal>
    <!-- 确实删除模态框 -->
    <delete-reminders :deleteReminders="deleteModal" @del="comfirmDel" @cancel="comfirmCancel"></delete-reminders>
</div>
</template>

<script type="text/ecmascript-6">
import 'common/js/filter'
import tableHeader from "components/tabelHeader"
import deleteReminders from "components/deleteReminders"
/* import uploadFiles from "components/uploadFiles" */
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
            default: () => []
        }
    },
    data() {
        return {
            id: '',
            deleteModal: false,
            modelVisiting: false,
            addVisiting: {
                id: '',
                inverstorId: this.$route.params.userId,
                manageName: '',
                merchantId: '',
                seeContent: '',
                seeDate: new Date(),
            },
            rules1: {
                seeDate: [{
                    type: 'date',
                    required: true,
                    message: '请选择日期',
                    trigger: 'blue'
                }],
                seeContent: [{
                    required: true,
                    message: '请输入拜访内容',
                    trigger: 'blur'
                }],
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
            row.seeDate = new Date(row.seeDate)
            this.addVisiting = Object.assign({}, row)
            this.addOrEdit = false
        },
        deleteRow(index, row) {
            this.deleteModal = !this.deleteModal
            this.id = row.id
        },
        cancel() {
            this.$refs.addVisiting.resetFields()
            this.modelVisiting = false
        },
        confirmVisiting() {
            this.$refs.addVisiting.validate((valid) => {
                if (valid) {
                    if (this.addOrEdit === true) {
                        addVisitingRecord(this.addVisiting).then((res) => {
                            this.$Message.success(res.data.message || '添加拜访记录成功')
                            this._visitingRecordList()
                            this.modelVisiting = false
                        }).catch(err => {
                            let res = err.data
                            this.$Message.success(res.message || '添加拜访记录失败')
                        })
                    } else {
                        updateVisitingRecord(this.addVisiting).then((res) => {
                            this.$Message.success(res.data.message || '修改拜访记录成功')
                            this._visitingRecordList()
                            this.modelVisiting = false
                        }).catch(err => {
                            console.log(err)
                            this.$Message.success(res.message || '修改拜访记录失败')
                        })
                    }
                } else {
                    return false
                }
            })
        },
        comfirmDel(el) {
            deleteVisitingRecord(this.id).then((res) => {
                if (res.status == '200') {
                    this.$Message.success(res.data.message || '删除成功！')
                    this._visitingRecordList()
                    this.deleteModal = false
                }
            })
        },
        comfirmCancel() {
            this.deleteModal = false
        },
        handleSuccess(list) {
            this.addVisiting.documentInfo = list
            console.log(this.addVisiting)
        },
        _visitingRecordList() {
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
