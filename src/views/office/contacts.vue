<template>
    <section>
        <!-- 这是通讯录内容 -->
        <div class="contacts_list">
            <!-- 联系人list -->
            <div class="contacts_L">
                <div>
                    <div v-for="( item, index) in contacts_list" :key="item.index" @click="active(index,item)" :class="{'bag':ind === index}">
                        <ul>
                            <li>
                                <div>
                                    <img :src="item.src" alt="">
                                </div>
                                <div>
                                    <div>
                                        {{item.name}}
                                    </div>
                                    <div>
                                        {{item.name_bot}}
                                    </div>
                                </div>
                                <div>{{item.time}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="contacts_R">
                <el-row>
                    <div class="contacts_R_header">
                        <el-col :span="24">
                            <div class="grid-content bg-purple">
                                <div class="fl">
                                    <div><img :src="srcContent.src" alt=""></div>
                                    <div>
                                        <div>{{srcContent.name}}</div>
                                        <div>{{srcContent.title}}</div>
                                    </div>
                                </div>
                                <div>
                                    <el-button style="color:#fff;" type="text" @click="openDialog('form')">申请开通系统试用</el-button>
                                </div>
                            </div>
                        </el-col>
                    </div>
                </el-row>
                <el-row style="height:100%;">
                    <div class="contacts_R_content">
                        <el-col :span="24">
                            <img v-show="typeText.type == '1'" :src="errorIMG.error_01" alt="">
                            <div v-show="typeText.type != '1'">{{typeText.text}}</div>
                        </el-col>
                    </div>
                </el-row>
                <el-row>
                    <div class="contacts_R_content">
                        <el-col :span="24">
                        </el-col>
                    </div>
                </el-row>
                <!-- 申请开通系统 对话框 -->
                <el-dialog title="申请开通系统" :visible.sync="systemDialog">
                    <!-- <i></i> -->
                    <el-form :model="form" :rules="rules" ref="form" label-width="200px">
                        <el-row>
                            <el-col>
                                <i></i>
                            </el-col>
                            <el-col :span="18">
                                <el-form-item label="统一社会信用代码" prop="creditCode">
                                    <el-input v-model="form.creditCode" auto-complete="off" class="mgl"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="18">
                                <el-form-item label="企业名称" prop="companyName">
                                    <el-input v-model="form.companyName" auto-complete="off" class="mgl"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="18">
                                <el-form-item label="法人代表" prop="delegate">
                                    <el-input v-model="form.delegate" auto-complete="off" class="mgl"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="18">
                                <el-form-item label="详细地址" prop="address">
                                    <el-input v-model="form.address" auto-complete="off" class="mgl"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <i></i>
                            </el-col>
                            <el-col>
                                <el-form-item prop="edition">
                                    <el-radio v-model="form.edition" label="1">
                                        <b>申请免费版</b>
                                    </el-radio>
                                    <p>5个账号以下可免费试用该系统；在此基础上可购买使用账号数量</p>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item prop="edition">
                                    <el-radio v-model="form.edition" label="2">
                                        <b>申请年费版</b>
                                    </el-radio>
                                    <p>不限账号数量，试用一年</p>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item prop="edition">
                                    <el-radio v-model="form.edition" label="3">
                                        <b>申请永久版</b>
                                    </el-radio>
                                    <p>不限账号数量，永久使用</p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="systemDialog = false">取 消</el-button>
                        <el-button type="primary" @click="submitForm('form')">提 交</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </section>
</template>

<style lang="less" scoped>
section {
    height: 93%;
}

.contacts_list {
    height: 103%;
    overflow: hidden;
    .contacts_L {
        width: 20%;
        height: 100%;
        float: left;
        overflow: hidden;
        >div {
            float: left;
            width: 105%;
            height: 100%;
            overflow: scroll;
            border-right: 1px solid #ccc;
            background: #ffffff;
            overflow-x: hidden;
            >div {
                // overflow-y: scroll;
                width: 100%; // height: 100%;
                padding: 10px;
                >ul {
                    >li {
                        position: relative;
                        width: 100%;
                        height: 77px;
                        >div {
                            float: left;
                        }
                        >div:nth-child(1) {
                            border-radius: 50%;
                            margin-top: 15.5px;
                            margin-right: 15px;
                            >img {
                                width: 46px;
                                height: 46px;
                                display: inline-block; // float: left;
                            }
                        }
                        >div:nth-child(2) {
                            >div:nth-child(1) {
                                position: absolute;
                                top: 13px;
                            }
                            >div:nth-child(2) {
                                position: absolute;
                                top: 40px;
                            }
                        }
                        >div:nth-child(3) {
                            position: absolute;
                            right: 23px;
                            top: 14px;
                        }
                    }
                }
            }
        }
    }
    .contacts_R {
        float: left;
        width: 80%;
        height: 100%; // border-bottom: 1px solid #ccc;
        // padding: 10px;
        box-sizing: border-box;
        position: relative;
        .contacts_R_header {
            width: 100%;
            height: 60px; // height: 100%;
            padding: 10px;
            background: #ffffff;
            margin-bottom: 1px;
            .bg-purple {
                .fl {
                    >div {
                        float: left;
                    }
                }
                >div {
                    float: left;
                    >div {
                        // float: left;
                        img {
                            width: 46px;
                            height: 46px;
                            margin-right: 10px;
                        }
                    }
                }
                >div:nth-child(2) {
                    position: absolute;
                    right: 13.5px;
                    top: 13.5px;
                    width: 135px;
                    height: 33px;
                    line-height: 33px;
                    text-align: center;
                    background: #f05e5e;
                    color: #ffffff;
                    border-radius: 15px;
                    font-size: 10px;
                    cursor: pointer;
                }
            }
        }
        .contacts_R_content {
            position: relative;
            background: #ffffff;
            height: 100%;
            >img {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                width: 340px;
                height: 273px;
            }
            >div>div {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                width: 500px;
                height: 100px;
                font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
                color: darkgreen;
                font-size: 20px;
            }
        }
    }
}

.bag {
    background: #dee0e5;
}

.mgl {
    margin-left: 40px;
}

i {
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
    border-bottom: 1px solid #c4c4c4;
}

b {
    font-size: 16px;
}
</style>

<script>
import { mapState } from 'vuex'
export default {
    beforeCreate() {
        this.$http.post('api/merchantType/queryList',{})
            .then( res => {
                // console.log(res);
                // if( res.data.status == '200'){

                // }
            })
            .catch( error => {
                console.log(error);
            });
        // alert(114);
    },
    created(){
        // this.$http.post('api/merchantType/queryList',{})
        //     .then( res => {
        //         // console.log(res);
        //         // if( res.data.status == '200'){

        //         // }
        //     })
        //     .catch( error => {
        //         console.log(error);
        //     });
    },
    computed: {
        typeText() {
            if ( JSON.parse(sessionStorage.getItem('saveApprovalStatus')) == null ) {
                this.$store.state.login.approvelType.type = '';
                this.$store.state.login.approvelType.text = '您好，请先注册~';
                // console.log(state.login.approvelType);
                return this.$store.state.login.approvelType;
            } else {
                // this.$store.state.login.approvelType = JSON.parse(sessionStorage.getItem('saveApprovalStatus')) || {};
                // console.log(state.login.approvelType);
                return this.$store.state.login.approvelType;
            }
        },
        ...mapState({
            // userName: state => state.login.userInfor
        })
    },
    data() {
        return {
            // typeText:{
            //     type: 1
            // },
            systemDialog: false,
            ind: '',
            // error_01: "/static/img/error/error_01.png/",
            errorIMG: {
                error_01: "/static/img/error/error_01.png",
            },
            contacts_list: [
                {
                    src: "/static/img/my_tuxiang.png",
                    name: this.$store.state.login.userInfor.name,
                    name_bot: "最新版昂",
                    time: "17:05"
                },
            ],
            srcContent: {
                src: "",
                name: "",
                title: "聚乐新能源集团-研发部总监"
            },
            form: {
                creditCode: '', //社会编码
                companyName: '', //客户名称
                delegate: '', //法人代表
                address: '', //详细地址
                // edition: '' 
            },
            rules: {
                creditCode: [
                    { required: true, message: '请输入信用代码', trigger: 'blur' }
                ],
                companyName: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                delegate: [
                    { required: true, message: '请输入法人代表', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' }
                ],
                edition: [
                    { required: true, message: '请选择申请类型', trigger: 'change' }
                ]
            },
        }
    },
    methods: {
        active(index, item) {
            // console.log(item);
            this.ind = index;
            this.srcContent.src = item.src;
            this.srcContent.name = item.name;
            // this.srcContent.title = item.src;

        },
        openDialog(formName) { //查询企业类型
        alert(111);
            // let new_form = {
            //     creditCode: '',
            //     companyName: '',
            //     delegate: '',
            //     address: '',
            //     edition: ''
            // };
            // this.form = new_form;
            // this.systemDialog = !this.systemDialog;
            //this.$refs[formName].resetFields();
            this.$http.post('api/merchant/validationCode',{
                "contactPhone":"18700958609"
            })
            .then( res => {
                // console.log(res);
                // if( res.data.status == '200'){

                // }
            })
            .catch( error => {
                console.log(error);
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.form);
                    this.$http.post('api/merchant/apply', {
                        "id": "50a21234735f4e34a5da5dadf47ff9b5",
                        "socialCode": this.form.creditCode,
                        "merchantName": this.form.companyName,
                        "address": this.form.address,
                        "merchantTypeId": "1", 
                        "representative": this.form.delegate, //法人代表
                    })
                        .then(res => {
                            console.log(res);
                        })
                        .catch(ero => {

                        })
                    this.systemDialog = !this.systemDialog;
                } else {
                    this.$refs[formName].resetFields();
                    return false;
                }
            });
        }
    },
}
</script>
