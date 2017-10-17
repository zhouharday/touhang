<template>
    <section class="projectValue">
        <!-- 状态ul -->
        <my-filter :chooseInfo="stateList"></my-filter>
        <!--搜索框 -->
        <el-row class="search-box">
            <el-col :span="6">
                <el-input icon="search" v-model="projectName" :on-icon-click="handleIconClick" placeholder="关键字：项目名称">
                </el-input>
            </el-col>
        </el-row>
        <!--项目table -->
        <!-- <el-table :data="tableData" style="width:100%" border class="table-item">
                    <el-table-column prop="projectName"  label="项目名称" align="center">
                    </el-table-column>
                    <el-table-column label="算法类型" align="center" width="215px">
                        <template scope="scope">
                            <span v-if="!scope.row.editFlag">{{scope.row.algorithmType}}</span>
                            <span v-if="scope.row.editFlag" class="cell-edit-input">
                                <el-select v-model="scope.row.algorithmType" placeholder="请选择算法类型">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
                                    </el-option>
                                </el-select>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="appraisementParamer" label="估值参数" align="center">
                        <template scope="scope">
                            <span v-if="!scope.row.editFlag">{{ scope.row.parameter1}}*{{scope.row.parameter2}}*{{scope.row.parameter3}}</span>
                            <span v-if="scope.row.editFlag" class="cell-edit-input">
                                <el-row width="100%">
                                    <el-col style="line-height:47px">
                                        {{note1}}
                                        <el-input v-model="scope.row.parameter1" auto-complete="off" style="width:50px;height:47px"></el-input>
                                        *{{note2}}
                                        <el-input v-model="scope.row.parameter2" auto-complete="off" style="width:50px;height:47px"></el-input>
                                        *股权占比
                                        <el-input v-model="scope.row.parameter3" disabled auto-complete="off" style="width:50px;height:47px"></el-input>
                                    </el-col>
                                </el-row>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="appraisementValue" label="估值（元）" align="center" >
                    </el-table-column>
                    <el-table-column prop="appraisementDate" label="估值日期" align="center" >
                    </el-table-column>
                    <el-table-column prop="appraisementUserName" label="估值人员" align="center" >
                    </el-table-column>
                    <el-table-column prop="appraisementStatus" label="状态" align="center" >
                        <template scope="scope">{{scope.row.appraisementStatus == '1' ? '已估值' : '未估值'}}</template>
                    </el-table-column>
                    <el-table-column  label="操作" align="center" >
                        <template scope="scope">
                            <el-button v-if="!scope.row.editFlag" type="text" size="small" style="color: #f05e5e" @click="checkEdit(scope.$index,scope.row)">编辑
                            </el-button>
                            <el-button v-if="scope.row.editFlag" type="text" size="small" style="color: #f05e5e" @click="saveEdit(scope.$index,scope.row)">保存
                            </el-button>
                            <el-button  type="text" size="small" style="color: #f05e5e" @click="submitEdit(scope.$index,scope.row)">提交</el-button>
                        </template>
                    </el-table-column>
                </el-table> -->
        <el-table :data="tableData" style="width:100%" border class="table-item">
            <el-table-column prop="projectName" fixed label="项目名称" align="center" width="200px">
                <template scope="scope">
                    <el-button type="text" style="color:#f05e5e" @click="viewHistory(scope.row,scope.$index)">{{ scope.row.projectName }}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="算法类型" align="center" width="215px">
                <template scope="scope">
                    <span v-if="!scope.row.editFlag">{{scope.row.algorithmType}}</span>
                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                        <el-select v-model="scope.row.algorithmType" placeholder="请选择算法类型">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
                            </el-option>
                        </el-select>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="appraisementParamer" label="估值参数" align="center" width="400px">
                <template scope="scope">
                    <span v-if="!scope.row.editFlag">{{ scope.row.parameter1}}*{{scope.row.parameter2}}*{{scope.row.parameter3}}</span>
                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                        <el-row width="100%">
                            <el-col style="line-height:47px">
                                {{note1}}
                                <el-input v-model="scope.row.parameter1" auto-complete="off" style="width:50px;height:47px"></el-input>
                                *{{note2}}
                                <el-input v-model="scope.row.parameter2" auto-complete="off" style="width:50px;height:47px"></el-input>
                                *股权占比
                                <el-input v-model="scope.row.parameter3" disabled auto-complete="off" style="width:50px;height:47px"></el-input>
                            </el-col>
                        </el-row>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="appraisementValue" label="估值（元）" align="center" width="200px">
            </el-table-column>
            <el-table-column prop="appraisementDate" label="估值日期" align="center" width="200px">
            </el-table-column>
            <el-table-column prop="appraisementUserName" label="估值人员" align="center" width="200px">
            </el-table-column>
            <el-table-column prop="appraisementStatus" label="状态" align="center" width="200px">
                <template scope="scope">{{scope.row.appraisementStatus == '1' ? '已估值' : '未估值'}}</template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="200px">
                <template scope="scope">
                    <el-button v-if="!scope.row.editFlag" type="text" size="small" style="color: #f05e5e" @click="checkEdit(scope.$index,scope.row)">编辑
                    </el-button>
                    <el-button v-if="scope.row.editFlag" type="text" size="small" style="color: #f05e5e" @click="saveEdit(scope.$index,scope.row)">保存
                    </el-button>
                    <el-button type="text" size="small" style="color: #f05e5e" @click="submitEdit(scope.$index,scope.row)">提交</el-button>
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
                    <el-table-column prop="sort" label="算法类型" align="center">
                    </el-table-column>
                    <el-table-column prop="valuationParameter" label="估值参数" align="center">
                    </el-table-column>
                    <el-table-column prop="value" label="估值（元）" align="center">
                    </el-table-column>
                    <el-table-column prop="valuationDate" label="估值日期" align="center">
                    </el-table-column>
                    <el-table-column prop="valuationOfficer" label="估值人员" align="center">
                    </el-table-column>
                </el-table>
                <div style="margin: 10px;overflow: hidden">
                    <div class="pagination">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="2" :page-sizes="[10, 20, 30, 40]" :page-size="50" layout="total, sizes, prev, pager, next, jumper" :total="150">
                        </el-pagination>
                    </div>
                </div>
            </el-dialog>
        </div>
    </section>
</template>

<script>
import myFilter from 'components/myFilter'
import { getAppraisementList, updAppraisement } from 'api/projectAfter';
export default {
    data() {
        return {
            historyDialog: false,
            currentIndex: 0,
            projectName: '',
            note1: '净资产',
            note2: 'PB',
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
            tableData: [
                {
                    projectName: 'AAAAAAAA',
                    algorithmType: '选项1',
                    parameter1: '400',
                    parameter2: '500',
                    parameter3: '0.3',
                    appraisementValue: '0.00',
                    appraisementDate: '',
                    appraisementUserName: '',
                    appraisementStatus: '1',
                    editFlag: false
                },
                // {
                //     projectName: 'BBBBBB',
                //     algorithmType: '选项1',
                //     parameter1: '0',
                //     parameter2: '0',
                //     parameter3: '0.3',
                //     appraisementValue: '0.00',
                //     appraisementDate: '',
                //     appraisementUserName: '',
                //     appraisementStatus: '2',
                //     editFlag: false
                // }
            ],
            options: [{
                value: '选项1',
                label: '市净率法'
            }, {
                value: '选项2',
                label: '市盈率法'
            }, {
                value: '选项3',
                label: '市销售法'
            }, {
                value: '选项4',
                label: '市场率'
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
                page: this.page,
                pageSize: this.pageSize
            };
            getAppraisementList(params).then(resp => {
                if (resp.data.result == '200') {
                    // this.tableData = result.data.result.list || [];
                }
                this.total = result.total || 0;
            }).catch(e => {
                console.log('getProjectValuation() exists error: ', e);
            });
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
            // console.log(row)
            row.editFlag = !row.editFlag;
        },
        saveEdit(index, row) { //保存
            row.editFlag = !row.editFlag;
        },
        submitEdit(index, row) { //提交

        },
        handleIconClick(ev) {
            this.getDatas();
        },
        changeActive(index, item) {
            this.currentIndex = index;
            console.log(item);
        },
        viewHistory(row, index) {
            this.historyDialog = true;
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
