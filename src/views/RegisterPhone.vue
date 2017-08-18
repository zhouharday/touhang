<template>
   <div class="register-wrap">
      <div class="register-case">
         <div class="register-name">
            <p>领投者企业注册</p>
            <span>Lead investor enterprise registration</span>
         </div>
         <div class="register-box">
            <div class="register-ph">
               <label>手机号码：</label>
               <input type="text" class="register-phone" placeholder="请输入手机号"  @input="checkVata" v-model="phone">
            </div>
            <div class="register-co">
               <label>手机验证码：</label>
               <input type="text" class="register-code" placeholder="请输入验证码"  @input="checkVata" v-model="code">
            </div>
         </div>
         <button type="button" class="code-btn" @click="time"  :class="{ 'active-code':valuePhone,'active-time':valueTime}">{{btnText}}</button>
         <router-link to="/login" type="button" class="register-btn" @click="submitForm" :class="{ active:valueData }">下一步</router-link>
      </div>
   </div>
</template>


<script>
export default {
    data () {
        return {
          phone:'',
          code:'',
          valuePhone: false,
          valueTime: false,
          btnText: '获取验证码',
          valueData: false,
        }
    },
    methods: {
        /*******************验证表单开始*************************/
        checkVata () { 
           if ( this.checkPhone(this.phone) && this.code ) {
               this.valueData = true;  
           }
           else if ( this.checkPhone(this.phone) ) {
               this.valuePhone = true;
               this.valueData = false;
           }  else {
               this.valuePhone = false;
               this.valueData = false;
           } 
        },
        /***********************验证表单结束***************************************/

        /***********************手机号码验证开始************************************************/
        checkPhone (phone) {
           var pattern=/^1[34578][0-9]{9}$/;
           if (phone!='') {
              if(pattern.test(phone)) {
                 return true; 
              } else {
                 return false;
              }
           }
        },
        /************************手机号码验证结束**********************************************/
        

        /*************************验证码检验开始****************************************************/
        /*
        checkCode (code) {
          var pattern=/^[0-9]{6}$/;
          if (code!='') {
              if(pattern.test(code)) {
                  return true;
              } else {
                  return false;
              }
          } 
        },
        */
        /***************************验证码检验结束**************************************************/


        /************************验证码倒计时开始************************************/
        time () {
          if (this.valuePhone) {
              var that=this;
              var sec=30;
              var timer1=setInterval(
                 function () {
                    that.valueTime = true;
                    that.btnText= sec+'s';
                    sec--;
                    if(sec==0){
                      clearInterval(timer1); 
                      that.valueTime = false;
                      that.btnText='获取验证码';
                    }
                 }
              ,1000);
          }
        },
        /**************************验证码倒计时结束********************************************/

         /***********************提交表单开始*************************/
        submitForm () {
           if(this.valueData){
               console.log(this.valueData);
               //发起ajax请求
               
           } 
        }
        /************************提交表单结束********************************/
    }
}
</script>



<style scoped>
html,
body {
    width: 100%;
    height: 100%;
    font-family: ITC Avant Garda Gothic Demi Regular;
}
.register-wrap {
    position: relative;
    width: 1440px;
    height: 900px;
    margin: 0 auto;
    color: #fff;
    background: url(/static/img/register_bg.jpg) no-repeat;
    background-size: 100% 100%;
}
.register-case {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin: auto;
    width: 700px;
    height: 600px;
}
.register-name {
    position: absolute;
    top: 45px;
    left: 205px;
    width: 300px;
    height: 45px;
    font-size: 36px;
    text-align: center;
}
.register-name span {
    font-size: 14px;
}
.register-box {
    position: absolute;
    top: 160px;
    left: 60px;
    width: 700px;
    height: 350px;
    font-size: 16px;   
}
.register-box label {
    display: inline-block;
    width: 100px;
    text-align: right;
}
input::-webkit-input-placeholder {
    color: #a6a9ad;
}
.register-ph,
.register-co {
    width: 500px;
    height: 100px;
}
.register-phone,
.register-code {
    width: 320px;
    height: 55px;
    padding: 10px 15px;
    margin-left: 20px;
    font-size: 16px;
    color: #fff;
    border: none;
    border-bottom: 2px solid #a6a9ad;
    outline: none;
    background: transparent;
}
.code-btn {
   position: absolute;
   top: 280px;
   left: 545px;
   width: 110px;
   height: 40px;  
   font-size: 16px;
   color: #fff;
   outline: none;
   border: 2px solid #fff;
   border-radius: 15px;
   background: gray; 
}
.register-btn {
    position: absolute;
    top: 440px;
    left: 180px;
    display: inline-block;
    width: 350px;
    height: 45px;
    font-size: 24px;
    color: #fff;
    text-align: center;
    line-height: 45px;
    background: #f05e5e;
    border: none;
    border-radius: 30px;
    outline: none;  
}
.active-code {
    background: orange;
}
.active-time {
    background: red;
}
.active {
    background: red;
}
</style>