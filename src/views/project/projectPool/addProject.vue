<template>
    <div class="addProject">
        <div class="addProjectContents">
            <section class="editAddProject">
                <h3>新增项目</h3>
                <div class="addForm">
                    <div class="basicForm">
                        <el-form ref="basicForm" :rules="rules1" :model="basicForm" label-width="120px">
                            <el-row>
                                <el-col class="title">
                                    <div>基本信息</div>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目名称" prop="projectName">
                                        <el-input v-model="basicForm.projectName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目简称" prop="shortName">
                                        <el-input v-model="basicForm.shortName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目类型" prop="projectSort">
                                        <el-input v-model="basicForm.projectSort"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="所属行业" prop="industry">
                                        <el-input v-model="basicForm.industry"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目来源" prop="origin">
                                        <el-input v-model="basicForm.origin"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="所在地" prop="location">
                                        <el-input v-model="basicForm.location"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="业务部门" prop="department">
                                        <el-input v-model="basicForm.department"></el-input>
                                    </el-form-item>
                                </el-col>
                                <!-- 上传 企业LOGO -->
                                <el-col>
                                    <el-form-item label="企业LOGO" prop="logo">
                                        <div class="demo-upload-list" v-for="item in uploadList" :key="item.index">
                                            <template v-if="item.status === 'finished'">
                                                <img :src="item.url">
                                                <div class="demo-upload-list-cover">
                                                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                            </template>
                                        </div>
                                        <Upload ref="upload" v-modeel="basicForm.logo" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action="//jsonplaceholder.typicode.com/posts/" style="display: inline-block;width:58px;">
                                            <div style="width: 58px;height:58px;line-height: 58px;">
                                                <Icon type="camera" size="20"></Icon>
                                            </div>
                                        </Upload>
                                        <Modal title="查看图片" v-model="visible">
                                            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                                        </Modal>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="companyForm">
                        <el-form ref="form" :model="companyForm" label-width="120px">
                            <el-row>
                                <el-col class="title">
                                    <div>企业信息</div>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="企业名称" prop="companyName">
                                        <el-input v-model="companyForm.companyName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="法人代表" prop="delegate">
                                        <el-input v-model="companyForm.delegate"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="注册资本（元）" prop="regCapital">
                                        <el-input v-model="companyForm.regCapital"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="实收资本（元）" prop="paidCapital">
                                        <el-input v-model="companyForm.paidCapital"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="注册登记日期" prop="regDatetime">
                                        <el-date-picker type="date" v-model="companyForm.regDatetime" style="width:100%">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="统一信用代码" prop="creditCode">
                                        <el-input v-model="companyForm.creditCode"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="注册地址" prop="regAddress">
                                        <el-input v-model="companyForm.regAddress"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="办公地址" prop="workingSite">
                                        <el-input v-model="companyForm.workingSite"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="主营业务" prop="service">
                                        <el-input v-model="companyForm.service"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="备注" prop="remark">
                                        <el-input v-model="companyForm.remark"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="formBtn">
                        <el-row>
                            <el-col style="display:flex;justify-content:flex-end;">
                                <el-button type="danger" @click="submitForm('basicForm')">保存</el-button>
                                <el-button type="danger" @click="cancleForm">取消</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>


<script>
import { addPro } from 'api/project';
const store = {
    isSubmit: false
}
export default {
    name: 'addProject',
    data() {
        return {
            dataNum: 3,
            basicForm: {
                projectName: '',
                shortName: '',
                projectSort: '',
                industry: '',
                origin: '',
                location: '',
                department: '',
                logo: ''
            },
            companyForm: {
                companyName: '',
                delegate: '',
                regCapital: '',
                paidCapital: '',
                regDatetime: '',
                creditCode: '',
                regAddress: '',
                workingSite: '',
                service: '',
                remark: ''
            },
            // 基本信息 form验证
            rules1: {
                projectName: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' }
                ],
                shortName: [
                    { required: true, message: '请输入项目简称', trigger: 'blur' }
                ],
                projectSort: [
                    { required: true, message: '请输入项目类型', trigger: 'blur' }
                ],
                industry: [
                    { required: true, message: '请输入所属行业', trigger: 'blur' }
                ]
            },
            // 上传 企业LOGO
            defaultList: [
                {
                    'name': 'a42bdcc1178e62b4694c830f028db5c0',
                    'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                },
                {
                    'name': 'bc7521e033abdd1e92222d733590f104',
                    'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                }
            ],
            imgName: '',
            visible: false,
            uploadList: []
        }
    },
    mounted() {
        // 上传 企业LOGO
        this.uploadList = this.$refs.upload.fileList;
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.initInfo();
        },
        initInfo() {
            let merchants = JSON.parse(window.sessionStorage.getItem('merchants') || '[]');
            let info = JSON.parse(sessionStorage.getItem('userInfor') || '{}');
            this.merchantId = merchants[0].id;
            this.addProjectUserId = info.id;
        },
        submitForm(formName) {
            let basicForm = this.basicForm;
            let companyForm = this.companyForm;
            basicForm = this.changeBasicForm(basicForm);
            companyForm = this.changeCompanyForm(companyForm);
            // console.log('basicForm: ', basicForm, companyForm);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (store.isSubmit) return;
                    store.isSubmit = true;
                    addPro({
                        merchantId: this.merchantId,
                        projectInfo: basicForm,
                        enterpriseInfo: companyForm
                    }).then(resp => {
                        store.isSubmit = false;
                        console.log('resp: ', resp);
                        // this.addTab('项目池', '/home/projectPool', 'projectPool');
                        // this.$router.push({ name: 'projectPool' });
                    }).catch(e => {
                        console.log(e);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            // this.addTab('项目池', '/home/projectPool', 'projectPool');
            // this.$router.push({ name: 'projectPool' });
        },
        changeBasicForm(basicForm) {
            let obj = {
                projectName: basicForm.projectName,
                projectShortName: basicForm.shortName,
                addressId: basicForm.location,
                createPersonId: basicForm.manager, // TODO: 此处应为项目负责人，而非创建者
                projectTypeId: basicForm.projectSort,
                industryId: basicForm.industry,
                projectFromId: basicForm.origin,
                departmentId: basicForm.department,
                merchantId: this.merchantId
            }
            return obj;
        },
        changeCompanyForm(companyForm) {
            let obj = {
                page: 1,
                pageSize: 10,
                projectId: '',
                enterpriseName: companyForm.companyName,
                legalPerson: companyForm.delegate,
                registeredCapital: companyForm.regCapital,
                paiclCapital: companyForm.paidCapital,
                registerDate: companyForm.regDatetime,
                creditCode: companyForm.creditCode,
                registerAddress: companyForm.regAddress,
                workAddress: companyForm.workingSite,
                mainBusiness: companyForm.service,
                remark: companyForm.remark,
                logo: companyForm.logo
            }
            return obj;
        },
        cancleForm() {
            this.isShow = true;
            this.isHide = false;
        },
        addTab(th, url, name) {
            this.$store.commit({ type: 'addTab', title: th, url: url, name: name });
        },
        // 上传 企业LOGO 的方法
        handleView(name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove(file) {
            // 从 upload 实例删除数据
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess(res, file) {
            // 因为上传过程为实例，这里模拟添加 url
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
        handleBeforeUpload() {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: '最多只能上传 5 张图片。'
                });
            }
            return check;
        }
    },
}
</script>

<style lang="less" scoped>
.addProject {
    .addProjectContentf {
        width: 100%;
        height: 650px;
        padding: 50px 20px;
        font-size: 14px;
        background: #fff;
        .searchAddProject {
            .inputSearch {
                div {
                    margin-left: 15px;
                    cursor: pointer;
                }
            }
            .text {
                margin: 40px 0 30px 0;
                padding-bottom: 3px;
                border-bottom: 2px solid #F05E5E;
                span {
                    color: #F05E5E;
                    border-bottom: 1px solid #F05E5E;
                    cursor: pointer;
                }
            }
            .dataList {
                .dataBox {
                    h3 {
                        margin: 5px 0;
                    }
                    p {
                        height: 200px;
                        overflow: hidden;
                        padding-bottom: 5px;
                        text-indent: 20px;
                        text-align: left;
                    }
                }
            }
        }
    }
    .addProjectContents {
        width: 100%; // height: 800px;
        padding: 20px;
        font-size: 14px;
        background: #fff;
        h3 {
            margin-bottom: 20px;
        }
        .editAddProject {
            .title {
                width: 100%;
                height: 42px;
                line-height: 42px;
                background: #2a3142;
                color: #fff;
                padding: 0 26px;
                margin-bottom: 12px;
            }
        } //  上传 企业LOGO 的样式设置
        .demo-upload-list {
            display: inline-block;
            width: 60px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            border: 1px solid transparent;
            border-radius: 4px;
            overflow: hidden;
            background: #fff;
            position: relative;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
            margin-right: 4px;
        }
        .demo-upload-list img {
            width: 100%;
            height: 100%;
        }
        .demo-upload-list-cover {
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, .6);
        }
        .demo-upload-list:hover .demo-upload-list-cover {
            display: block;
        }
        .demo-upload-list-cover i {
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            margin: 0 2px;
        }
    }
}
</style>
