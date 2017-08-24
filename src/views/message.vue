<template>
    <section class="messageContainer"> 
        <!-- 这是详情页{{this.$route.params.userId}} -->
        <div class="messageContent">
           <el-row class="message_top">
              <el-col :span="4" style="margin-right:40px;">
                  <div class="messageBrand">
                  </div>
              </el-col>
              <el-col :span="18">
                  <div class="messageIntro">
                      <div class="introText">
                          <p>鹿战（体育赛事即时竞猜平台）</p>
                          <div>
                               <p>行业：<span>体育</span></p>
                               <p>所在地：<span>深圳</span></p>
                               <p>成立时间：<span>2015</span></p>  
                          </div>
                          <p>公司全称：<span>深圳市天地同舟科技有限责任公司</span></p>
                      </div>
                      <div class="introTable">
                         <p class="table-top">上轮获投</p>
                         <div class="table-bottom">
                              <p class="table-col">Pre-A轮</p>
                              <p>&yen;：<span>数百万</span></p>
                         </div>
                      </div>   
                  </div>
              </el-col>
              <el-col :span="2">
                 <div class="messageBtn" >
                     <el-button type="danger">
                       +项目池
                     </el-button> 
                 </div>   
              </el-col>
           </el-row>

           <el-row class="message_bottom">
               <el-col :span="24"> 
                    <div class="messageTab">
                        <ul>
                            <li>项目介绍</li>
                            <li>融资经历</li>
                            <li>创始团队</li>
                            <li>查看工商信息</li>
                        </ul>
                    </div>
                    <div class="messageText">
                        <div class="message-text">
                          <b>概述</b>
                          <p>DeerWar</p>
                          <b>详细介绍</b>


                        </div>

                    </div>
               </el-col>
           </el-row>
        </div>

    </section>
</template>





<style lang="less" scoped> 
.messageContainer {
    width: 100%;
    min-height: 700px;
    font-size: 14px;
    background: gray;
    .messageContent {
        width: 93%;
        min-height: 600px;
        margin: 20px auto;
        box-sizing: border-box;
        .message_top {
            position: relative;
            height: 200px;
            margin-bottom: 15px;
            color: #fff;
            .messageBrand {
                // width: 75%;
                width: 120px;
                height: 120px;
                border: 1px solid  #F05E5E;
                border-radius: 5px;
            }
            .messageIntro {
                width: 450px;
                .introText {
                    >p {
                        margin-bottom: 10px;
                    }
                    div {
                        margin-bottom: 10px;
                        p {
                            display: inline;
                            margin-right: 30px;
                        }
                    }
                }
                .introTable {
                    width: 300px;
                    height: 105px;
                    border: 1px solid #fff;
                    border-radius: 5px;
                    .table-top {
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        border-bottom: 1px solid #fff;
                    }
                    .table-bottom {
                        height: 73px;
                        p { 
                            float: left;
                            width: 50%;
                            text-align: center;
                            line-height: 73px;
                        }
                        .table-col {
                             border-right: 1px solid #fff;
                        }
                    }
                }
            }
            .messageBtn {
                position: absolute;
                bottom: 0px;
                right: 0px;
            }
            
        }
        .message_bottom {
            height: 400px;
            background: #fff;
            .messageTab {
                overflow: hidden;
                border-bottom: 1px solid #F05E5E;
                ul {
                    float:  left;
                    margin: 5px 25px;
                    li {
                        float: left;
                        margin-right: 25px;
                   }
                }
            }
            .messageText {
                 margin: 20px 25px;
                 border: 1px solid pink;

            }
        }
    }

}


</style>

 



<script>
  
</script>