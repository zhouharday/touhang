<template>
    <section class="assistantContent">
        <!-- 这是领投助手内容 -->
        <!--搜索框-->
            <el-row class="search-box">
                <el-col :span="10" class="search">
                    <el-input placeholder="请输入查找内容" icon="search" v-model="input" :on-icon-click="handleIconClick">
                    </el-input>
                </el-col>
            </el-row>
            <!--行业ul-->
            <el-row class="common">
                <el-col :span="24">
                    <div class="industry-ul">
                        <ul v-for="(item,index) in industryList" :key="item.index">
                            <li :class="{bag: index == 1,fow: index==0}">{{item.details}}</li>
                        </ul>
                        <button class="collapse-btn" @click="changeList(1)">
                            <span :class="btnObject1"></span>
                            {{collapseBtn1}}
                        </button>
                    </div>
                </el-col>
            </el-row>
            <!--轮次ul -->
            <el-row class="common">
                <el-col :span="24">
                    <div class="round-ul">
                        <ul v-for="(item,index) in roundList" :key="item.index">
                            <li :class="{bag: index == 1,fow: index==0}">{{item.rounds}}</li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
            <!--所在地ul-->
            <el-row class="common">
                <el-col :span="24">
                    <div class="location-ul">
                        <ul v-for="(item,index) in locationList" :key="item.index">
                            <li :class="{bag: index == 1,fow: index==0}">{{item.locations}}</li>
                        </ul>
                        <button class="collapse-btn" @click="changeList(2)">
                            <span :class="btnObject2"></span>
                            {{collapseBtn2}}
                        </button>
                    </div>
                </el-col>
            </el-row>
            <!--搜索结果-->
            <el-row class="common">
                <el-col :span="24">
                    <div>
                        <p>共搜索到
                            <span>4</span>
                            个结果
                        </p>
                    </div>
                </el-col>
            </el-row>
            <!--项目table -->
            <el-row class="common">
                <el-col :span="24">
                    <el-table :data="tableData" style="width:100%" max-height="700" class="table-item" :row-class-name="tableRowClassName">
                        <el-table-column label="项目" min-width="100">
                            <template scope="scope">
                                <a @click="ShowMessagwe(scope.row,scope.$index)" class="theme">{{ scope.row.theme }}</a>
                                <div>{{ scope.row.project }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="行业" align="center">
                            <template scope="scope">
                                <div class="fow">{{ scope.row.industry }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="轮次" align="center">
                            <template scope="scope">
                                <div class="fow">{{ scope.row.round }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="所在地" align="center">
                            <template scope="scope">
                                <div class="fow">{{ scope.row.location }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="成立时间" align="center">
                            <template scope="scope">
                                <div class="fow">{{ scope.row.datetime }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button type="text" size="small" @click="jumpPool">
                                    +项目池
                                </el-button>
                                <el-button type="text" size="small" style="display:none">
                                    分享
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
    </section>
</template>




<style lang="less" scoped>
.assistantContent {
    width: 100%;
    height: 650px;
    font-size: 14px;
    background: #fff;
}
.search-box {
    padding: 30px 30px 30px 0;
    .search {
        float: right;
    }
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
.location-ul li.fow {
    margin-right: 15px;
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
.common p {
    font: 20px;
    font-weight: bold;
    padding-bottom: 5px;
    border-bottom: 1px solid #F05E5E;
    span {
        color: #F05E5E;
    }
}
.theme {
    font-size: 16px;
    color: #F05E5E;
    border-bottom: 1px solid #F05E5E;
}
.back {
    background: #fff;
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
            btnObject1: {
                uptriangle: true,
                downtriangle: false
            },
            btnObject2: {
                uptriangle: false,
                downtriangle: true
            },
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
            roundList: [
                { rounds: "轮次：" },
                { rounds: "全部" },
                { rounds: "种子轮" },
                { rounds: "天使轮" },
                { rounds: "Pre-A轮" },
                { rounds: "A轮" },
                { rounds: "A+轮" },
                { rounds: "Pre-B轮" },
                { rounds: "B轮" },
                { rounds: "B+轮" },
                { rounds: "Pre-C轮" },
                { rounds: "C轮" },
                { rounds: "C+轮" },
                { rounds: "E轮及以后" },
            ],
            locationList: [
                { locations: "所在地：" },
                { locations: "全部" },
                { locations: "北京市" },
                { locations: "上海市" },
                { locations: "深圳市" },
                { locations: "广州市" },
                { locations: "杭州市" },
                { locations: "成都市" },
                { locations: "重庆市" },
                { locations: "安徽省" },
                { locations: "甘肃省" },
                { locations: "广东省" },
                { locations: "广西省" },
                { locations: "贵州省" },
                { locations: "海南省" },
            ],
            tableData: [
                {
                    theme: '鹿战',
                    project: '体育赛事即时竞猜平台',
                    industry: '体育',
                    round: 'Pre-A轮',
                    location: '广东省',
                    datetime: '2015/01/16'
                },
                {
                    theme: 'Digital Asset',
                    project: '美国结算和分类式账本服务商',
                    industry: '金融',
                    round: 'B+轮',
                    location: '海外',
                    datetime: '2016/04/21'
                },
                {
                    theme: '小六汤包',
                    project: '中式餐应连锁品牌',
                    industry: '生活消费',
                    round: 'Pre-A轮',
                    location: '陕西省',
                    datetime: '2017/02/13'
                },
                {
                    theme: '智慧熊',
                    project: '双语学前教育连锁机构',
                    industry: '教育',
                    round: 'A轮',
                    location: '山东省',
                    datetime: '2014/06/26'
                }
            ]
        }
    },
    methods: {
        handleIconClick(ev) {
            console.log(ev);
        },
        // 点击折叠按钮，控制列表项的下拉与收起
        changeList(btn) {
            if (btn === 1) {
                if (this.collapseBtn1 == "收起") {
                    this.collapseBtn1 = "下拉";
                    this.btnObject1.uptriangle = !(this.btnObject1.uptriangle);
                    this.btnObject1.downtriangle = !(this.btnObject1.downtriangle);
                } else {
                    this.collapseBtn1 = "收起";
                    this.btnObject1.uptriangle = !(this.btnObject1.uptriangle);
                    this.btnObject1.downtriangle = !(this.btnObject1.downtriangle);
                }
            } else {
                if (this.collapseBtn2 == "下拉") {
                    this.collapseBtn2 = "收起";
                    this.btnObject2.uptriangle = !(this.btnObject2.uptriangle);
                    this.btnObject2.downtriangle = !(this.btnObject2.downtriangle);
                } else {
                    this.collapseBtn2 = "下拉";
                    this.btnObject2.uptriangle = !(this.btnObject2.uptriangle);
                    this.btnObject2.downtriangle = !(this.btnObject2.downtriangle);
                }
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
        ShowMessagwe(title,ind) {
            // alert(1);
            // console.log(ind);
            // console.log(title.theme);
            this.index = ind;
            this.addTab( title.theme + '详情页', '/message/'+ind, 'message/'+ind );
            this.$router.push({ name: 'message', params: { userId: ind } });
            // this.$http.post('${base}./url',{ ind }) //请求详情页list 数据
            // .then( response => {

            // })
            // .catch(function( error ){

            // });
            // this.isShow = false;
            // this.isHide = true;
        },
        jumpPool() {
            this.addTab( '项目池','/home/projectPool','projectPool');
            this.$router.push({ name:'projectPool' });

        },
        addTab(th, url, name) {
            // this.$router.push({ name: 'assistant' });
            // this.$router.push({ name: name });
            this.$store.commit({ type: 'addTab', title: th, url: url, name: name });
        }

    }
}    
</script>

