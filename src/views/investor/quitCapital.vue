<template>
<div class="quitCapital">
    <el-table :data="quitCapitalData" border show-summary style="width: 100%;">
        <el-table-column label="协议名称" prop="agreementName" align="center">
        </el-table-column>
        <el-table-column label="基金名称" prop="fundName" align="center">
        </el-table-column>
        <el-table-column label="实缴金额（元）" prop="sumValue" align="center">
        </el-table-column>
        <el-table-column label="类型" align="center">
            <template scope="scope">
                <div v-if="scope.row.earningsType == '1'">退出</div>
                <div v-else-if="scope.row.earningsType == '2'">分红</div>
            </template>
        </el-table-column>
        <el-table-column label="分红金额" prop="shareMoney" align="center">
        </el-table-column>
        <el-table-column label="日期" align="center">
            <template scope="scope">
                <div>{{scope.row.shareDate | formatDate}}</div>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template scope="scope">
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
    <Modal v-model="quitDetailsModal" title="退出出资明细" @on-ok="confirmQuitModal" @on-cancel="confirmQuitCancel" width="800px">
        <quit-apply :quitApplyInfo="bonusInfo"></quit-apply>
    </Modal>
</div>
</template>

<script type="text/ecmascript-6">
import quitApply from './quitApply'
import '../../common/js/filter'
import {getEarningsAmountList, updateEarningsAmount, deleteEarningsAmount} from 'api/investor'
export default {
    data() {
        return {
            quitCapitalData: [],
            quitDetailsModal: false,
            bonusInfo: {
                investorName: '',
                agreementName: '',
                agreementId: '', //协议ID
                shareMoney: '', //退出金额
                shareDate: '', //退出日期
                managerId: '' //投资经理ID（当前登录用户ID）
            }
        }
    },
    methods: {
        handleEdit(index, row) {
            this.quitDetailsModal = true
            this.bonusInfo = row
            console.log(row)
        },
        handleDelete(index, row) {
            deleteEarningsAmount(row.id).then((res) => {
                if(res.status == '200') {
                    this.$Message.success(res.data.message || '删除成功！')
                }
            })
        },
        confirmCancel() {
            this.quitDetailsModal = false
        },
        confirmQuitModal() {
            updateEarningsAmount(this.bonusInfo).then((res) => {
                if(res.status == '200') {
                    this.$Message.success(res.data.message || '修改分红成功！')
                }
            })
        }
    },
    created() {
        getEarningsAmountList(this.$route.params.userId, JSON.parse(sessionStorage.getItem('merchants'))[0].id).then((res) => {
            if(res.status == '200') {
                this.quitCapitalData = res.data.result.list
            }
        })
    },
    components: {
        quitApply
    }
}
</script>

<style lang="less" scoped>
.quitCapital {
    width: 100%;
    height: 100%;
}
</style>
