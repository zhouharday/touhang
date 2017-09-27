<template>
    <div class="aftProject">
        <!-- 类型ul -->
        <el-row class="common">
            <el-col :span="2">
                <div class="tag">项目类型：</div>
            </el-col>
            <el-col :span="22" style="margin-top:20px">
                <div class="sort-ul">
                    <ul ref="sort">
                        <li v-for="(item,index) in sortList" :key="item.index" :class="{active: index==currentIndex}" @click="changeActive(index, item)">
                            {{item.sorts}}
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
                <el-table :data="tableData" style="width:100%" max-height="700" class="table-item" :row-class-name="tableRowClassName">
                    <el-table-column label="项目名称" align="center">
                        <template scope="scope">
                            <a class="project" @click="ShowPreMessage(scope.row,scope.$index)">{{ scope.row.projectName }}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mananger" label="项目创建人" align="center">
                    </el-table-column>
                    <el-table-column prop="industryId" label="所属行业" align="center">
                    </el-table-column>
                    <el-table-column prop="projectTypeId" label="项目类型" align="center">
                    </el-table-column>
                    <el-table-column prop="payDate" label="投资日期" align="center">
                    </el-table-column>
                    <el-table-column prop="paySumAmount" label="投资金额（元）" align="center">
                    </el-table-column>
                    <el-table-column prop="warnStatus" label="状态" align="center">
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
import { getAfters } from 'api/projectAfter';
export default {
    data() {
        return {
            input: '',
            total: 0,
            page: 1,
            pageSize: 5,
            projectName: '',
            currentIndex: 0,
            sortList: [
                { sorts: "全部" },
                { sorts: "天使" },
                { sorts: "并购重组" },
                { sorts: "PE" },
                { sorts: "VC" }
            ],
            tableData: [{
                project: '京东',
                mananger: '刘经理',
                industry: '房地产',
                sort: 'PE',
                investingDate: '2017-09-08',
                investment: '',
                state: '',
                id: 0
            }]
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.initInfo();
            this.getDatas();
        },
        initInfo() {
            let merchants = JSON.parse(window.sessionStorage.getItem('merchants') || '[]');
            let info = JSON.parse(sessionStorage.getItem('userInfor') || '{}');
            this.merchantId = merchants[0].id;
            this.addProjectUserId = info.id;
        },
        getDatas() {
            let projectTypeId = this.projectTypeId;
            if (projectTypeId == '全部') projectTypeId = '';

            let params = {
                merchantId: this.merchantId,
                projectName: this.projectName,
                projectTypeId: projectTypeId,
                page: this.page,
                pageSize: this.pageSize
            };

            getAfters(params).then(resp => {
                let data = resp.data;
                let result = data.result;
                let list = result.list;
                this.tableData = list;
                this.total = result.total;
            }).catch(e => {
                console.log('getPres exists error: ', e);
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
        // 设置table间隔行的background-color
        tableRowClassName(row, index) {
            if ((index % 2) == 0) {
                return 'info-row';
            } else {
                return 'positive-row';
            }
            return '';
        },
        ShowPreMessage(title, ind) {
            this.index = ind;
            this.addTab('投后' + title.projectName + '详情页', '/home/aftProjectMessage/' + ind, 'aftProjectMessage/' + ind);
            this.$router.push({ name: 'aftProjectMessage', params: { userId: title.id } });
        },
        addTab(th, url, name) {
            this.$store.commit({ type: 'addTab', title: th, url: url, name: name });
        },
        changeActive(index, item) {
            this.currentIndex = index;
            this.projectTypeId = item.sorts;
            this.getDatas();
        }
    }
}

</script>
<style lang="less" scoped>
.aftProject {
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

.tag {
    margin-top: 20px;
    margin-bottom: 5px;
    font-size: 14px;
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
