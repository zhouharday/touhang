<template>
    <div class="addProject">
        <div class="addProjectContentf"  v-show="isShow"> 
            <section class="searchAddProject">
                <el-row  class="inputSearch" type="flex" justify="center" align="middle">
                    <el-col :span="12">
                        <el-input v-model="input" placeholder="百度"></el-input> 
                    </el-col>
                    <el-col :span="4">
                        <div>
                            <img src="/static/img/icon-search.png" style="width:40px;height:40px">
                        </div>
                    </el-col>
                </el-row>

                <el-row  class="text" >
                    <el-col :span="5">
                        <p>根据词条搜索到以下<span>{{this.dataNum}}</span>条内容</p>
                    </el-col>
                    <el-col :span="6">
                            <span @click="changeAdd">新增项目</span>
                    </el-col>
                </el-row>

                <el-row  class="dataList" type="flex" justify="space-around">
                    <el-col :span="6" class="dataBox" align="center"
                            v-for="(item,index) in dataList" 
                            :key="item.index">
                        <el-card :body-style="{ padding: '10px'}">
                            <h3>{{item.company}}</h3>
                            <p>{{item.intro}}</p>
                            <el-button type="danger">+项目池</el-button>
                        </el-card>    
                    </el-col>
                </el-row>
            </section> 
        </div>
        <div class="addProjectContents" v-show="isHide">   
           <section class="editAddProject">
              <h3>新增项目</h3>
              <div class="addForm">
                  <div class="basicForm">
                     <el-form ref="form" :model="basicForm" label-width="120px">
                        <el-row>
                            <el-col :span="24" class="title">
                                <div>基本信息</div>
                            </el-col>
                            <el-col :span="12">
                            <el-form-item label="基金名称">
                                <el-input v-model="formDetails.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="基金编号">
                                <el-input v-model="formDetails.number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="基金规模(元)">
                                <el-input v-model="formDetails.scale"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="管理类型">
                                <el-input v-model="formDetails.management"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="组织类型">
                                <el-input v-model="formDetails.type"></el-input>
                            </el-form-item>
                        </el-col>
                        </el-row>     
                     </el-form>    
                  </div>
                  <div class="industryForm"></div>

              </div>
           </section>
        </div>   
    </div>
</template>




<style lang="less" scoped>
.addProject {
    .addProjectContentf {
        width: 100%;
        height: 650px;
        padding: 50px 20px;
        font-size: 14px;
        background: #fff;
        .searchAddProject {
            .inputSearch {
                div {
                    margin-left: 15px;
                    cursor: pointer;
                }
            }
            .text {
                margin: 40px 0 30px 0;
                padding-bottom: 3px;
                border-bottom: 2px solid #F05E5E;
                span {
                    color: #F05E5E;
                    border-bottom: 1px solid #F05E5E;
                    cursor: pointer;
                }
            }
            .dataList {
                .dataBox {
                    h3 {
                        margin: 5px 0;
                    }
                    p {
                        height: 200px;
                        overflow: hidden;
                        padding-bottom: 5px;
                        text-indent: 20px;
                        text-align: left;     
                    }
                }
            }  
        }
    }
   .addProjectContents {
        width: 100%;
        height: 650px;
        padding: 20px;
        font-size: 14px;
        background: #fff;
       .editAddProject {
           .basicForm {
               .title {
                    width: 100%;
                    height: 42px;
                    line-height: 42px;
                    background: #2a3142;
                    color: #fff;
                    padding: 0 26px;
                    margin-bottom: 12px;
                    display: flex;
               }
           }
        

       }
    }
}

   
</style>



<script>
export default {
    data() {
        return {
            isShow: true,
            isHide: false,
            dataNum: 3,
            dataList: [
                {
                   company: '百度科技有限公司',
                   intro: '全球最大的中文搜索引擎、致力于让网民更便捷地获取信息， 找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。'
                },
                {
                    company: '百度（中国有限公司）',
                    intro: '全球最大的中文搜索引擎、致力于让网民更便捷地获取信息， 找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。'
                },
                {
                    company: '无锡亿佰度餐饮管理服务有限公司',
                    intro: '全球最大的中文搜索引擎、致力于让网民更便捷地获取信息， 找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。'
                }
            ]  
        }
    },
    methods: {
        changeAdd() {
            this.isShow=false;
            this.isHide=true;
        }
    }
}
</script>