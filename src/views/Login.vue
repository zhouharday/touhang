<template>
    <div class="login-wrap">
        <div>
            <div class="login-entangle">
                <p class="login-left">Lead Investor</p>
                <p class="login-center">Financial investment</p>
                <div class="login-bottom">
                    <span class="left-fir">高效</span>
                    <span class="left-dot"></span>
                    <span class="left-sec">信任</span>
                    <span class="right-dot"></span>
                    <span class="left-thi">依赖</span>
                </div>
            </div>
            <div class="login-box">
                <div class="login-name">企业登录</div>

                <div class="login-ac">
                    <input type="text" class="login-account" placeholder="请输入账号/手机号" @input="checkVata" v-model="userName">
                </div>
                <div class="login-pass">
                    <input type="password" class="login-account" placeholder="请输入密码" @input="checkVata" v-model="passWord">
                </div>
                <div class="find-pass">
                    <!-- <router-link to=""></router-link> -->
                    <router-link class="pass-zhuce" to="/register">企业注册</router-link>
                    <a href="#" class="pass-find">找回密码</a>
                </div>
                <button type="button" class="login-btn" @click="submitForm" :class="{ active : valueData }">登录</button>
                <hr class="hr" />
                <div class="login-right-bottom">
                    <p>
                        <img src="/static/img/联系我们.png">
                    </p>
                    <p>
                        <img src="/static/img/关于我们.png">
                    </p>
                    <p>
                        <img src="/static/img/App下载.png">
                    </p>
                </div>
                <div class="login-footer">
                    <p>联系我们</p>
                    <p>关于我们</p>
                    <p>APP下载</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName: '',
            passWord: '',
            valueData: false
        }
    }
    ,
    methods: {
        checkVata() {
            if (this.userName && this.passWord) {
                this.valueData = true;
            } else {
                this.valueData = false;
            }
        },
        submitForm() {
            if (this.valueData) {
                sessionStorage.clear();
                this.$router.push({ name: 'homeContent' });
                this.userName = '';
                this.passWord = '';
                this.valueData = false;

            }
            //console.log(this.valueData);
        }
    }

}
</script>

<style lang="less" scoped>
html,
body {
    width: 100%;
    height: 100%;
}

.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(/static/img/bg.png) no-repeat center center;
    >div {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 100%;
    }
}

.login-btn {
    text-align: center;
    
}

.login-btn button {
    width: 100%;
    height: 36px;
}

.login-left {
    font-size: 50px;
    color: #fff;
    font-family: ITC Avant Garda Gothic Demi Regular;
}

.login-center {
    font-size: 40px;
    color: #afacae;
}

span {
    color: #aca7a7;
}

.left-fir {
    top: 800px;
}

.login-entangle {
    width: 35%;
    position: absolute;
    top: 30%;
    left: 20%;
}

.login-bottom {
    font-size: 28px;
    margin-top: 42px;
}

.left-sec {
    margin-left: 30px;
}

.left-thi {
    margin-left: 30px;
}

.left-dot,
.right-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #aca7a7;
    display: inline-block;
    margin-left: 20px;
    margin-bottom: 5px;
}

.ms-login {
    margin-left: 10px;
    margin-top: 48px;
}

input::-webkit-input-placeholder {
    color: #a6a9ad;
}

.login-box {
    // width: 35%;
    text-align: center;
    position: absolute;
    top: 30%;
    left: 55%;
    border-left: solid 2px #a6a9ad;
}

.login-name {
    // width: 382px;
    font-size: 24px;
    color: #fff;
    font-family: "微软雅黑";
    margin-bottom: 24px;
    margin-left: 82px;
}

.login-account {
    width: 382px;
    height: 84px;
    background: transparent;
    border: none;
    font-size: 20px;
    outline: none;
    color: #fff;
}

.login-ac,
.login-pass {
    // width: 330px;
    height: 84px;
    padding-left: 48px;
    border-bottom: solid 2px #a6a9ad;
    margin-left: 10%;
    /*margin-bottom: 16px;*/
}

.login-ac {
    background: url(/static/img/账号.png) no-repeat left center;
}

.login-pass {
    background: url(/static/img/密码.png) no-repeat left center;
    margin-bottom: 16px;
}

.find-pass {
    // width: 382px;
    font-size: 16px;
    margin-bottom: 64px;
    margin-left: 48px;
    /*clear: both;*/
}

.pass-find {
    color: #fff;
    float: left;
}

.pass-zhuce {
    color: #fff;
    float: right;
}

.login-btn {
    width: 382px;
    height: 54px;
    font-size: 24px;
    border-radius: 30px;
    margin-left: 82px;
    background: #f05e5e;
    border: none;
    margin-bottom: 64px;
    color: #fff;
    margin-top: 4px;
}

.login-right-bottom {
    width: 382px;
    margin-left: 82px;
    display: flex;
    justify-content: space-between;
}

.login-right-bottom p {
    width: 33.33%;
    float: left;
}

.login-footer {
    margin-left: 82px;
}

.login-footer p {
    width: 33.33%;
    float: left;
    color: #fff;
    font-size: 12px;
}

.hr {
    width: 382px;
    border: solid 1px #a6a9ad;
    margin-left: 82px;
    margin-bottom: 16px;
}

.active {
    background: red;
}
</style>