<template>
<div class="investor">
    <myFilter :chooseInfo="chooseInfo"></myFilter>
    <tableHeader :data="dataTitle" :theme="theme" class="addPadding" @add="showModel">
        <el-input placeholder="请输入搜索内容" icon="search" v-model="input" :on-icon-click="handleIconClick" style="width: 320px;">
        </el-input>
    </tableHeader>
    <el-table :data="investorData" border style="width: 100%;">
        <el-table-column label="投资者名称">
            <template scope="scope">
              <div class="name" @click="handleRouter(scope.$index, scope.row)">
                  <span class="investorName">{{ scope.row.investorName }}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column label="类型" prop="investorTypeId">
        </el-table-column>
        <el-table-column label="投资经理" prop="InvestmentManager">
        </el-table-column>
        <el-table-column label="累计投资额" prop="amount">
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small"
                      @click="handleEdit(scope.$index, scope.row)">
                      签约
              </el-button>
              <el-button size="small" type="danger"
                      @click="handleDelete(scope.$index, scope.row)">
                      删除
              </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" class="page">
    </el-pagination>
    <!-- 添加投资者 -->
    <el-dialog title="新增投资者" :visible.sync="modelInvestor" :close-on-click-modal="false">
        <el-form :model="addInvestor" label-position="left">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="投资者名称" :label-width="formLabelWidth">
                        <el-input v-model="addInvestor.investorName" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="投资者类型" :label-width="formLabelWidth" width="100">
                        <el-select v-model="addInvestor.investorTypeId" style="width:100%">
                            <el-option v-for="(item, index) of typeInvestor" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="证件类型" :label-width="formLabelWidth">
                        <el-select v-model="addInvestor.certificateTypeId" style="width:100%">
                            <el-option v-for="(item, index) of typeId" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="证件号码" :label-width="formLabelWidth">
                        <el-input v-model="addInvestor.certificateNum" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="机构净资产 (元)" :label-width="formLabelWidth" width="100">
                        <el-input v-model="addInvestor.organizationProperty" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年收入 (元)" :label-width="formLabelWidth">
                        <el-input placeholder="请输入内容" v-model="addInvestor.personalAssets">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属区域" :label-width="formLabelWidth">
                        <el-select v-model="addInvestor.regionName" style="width:100%">
                            <el-option v-for="(item, index) of area" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="投资经理" :label-width="formLabelWidth">
                        <el-select v-model="addInvestor.investmentManagerId" style="width:100%">
                            <el-option v-for="(item, index) of investmentManager" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系人" :label-width="formLabelWidth" width="100">
                        <el-input v-model="addInvestor.contacts" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话" :label-width="formLabelWidth">
                        <el-input placeholder="请输入内容" v-model="addInvestor.contactNumber">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="地址" :label-width="formLabelWidth" width="100">
                        <el-input v-model="addInvestor.address" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" :label-width="formLabelWidth">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="addInvestor.remark">
                        </el-input>
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
import {mapMutations,mapGetters} from 'vuex'
import myFilter from 'components/myFilter'
import tableHeader from 'components/tabelHeader'
import {addInvestor} from 'api/investor'
export default {
    data() {
        return {
            chooseInfo: [{
                title: '项目类型',
                details: []
            }],
            theme: '#fff',
            dataTitle: {
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '投资者'
                }]
            },
            investorData: [],
            modelInvestor: false,
            formLabelWidth: '120px',
            addInvestor: {},
            typeInvestor: [],
            typeId: [],
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
            investmentManager: [{
                dicName: JSON.parse(sessionStorage.getItem('userInfor')).name,
                id: JSON.parse(sessionStorage.getItem('userInfor')).id
            }],
            area: []
        }
    },
    methods: {
        handleRouter(index, rowList) {
            this.$store.dispatch('getInvDetails', rowList).then(() => {
                this.$router.push({
                    name: 'investorDetails',
                    params: {
                        id: rowList.id
                    }
                })
                this.addTab({
                    type: 'addTab',
                    title: rowList.investorName + '详情页',
                    url: '/home/investorDetails/' + rowList.id,
                    name: 'investorDetails/' + rowList.id
                })
            }).catch(err => {
                this.$router.push('/home/investor')
            })
        },
        showModel() {
            this.modelInvestor = true
        },
        confirmIncome() {
            addInvestor(this.addInvestor).then((res) => {
                if (res.data.status == '200') {
                    this.modelInvestor = false
                }
            })
        },
        ...mapMutations([
            'addTab' // 映射 this.addTab() 为 this.$store.commit
        ])
    },
    created() {
        this.$store.dispatch('getInvestor').then(() => {
            this.investorData = this.investorList.list
        })
        this.$store.dispatch('getProType').then(() => {
            this.chooseInfo[0].details = this.projectType
        })
        this.$store.dispatch('getInvType').then(() => {
            this.typeInvestor = this.investorType
        })
        this.$store.dispatch('getId').then(() => {
            this.typeId = this.idType
        })
        this.$store.dispatch('getArea').then(() => {
            this.area = this.subArea
        })
    },
    computed: {
        ...mapGetters([
            'investorList',
            'projectType',
            'investorType',
            'idType',
            'subArea'
        ])
    },
    components: {
        myFilter,
        tableHeader
    }
}
</script>

<style lang="less" scoped>
@import '../../common/styles/variable.less';
@import '../../common/styles/mixin.less';
.investor {
    width: 100%;
    height: 100%;
    padding: 24px;
    background: @color-base;
    .table-router();
    .addPadding {
        padding-bottom: 12px;
    }

    .page {
        padding: 24px 0;
        text-align: right;
    }
}
</style>
