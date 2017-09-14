<template>
    <div>
        <div class="login-name">企业登录</div>
        <div class="login-ac">
            <input type="text" class="login-account" @input="checkVataa" v-model="name" placeholder="请输入账号/手机号" required>
        </div>
        <div class="login-pass">
            <input type="password" class="login-account" @input="checkVataa" v-model="password" placeholder="请输入密码" required>
        </div>
        <div class="find-pass">
            <!-- <router-link to=""></router-link> -->
            <router-link v-if="pass" class="pass-zhuce" to="/register">企业注册</router-link>
            <span class="pass-find" @click="findPwd=true">找回密码</span>
        </div>
        <!-- 忘记密码 对话框 -->
        <el-dialog title="忘记密码" :visible.sync="findPwd" top="20%" close-on-click-modal="false">
            <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="120px">
                <el-row>
                    <el-col :span="16" offset="2">
                        <el-form-item label="登录手机号码" prop="phone">
                            <el-input v-model="form.phone" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-button>{{ btnText}}</el-button>
                    </el-col>
                    <el-col :span="16" offset="2">
                        <el-form-item label="验证码" prop="code">
                            <el-input v-model="form.code" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16" offset="2">
                        <el-form-item label="新密码" prop="newPwd">
                            <el-input v-model="form.newPwd" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16" offset="2">
                        <el-form-item label="请确认新密码" prop="checkPwd">
                            <el-input v-model="form.checkPwd" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="findPwd = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    watch: {
        name(val) {
            this.$emit('changeName', val);
        },
        password(val) {
            this.$emit('changePassword', val);
        },
    },
    data() {
        // 新密码 验证规则
        var validatePwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入新密码'));
            } else {
                if (this.form.newPwd !== '') {
                    this.$refs.form.validateField('newPwd');
                }
                callback();
            }
        };
        var validatePwd2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入确认密码'));
            } else if (value !== this.form.newPwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            btnText: '获取验证码',
            findPwd: false,
            name: '',
            password: '',
            pass: true,
            form: {
                phone: '',
                code: '',
                newPwd: '',
                checkPwd: ''
            },
            rules: {
                phone: [

                ],
                code: [
                    { required: true, message: '请填写验证码', trigger: 'blur' }
                ],
                newPwd: [
                    { validator: validatePwd, trigger: 'blur' }
                ],
                checkPwd: [
                    { validator: validatePwd2, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        checkVataa() {
            if (this.name && this.password) {
                this.$emit("sendVal", 1)
            } else {
                this.$emit("sendVal", 0)
            }
        },

    },
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
    cursor: pointer;
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
    outline: none;
    &:hover {
        background: #803f3f;
    }
    &:active {
        background: #f05e5e;
    }
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

.loginCard {
    margin-left: 78px;
    position: relative;
    .loginCard_title {
        // position: absolute;
        color: #ffffff;
        margin-top: 246px;
    }
    >div:nth-child(1) {
        color: #fff;
        position: absolute;
        top: -40px;
        left: 67px;
        font-size: 20px;
        font-weight: bolder;
    }
    >div:nth-child(2) {
        padding-bottom: 40px;
        overflow: hidden;
        >div {
            overflow: auto;
        }
    }
    >div:nth-child(3) {
        color: #ffffff;
        position: absolute;
        right: 0;
        top: 400px;
    }
}

.login_btn {
    margin-top: 65px;
}

.el-carousel__item {
    // margin: 0 auto;
    // margin-left: 82px;
    overflow: visible;
    h3 {
        // position: relative;
        color: #475669;
        font-size: 14px; // opacity: 0.75;
        line-height: 200px;
        background: #ffffff;
        margin: 0;
        >img {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 112px;
            height: 112px;
        }
    }
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>

