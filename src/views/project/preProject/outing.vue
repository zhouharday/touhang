<template>
    <section class="outing">
        <el-form :model="outingForm" label-width="110px">
            <el-row>
                <el-col>
                    <el-form-item label="标题">
                        <el-input v-model="outingForm.exitTitle" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="退出类型">
                        <el-select v-model="outingForm.exitType" placeholder="请选择退出类型" style="width:100%;">
                            <el-option v-for="item in outingSortOptions" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="退出金额（元）">
                        <el-input v-model="outingForm.exitAmount" auto-complete="off" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="相关附件">
                        <!-- action 上传的地址，必填 -->
                        <Upload multiple type="drag" :before-upload="handleUpload" v-model="outingForm.relativedAppendix" action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="经办人">
                        <el-input placeholder="默认当前登陆用户" v-model="userName" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="经办日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="outingForm.exitDate" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table :data="outingData2" border>
            <el-table-column label="基金名称" prop="fundName" align="center">
            </el-table-column>
            <el-table-column label="投资金额（元）" prop="investAmount" align="center">
            </el-table-column>
            <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
            </el-table-column>
            <el-table-column label="回款金额（元）" prop="exitAmount" align="center">
                <template scope="scope">
                    <el-input v-model="scope.row.exitAmount" @input="sumExit" placeholder="请输入回款金额">{{ scope.row.exitAmount | 0}}</el-input>
                </template>
            </el-table-column>
        </el-table>
        <el-row>
            <el-col style="margin-top:10px;">
                <el-button type="default"  v-show="isShow">取 消</el-button>
                <el-button type="danger"  v-show="isShow" @click="confirmSave">保 存</el-button>
            </el-col>
        </el-row>
    </section>
</template>


<script>
import { mapGetters } from 'vuex'
import { getDicChildren } from 'common/js/dictionary'
import {
    getExitDetail, saveExit
} from 'api/projectPre';
export default {
    computed: mapGetters({
        outingSortOptions: 'getOutingSortOptions',   // 获取退出类型
    }),
    props: {
        proId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isShow: true,
            userName: JSON.parse(sessionStorage.getItem('userInfor')).name,
            outingForm: {
                id:'',
                projectId:'',
                investBeforeId:'',
                exitType: '',
                exitAmount: '',
                relativedAppendix: '',
                handlerUserId: '',
                exitDate: '',
            },
            outingData2: [
                {
                    id: "",//本条记录id 修改时需要
                    fundId: "",//基金id
                    fundName: "",//基金名称
                    projectExitId: "",
                    investAmount: '',//投资金额
                    stockRatio: '',//股权占比
                    exitAmount: "300",//回款金额
                    detailsStatus: 1,
                    editFlag: false
                }
            ]
        }
    },
    created() {
        this.$store.dispatch('getOutingSortOptions');
        this.init();
    },
    methods: {
        init() {
            this.getExitDetail();
        },
        //获取退出单
        getExitDetail(){
            getExitDetail(this.proId).then(resp => {
                if (resp.data.status === '200') {
                    this.outingForm = resp.data.result.projectExit;
                    this.outingData2 = resp.data.result.projectExitList
                }
            }).catch(e => {
                console.log('获取退出单 error: ', e);
            })
        },
        // 保存退出单
        confirmSave() {
            this.isShow = !this.isShow;
            this.outingForm.projectId = this.proId;
            this.outingForm.investBeforeId = this.$route.params.investProjectId;
            this.outingForm.handlerUserId = (this.outingForm.handlerUserId != undefined && this.outingForm.handlerUserId != '')
                                ? this.outingForm.handlerUserId : JSON.parse(sessionStorage.getItem('userInfor')).id;
            let data = {
                projectExit: this.outingForm,
                projectExitList: this.outingData2
            };

            console.log('保存退出单: '+ JSON.stringify(data));
            saveExit(this.outingForm, this.outingData2).then(resp => {
                if (resp.data.status == '200') {
                    this.getExitDetail();
                }
            }).catch(e => {
                console.log('保存退出单 error: ', e);
            })
        },
        sumExit() {
            let sum = 0.0;
            for (let i = 0; i < this.outingData2.length; i++) {
                sum += (parseFloat(this.outingData2[i].exitAmount | 0));
            }
            this.outingForm.exitAmount = sum;
        }
    }
}
</script>

<style lang="less" scoped>
.outing {
    width: 60%;
    margin: 0 auto;
    padding: 20px 10px;
    border: 2px solid #dfe6ec;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
