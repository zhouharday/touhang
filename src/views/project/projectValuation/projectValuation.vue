<template>
    <section class="projectValue">
        <!-- 状态ul -->
        <my-filter :chooseInfo="stateList" @getIdInfo="clickState"></my-filter>
        <!--搜索框 -->
        <el-row class="search-box">
            <el-col :span="6">
                <el-input icon="search" v-model="projectName" @keyup.enter.native="getDatas" :on-icon-click="handleIconClick" placeholder="关键字：项目名称">
                </el-input>
            </el-col>
        </el-row>
        <el-table :data="tableData" style="width:100%" border class="table-item">
            <el-table-column prop="projectName" fixed label="项目名称" align="center" width="200px">
                <template scope="scope">
                    <el-button type="text" style="color:#f05e5e" @click="viewHistory(scope.row.projectId)">{{ scope.row.projectName }}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="算法类型" align="center" width="215px">
                <template scope="scope">
                    <span v-if="!scope.row.editFlag">{{scope.row.arithmeticType | key2value(typeOptions, scope.row.arithmeticType)}}</span>
                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                        <el-select @change="changeType(scope.row.arithmeticType, scope.row)" v-model="scope.row.arithmeticType" placeholder="请选择算法类型">
                            <el-option v-for="item in typeOptions" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="估值参数" align="center" width="400px">
                <template scope="scope">
                    <span v-if="!scope.row.editFlag">{{scope.row.note1}}： {{ scope.row.appraisementParamer}}　x　{{scope.row.note2}}： {{scope.row.appraisementParamerTwo}}　x　{{scope.row.note3}}： {{scope.row.stockRatio}}%</span>
                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                        <el-row width="100%">
                            <el-col style="line-height:47px">
                                {{scope.row.note1}}
                                <el-input @change="changeParam(scope.$index, scope.row)" v-model="scope.row.appraisementParamer" auto-complete="off" style="width:50px;height:47px"></el-input>
                                X {{scope.row.note2}}
                                <el-input @change="changeParam(scope.$index, scope.row)" v-model="scope.row.appraisementParamerTwo" auto-complete="off" style="width:50px;height:47px"></el-input>
                                X {{scope.row.note3}}
                                <el-input :value="scope.row.stockRatio/100" disabled auto-complete="off" style="width:50px;height:47px">
                                </el-input>
                            </el-col>
                        </el-row>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="appraisementValue" label="估值（元）" align="center" width="200px">
                <template scope="scope">{{scope.row.appraisementValue | toMoney}}</template>
            </el-table-column>
            <el-table-column prop="appraisementDate" label="估值日期" align="center" width="200px">
                <template scope="scope">{{scope.row.appraisementDate | formatDate}}</template>
            </el-table-column>
            <el-table-column prop="appraisementUserName" label="估值人员" align="center" width="200px">
            </el-table-column>
            <el-table-column prop="appraisementStatus" label="状态" align="center" width="200px">
                <template scope="scope">{{scope.row.appraisementStatus == '1' ? '已估值' : '未估值'}}</template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="200px">
                <template scope="scope">
                    <el-button v-if="!scope.row.editFlag && scope.row.appraisementStatus != 1" type="text" size="small" style="color: #f05e5e" @click="checkEdit(scope.$index,scope.row)">编辑
                    </el-button>
                    <el-button v-if="scope.row.editFlag && scope.row.appraisementStatus != 1" type="text" size="small" style="color: #f05e5e" @click="saveEdit(scope.$index,scope.row)">保存
                    </el-button>
                    <el-button v-if="scope.row.appraisementStatus != 1" type="text" size="small" style="color: #f05e5e" @click="submitEdit(scope.$index,scope.row)">提交</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[2, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
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
import { getAppraisementList, updAppraisement, getAppraisementRec } from 'api/projectAfter';
export default {
    data() {
        return {
            projectId: '',
            historyDialog: false,
            appraisementStatus:'',
            projectName: '',
            note1: '',
            note2: '',
            note3: '股权占比',
            page: 1,
            pageSize: 5,
            total: 0,
            page2: 1,
            pageSize2: 5,
            total2: 0,
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
                    var _typeOptions = this.typeOptions;
                    let dataList = resp.data.result.list;
                    dataList.forEach(function(item, index){
                        item.editFlag = false;
                        if(item.arithmeticType){
                            item.note1 = _typeOptions[item.arithmeticType - 1].note1;
                            item.note2 = _typeOptions[item.arithmeticType - 1].note2;
                        }
                    });
                    this.tableData = dataList;
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
        changeType(val, row){
            row.note1 = this.typeOptions[val-1].note1;
            row.note2 = this.typeOptions[val-1].note2;
        },
        changeParam(index, row){
            row.appraisementValue = row.appraisementParamer*row.appraisementParamerTwo*row.stockRatio/100;
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
        checkEdit(index, row) { //编辑
            row.editFlag = !row.editFlag;
        },
        saveEdit(index, row) { //保存
            updAppraisement(row, 2).then(resp => {
                if (resp.data.status == '200') {
                    this.getDatas();
                }else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('updAppraisement 保存 error: ', e);
            });
        },
        submitEdit(index, row) { //提交
            updAppraisement(row, 1).then(resp => {
                if (resp.data.status == '200') {
                    this.getDatas();
                }else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('updAppraisement 提交 error: ', e);
            });
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
        }
    },
    components: {
        myFilter
    }
}
</script>


<style lang="less" scoped>
.projectValue {
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
