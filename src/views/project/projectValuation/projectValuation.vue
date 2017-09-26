<template>
    <div class="projectValue">
        <!-- 状态ul -->
        <el-row class="common">
            <el-col :span="24" style="margin-top:20px">
                <div class="state-ul">
                    <ul ref="state">
                        <li v-for="(item,index) in stateList" :key="item.index" :class="{active: index==currentIndex,fow: index==0}" @click="changeActive(index, item)">
                            {{item.state}}
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <!--搜索框 -->
        <el-row class="search-box">
            <el-col :span="5">
                <el-input icon="search" v-model="projectName" :on-icon-click="handleIconClick" placeholder="关键字：项目名称">
                </el-input>
            </el-col>
        </el-row>
        <!--项目table -->
        <el-row class="common">
            <el-col :span="24">
                <el-table :data="tableData" style="width:100%" max-height="700" class="table-item">
                    <el-table-column prop="project" label="项目名称" align="center">
                    </el-table-column>
                    <el-table-column prop="valuationParameter" label="估值参数" align="center" width="450px">
                        <template scope="scope">
                            <span v-if="!scope.row.editFlag">{{ scope.row.parameter1}}*{{scope.row.parameter2}}*{{scope.row.parameter3}}</span>
                            <span v-if="scope.row.editFlag" class="cell-edit-input">
                                <el-row width="100%">
                                    <el-col style="line-height:47px">
                                        <el-input v-model="scope.row.parameter1" auto-complete="off" style="width:50px;height:47px"></el-input>
                                        *PB
                                        <el-input v-model="scope.row.parameter2" auto-complete="off" style="width:50px;height:47px"></el-input>
                                        *股权占比
                                        <el-input v-model="scope.row.parameter3" disabled auto-complete="off" style="width:50px;height:47px"></el-input>
                                    </el-col>
                                </el-row>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="valuation" label="估值（元）" align="center">
                    </el-table-column>
                    <el-table-column prop="valuationDate" label="估值日期" align="center">
                    </el-table-column>
                    <el-table-column prop="valuationOfficer" label="估值人员" align="center">
                    </el-table-column>
                    <el-table-column prop="state" label="状态" align="center">
                    </el-table-column>
                    <el-table-column label="算法类型" align="center" width="215px">
                        <template scope="scope">
                            <el-form :model="form">
                                <el-form-item>
                                    <el-select v-model="form.algorithmType" placeholder="请选择算法类型">
                                        <el-option label="市净率法" value="市净率法"></el-option>
                                        <el-option label="市盈率法" value="市盈率法"></el-option>
                                        <el-option label="市销售法" value="市销售法"></el-option>
                                        <el-option label="市场率" value="市场率"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template scope="scope">
                            <el-button v-if="!scope.row.editFlag" type="text" size="small" style="color: #f05e5e" @click="checkEdit(scope.$index,scope.row)">编辑
                            </el-button>
                            <el-button v-if="scope.row.editFlag" type="text" size="small" style="color: #f05e5e" @click="checkEdit(scope.$index,scope.row)">保存
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
       <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
       </div>
    </div>
</template>

<script>
import { getProjectValuation } from 'api/project';
export default {
    data() {
        return {
            total: 0,
            page: 1,
            pageSize: 5,
            projectName: '',
            currentIndex: 1,
            stateList: [
                { state: "状态：" },
                { state: "全部" },
                { state: "未提交" },
                { state: "已提交" }
            ],
            tableData: [
                {
                    project: 'AAAAAAAA',
                    valuationParameter: '市净率1000*20*5%',
                    valuation: '',
                    valuationDate: '',
                    valuationOfficer: '',
                    state: ''
                }
            ],
            form: {
                algorithmType: ''
            }
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
            let appraisementStatus = this.appraisementStatus;

            let params = {
                projectName: this.projectName,
                page: this.page,
                pageSize: this.pageSize
            };

            getProjectValuation(params).then(resp => {
                let result = resp.data.result;
                this.tableData = result.data || [];
                this.total = result.total || 0;
            }).catch(e => {
                console.log('getProjectValuation() exists error: ', e);
            });
        },
        pageChanged(page) {
            this.page = page;
            this.getDatas();
        },
        pageSizeChanged(pageSize) {
            console.log('pageSize: ', pageSize);
        },
        checkEdit(index, row) { //编辑
            // console.log(row)
            row.editFlag = !row.editFlag;
        },
        handleIconClick(ev) {
            // console.log(ev);
            this.getDatas();
        },
        changeActive(index, item) {
            this.currentIndex = index;
            console.log(item);
        }
    }
}
</script>


<style lang="less" scoped>
.projectValue {
    width: 100%;
    min-height: 100%;
    position: relative;
    font-size: 14px;
    background: #fff;
}

.common {
    padding: 0 30px 20px 30px;
    ul {
        float: left;
        li {
            display: inline-block;
            box-sizing: border-box;
            margin-right: 30px;
            margin-bottom: 5px;
            cursor: pointer;
        }
    }
}

.fow {
    font-weight: bold;
}

.active {
    width: 70px;
    height: 20px;
    color: white;
    text-align: center;
    border-radius: 15px;
    background: #F05E5E;
}

.search-box {
    margin: 0 30px 20px 30px;
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


<script>
export default {
    data() {
        return {
            input: '',
            currentIndex: 1,
            stateList: [
                { state: "状态：" },
                { state: "全部" },
                { state: "未提交" },
                { state: "已提交" }
            ],
            tableData: [
                {
                    project: 'AAAAAAAA',
                    parameter1: '400',
                    parameter2: '500',
                    parameter3: '0.3',
                    valuation: '',
                    valuationDate: '',
                    valuationOfficer: '',
                    state: '',
                    editFlag: false
                },
                {
                    project: 'AAAAAAAA',
                    parameter1: '400',
                    parameter2: '500',
                    parameter3: '0.4',
                    valuation: '',
                    valuationDate: '',
                    valuationOfficer: '',
                    state: '',
                    editFlag: false
                }
            ],
            form: {
                algorithmType: ''
            }
            // total: this.tableData.length
        }
    },
    methods: {
        checkEdit(index, row) { //编辑
            // console.log(row)
            row.editFlag = !row.editFlag;
        },
        handleIconClick(ev) {
            console.log(ev);
        },
        changeActive(index) {
            this.currentIndex = index;
        }
    }
}
</script>
