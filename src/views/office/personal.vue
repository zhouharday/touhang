<template>
    <section class="personal">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="编辑资料" name="first">
                <el-form :model="form1" :rules="rules1" ref="form1" label-width="90px">
                    <el-row :gutter="40">
                        <el-col :span="7">
                            <el-form-item label="用户ID：" prop="userID">
                                <el-input v-model="form1.userID" auto-complete="off" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="用户角色：" prop="userRole">
                                <el-input v-model="form1.userRole" auto-complete="off" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item label="企业名称：" prop="companyName">
                                <el-input v-model="form1.companyName" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item label="部门：" prop="department">
                                <el-input v-model="form1.department" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14" style="margin-bottom:50px">
                            <el-form-item label="姓名：" prop="userName">
                                <el-input v-model="form1.userName" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item label="手机：" prop="phone">
                                <el-input v-model="form1.phone" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item label="办公电话：" prop="callPhone">
                                <el-input v-model="form1.callPhone" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item label="邮箱：" prop="email">
                                <el-input v-model="form1.email" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>
                </el-form>
                <div style="margin-left:23%">
                    <el-button>取消</el-button>
                    <el-button type="danger">确认</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="second">
                <el-form :model="form2" ref="form2" label-width="120px">
                    <el-row :gutter="40">
                        <el-col :span="13">
                            <el-form-item label="请输入当前密码" prop="currentPwd">
                                <el-input v-model="form2.currentPwd" @input="checkVata" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="请输入新密码" prop="newPwd">
                                <el-input v-model="form2.newPwd" @input="checkVata" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="请确认新密码" prop="newPwd2">
                                <el-input v-model="form2.newPwd2" @input="checkVata" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="请输入手机号" prop="phone">
                                <el-input v-model="form2.phone" @input="checkVata" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-button :class="{'active-code':isSendCode}" @click="sendVerificationCode"
                                       class="code-btn" :disabled="!isSendCode" type="danger">{{ btnText}}
                            </el-button>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="请输入验证码" prop="code">
                                <el-input v-model="form2.code" @input="checkVata" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-button type="danger" style="width:100px;margin-left:23%;" @click="submitForm" :class="{ active:valueData }">完成</el-button>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>


<script>
    export default {
        data() {
            return {
                activeName: 'first',
                isSendCode: false, //是否可以发送验证码
                valueData: false, //所有输入的值是否通过验证
                btnText: '获取验证码',
                form1: {
                    userID: '',
                    userRole: '',
                    companyName: '',
                    department: '',
                    userName: '',
                    phone: '',
                    callPhone: '',
                    email: ''
                },
                form2: {
                    currentPwd: '',
                    newPwd: '',
                    newPwd2: '',
                    phone: '',
                    code: ''
                }
            };
        },
        methods: {
            /*******************验证 修改密码表单开始 *************************/
            checkVata() {
                if (this.form2.currentPwd && (this.form2.newPwd == this.form2.newPwd2) && this.checkPhone(this.form2.phone) && this.form2.code) {
                    this.valueData = true;
                    this.isSendCode = true;
                }
                else if (this.form2.currentPwd && (this.form2.newPwd == this.form2.newPwd2) && this.checkPhone(this.form2.phone)) {
                    this.valueData = false;
                    this.isSendCode = true;
                } else {
                    this.isSendCode = false;
                    this.valueData = false;
                }
            },
            /***********************验证表单结束***************************************/

            /***********************手机号码验证开始************************************************/
            checkPhone(phone) {
                var pattern = /^1[34578][0-9]{9}$/;
                if (phone != '') {
                    if (pattern.test(phone)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            /************************手机号码验证结束*************************************/

            /************************验证码倒计时开始************************************/
            time() {
                if (this.isSendCode) {
                    this.isSendCode = !this.isSendCode;
                    this.valueData = false;
                    var self = this;
                    var sec = 10;
                    var timer1 = setInterval(
                        function () {
                            // self.isSendCode = true;
                            self.btnText = sec + 's';
                            if (sec < 0) {
                                // self.isSendCode = false;
                                clearInterval(timer1);
                                self.isSendCode = !self.isSendCode;
                                self.btnText = '获取验证码';
                            }
                            sec--;
                        }
                        , 1000);
                }
            },
            /************************验证码倒计时结束*********************/
            sendVerificationCode() { //发送验证码 Ajax
                this.time();
                // return service({
                //     url: 'api/merchant/validationCode',
                //     method: 'post',
                //     data: { contactPhone: this.form2.Phone }
                // })

                this.$http.post(this.api + '/merchant/validationCode', {
                    contactPhone: this.phonecontactPhone
                })
                    .then(res => {
                        if (res.data.status == '200') {
                            // this.provinces = res.data.result;
                            // this.time();
                            // this.isValidationCode = 1;
                            console.log(res.data);
                        } else if (res.data.status == '1008') { //手机号不合法
                            // console.log(res.data);
                            // this.isSendCode = 1;
                            alert(res.data.message);
                        } else if (res.data.status == '403') { //服务器异常
                            // console.log(res.data);
                            // this.isSendCode = 1;
                            alert(res.data.message);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            /************************验证码倒计时结束*********************/

            /***********************提交表单开始*************************/
            submitForm() {
                if (this.isSendCode && this.code) {

                    this.$store.state.register.register.contactPhone = this.phonecontactPhone;
                    this.$store.state.register.register.validationCode = this.validationCode;
                    console.log(this.$store.state.register.register);
                }
            }
            /************************提交表单结束********************************/
        }
    };
</script>


<style lang="less" scoped>
    .personal {
        background: #ffffff;
        padding: 24px;
        .code-btn {
            font-size: 14px;
            color: #fff;
            outline: none;
            background: gray;
        }

        .active-code {
            background: orange;
        }

        .active {
            background: blue;
        }
    }
</style>
