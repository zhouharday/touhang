<template>
    <div class="projectOut">
        <!-- 类型ul -->
        <el-row class="common">
            <el-col :span="24" style="margin-top:20px">
                <div class="sort-ul">
                    <ul ref="sort">
                        <li v-for="(item,index) in sortList" :key="item.index" :class="{active: index==currentIndex,fow: index==0}" @click="changeActive(index)">
                            {{item.sorts}}
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <!--搜索框 -->
        <el-row class="search-box">
            <el-col :span="5">
                <el-input icon="search" v-model="input" :on-icon-click="handleIconClick">
                </el-input>
            </el-col>
        </el-row>
        <!--项目table -->
        <el-row class="common">
            <el-col :span="24">
                <el-table :data="tableData" style="width:100%" max-height="700" class="table-item">
                    <el-table-column label="项目名称" align="center">
                        <template scope="scope">
                            <a class="project">{{ scope.row.project }}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="manager" label="项目创建人" align="center">
                    </el-table-column>
                    <el-table-column prop="industry" label="所属行业" align="center">
                    </el-table-column>
                    <el-table-column prop="sort" label="项目类型" align="center">
                    </el-table-column>
                    <el-table-column prop="investDate" label="投资日期" align="center">
                    </el-table-column>
                    <el-table-column prop="investment" label="投资金额（元）" align="center">
                    </el-table-column>
                    <el-table-column prop="withdrawingDate" label="退出日期" align="center">
                    </el-table-column>
                    <el-table-column prop="withdrawingMode" label="退出方式" align="center">
                    </el-table-column>
                    <el-table-column prop="exitReturn" label="退出收益（元）" align="center">
                    </el-table-column>
                    <el-table-column prop="yieldRate" label="收益率（%）" align="center">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row type="flex" align="bottom" class="foot">
            <el-col :span="8">
                <span>总记录：{{this.total}}条</span>
            </el-col>
            <el-col :span="16">
                <Page  :current="13" style="float:right"></Page>
            </el-col>
        </el-row>
    </div>
</template>


<style lang="less" scoped>
.projectOut {
    position: relative;
    width: 100%;
    height: 650px;
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
            total: 1,
            input: '',
            currentIndex: 1,
            sortList: [
                { sorts: "项目类型：" },
                { sorts: "全部" },
                { sorts: "PE" },
                { sorts: "VE" },
                { sorts: "定增" }
            ],
            tableData: [
                {
                    project: 'AAAAA项目',
                    manager: '',
                    industry: '',
                    sort: '',
                    investDate: '',
                    investment: '',
                    withdrawingDate: '',
                    withdrawingMode: '',
                    exitReturn: '',
                    yieldRate: ''
                }
            ],
            // total: this.tableData.length
        }
    },
    methods: {
        handleIconClick(ev) {
            console.log(ev);
        },
        changeActive(index) {
            this.currentIndex = index;
        }
    }
}
</script>