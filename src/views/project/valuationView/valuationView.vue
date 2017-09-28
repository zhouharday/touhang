<template>
    <section class="valueView">
        <!-- 状态ul -->
        <my-filter :chooseInfo="stateList"></my-filter>
        <!--搜索框 -->
        <el-row class="search-box">
            <el-col :span="6">
                <el-input icon="search" v-model="projectName" :on-icon-click="handleIconClick">
                </el-input>
            </el-col>
        </el-row>
        <!--项目table -->
        <el-table :data="tableData" style="width:100%" max-height="700" class="table-item">
            <el-table-column prop="project" label="项目名称" align="center">
            </el-table-column>
            <el-table-column prop="valuationParameter" label="估值参数" align="center">
            </el-table-column>
            <el-table-column prop="valuation" label="估值（元）" align="center">
            </el-table-column>
            <el-table-column prop="valuationDate" label="估值日期" align="center">
            </el-table-column>
            <el-table-column prop="valuationOfficer" label="估值人员" align="center">
            </el-table-column>
            <el-table-column prop="state" label="状态" align="center">
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
        </div>
    </section>
</template>

<script>
import myFilter from 'components/myFilter'
import { getProjectBySelect } from 'api/project';
export default {
    data() {
        return {
            total: 0,
            page: 1,
            pageSize: 5,
            projectName: '',
            currentIndex: 0,
            stateList: { //筛选选项
               title: '状态：',
               details: [{
                    dicName: '全部'
                }, {
                    dicName: '未估值'
                }, {
                    dicName: '已估值'
                }]
            },
            tableData: [
                {
                    project: 'AAAAAAAA',
                    valuationParameter: '市净率1000*20*5%',
                    valuation: '',
                    valuationDate: '',
                    valuationOfficer: '',
                    state: ''
                }
            ]
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

            if (appraisementStatus == '全部') appraisementStatus = '';

            let params = {
                projectName: this.projectName,
                page: this.page,
                pageSize: this.pageSize
            };

            getProjectBySelect(params).then(resp => {
                let result = resp.data.result;
                this.tableData = result.data || [];
                this.total = result.total || [];
            }).catch(e => {
                console.log('getProjectBySelect() exists error: ', e);
            });
        },
        pageChanged(page) {
            this.page = page;
            this.getDatas();
        },
        pageSizeChanged(pageSize) {
            console.log('pageSize: ', pageSize);
        },
        handleIconClick(ev) {
            // console.log(ev);
            this.getDatas();
        },
        changeActive(index, item) {
            this.currentIndex = index;
            console.log(item);
            this.appraisementStatus = item.state;
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
