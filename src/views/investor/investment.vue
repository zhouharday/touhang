<template>
<div class="investmentDetails">
    <Tabs v-model="tabsName" @on-click="changeTabs">
        <TabPane label="出资" name="contribution">
            <fundDetails :investorData="investorData"></fundDetails>
        </TabPane>
        <TabPane label="退出" name="secede">标签二的内容</TabPane>
        <Button type="ghost" @click="handleTabsAdd" slot="extra">添加</Button>
    </Tabs>
    <!-- 添加出资模态框 -->
    <Modal v-model="InvDetails" title="添加出资明细" @on-ok="addInvDetails" @on-cancel="cancelInvDetails" width="800px">
        <funds-modal></funds-modal>
    </Modal>
</div>
</template>

<script type="text/ecmascript-6">
import fundDetails from "./fundDetails"
import fundsModal from "./fundsModal"
export default {
    props: {
        investorData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            InvDetails: false,
            tabsName: 'contribution'
        }
    },
    methods: {
        handleTabsAdd() {
            if(this.tabsName == 'contribution') {
                this.InvDetails = true
            }
        }
    },
    components:{
        fundDetails,
        fundsModal
    }
}
</script>

<style lang="less" scoped>
.investmentDetails {
    width: 100%;
    height: 100%;
}
</style>
