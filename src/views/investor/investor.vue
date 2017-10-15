<template>
    <div class="investor">
        <myFilter :chooseInfo="chooseInfo" @getIdInfo="investorFilter"></myFilter>
        <tableHeader :data="dataTitle" :theme="theme" class="addPadding" @add="showModel">
            <el-input placeholder="请输入搜索内容" icon="search" v-model="investorName" :on-icon-click="handleIconClick" :autofocus="true" style="width: 320px;" @click="investorSearch" @blur="investorSearch">
            </el-input>
        </tableHeader>
        <div class="tables">
            <el-table :data="investorData" border style="width: 100%;">
                <el-table-column label="投资者名称" align="center">
                    <template scope="scope">
                        <div class="name" @click="handleRouter(scope.$index, scope.row)">
                            <span class="investorName">{{ scope.row.investorName }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="类型" prop="investorTypeId" align="center">
                </el-table-column>
                <el-table-column label="投资经理" prop="investmentManagerName" align="center">
                </el-table-column>
                <el-table-column label="累计投资额" prop="sumPaidAmount" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">
                            签约
                        </el-button>
                        <el-button type="text" @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
            </el-pagination>
        </div>
        <!-- 添加投资者 -->
        <!-- :ref="addInvestor" -->
        <el-dialog title="新增投资者" :visible.sync="modelInvestor" :close-on-click-modal="false">
            <investor-form :investorForm="addInvestor"></investor-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modelInvestor = false">取 消</el-button>
                <el-button type="danger" @click="confirmIncome('addInvestor')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 确认删除模态框 -->
        <delete-reminders :deleteReminders="deleteReminders" @del="comfirmDel" @cancel="comfirmCancel"></delete-reminders>
        <!-- 签约模态框 -->
        <Modal v-model="modelSign" title="签约" @on-ok="confirmSign" @on-cancel="cancelSign" width="800">
            <protocol-details :AgreementInfo="signInfo"></protocol-details>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations, mapGetters } from 'vuex'
import investorForm from 'components/investorForm'
import myFilter from 'components/myFilter'
import tableHeader from 'components/tabelHeader'
import deleteReminders from 'components/deleteReminders'
import protocolDetails from './protocolDetails'
import {
    addInvestor,
    getInvestorType,
    deleteInvestor,
    addAgreement,
    getInvestorList
} from 'api/investor'
export default {
    data() {
        return {
            chooseInfo: {
                title: '投资者类型：',
                details: []
            },
            theme: '#fff',
            dataTitle: {
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '投资者'
                }]
            },
            deleteReminders: false,
            id: '',
            modelSign: false,
            modelInvestor: false,
            signInfo: {
                agreementName: '',
                structuralLevelId: '',
                investorName: '',
                inverstorId: '',
                fundId: '',
                subscribeAmount: '',
                signDate: '',
                // regionName: '',
                managerName: '',
                merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id,
                registerDate: new Date()
            },
            investorData: [],
            addInvestor: {
                investorName: '',
                investorTypeId: '',
                certificateTypeId: '',
                certificateNum: '',
                organizationProperty: '',
                personalAssets: '',
                regionId: '',
                regionName: '',
                investmentManagerId: '',
                contacts: '',
                contactNumber: '',
                addUserId: JSON.parse(sessionStorage.getItem('userInfor')).id,
                merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id,
                address: '',
                remark: ''
            },
            investorId: '', // 用于模糊查询 投资者类型ID
            investorName: '', // input 输入框值
            pageTotal: '',
            page: 1,
            pageSize: 10
        }
    },
    methods: {
        handleRouter(index, rowList) {
            this.addTab({
                type: 'addTab',
                title: rowList.investorName + '详情页',
                url: '/home/investorDetails/' + rowList.id,
                name: 'investorDetails/' + rowList.id
            })
            this.GET_INVESTORNAME(rowList.investorName)
            this.$router.push({
                name: 'investorDetails',
                params: {
                    userId: rowList.id
                }
            })
            sessionStorage.setItem('INVESTORNAME', rowList.investorName)
            // console.log(this.$store.state.investor.investorName)
        },
        showModel() {
            let new_addInvestor = {
                investorName: '',
                investorTypeId: '',
                certificateTypeId: '',
                certificateNum: '',
                organizationProperty: '',
                personalAssets: '',
                regionId: '',
                regionName: '',
                investmentManagerId: '',
                contacts: '',
                contactNumber: '',
                addUserId: JSON.parse(sessionStorage.getItem('userInfor')).id,
                merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id,
                address: '',
                remark: ''
            };
            this.addInvestor = new_addInvestor;
            this.modelInvestor = true;
        },
        handleDelete(index, row) {
            this.deleteReminders = !this.deleteReminders
            this.id = row.id
        },
        handleEdit(index, row) {
            this.modelSign = true
            this.signInfo.agreementName = row.agreementName
            this.signInfo.signDate = row.createDate
            this.signInfo.inverstorId = row.id
            this.signInfo.managerName = row.investmentManagerName
            this.signInfo.investorName = row.investorName
        },
        confirmIncome(formName) {
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         alert('submit!');
            //         addInvestor(this.addInvestor).then((res) => {
            //             if (res.data.status == '200') {
            //                 this.modelInvestor = false
            //                 this.getInvList()
            //             }
            //         })
            //     } else {
            //         return false;
            //     }
            // });
            addInvestor(this.addInvestor).then((res) => {
                if (res.data.status == '200') {
                    this.modelInvestor = false
                    this.getInvList()
                }
            })
        },
        comfirmDel() {
            deleteInvestor(this.id).then((res) => {
                if (res.status == '200') {
                    this.$Message.success(res.data.message || '删除投资者成功！')
                    this.deleteReminders = false
                }
            })
        },
        confirmSign() {
            addAgreement(this.signInfo).then((res) => {
                if (res.status == '200') {
                    this.$Message.success(res.data.message || '签约成功！')
                    this.modelSign = false
                }
            })
        },
        cancelSign() {
            this.modelSign = false
        },
        comfirmCancel() {
            this.deleteReminders = false
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pageSize = val
            this.getInvList()
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.page = val
            this.getInvList()
        },
        investorSearch() {
            this.getInvList()
        },
        investorFilter(index, id) {
            if (index == 0) {
                this.investorId = ''
            } else {
                this.investorId = id
            }
            this.getInvList()
        },
        getInvList() {
            getInvestorList(this.investorId, this.investorName, this.page, this.pageSize).then((res) => {
                if (res.status == '200') {
                    this.investorData = res.data.result.list
                    this.pageTotal = res.data.result.total
                }
            })
        },
        ...mapMutations([
            'addTab', // 映射 this.addTab() 为 this.$store.commit
            'GET_INVESTORNAME'
        ])
    },
    created() {
        this.$store.dispatch('getInvestor').then(() => {
            this.investorData = this.investorList.list
            this.pageTotal = this.investorList.total
        })
        getInvestorType().then((res) => {
            if (res.status == '200') {
                this.chooseInfo.details = res.data.result
            }
        }).catch(err => {
            this.$Message.error(err)
        })
    },
    computed: {
        ...mapGetters([
            'investorList'
        ])
    },
    components: {
        myFilter,
        tableHeader,
        investorForm,
        deleteReminders,
        protocolDetails
    }
}
</script>

<style lang="less" scoped>
@import '../../common/styles/variable.less';
@import '../../common/styles/mixin.less';
.investor {
    width: 100%;
    min-height: 100%;
    padding: 24px;
    background: @color-base;
    position: relative;
    /*.table-router();*/
    .addPadding {
        padding-bottom: 12px;
    }
    .tables {
        padding-bottom: @height-large;
    }
    .page {
        width: 100%;
        height: 60px;
        text-align: right;
        position: absolute;
        bottom: 0;
        right: 0;
    }
    span.investorName {
        cursor: pointer;
        color: #f05e5e;
    }
}
</style>
