<template>
    <div class="preContent">
        <!-- 阶段ul -->
        <el-row class="common">
            <el-col :span="24" style="margin-top:20px">
                <div class="state-ul">
                    <ul ref="state">
                        <li v-for="(item,index) in stageList" 
                            :key="item.index" 
                            :class="{active: index==currentIndex1,fow: index==0}"
                            @click="changeActive(index,1)">
                            {{item.stages}}
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <!-- 类型ul -->
        <el-row class="common">
            <el-col :span="24">
                <div class="industry-ul">
                    <ul ref="industry">
                        <li v-for="(item,index) in sortList" 
                            :key="item.index" 
                            :class="{active: index==currentIndex2,fow: index==0}"
                            @click="changeActive(index,2)">
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
           <el-col :span="19" class="imdo">
               <div class="importProject">
                   <el-upload class="upload-demo" ref="upload"
                        action="" :auto-upload="false">
                        <el-button type="text">导入</el-button>    
                   </el-upload>   
                   <a href="/static/img/templet.txt" download="xxxxx模板">下载模板</a>  
               </div>   
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
                    <el-table-column prop="mananger" label="项目负责人" align="center">
                    </el-table-column>
                    <el-table-column prop="industry" label="所属行业" align="center">
                    </el-table-column>
                    <el-table-column prop="sort" label="项目类型" align="center">
                    </el-table-column>
                    <el-table-column prop="stage" label="项目阶段" align="center">
                    </el-table-column>
                    <el-table-column label="操作" min-width="100" align="center">
                            <template scope="scope">
                                <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index,tableData)">
                                    删除
                                </el-button>
                            </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row type="flex"  align="bottom" class="foot">
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
    .imdo {
        height:30px;
        display: flex;
        justify-content: flex-end;  
        .importProject {
            width: 115px;
            height: 100%;
            position: relative;
            a {
                position: absolute;
                bottom: 3px;
                left: 55px;
                color: #F05E5E;
                border-bottom: 1px solid #F05E5E;
            }
        }
    }
}

.project {
    color: #F05E5E;
    border-bottom: 1px solid #F05E5E;
}
.foot {
    margin: 25px 30px 0 30px
    //  position: absolute;
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
            currentIndex1: 1,
            currentIndex2: 1,
            stageList: [
                { stages: "项目阶段：" },
                { stages: "全部" },
                { stages: "考察储备" },
                { stages: "立项会" },
                { stages: "尽职调查" },
                { stages: "投决会" },
                { stages: "管理" },
                { stages: "项目退出" }
            ],
            sortList: [
                { sorts: "项目类型：" },
                { sorts: "全部" },
                { sorts: "PE" },
                { sorts: "VE" },
                { sorts: "定增" }
            ],
            tableData: [
                {
                    project: '京东',
                    mananger: '刘经理',
                    industry: '房地产',
                    sort: 'PE',
                    stage: '立项会',
                    id: 0
                },
                {
                    project: '一号店',
                    mananger: '王经理',
                    industry: '旅游',
                    sort: 'VE',
                    stage: '管理',
                    id: 1
                },
                {
                    project: '飞志',
                    mananger: '张经理',
                    industry: '外汇',
                    sort: 'PE',
                    stage: '投决会',
                    id: 2
                },
                {
                    project: '博奥',
                    mananger: '刘经理',
                    industry: '基金',
                    sort: 'PE',
                    stage: '尽职调查',
                    id: 3
                },
                {
                    project: '起亚',
                    mananger: '刘经理',
                    industry: '房地产',
                    sort: '定增',
                    stage: '考察储备',
                    id: 4
                },
                {
                    project: '中国石油',
                    mananger: '王经理',
                    industry: '石油',
                    sort: 'VE',
                    stage: '项目退出',
                    id: 4
                },
                {
                    project: '欧利',
                    mananger: '张经理',
                    industry: '外汇',
                    sort: '定增',
                    stage: '投决会',
                    id: 6
                },
                {
                    project: '上上墅',
                    mananger: '张经理',
                    industry: '房地产',
                    sort: '定增',
                    stage: '尽职调查',
                    id: 7
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
        ShowPreMessage(title,ind) {
            this.index = ind;
            this.addTab( title.project + '详情页', '/home/preProjectMessage/'+ind, '/home/preProjectMessage/'+ind );
            this.$router.push({ name: 'preProjectMessage', params: { userId: ind } });
        },
        addTab(th, url, name) {
            this.$store.commit({ type: 'addTab', title: th, url: url, name: name });
        },
        deleteRow(index,rows) {
           rows.splice(index,1);
        },
        changeActive(index,ind) {
            if(ind==1) {
                 this.currentIndex1=index;
            } else {
                this.currentIndex2=index;
            }
        }
    }
}
</script>