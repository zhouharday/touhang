<template>
<div class="fundDetails">
    <el-table :data="investorData" border style="width: 100%;">
        <el-table-column label="协议名称" prop="agreementName">
        </el-table-column>
        <el-table-column label="基金名称" prop="fundName">
        </el-table-column>
        <el-table-column label="认缴金额（元）" prop="subscribeAmount">
        </el-table-column>
        <el-table-column label="出资占比（%）" prop="contributiveRatio">
        </el-table-column>
        <el-table-column label="实缴金额（元）" prop="paidAmount">
        </el-table-column>
        <el-table-column label="出资日期" prop="paidDate">
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small" type="default"
                      @click="handleEdit(scope.$index, scope.row)">
                      编辑
              </el-button>
              <el-button size="small" type="danger"
                      @click="handleDelete(scope.$index, scope.row)">
                      删除
              </el-button>
            </template>
        </el-table-column>
    </el-table>
    <Modal v-model="fundsDetailsModal" title="添加出资明细" @on-ok="confirmModal" @on-cancel="confirmCancel" width="800px">
        <funds-modal :fundsInfo="fundsInfo"></funds-modal>
    </Modal>
</div>
</template>

<script type="text/ecmascript-6">
import fundsModal from './fundsModal'
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
            fundsInfo: {
                investorName: '',
                subscribeAmount: '', //认缴金额
                fundName: '', //基金
                paidDate: '', //出资日期
                agreementName: '', //协议名称
                residueAmount: '',//剩余金额
                contributiveRatio: '', //出资占比
                id: '', //本条记录ID
                paidAmount: '', //实缴金额
                handler: '',  // 经办人
                handlingDate: new Date()
            }
        }
    },
    methods: {
        handleEdit(index, row) {
            this.fundsDetailsModal = true
            this.fundsInfo = row
        }
    },
    components: {
        fundsModal
    }
}
</script>

<style lang="less" scoped>
.fundDetails {
    width: 100%;
    height: 100%;
}
</style>
