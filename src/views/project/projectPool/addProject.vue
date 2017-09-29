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
                                    <el-form-item label="项目简称" prop="projectShortName">
                                        <el-input v-model="basicForm.projectShortName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目类型" prop="projectType">
                                        <el-select v-model="basicForm.projectTypeId" filterable placeholder="请选择项目类型"  style="width:100%">
                                            <el-option v-for="item in $store.state.project.typeOptions" :key="item.id" :label="item.dicName" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="所属行业" prop="industry">
                                        <el-select v-model="basicForm.industryId" filterable placeholder="请选择所属行业"  style="width:100%">
                                            <el-option v-for="item in $store.state.project.industryOptions" :key="item.id" :label="item.dicName" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目来源" prop="projectFrom">
                                         <el-select v-model="basicForm.projectFromId" filterable placeholder="请选择项目来源"  style="width:100%">
                                            <el-option v-for="item in $store.state.project.fromOptions" :key="item.id" :label="item.dicName" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="所在地" prop="address">
                                        <el-select v-model="basicForm.addressId" filterable placeholder="请选择所在地" style="width:100%" :disabled="basicForm.flag">
                                            <el-option v-for="item in $store.state.project.addressOptions" :key="item.id" :label="item.dicName" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="业务部门" prop="department">
                                         <el-select v-model="basicForm.departmentId" filterable placeholder="请选择业务部门"  style="width:100%">
                                            <el-option v-for="item in $store.state.project.departmentOptions" :key="item.id" :label="item.deptName" :value="item.id">
                                            </el-option>
                                        </el-select>
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
                                    <el-form-item label="企业名称" prop="enterpriseName">
                                        <el-input v-model="companyForm.enterpriseName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="法人代表" prop="legalPerson">
                                        <el-input v-model="companyForm.legalPerson"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="注册资本（元）" prop="registeredCapital">
                                        <el-input v-model="companyForm.registeredCapital"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="实收资本（元）" prop="paiclCapital">
                                        <el-input v-model="companyForm.paiclCapital"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="注册登记日期" prop="registerDate">
                                        <el-date-picker type="date" v-model="companyForm.registerDate" style="width:100%">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="统一信用代码" prop="creditCode">
                                        <el-input v-model="companyForm.creditCode"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="注册地址" prop="registerAddress">
                                        <el-input v-model="companyForm.registerAddress"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="办公地址" prop="workAddress">
                                        <el-input v-model="companyForm.workAddress"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="主营业务" prop="mainBusiness">
                                        <el-input v-model="companyForm.mainBusiness"></el-input>
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

                                <el-button type="danger" size="small" @click="submitForm('basicForm')">保存</el-button>
                                <el-button type="default" size="small" @click="cancleForm">取消</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import { addPro, getDeptListByMid } from 'api/project';
import { getDicChildren } from 'common/js/dictionary'
const store = {
    isSubmit: false
}
export default {
    name: 'addProject',
    computed: mapGetters({
        typeOptions:'getTypeOptions',   // 获取项目类型
        industryOptions:'getIndustryOptions',   // 获取项目所属行业
        fromOptions:'getFromOptions',   // 获取项目来源
        addressOptions:'getAddressOptions',   // 获取项目所在地
        departmentOptions:'getDepartmentOptions',   // 获取业务部门
    }),
    watch: {
    },
    data() {
        return {
            dataNum: 3,
            basicForm: {
                projectName: '',
                projectShortName: '',
                projectTypeId: '',
                industryId: '',
                projectFromId: '',
                addressId: '',
                departmentId: '',
                projectLogo: ''
            },
            companyForm: {
                enterpriseName: '',
                legalPerson: '',
                registeredCapital: '',
                paiclCapital: '',
                registerDate: '',
                creditCode: '',
                registerAddress: '',
                workAddress: '',
                mainBusiness: '',
                remark: ''
            },
            addressOptions: [],
            typeOptions: [],
            industryOptions: [],
            fromOptions: [],
            departmentOptions: [],
            // 基本信息 form验证
            rules1: {
                projectName: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' }
                ],
                projectShortName: [
                    { required: true, message: '请输入项目简称', trigger: 'blur' }
                ],
                projectTypeId: [
                    { required: true, message: '请输入项目类型', trigger: 'blur' }
                ],
                industryId: [
                    { required: true, message: '请输入所属行业', trigger: 'blur' }
                ]
            },
            // 上传 企业LOGO
            defaultList: [
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
        this.$store.dispatch('getTypeOptions')
        this.$store.dispatch('getIndustryOptions')
        this.$store.dispatch('getFromOptions')
        this.$store.dispatch('getAddressOptions')
        this.$store.dispatch('getDepartmentOptions')
        this.init();
    },
    methods: {
        ...mapActions([
            "getTypeOptions",
            "getIndustryOptions",
            "getFromOptions",
            "getAddressOptions",
            "getDepartmentOptions"
         ]),
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
            // basicForm = this.changeBasicForm(basicForm);
            // companyForm = this.changeCompanyForm(companyForm);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (store.isSubmit) return;
                    store.isSubmit = true;
                    addPro({
                        basicForm: basicForm,
                        companyForm: basicForm
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
            this.$router.push({ name: 'projectPool' });
        },
        changeBasicForm(basicForm) {
            let obj = {
                projectName: basicForm.projectName,
                projectShortName: basicForm.projectShortName,
                addressId: basicForm.addressId,
                createPersonId: basicForm.createPersonId, // TODO: 此处应为项目负责人，而非创建者
                projectTypeId: basicForm.projectTypeId,
                industryId: basicForm.industryId,
                projectFromId: basicForm.projectFromId,
                departmentId: basicForm.departmentId,
                merchantId: this.merchantId
            }
            return obj;
        },
        changeCompanyForm(companyForm) {
            let obj = {
                page: 1,
                pageSize: 10,
                projectId: '',
                enterpriseName: companyForm.enterpriseName,
                legalPerson: companyForm.legalPerson,
                registeredCapital: companyForm.registeredCapital,
                paiclCapital: companyForm.paiclCapital,
                registerDate: companyForm.registerDate,
                creditCode: companyForm.creditCode,
                registerAddress: companyForm.registerAddress,
                workAddress: companyForm.workAddress,
                mainBusiness: companyForm.mainBusiness,
                remark: companyForm.remark
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
    min-height: 100%;
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
