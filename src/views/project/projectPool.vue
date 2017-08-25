<template>
    <div class="poolContent">
        <!-- 状态ul -->
        <el-row class="common">
            <el-col :span="24" style="margin-top:20px">
                <div class="state-ul">
                    <ul v-for="(item,index) in stateList" :key="item.index">
                        <li :class="{bag: index == 1,fow: index==0}">{{item.states}}</li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <!-- 行业ul -->
        <el-row class="common">
            <el-col :span="24">
                <div class="industry-ul">
                    <ul v-for="(item,index) in industryList" :key="item.index">
                        <li :class="{bag: index == 1,fow: index==0}">{{item.details}}</li>
                    </ul>
                    <button class="collapse-btn" @click="changeList">
                        <span :class="btnObject"></span>
                        {{collapseBtn1}}
                    </button>
                </div>
            </el-col>
        </el-row>
        <!--搜索框 -->
        <el-row class="search-box">
           <el-col :span="4">
               <el-input icon="search" v-model="input" :on-icon-click="handleIconClick">
               </el-input>
           </el-col> 
        </el-row>
        <!--项目table -->
        <el-row class="common">
            <el-col :span="24">
                <el-table :data="tableData" style="width:100%" max-height="700" class="table-item" :row-class-name="tableRowClassName">
                    <el-table-column label="项目名称" min-width="100">
                            <template scope="scope">
                                <a @click=" ShowMessagwe(scope.row,scope.$index)" class="theme">{{ scope.row.theme }}</a>
                                <div>{{ scope.row.project }}</div>
                            </template>
                    </el-table-column>
                    <el-table-column label="项目负责人" align="center">
                    </el-table-column>
                    <el-table-column label="所属行业" align="center">
                    </el-table-column>
                    <el-table-column label="项目类型" align="center">
                    </el-table-column>
                    <el-table-column label="项目阶段" align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button size="small">
                                    转项目池
                                </el-button>
                                <el-button size="small">
                                    删除
                                </el-button>
                            </template>
                    </el-table-column>
                </el-table>
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
        }
    }
}
.fow {
    font-weight: bold;
}
.bag {
    width: 45px;
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
}
.search {
    border-radius: 15px;
}
</style>




<script>
export default {
    data() {
        return {
            input: '',
            collapseBtn1: '收起',
            collapseBtn2: '下拉',
            index: 0,
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
        }
    }
}
</script>