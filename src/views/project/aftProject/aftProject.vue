<template>
    <div class="preContent">
        <!-- 类型ul -->
        <el-row class="common">
            <el-col :span="2">
                <div class="tag">项目类型：</div>
            </el-col>
            <el-col :span="22" style="margin-top:20px">
                <div class="sort-ul">
                    <ul ref="sort">
                        <li v-for="(item,index) in sortList" :key="item.index" :class="{active: index==currentIndex}" @click="changeActive(index)">
                            {{item.sorts}}
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
                <el-table :data="tableData" style="width:100%" max-height="700" class="table-item" :row-class-name="tableRowClassName">
                    <el-table-column label="项目名称" align="center">
                        <template scope="scope">
                            <a class="project" @click="ShowPreMessage(scope.row,scope.$index)">{{ scope.row.project }}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mananger" label="项目创建人" align="center">
                    </el-table-column>
                    <el-table-column prop="industry" label="所属行业" align="center">
                    </el-table-column>
                    <el-table-column prop="sort" label="项目类型" align="center">
                    </el-table-column>
                    <el-table-column prop="investingDate" label="投资日期" align="center">
                    </el-table-column>
                    <el-table-column prop="investment" label="投资金额（元）" align="center">
                    </el-table-column>
                    <el-table-column prop="state" label="状态" align="center">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row type="flex" align="bottom" class="foot">
            <el-col :span="8">
                <span>总记录：{{this.total}}条</span>
            </el-col>
            <el-col :span="16">
                <Page :total="128" :current="13" style="float:right"></Page>
            </el-col>
        </el-row>
    </div>
</template>


<style lang="less" scoped>
.preContent {
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

.foot {
    margin: 25px 30px 0 30px; //  position: absolute;
    // left: 30px;
    // bottom: 20px;
}
</style>


<script>
export default {
    data() {
        return {
            total: 128,
            input: '',
            currentIndex: 0,
            sortList: [
                { sorts: "全部" },
                { sorts: "天使" },
                { sorts: "并购重组" },
                { sorts: "PE" },
                { sorts: "VC" }
            ],
            tableData: [
                {
                    project: '京东',
                    mananger: '刘经理',
                    industry: '房地产',
                    sort: 'PE',
                    investingDate: '2017-09-08',
                    investment: '',
                    state: '',
                    id: 0
                },
                {
                    project: '一号店',
                    mananger: '王经理',
                    industry: '旅游',
                    sort: 'VC',
                    investingDate: '2017-09-08',
                    investment: '',
                    state: '',
                    id: 1
                },
                {
                    project: '飞志',
                    mananger: '张经理',
                    industry: '外汇',
                    sort: '天使',
                    investingDate: '2017-09-08',
                    investment: '',
                    state: '',
                    id: 2
                }
            ]
        }
    },
    methods: {
        handleIconClick(ev) {
            console.log(ev);
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
            this.addTab('投后' + title.project + '详情页', '/home/aftProjectMessage/' + ind, 'aftProjectMessage/' + ind);
            this.$router.push({ name: 'aftProjectMessage', params: { userId: ind } });
        },
        addTab(th, url, name) {
            this.$store.commit({ type: 'addTab', title: th, url: url, name: name });
        },
        changeActive(index) {
            this.currentIndex = index;

        }
    }
}
</script>
