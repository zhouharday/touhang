<div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password"
                                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                
            </el-form>
        </div>
          // data: function(){
        //     return {
        //         ruleForm: {
        //             username: '',
        //             password: ''
        //         },
        //         rules: {
        //             username: [
        //                 { required: true, message: '请输入用户名', trigger: 'blur' }
        //             ],
        //             password: [
        //                 { required: true, message: '请输入密码', trigger: 'blur' }
        //             ]
        //         }
        //     }
        // },
        // methods: {
        //     submitForm(formName) {
        //         const self = this;
        //         self.$refs[formName].validate((valid) => {
        //             if (valid) {
        //                 localStorage.setItem('ms_username',self.ruleForm.username);
        //                 self.$router.push('/readme');
        //             } else {
        //                 console.log('error submit!!');
        //                 return false;
        //             }
        //         });
        //     }
        // }