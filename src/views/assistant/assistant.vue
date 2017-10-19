<template>
    <section class="assistantContent">
        <!-- 这是领投助手内容 -->
        <!--搜索框-->
        <el-row class="search-box">
            <el-col :span="10" class="search">
                <el-input placeholder="请按项目名称进行查询" icon="search" v-model="name" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
                </el-input>
            </el-col>
        </el-row>
        <!--行业ul-->
        <el-row class="common">
            <el-col :span="1">
                <div class="tag_s">行业：</div>
            </el-col>
            <el-col :span="23">
                <div class="industry-ul">
                    <ul ref="industry" :class="{ changeList: btnObject1.uptriangle }">
                        <li v-for="(item,index) in industryList" :label="item.dicName" :value="item.id" :key="item.id" :class="{active: index==currentIndex1}" @click="changeActive(index,1,item)">
                            {{item.dicName}}
                        </li>
                        <button class="collapse-btn" :class="{ collapseBtn: !btnObject1.uptriangle }" @click="changeList(1)">
                            <span :class="btnObject1"></span>
                            {{collapseBtn1}}
                        </button>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <!--轮次ul -->
        <el-row class="common">
            <el-col :span="1">
                <div class="tag_s">轮次：</div>
            </el-col>
            <el-col :span="23">
                <div class="round-ul">
                    <ul ref="round">
                        <li v-for="(item,index) in roundList" :label="item.dicName" :value="item.id" :key="item.id" :class="{active: index==currentIndex2}" @click="changeActive(index,2,item)">
                            {{item.dicName}}
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <!--所在地ul-->
        <!-- <div class="common"> -->
        <el-row class="common">
            <el-col :span="1">
                <div class="tag_s">所在地：</div>
            </el-col>
            <el-col :span="23">
                <div class="location-ul">
                    <ul ref="location" :class="{ changeList: !btnObject2.downtriangle }" style="width:100%;">
                        <li v-for="(item,index) in locationList" :label="item.dicName" :value="item.id" :key="item.id" :class="{active: index==currentIndex3}" @click="changeActive(index,3,item)">
                            {{item.dicName}}
                        </li>
                        <button :class="{ collapseBtnk: !btnObject2.downtriangle }" class="collapse-btn" @click="changeList(2)">
                            <span :class="btnObject2"></span>
                            {{collapseBtn2}}
                        </button>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <!-- </div> -->
        <!--搜索结果-->
        <el-row class="common">
            <el-col :span="24">
                <div>
                    <p>共搜索到
                        <span>{{page.total}}</span>
                        个结果
                    </p>
                </div>
            </el-col>
        </el-row>
        <!--项目table -->
        <el-row class="common">
            <el-col :span="24">
                <el-table border :data="tableData" style="width:100%" max-height="700" class="table-item" :row-class-name="tableRowClassName">
                    <el-table-column label="项目" min-width="100">
                        <template scope="scope">
                            <a @click="ShowMessagwe(scope.row,scope.$index)" class="theme">{{ scope.row.name }}</a>
                            <div>{{ scope.row.brief }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="行业" align="center">
                        <template scope="scope">
                            <div class="fow">{{ scope.row.industryName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="轮次" align="center">
                        <template scope="scope">
                            <div class="fow">{{ scope.row.phaseName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="所在地" align="center">
                        <template scope="scope">
                            <div class="fow">{{ scope.row.cityStr }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="成立时间" align="center">
                        <template scope="scope">
                            <div class="fow">{{ scope.row.foundingTime }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template scope="scope">
                            <el-button type="text" size="small" @click="insertProjectBtn(scope.$index,scope.row)">
                                +项目池
                            </el-button>
                            <el-button type="danger" size="small" style="display:none">
                                分享
                            </el-button>
                            <!-- 确认转项目池 dialog -->
                            <el-dialog title="转项目池" :visible.sync="dialogVisible" size="tiny">
                                <span>确认将该项目转入项目池？</span>
                                <span slot="footer" class="dialog-footer">
                                    <el-button type="default"  @click="dialogVisible=false">取 消</el-button>
                                    <el-button type="danger"  @click="jumpPool">确 定</el-button>
                                </span>
                            </el-dialog>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import { selectMenu } from 'api/cloudProject'
export default {
    computed: {
        user() {
            this.$store.state.login.merchants = JSON.parse(sessionStorage.getItem('merchants')) || {};
            this.$store.state.login.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
            return {
                merchants: this.$store.state.login.merchants,
                userInfor: this.$store.state.login.userInfor
            }
        }
    },
    created() {
        selectMenu(this.num).then((res) => {
            if (res.status == '200') {
                this.industryList = res.data.result;
                console.log(res.data.result);
            }
        });
        this.location();
        this.rounds();
        this.selectCompany();
    },
    mounted() {
        this.$nextTick(function() {
            //dom已更新
            // console.log(this.$refs.industry.style.width);
        })
    },
    data() {
        return {
            name: '',
            industry: '',
            phase: '',
            citystr: '',
            pages: 1, //当前页码
            pageSize: 10, //每页条数
            row: '',
            no: '',
            num: 1, // 数据字典传值
            confirm: false,
            dialogVisible: false,
            search: '',
            collapseBtn1: '下拉',
            collapseBtn2: '下拉',
            currentIndex1: '',
            currentIndex2: '',
            currentIndex3: '',
            page: {
                pageNum: '', //当前页码
                total: '', //数据总数
                pageSize: '', //每页条数
                navigatepageNums: '', //页数
                current: '', //当前页码
            },
            btnObject1: {
                uptriangle: true,
                downtriangle: false
            },
            btnObject2: {
                uptriangle: true,
                downtriangle: false
            },
            industryList: [], //行业数据
            roundList: [], //轮次数据
            locationList: [], //所在地数据
            tableData: [], //云项目列表数据
        }
    },
    methods: {
        handleIconClick() { //搜索
            // alert(11);
            this.selectCompany();
            this.search = '';
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
                // alert(555);
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
        ShowMessagwe(row, ind) { //项目详情Tab
            console.log(row);
            this.index = ind;
            this.$store.state.register.no = row.no;
            this.addTab(row.name + '详情页', '/home/message/' + row.id, 'message/' + row.id);
            this.$router.push({ name: 'message', params: { userId: row.id } });
        },
        addTab(th, url, name) {
            this.$store.commit({ type: 'addTab', title: th, url: url, name: name });
        },
        changeActive(index, ind, item) { //按条件查询
        // console.log(ind);
        console.log(index);
            if(item.id == '0'){
                console.log('全部');
                this.industry = '';
                this.phase = '';
                this.citystr = '';
                this.currentIndex1 = index;
                this.currentIndex2 = index;
                this.currentIndex3 = index;
                this.selectCompany();
                return;
            };
            if (ind == 1 && item.id!= '0') { //行业
                this.industry = item.id;
                this.selectCompany();
                console.log(item);
                this.currentIndex1 = index;
                return;
            } else if (ind == 2 && item.id!= '0') { //轮次
                this.phase = item.id;
                this.selectCompany();
                console.log(item);
                this.currentIndex2 = index;
                // this.currentIndex1 = '';
                // this.currentIndex3 = '';
                return;
            } else if (ind == 3 && item.id!= '0') { //所在地
                console.log(item);
                this.citystr = item.id;
                this.selectCompany();
                this.currentIndex3 = index;
                // this.currentIndex1 = '';
                // this.currentIndex2 = '';
                return;
            }
        },
        insertProjectBtn(index, row) {
            console.log(row);
            this.row = row;
            this.no = row.no;
            this.dialogVisible = true;
        },
        jumpPool() {
            this.insertProjectPool();
            this.dialogVisible = false;
        },
        insertProjectPool() { //添加到项目池 api
            this.$http.post(this.api + '/productClieController/insertProjectPool', {
                no: this.no,
                userId: this.user.userInfor.id,
                merchantId: this.user.merchants[0].id
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {
                            console.log(res.data.result);
                            this.addTab('项目池', '/home/projectPool', 'projectPool');
                            this.$router.push({ name: 'projectPool' });
                            this.$Message.success(res.data.message);
                        } else if (res.data.status == '403') {
                            this.$Message.error(res.data.message);
                            return;
                        } else if (res.data.status == '9050') {
                            this.$Message.error(res.data.message);
                            return;
                        } else if (res.data.status == '9010') {
                            this.$Message.error(res.data.message);
                            return;
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error('请求超时');
                    return;
                })
        },
        selectCompany() { //查询云项目列表数据 api
            this.$http.post(this.api + '/CompanyClieController/selectCompany', {
                "name": this.name, //根据项目名模糊查询
                "industry": this.industry,  //按照行业查询
                "phase": this.phase,  //按照轮次查询
                "city": this.citystr,  //按照项目所在地查询
                "page": this.pages,  //当前页数
                "pageSize": this.pageSize  //每页显示条数
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {
                            console.log(res.data);
                            this.tableData = res.data.result.list;
                            this.page.pageNum = res.data.result.pageNum; //当前页码
                            this.page.total = res.data.result.total; //数据总数
                            this.page.pageSize = res.data.result.pageSize; //每页条数
                            this.page.navigatepageNums = res.data.result.navigatepageNums.length; //页数长度
                            this.$Message.success(res.data.message);
                            return;
                        } else if (res.data.status == '403') {
                            this.$Message.error(res.data.message);
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error("请求超时");
                })
        },
        handleSizeChange(pageSize) { //每页条数切换
            console.log(pageSize);
            this.pageSize = pageSize;
            this.selectCompany();
        },
        handleCurrentChange(pages) { //获取tabList 分页数据
            // console.log(pages);
            this.pages = pages;
            this.selectCompany();
        },
        location() { //查询省份数据
            this.$http.post(this.api + '/dictionaryController/select2Menu', { //数据字典=>省份
                "dicParent": 501,
                identification: 'a'
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {
                            console.log(res.data.result);
                            this.locationList = res.data.result;
                            this.$Message.success(res.data.message);
                        } else if (res.data.status == '403') {
                            this.$Message.error(res.data.message);
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error('访问超时');
                });
        },
        rounds() { //查询轮次数据
            this.$http.post(this.api + '/dictionaryController/select2Menu', { //数据字典=>省份
                "dicParent": 2,
                identification: 'a'
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {
                            this.roundList = res.data.result;
                            console.log(res.data.result);
                        } else if (res.data.status == '403') {
                            this.$Message.error(res.data.message);
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error('访问超时');
                });
        },
    }
}
</script>

<style lang="less" scoped>
.assistantContent {
    width: 100%;
    min-height: 100%;
    position: relative;
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
            // width:84px;
            // width:95px;
            height: 20px;
            display: inline-block;
            box-sizing: border-box;
            margin-right: 30px;
            margin-bottom: 5px;
            cursor: pointer;
        }
    }
}

.changeList {
    position: relative;
    height: 20px;
    overflow: hidden;
}

.collapseBtn {
    position: absolute;
    right: 0;
    top: 0;
}

.changeListk {
    position: relative;
}

.collapseBtnk {
    position: absolute;
    bottom: 5px;
}

.tag_s {
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: bold;
}

.active {
    height: 20px;
    color: white;
    text-align: center;
    border-radius: 15px;
    background: #F05E5E;
    padding: 0 5px;
}

.collapse-btn {
    width: 50px;
    color: #F05E5E;
    border: none;
    outline: none;
    background: #fff;
    position: absolute;
    right: 0;
    top: 0;
}

.uptriangle {
    display: inline-block;
    position: relative;
    bottom: 2px;
    // top: 3px;
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
    font-size: 20px;
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

.fow {
    font-weight: bold;
}

.back {
    background: #fff;
}

.page {
    width: 100%;
    text-align: right;
    padding: 15px 30px;
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>
