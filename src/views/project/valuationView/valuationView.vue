<template>
    <div class="valueView">
        <!-- 状态ul -->
        <el-row class="common">
            <el-col :span="1">
                <div class="tag">状态：</div>
            </el-col>
            <el-col :span="23" style="margin-top:20px">
                <div class="state-ul">
                    <ul ref="state">
                        <li v-for="(item,index) in stateList" :key="item.index" :class="{active: index==currentIndex}" @click="changeActive(index)">
                            {{item.state}}
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
            </el-col>
        </el-row>
        <el-row type="flex" align="bottom" class="foot">
            <el-col :span="8">
                <span>总记录：{{total}} 条</span>
            </el-col>
            <el-col :span="16">
                <Page :current="13" style="float:right"></Page>
            </el-col>
        </el-row>
    </div>
</template>


<style lang="less" scoped>
.valueView {
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
    margin: 25px 30px 0 30px;
}
</style>


<script>
export default {
    created() {
        // this.$http.post('api/url',{

        // })
        // .then( res => {
        //     let data = res.data;
        //     if(data.length == 0 ){
        //         this.tatal = 0;
        //     } else if ( data.length != 0 ){
        //         this.total = data.length;
        //     }
        // })
        // .catch( error => {

        // });
        this.total = this.tableData.length
    },
    data() {
        return {
            total: '',
            input: '',
            currentIndex: 0,
            stateList: [
                { state: "全部" },
                { state: "未估值" },
                { state: "已估值" }
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