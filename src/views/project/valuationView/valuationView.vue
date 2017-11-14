<template>
    <section class="valueView">
        <!-- 状态ul -->
        <my-filter :chooseInfo="stateList" @getIdInfo="clickState"></my-filter>
        <!--搜索框 -->
        <el-row class="search-box">
            <el-col :span="6">
                <el-input icon="search" v-model="projectName" @keyup.enter.native="getDatas" :on-icon-click="handleIconClick">
                </el-input>
            </el-col>
            <el-col :span="18" style="text-align:right">
                <el-button type="danger" style="width:80px;padding: 10px 11px;" @click="resetDialog=true">估值重置</el-button>
            </el-col>
        </el-row>
        <!--项目table -->
        <el-table :data="tableData" highlight-current-row @current-change="handleRowChange" style="width:100%" max-height="700" class="table-item" >
            <el-table-column prop="projectName" label="项目名称" align="center">
                <template scope="scope">
                    <el-button type="text" style="color:#f05e5e" @click="viewHistory(scope.row.projectId)">{{ scope.row.projectName }}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="估值参数" align="center">
                <template scope="scope">{{scope.row.arithmeticType | key2value(typeOptions, scope.row.arithmeticType)}}  
                {{ scope.row.appraisementParamer}} x {{scope.row.appraisementParamerTwo}} x {{scope.row.stockRatio}}%</template>
            </el-table-column>
            <el-table-column prop="appraisementValue" label="估值（元）" align="center">
                <template scope="scope">{{scope.row.appraisementValue | toMoney}}</template>
            </el-table-column>
            <el-table-column prop="valuationDate" label="估值日期" align="center">
                <template scope="scope">{{scope.row.appraisementDate | formatDate}}</template>
            </el-table-column>
            <el-table-column prop="appraisementUserName" label="估值人员" align="center">
            </el-table-column>
            <el-table-column prop="appraisementStatus" label="状态" align="center">
                <template scope="scope">{{scope.row.appraisementStatus == '1' ? '已估值' : '未估值'}}</template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
        </div>
        <!-- 估值重置 dialog -->
        <div class="reset">
            <el-dialog title="估值重置" :visible.sync="resetDialog" size="tiny">
                <span>确认将所有项目的估值清空重置？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="default" @click="resetDialog=false">取 消</el-button>
                    <el-button type="danger" @click="resetValue">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 估值历史 dialog -->
        <div class="history">
            <el-dialog :visible.sync="historyDialog">
                <el-table :data="historyData" border style="width: 100%">
                    <el-table-column prop="arithmeticType" label="算法类型" align="center">
                        <template scope="scope">{{scope.row.arithmeticType | key2value(typeOptions, scope.row.arithmeticType)}}</template>
                    </el-table-column>
                    <el-table-column label="估值参数" align="center">
                        <template scope="scope">{{ scope.row.appraisementParamer}}　X　{{scope.row.appraisementParamerTwo}}　X　{{scope.row.stockRatio}}%</template>
                    </el-table-column>
                    <el-table-column prop="appraisementValue" label="估值（元）" align="center">
                        <template scope="scope">{{scope.row.appraisementValue | toMoney}}</template>
                    </el-table-column>
                    <el-table-column prop="appraisementDate" label="估值日期" align="center">
                        <template scope="scope">{{scope.row.appraisementDate | formatDate}}</template>
                    </el-table-column>
                    <el-table-column prop="appraisementUser" label="估值人员" align="center">
                    </el-table-column>
                </el-table>
                <div style="margin: 10px;overflow: hidden">
                    <div class="pagination">
                        <el-pagination @size-change="handleSizeChangeRec" @current-change="handleCurrentChangeRec" :current-page="page2" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize2" layout="total, sizes, prev, pager, next, jumper" :total="total2">
                        </el-pagination>
                    </div>
                </div>
            </el-dialog>
        </div>
    </section>
</template>

<script>
import 'common/js/filter'
import myFilter from 'components/myFilter'
import { getAppraisementList, updAppraisement, getAppraisementRec, resetAppraisement } from 'api/projectAfter';
export default {
    data() {
        return {
            projectId: '',
            appraisementStatus:'',
            projectName: '',
            currentIndex: 0,
            resetDialog: false,
            historyDialog: false,
            page: 1,
            pageSize: 5,
            total: 0,
            page2: 1,
            pageSize2: 5,
            total2: 0,
            currentId: '',
            stateList: { //筛选选项
                title: '状态：',
                details: [{
                    id: '',
                    dicName: '全部'
                }, {
                    id: '1',
                    dicName: '已估值'
                }, {
                    id: '2',
                    dicName: '未估值'
                }]
            },
            tableData: [],
            typeOptions: [{
                key: 1,
                value: '市净率法',
                note1: '净资产',
                note2: 'PB'
            }, {
                key: 2,
                value: '市盈率法',
                note1: '净利润',
                note2: 'PE'
            }, {
                key: 3,
                value: '市销售法',
                note1: '收入',
                note2: 'PS'
            }, {
                key: 4,
                value: '市场率',
                note1: '市现率',
                note2: 'EDITDA'
            }],
            historyData:[]
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getDatas();
        },
        getDatas() {
            let params = {
                appraisementStatus: this.appraisementStatus,
                projectName: this.projectName,
                type: 1,
                page: this.page,
                pageSize: this.pageSize
            };
            getAppraisementList(params).then(resp => {
                if (resp.data.status == '200') {
                    let dataList = resp.data.result.list.forEach(function(item, index){
                        item.editFlag = false;
                    });
                    this.tableData = resp.data.result.list || [];
                    this.total = resp.data.result.total || 0;
                } else if (resp.data.status == '49999') {
                    this.operatingData = [];
                    this.total = 0;
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('getProjectValuation() exists error: ', e);
            });
        },
        clickState(index, id){
            this.appraisementStatus = index == 0 ? '' : id;
            this.getDatas();
        },
        handleCurrentChange(page) {
            this.page = page;
            this.getDatas();
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.getDatas();
        },
        handleIconClick(ev) {
            this.getDatas();
        },
        //查看估值历史
        viewHistory(projectId) {
            this.projectId = projectId;
            this.historyDialog = true;
            this.getHistory();
        },
        getHistory(){
            let params = {
                projectId: this.projectId,
                page: this.page2,
                pageSize: this.pageSize2
            }
            getAppraisementRec(params).then(resp => {
                console.log("历史数据"+JSON.stringify(resp.data));
                if (resp.data.status == '200') {
                    this.historyData = resp.data.result.list || [];
                    this.total2 = resp.data.result.total || 0;
                } else if (resp.data.status == '49999') {
                    this.historyData = [];
                    this.total2 = 0;
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('查看估值历史 error: ', e);
            });
        },
        handleCurrentChangeRec(page) {
            this.page2 = page;
            this.getHistory();
        },
        handleSizeChangeRec(pageSize) {
            this.pageSize2 = pageSize;
            this.getHistory();
        },
        handleRowChange(row){
            if(row){
                this.currentId = row.id;
            }else{
                this.currentId = '';
            }
        },
        resetValue() { //估值重置 确定按钮的方法
            resetAppraisement(this.currentId).then(resp => {
                console.log("估值重置 "+JSON.stringify(resp.data));
                if (resp.data.status == '200') {
                    this.getDatas();
                    this.resetDialog = false;
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('估值重置  error: ', e);
            });
        }
    },
    components: {
        myFilter
    }
}
</script>

<style lang="less" scoped>
.valueView {
    width: 100%;
    min-height: 100%;
    position: relative;
    font-size: 14px;
    padding: 20px 30px;
    background: #fff;
}

.search-box {
    margin: 20px 0;
}

.project {
    color: #F05E5E;
    border-bottom: 1px solid #F05E5E;
}

.page {
    width: 100%;
    padding: 15px 30px;
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>
