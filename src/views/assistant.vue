<template>
    <section class="assistantContent">
        <!-- 这是领投助手内容 -->
        <el-row class="search-box">
            <el-col :span="10" class="search">
                <el-input 
                   placeholder="请选择日期" 
                   icon="search" 
                   v-model="input" 
                   :on-icon-click="handleIconClick">
                </el-input>
            </el-col>
        </el-row>
           

        <el-row class="common">
            <el-col :span="24">
                <div>
                   <ul v-for="(item,index) in industryList" :key="item.index">
                      <li>{{item.details}}</li>
                   </ul>
                </div>    
            </el-col>
        </el-row>

        <el-row class="common">
            <el-col :span="24">
                <div>
                   <ul v-for="(item,index) in roundList" :key="item.index">
                      <li>{{item.rounds}}</li>
                   </ul>
                </div>    
            </el-col>
        </el-row>

        <el-row class="common">
            <el-col :span="24">
                <div>
                   <ul v-for="(item,index) in locationList" :key="item.index">
                      <li>{{item.locations}}</li>
                   </ul>
                </div>    
            </el-col>
        </el-row>

        <el-row class="common">
           <el-col :span="24">
               <div>
                   <p>共搜索到<span>4</span>个结果</p>
                   <hr/>
               </div>
           </el-col>
        </el-row>
        
        <el-row class="common">
            <el-col :span="24">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="project" label="项目">
                    </el-table-column>
                    <el-table-column prop="industry" label="行业" >
                    </el-table-column>
                    <el-table-column prop="round"  label="轮次" >
                    </el-table-column>
                    <el-table-column prop="location" label="所在地">
                    </el-table-column>
                    <el-table-column prop="datetime" label="成立时间">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                             <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                                +项目池
                             </el-button>
                             
                            <el-button size="small" @click="handleDelete(scope.$index, scope.row)">
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
    height: 700px;
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
    margin: 0 30px 20px 30px;
    ul {
         float: left;
         li {
              margin-right: 40px;
         }
    } 
}  
.common p{
    font-weight: bold;

}
</style>


<script>
export default {
    data() {
        return {
            input: '',
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
                    project: '体育赛事即时竞猜平台',
                    industry:'体育',
                    round:'Pre-A轮',
                    location:'广东省',
                    datetime:'2015/01/16'
                },
                 {
                    project: '美国结算和分类式账本服务商',
                    industry:'金融',
                    round:'B+轮',
                    location:'海外',
                    datetime:'2016/04/21'
                },
                 {
                    project: '中式餐应连锁品牌',
                    industry:'生活消费',
                    round:'Pre-A轮',
                    location:'陕西省',
                    datetime:'2017/02/13'
                },
                 {
                    project: '双语学前教育连锁机构',
                    industry:'教育',
                    round:'A轮',
                    location:'山东省',
                    datetime:'2014/06/26'
                }
            ]
        }
    },
    methods: {
        handleIconClick(ev) {
            console.log(ev);
        }
    }
}    
</script>

