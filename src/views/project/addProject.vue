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
                    <el-col :span="4">
                        <p>根据词条搜索到以下<span>{{this.dataNum}}</span>条内容</p>
                    </el-col>
                    <el-col :span="3">
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
                            <el-button type="danger" @click="addProject">+项目池</el-button>
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
                     <el-form ref="basicForm" :model="basicForm" label-width="120px">
                        <el-row>
                            <el-col  class="title">
                                <div>基本信息</div>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="*项目名称">
                                    <el-input v-model="basicForm.projectName" required></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="*项目简称">
                                    <el-input v-model="basicForm.shortName" required></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="*项目类型">
                                    <el-input v-model="basicForm.projectSort" required></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="*所属行业">
                                    <el-input v-model="basicForm.industry" required></el-input>
                                </el-form-item>
                            </el-col> 
                             <el-col :span="12">
                                <el-form-item label="项目来源">
                                    <el-input v-model="basicForm.origin"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="所在地">
                                    <el-input v-model="basicForm.location"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="项目负责人">
                                    <el-input v-model="basicForm.manager"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="业务部门">
                                    <el-input v-model="basicForm.department"></el-input>
                                </el-form-item>
                            </el-col>    
                        </el-row>     
                     </el-form>    
                  </div>
                  <div class="companyForm">
                      <el-form ref="form" :model="companyForm" label-width="120px">
                        <el-row>
                            <el-col  class="title">
                                <div>企业信息</div>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="企业名称">
                                    <el-input v-model="companyForm.companyName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="法人代表">
                                    <el-input v-model="companyForm.delegate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="注册资本（元）">
                                    <el-input v-model="companyForm.regCapital"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="实收资本（元）">
                                    <el-input v-model="companyForm.paidCapital"></el-input>
                                </el-form-item>
                            </el-col> 
                             <el-col :span="12">
                                <el-form-item label="注册登记日期">
                                    <!-- <el-input></el-input> -->
                                    <el-date-picker type="date" v-model="companyForm.regDatetime" style="width:100%">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="统一信用代码">
                                    <el-input v-model="companyForm.creditCode"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="注册地址">
                                    <el-input v-model="companyForm.regAddress"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="办公地址">
                                    <el-input v-model="companyForm.workingSite"></el-input>
                                </el-form-item>
                            </el-col>  
                            <el-col>
                                <el-form-item label="主营业务">
                                    <el-input v-model="companyForm.service"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item label="备注">
                                    <el-input v-model="companyForm.remark"></el-input>
                                </el-form-item>
                            </el-col>   
                        </el-row>     
                     </el-form> 
                  </div>
                  <div class="formBtn">
                      <el-row>
                          <el-col style="display:flex;justify-content:flex-end;">
                              <el-button type="danger" @click="submitForm">保存</el-button>
                              <el-button type="danger" @click="cancleForm">取消</el-button>
                          </el-col>    
                      </el-row>    
                  </div>    
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
        height: 800px;
        padding: 20px;
        font-size: 14px;
        background: #fff;
        h3 {
           margin-bottom: 20px;
        }
       .editAddProject {
           .title {
               width: 100%;
               height: 42px;
               line-height: 42px;
               background: #2a3142;
               color: #fff;
               padding: 0 26px;
               margin-bottom: 12px;
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
            basicForm: {
                projectName: '',
                shortName: '',
                projectSort: '',
                industry: '',
                origin: '',
                location: '',
                manager: '',
                department: ''
            },
            companyForm: {
                companyName: '',
                delegate: '',
                regCapital: '',
                paidCapital: '',
                regDatetime: '',
                creditCode: '',
                regAddress: '',
                workingSite: '',
                service: '',
                remark: ''
            },
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
        addProject() {
            this.addTab('未入池项目','/home/wprojectPoolMessage','wprojectPoolMessage');
            this.$router.push({ name:'wprojectPoolMessage' });
        },
        changeAdd() {
            this.isShow=false;
            this.isHide=true;
        },
        submitForm() {
            this.addTab('项目池', '/home/projectPool', 'projectPool');
            this.$router.push({ name: 'projectPool' });
        },
        cancleForm() {
            this.isShow=true;
            this.isHide=false;
        },
        addTab(th, url, name) {
            this.$store.commit({ type: 'addTab', title: th, url: url, name: name });
        },
    }
}
</script>