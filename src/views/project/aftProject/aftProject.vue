<template>
    <section class="aftProject">
        <!-- 类型ul -->
        <my-filter :chooseInfo="projectType" @getIdInfo="clickType"></my-filter>
        <!--搜索框 -->
        <el-row class="search-box">
            <el-col :span="6">
                <el-input icon="search" v-model="projectName" @keyup.enter.native="getDatas" :on-icon-click="handleIconClick" placeholder="关键字：项目名称">
                </el-input>
            </el-col>
        </el-row>
        <!--项目table -->
        <div class="tableBox">
            <el-table :data="tableData" style="width:100%" max-height="700" class="table-item" :row-class-name="tableRowClassName">
                <el-table-column label="项目名称" align="center">
                    <template scope="scope">
                        <a class="project" @click="ShowPreMessage(scope.row.projectId, scope.row.id, scope.row.projectName, scope.$index)">{{ scope.row.projectName }}</a>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="mananger" label="项目创建人" align="center">
                </el-table-column> -->
                <el-table-column prop="industry" label="所属行业" align="center">
                </el-table-column>
                <el-table-column prop="projectType" label="项目类型" align="center">
                </el-table-column>
                <el-table-column prop="payDate" label="投资日期" align="center">
                </el-table-column>
                <el-table-column prop="paySumAmount" label="投资金额（元）" align="center">
                </el-table-column>
                <el-table-column prop="warnStatus" label="状态" align="center">
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[2, 3, 5, 10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDicChildrenII } from 'common/js/dictionary'
import myFilter from 'components/myFilter'
import { getAfters } from 'api/projectAfter';
export default {
    computed: mapGetters({
        typeOptionsII:'getTypeOptionsII',       // 获取项目类型
    }),
    data() {
        return {
            total: 0,
            page: 1,
            pageSize: 5,
            projectName: '',
            currentIndex: 0,
            projectTypeId: '',
            projectType:{
                title: '项目类型：',
                details: []
            },
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
        this.$store.dispatch('getTypeOptionsII').then(() => {
            this.projectType.details = this.typeOptionsII
        });
        this.init();
    },
    watch: {
        '$route'(to, from) {
            this.init();
        }
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

            let params = {
                merchantId: this.merchantId,
                projectName: this.projectName,
                projectTypeId: this.projectTypeId,
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
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.getDatas();
        },
        handleCurrentChange(page) {
            this.page = page;
            this.getDatas();
        },
        clickType(index, id) {
            this.projectTypeId = index == 0 ? '' : id;
            this.getDatas();
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
        ShowPreMessage(projectId, investProjectId, title, idx) {
            this.addTab('投后项目-' + title, '/home/aftProjectMessage/' + projectId + '/' + investProjectId, 'aftProjectMessage/' + projectId + '/' + investProjectId);
            this.$router.push({ name: 'aftProjectMessage', params: { projectId: projectId, investProjectId: investProjectId } });
        },
        addTab(th, url, name) {
            this.$store.commit({ type: 'addTab', title: th, url: url, name: name });
        },
        changeActive(index, item) {
            this.currentIndex = index;
            this.projectTypeId = item.sorts;
            this.getDatas();
        }
    },
    components: {
        myFilter
    }
}
</script>


<style lang="less" scoped>
.aftProject {
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
