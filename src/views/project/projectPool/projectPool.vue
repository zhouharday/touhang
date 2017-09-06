<template>
    <div class="poolContent">
        <!-- 状态ul -->
        <el-row class="common">
            <el-col :span="24" style="margin-top:20px">
                <div class="state-ul">
                    <ul ref="state">
                        <li v-for="(item,index) in stateList" 
                            :key="item.index" 
                            :class="{active: index==currentIndex1,fow: index==0}"
                            @click="changeActive(index,1)">
                            {{item.states}}
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <!-- 行业ul -->
        <el-row class="common">
            <el-col :span="24">
                <div class="industry-ul" :class="{ changeList: !btnObject.uptriangle }">
                    <ul ref="industry">
                        <li v-for="(item,index) in industryList" 
                            :key="item.index" 
                            :class="{active: index==currentIndex2,fow: index==0}"
                            @click="changeActive(index,2)">
                            {{item.details}}
                        </li>
                        <button :class="{ collapseBtn: !btnObject.uptriangle }" class="collapse-btn" @click="changeList">
                            <span :class="btnObject"></span>
                            {{collapseBtn1}}
                        </button>
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
           <el-col :span="4" class="addProject">
                <div @click="addProject">
                   <img src="/static/img/icon--添加项目.png">
                   <span>添加项目</span>
               </div>
           </el-col>
        </el-row>
        <!--项目table -->
        <el-row class="common">
            <el-col :span="24">
                <el-table :data="tableData" style="width:100%" max-height="700" class="table-item" :row-class-name="tableRowClassName">
                    <el-table-column label="项目名称" align="center">
                            <template scope="scope">
                                <a class="project" @click="ShowPoolMessage(scope.row,scope.$index)">{{ scope.row.project }}</a>
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
                                <el-button type="text" size="small" @click="jumpPre">
                                    转投资
                                </el-button>
                                <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index,tableData)">
                                    删除
                                </el-button>
                            </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row type="flex"  align="bottom" class="page" >
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
.poolContent {
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

.changeList {
    height: 20px;
    overflow: hidden;
    position: relative;
}

.collapseBtn {
    position: absolute;
    right: 0;
    top: 0;
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

.collapse-btn {
    width: 50px;
    color: #F05E5E;
    border: none;
    outline: none;
    background: #fff;
}

.uptriangle {
    display: inline-block;
    position: relative;
    bottom: 2px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-bottom: 6px solid red;
}

.downtriangle {
    display: inline-block;
    position: relative;
    top: 3px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-top: 6px solid red;
}

.search-box {
    margin-left: 30px;
    margin-bottom: 20px;
    .addProject {
        margin-left: 15px;
        div {
            position: relative;
            color: #F05E5E;
            cursor: pointer;
            span {
              position: absolute;
              top: 2px;
              left: 30px;
              border-bottom: 1px solid #F05E5E;
            }
        }
    }
}

.project {
    color: #F05E5E;
    border-bottom: 1px solid #F05E5E;
}

.page {
    margin: 25px 30px 0 30px;
}
</style>




<script>
export default {
    data() {
        return {
            total: 128,
            input: '',
            collapseBtn1: '收起',
            collapseBtn2: '下拉',
            currentIndex1: 1,
            currentIndex2: 1,
            btnObject: {
                uptriangle: true,
                downtriangle: false
            },
            stateList: [
                { states: "状态：" },
                { states: "全部" },
                { states: "正常" },
                { states: "观察" },
                { states: "中止" },
                { states: "淘汰" }
            ],
            industryList: [
                { details: "行业：" },
                { details: "全部" },
                { details: "电商" },
                { details: "社交" },
                { details: "硬件" },
                { details: "文娱传媒" },
                { details: "信息传输" },
                { details: "软件信息" },
                { details: "金融" },
                { details: "医疗健康" },
                { details: "科技推广" },
                { details: "生活消费" },
                { details: "企业服务" },
                { details: "旅游" },
                { details: "地产" },
                { details: "教育" },
                { details: "公共交通" },
                { details: "物流" },
                { details: "人工智能" },
                { details: "VR/AR" },
                { details: "体育" },
                { details: "农业" },
                { details: "共享经济" },
                { details: "游戏" }
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
                    id: 5
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
        // 点击折叠按钮，控制列表项的下拉与收起
        changeList() {
            if (this.collapseBtn1 == "收起") {
                this.collapseBtn1 = "下拉";
                this.btnObject.uptriangle = !(this.btnObject.uptriangle);
                this.btnObject.downtriangle = !(this.btnObject.downtriangle);
            } else {
                this.collapseBtn1 = "收起";
                this.btnObject.uptriangle = !(this.btnObject.uptriangle);
                this.btnObject.downtriangle = !(this.btnObject.downtriangle);
            }
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
        ShowPoolMessage(title,ind) {
            this.index = ind;
            this.addTab( title.project + '详情页', '/home/zprojectPoolMessage/'+ind, "zprojectPoolMessage"+ind );
            // this.addTab( title.project + '详情页', 'zprojectPoolMessage/'+ind, 'zprojectPoolMessage/'+ind );
            this.$router.push({ name: 'zprojectPoolMessage', params: { userId: ind } });
            // this.$router.push({ path: 'zprojectPoolMessage/'+ind, params: { userId: ind } });
        },
        jumpPre() {
            this.addTab('投前项目','/home/preProject','preProject');
            this.$router.push({ name:'preProject' });
        },
        addProject() {
            this.addTab('添加项目','/home/addProject','addProject');
            this.$router.push({ name:'addProject' });
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