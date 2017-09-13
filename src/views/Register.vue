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
                    <input required type="text" class="register-enterprise" placeholder="请输入企业名称" @input="checkVata" v-model="register.merchantName">
                </div>
                <div class="register-in">
                    <label>所属行业：</label>
                    <el-select required @change="checkVata" v-model="register.industry" placeholder="请选择">
                        <el-option v-for="item in industry" :key="item.id" :label="item.dicName" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="register-us">
                    <label>联系人姓名：</label>
                    <input required type="text" class="register-user" placeholder="请输入联系人姓名" @input="checkVata" v-model="register.contactUser">
                </div>
                <div class="register-ad">
                    <label>所在地：</label>
                    <el-select required @change="checkVata" v-model="register.province" placeholder="请选择">
                        <el-option v-for="item in provinces" :key="item.id" :label="item.dicName" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <button type="button" class="register-btn" @click="submitForm" :class="{ active:valueData }">确定</button>
            <!-- <router-link to="/registerphone" type="button" class="register-btn" @click="submitForm" :class="{ active:valueData }">确定</router-link> -->
        </div>
    </div>
</template>



<script>
import city from '../../static/js/city.json.js'
import { mapState } from 'vuex'
import axios from 'axios'
export default {
    data() {
        return {
            // plsSelect: 0,
            userName: '',
            valueData: false,
            provinces: [], //省份数据
            industry: [], //行业数据
            // cityName1: [],
            // cityName: city.cityList,
            register: {
                // "validationCode": "", //验证码 必须
                "merchantName": "", //企业名称 必须
                "industry": "", //行业id
                "province": "", //省份id
                // "city": "", //市id 
                "contactUser": "", //联系人姓名
                // "contactPhone": "" //联系电话 必须
            },
        }
    },

    mounted() {
        // this.$http.post('api/dictionaryController/select2Menu',{
        //     "dicParent": '1'
        // })
        // .then( res => {
        //     console.log(res.data);
        // })
        // .catch()
    },
    created() {
        this.$http.post('api/dictionaryController/select2Menu', {
            "dicParent": '1'
        })
            .then(res => {
                if (res.data.status == '200') {
                    this.industry = res.data.result;
                    console.log(res.data.result);
                }
            })
            .catch(error => {

            });
        this.$http.post('api/dictionaryController/select2Menu', {
            "dicParent": '3'
        })
            .then(res => {
                if (res.data.status == '200') {
                    this.provinces = res.data.result;
                    console.log(res.data.result);
                }
            })
            .catch(error => {

            });
        function getIndustry(self) { //获取行业数据
            return self.$http.post('api/dictionaryController/select2Menu', {
                "dicParent": '3'
            })
                .then(res => {
                    if (res.data.status == '200') {
                        this.provinces = res.data.result;
                        console.log(res.data.result);
                    }
                })
                .catch(error => {

                });
        };
        function getRegister(self) { //获取省份数据
            return self.$http.post('api/dictionaryController/select2Menu', {
                "dicParent": '3'
            })
                .then(res => {
                    if (res.data.status == '200') {
                        this.provinces = res.data.result;
                        console.log(res.data.result);
                    }
                })
                .catch()
        };
        // let self = this;
        // axios.all([getIndustry(this), getRegister(this)])
        //     .then(axios.spread(function(res1, res2) {
        //         // if (res.data.status == '200') {
        //             this.industry = res1.data.result;
        //             this.provinces = res2.data.result;
        //             console.log(res1.data.result);
        //             console.log(res2.data.result);
        //         // }
        //     }))
        //     .catch(axios.spread(function(error1, error2) {
        //         console.log(error1);
        //         console.log(error2);
        //     }))
    },
    computed: mapState({
        // register(state){
        //     state.register.register = JSON.parse(sessionStorage.getItem('register')) || {};
        //     return state.register.register;
        // }
    }),
    methods: {
        checkVata(province) { //选择省份回调
            if (this.register.merchantName && this.register.industry && this.register.province && this.register.contactUser) {
                this.valueData = 1;
                return;
            }
            this.valueData = 0;
        },
        submitForm() {
            if (this.valueData) {
                this.$store.state.register.register = this.register;
                // window.sessionStorage('register',JSON.stringify(this.register));
                // console.log(this.$store.state.register.register);
                // this.register
                // console.log(this.register);
                // this.$router.push({ name: 'registerphone' });
                //  console.log(this.valueData);
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
    width: 100%;
    height: 100%;
    color: #fff;
    background: url(/static/img/register_bg.png) no-repeat center;
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