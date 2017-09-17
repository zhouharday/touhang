<template>
    <div>
        <div class="login-name">企业登录</div>
        <div class="login-ac">
            <input autocomplete="off" type="text" class="login-account" @input="checkVataa" v-model="name" placeholder="请输入账号/手机号" required>
        </div>
        <div class="login-pass">
            <input autocomplete="off" type="password" class="login-account" @input="checkVataa" v-model="password" placeholder="请输入密码" required>
        </div>
        <div class="find-pass">
            <span class="pass-find" @click="openDialog('form')">找回密码</span>
            <router-link v-if="pass" class="pass-zhuce" to="/registerphone">企业注册</router-link>
        </div>
        <!-- 忘记密码 对话框 -->
        <el-dialog title="忘记密码" :visible.sync="findDialog">
            <el-form :model="form1" :rules="rules" ref="form1" label-position="left" label-width="120px">
                <el-row>
                    <el-col :span="16" offset="2">
                        <el-form-item label="登录手机号码" prop="phone">
                            <el-input v-model="form1.phone" @input="checkVata" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-button :class="{'active-code':!isSendCode}" class="code-btn" :disabled="isSendCode" type="primary">{{ btnText}}</el-button>
                    </el-col>
                    <el-col :span="16" offset="2">
                        <el-form-item label="验证码" prop="code">
                            <el-input v-model="form1.code" @input="checkVata" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16" offset="2">
                        <el-form-item label="新密码" prop="newPwd">
                            <el-input v-model="form1.newPwd" @input="checkVata" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16" offset="2">
                        <el-form-item label="请确认新密码" prop="checkPwd">
                            <el-input v-model="form1.checkPwd" @input="checkVata" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('form1')" :class="{ active:valueData }">保 存</el-button>
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
        // 手机号验证
        var validatePhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号码'));
            } else {
                if ((value !== '') && (/^1[34578][0-9]{9}$/.test(this.form1.phone))) {
                    callback();
                }
                callback(new Error('请输入正确的手机号码'));
            }
        };
        // 新密码验证
        var validatePwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.form1.checkPwd !== '') {
                    this.$refs.form1.validateField('checkPwd');
                }
                callback();
            }
        };
        // 确认密码验证
        var validatePwd2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form1.newPwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            isSendCode: true, //是否可以发送验证码
            valueData: false, //所有输入的值是否通过验证
            btnText: '获取验证码',
            findDialog: false,
            name: '',
            password: '',
            pass: true,
            form1: {
                phone: '',
                code: '',
                newPwd: '',
                checkPwd: ''
            },
            rules: {
                phone: [
                    { required: true, validator: validatePhone, trigger: 'blur' }
                ],
                newPwd: [
                    { required: true, validator: validatePwd, trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                checkPwd: [
                    { required: true, validator: validatePwd2, trigger: 'blur' }
                ],
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
         /*******************验证 找回密码表单 开始*************************/
        // checkVata() {
        //      if ( this.validatePhone && thisvalidatePwd && this.validatePwd ) {
        //         this.valueData = true;
        //         this.isSendCode = false;
        //     }
        //     else if (this.validatePhone) {
        //         this.isSendCode = false;
        //         this.valueData = false;
        //     } else {
        //         this.isSendCode = true;
        //         this.valueData = false;
        //     }
        // },
        /***********************手机号码验证开始************************************************/
        openDialog(formName) {
            let new_form1 = {
                phone: '',
                code: '',
                newPwd: '',
                checkPwd: ''
            };
            this.form1 = new_form1;
            this.findDialog = !this.findDialog;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.findDialog = !this.findDialog;
                } else {
                    return false;
                    this.$refs[formName].resetFields();
                }
            });
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

// input::-webkit-input-placeholder {
//     // color: #a6a9ad;
// }
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
    width: 382px; // height: 84px;
    margin-top: 30px;
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

// 找回 密码对话框的样式
.code-btn {
    font-size: 16px;
    color: #fff;
    outline: none;
    background: gray;
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

