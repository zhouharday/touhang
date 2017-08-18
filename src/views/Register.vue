<template>
   <div class="register-wrap">
      <div class="register-case">
          <div class="register-name">
             <p>领投者企业注册</p>
             <span>Lead investor enterprise registration</span>
          </div>
          <div class="register-box">
             <div class="register-en">
                <label>企业名称：</label>
                <input type="text" class="register-enterprise" placeholder="请输入企业名称"  @input="checkVata" v-model="enterpriseName">
             </div>
             <div class="register-in">
                <label>所属行业：</label>
                <input type="text" class="register-industry" placeholder="请输入行业" @input="checkVata" v-model="industryName">
             </div>
             <div class="register-us">
                <label>联系人姓名：</label>
                <input type="text" class="register-user" placeholder="请输入联系人姓名" @input="checkVata" v-model="userName">
             </div>
             <div class="register-ad">
                <label>所在地：</label>
                <select class="register-province"  @change="checkVata" ref="selec">
                   <option v-for="( item,index ) in provinces" :key="item.index" :values="item.ProID"  v-model="plsSelect" style="color:black;">{{item.ProName}}             
                   </option>
                </select>
                <select class="register-city" >
                   <option v-for="( item,index ) in cityName1" :key="item.index" style="color:black;">
                        {{item.CityName}}
                   </option>
                </select>
             </div>
          </div>
          <router-link to="/registerphone" type="button" class="register-btn" @click="submitForm" :class="{ active:valueData }">确定</router-link>
       </div>
   </div>
</template>



<script>
import city from '../../static/js/city.json.js'
export default{
    data() {
       return {
         plsSelect: 0,
         enterpriseName:'', 
         industryName:'', 
         userName:'',
         valueData: false,
         provinces: city.provinceList,
         cityName1: [],
         cityName : city.cityList
      }  
    },
   
    mounted() {
        var list = city.provinceList;
        // console.log(list[0]);
        this.provinces = list;           
    },
    created(){
       this.filter(this.plsSelect);
    },
    
    methods: {
        checkVata () {
           this.cityName1.length=0;
           this.plsSelect=this.$refs.selec.selectedIndex;
           this.filter(this.plsSelect);
           if ( this.enterpriseName && this.industryName && this.userName && this.plsSelect) {
              this.valueData = true;
            } else {
              this.valueData = false;
            }
        }, 
        filter (a) {
            for(let i=0;i<this.cityName.length;i++){
               if(this.cityName[i].ProID==a){
                   this.cityName1.push(this.cityName[i]);
               }
            }
        },
        submitForm () {
          if(this.valueData){
             console.log(this.valueData);
          }  
        }
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
    top: 150px;
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
.register-en,
.register-in,
.register-us,
.register-ad {
    width: 500px;
    height: 100px;
}
.register-enterprise, 
.register-industry, 
.register-user,
.register-province,
.register-city {
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
.register-province,
.register-city {
    width: 160px;
}
.register-btn {
    position: absolute;
    top: 580px;
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
.active {
    background: red;
}
</style>