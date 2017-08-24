<template>
    <section class="messageContainer"> 
        <!-- 这是详情页{{this.$route.params.userId}} -->
        <div class="messageContent">
           <el-row class="message_top">
              <el-col :span="8">
                  <div class="messageBrand">
                  </div>
              </el-col>
              <el-col :span="12">
                  <div class="messageIntro">

                  </div>
              </el-col>
              <el-col :span="4">

              </el-col>
           </el-row>

           <el-row></el-row>
        </div>

    </section>
</template>





<style lang="less" scoped> 
.messageContainer {
    width: 100%;
    min-height: 700px;
    font-size: 14px;
    background: #fff;
    .messageContent {
        width: 93%;
        min-height: 600px;
        margin: 20px auto;
        box-sizing: border-box;
        border: 1px solid black;
        .message_top {
            width: 100%;
            height: 200px;
            border: 1px solid red;
            .messageBrand {
                width: 120px;
                height: 120px;
                border: 1px solid  #F05E5E;
                border-radius: 5px;
            }
            // .message
        }
    }

}


</style>





<script>
  
</script>