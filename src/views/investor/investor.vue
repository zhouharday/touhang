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
                        <el-input v-model="addInvestor.investorTypeId" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="证件类型" :label-width="formLabelWidth">
                        <el-input placeholder="请输入内容" v-model="addInvestor.certificateTypeId">
                        </el-input>
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
                        <el-input placeholder="请输入内容" v-model="addInvestor.regionName">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="投资经理" :label-width="formLabelWidth">
                        <el-input v-model="addInvestor.investmentManagerId" auto-complete="off"></el-input>
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
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="remark">
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
import {
    mapMutations
} from 'vuex'
import myFilter from 'components/myFilter'
import tableHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            chooseInfo: [{
                title: '项目类型',
                details: ['全部', '机构', '个人', '政府']
            }],
            theme: '#fff',
            dataTitle: {
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '投资者'
                }]
            },
            investorData: [{
                id: 12,
                investorName: '投资者名称',
                investorTypeId: '类型',
                InvestmentManager: '安红',
                amount: '累计投资额'
            }, {
                id: 13,
                investorName: '李四',
                investorTypeId: '类型',
                InvestmentManager: '安红',
                amount: 1000
            }],
            modelInvestor: false,
            formLabelWidth: '120px',
            addInvestor: {}
        }
    },
    methods: {
        handleRouter(index, row) {
            this.addTab({
                type: 'addTab',
                title: row.investorName + '详情页',
                url: '/home/investorDetails/' + row.id,
                name: 'investorDetails/' + row.id
            });
            this.$router.push({
                name: 'investorDetails',
                params: {
                    id: row.id
                }
            })
        },
        showModel() {
            this.modelInvestor = true
        },
        confirmIncome() {
            this.modelInvestor = false
        },
        ...mapMutations([
            'addTab' // 映射 this.addTab() 为 this.$store.commit
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
