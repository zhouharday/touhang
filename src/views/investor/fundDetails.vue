<template>
<div class="fundDetails">
    <el-table :data="investorData" style="width: 100%;">
        <el-table-column label="协议名称" prop="agreementName" align="center">
        </el-table-column>
        <el-table-column label="基金名称" prop="fundName" align="center">
        </el-table-column>
        <el-table-column label="认缴金额（元）" prop="subscribeAmount" align="center">
        </el-table-column>
        <el-table-column label="出资占比（%）" prop="contributiveRatio" align="center">
        </el-table-column>
        <el-table-column label="实缴金额（元）" prop="paidAmount" align="center">
        </el-table-column>
        <el-table-column label="出资日期" align="center">
            <template scope="scope">
                <div>{{scope.row.paidDate | formatDate}}</div>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template scope="scope" v-if="scope.$index === 0">
              <el-button type="text" size="small" style="color:#f05e5e"
                      @click="handleEdit(scope.$index, scope.row)">
                      编辑
              </el-button>
              <el-button type="text" size="small" style="color:#f05e5e"
                      @click="handleDelete(scope.$index, scope.row)">
                      删除
              </el-button>
            </template>
        </el-table-column>
    </el-table>
    <Modal v-model="fundsDetailsModal" title="修改出资明细" width="800px">
        <funds-modal :fundsInfo="fundsInfo" ref="fundsModal"></funds-modal>
        <div slot="footer">
            <Button type="text" @click="confirmCancel">取消</Button>
            <Button type="primary" @click="modifyModal">确认</Button>
        </div>
    </Modal>
    <delete-reminders :deleteReminders="deleteReminders" :modal_loading="modal_loading" @cancel="cancelDel" @del="confirmDel">
    </delete-reminders>
</div>
</template>

<script type="text/ecmascript-6">
import fundsModal from './fundsModal'
import '../../common/js/filter'
import {
    updateAgreementAmount,
    deleteAgreementAmount,
    getAgreementAmountList
} from 'api/investor'
import deleteReminders from 'components/deleteReminders'
export default {
    props: {
        investorData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            fundsDetailsModal: false,
            deleteReminders: false,
            deleteId: '',
            modal_loading: false,
            fundsInfo: {
                investorName: '',
                subscribeAmount: '', //认缴金额
                fundName: '', //基金
                paidDate: '', //出资日期
                agreementName: '', //协议名称
                residueAmount: '', //剩余金额
                contributiveRatio: '', //出资占比
                id: '', //本条记录ID
                paidAmount: '', //实缴金额
                managerId: '', // 经办人
                handlingDate: new Date()
            }
        }
    },
    methods: {
        handleEdit(index, row) {
            console.log(row)
            this.fundsDetailsModal = true
            row.paidAmount = parseFloat(row.paidAmount)
            row.paidDate = new Date(row.paidDate)
            row.documentInfo.map((x) => {
                x.name = x.fileName,
                x.url = x.filePath
            })
            // console.log(row)
            // console.log(typeof(row.paidDate))
            this.fundsInfo = this._.assign({}, row)
            console.log()
        },
        handleDelete(index, row) {
            this.deleteReminders = true
            this.deleteId = row.id
        },
        confirmDel() { // 确认删除
            this.modal_loading = true
            deleteAgreementAmount(this.deleteId).then((res) => {
                if (res.status == '200') {
                    this.$Message.success(res.data.message || '删除成功！')
                    this._getConDetails()
                    this.deleteReminders = false
                    this.modal_loading = false
                }
            })
        },
        cancelDel() { // 取消删除
            this.deleteReminders = false
        },
        confirmCancel() {
            this.fundsDetailsModal = false
        },
        modifyModal() {
            // console.log(this.fundsInfo)
            var fundsInfo = this.$refs.fundsModal.$refs.fundsInfo
            fundsInfo.validate((valid) => {
                if (valid) {
                    updateAgreementAmount(this.fundsInfo).then((res) => {
                        if (res.status == '200') {
                            this._getConDetails()
                            this.$Message.success(res.data.message || '修改出资成功！')
                            this.fundsDetailsModal = false
                        }
                    })
                } else {
                    return false
                }
            })
        },
        _getConDetails() { // 获取出资明细
            var invId = this.$route.params.userId
            var merId = JSON.parse(sessionStorage.getItem('merchants'))[0].id
            getAgreementAmountList(invId, merId).then((res) => {
                if (res.status == '200') {
                    console.log(res)
                    this.investorData = res.data.result.list
                }
            }).catch(err => {
                let response = err.data
                this.$Message.error(response.message || '获取资金明细失败！')
            })
        }
    },
    components: {
        fundsModal,
        deleteReminders
    }
}
</script>

<style lang="less" scoped>
.fundDetails {
    width: 100%;
    height: 100%;
}
</style>
