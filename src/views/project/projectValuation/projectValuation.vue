<template>
    <div class="projectValue">
        <!-- 状态ul -->
        <el-row class="common">
            <el-col :span="24" style="margin-top:20px">
                <div class="state-ul">
                    <ul ref="state">
                        <li v-for="(item,index) in stateList" :key="item.index" :class="{active: index==currentIndex,fow: index==0}" @click="changeActive(index)">
                            {{item.state}}
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <!--搜索框 -->
        <el-row class="search-box">
            <el-col :span="5">
                <el-input icon="search" v-model="input" :on-icon-click="handleIconClick" placeholder="关键字：项目名称">
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
        <el-row type="flex" align="bottom" class="foot">
            <el-col :span="8">
                <span>总记录：{{this.total}}条</span>
            </el-col>
            <el-col :span="16">
                <Page :current="13" style="float:right"></Page>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getProjectValuation } from 'api/project';
export default {
    data() {
        return {
            total: 2,
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
                    valuationParameter: '市净率1000*20*5%',
                    valuation: '',
                    valuationDate: '',
                    valuationOfficer: '',
                    state: ''
                },
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
            // total: this.tableData.length
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            let self = this;
            getProjectValuation().then(resp => {
                let data = resp.data.result;
                self.tableData = data;
            });
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


<style lang="less" scoped>
.projectValue {
    position: relative;
    width: 100%;
   min-height: 100%;
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

.foot {
    margin: 25px 30px 0 30px;
}
</style>


<script>
export default {
    data() {
        return {
            total: 2,
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
