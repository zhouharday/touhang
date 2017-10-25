<template>
    <section class="outing">
        <el-form :model="outingForm" label-width="110px">
            <el-row>
                <el-col>
                    <el-form-item label="标题">
                        <el-input v-model="outingForm.exitTitle" auto-complete="off" :disabled="controlEdit"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="退出类型">
                        <el-select v-model="outingForm.exitType" placeholder="请选择退出类型" :disabled="controlEdit" style="width:100%;">
                            <el-option v-for="item in outingSortOptions" :key="item.id" :label="item.dicName" :value="item.id" :disabled="controlEdit">
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
                        <upload-files @uploadSuccess="uploadSuccess($event, 'documentInfo')" @removeSucess="removeSucess($event, 'documentInfo')" :documentInfo="outingForm.documentInfo"></upload-files>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="经办人">
                        <el-input placeholder="默认当前登陆用户" v-model="userName" auto-complete="off" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="经办日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="outingForm.exitDate" :disabled="controlEdit" style="width: 100%;">
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
                    <el-input v-model="scope.row.exitAmount" @input="sumExit" placeholder="请输入回款金额" :disabled="controlEdit">{{ scope.row.exitAmount | 0}}</el-input>
                </template>
            </el-table-column>
        </el-table>
        <el-row>
            <el-col style="margin-top:10px;">
                <el-button type="default" v-show="isShow" @click="editForm">编 辑</el-button>
                <el-button type="danger" v-show="isShow" @click="confirmSave">保 存</el-button>
            </el-col>
        </el-row>
    </section>
</template>


<script>
import { mapGetters } from 'vuex'
import { getDicChildren } from 'common/js/dictionary'
import uploadFiles from 'components/uploadFiles'

import {
    getExitDetail, saveExit
} from 'api/projectPre';
export default {
    computed: mapGetters({
        outingSortOptions: 'getOutingSortOptions',   // 获取退出类型
    }),
    props: {
        tabs: {
            type: Object,
            default: {}
        },
        proId: {
            type: String,
            default: ''
        }
    },
    components: {
        uploadFiles
    },
    data() {
        return {
            controlEdit: true,
            isShow: true,
            userName: JSON.parse(sessionStorage.getItem('userInfor')).name,
            outingForm: {
                id: '',
                projectId: '',
                investBeforeId: '',
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
            ],
            documentInfo:[
                {
                    type: '1',
                    name: '退出附件1.jpg',
                    url: 'http://www.xxx.com/img1.jpg',
                    fileName: '退出附件1.jpg',
                    filePath: 'http://www.xxx.com/img1.jpg'
                },
                {
                    type: '1',
                    name: '退出附件2.jpg',
                    url: 'http://www.xxx.com/img2.jpg',
                    fileName: '退出附件2.jpg',
                    filePath: 'http://www.xxx.com/img1.jpg'
                },
                {
                    type: '1',
                    name: '退出附件3.jpg',
                    url: 'http://www.xxx.com/img2.jpg',
                    fileName: '退出附件3.jpg',
                    filePath: 'http://www.xxx.com/img1.jpg'
                }
            ]
        }
    },
    created() {
        this.$store.dispatch('getOutingSortOptions');
        // this.init();
    },
    watch: {
        'tabs':function (to,from){
            if(to.tabList[7]){
                this.init();
            }
        }
    },
    methods: {
        init() {
            this.getExitDetail();
        },
        //获取退出单
        getExitDetail() {
            getExitDetail(this.proId).then(resp => {
                if (resp.data.status === '200') {
                    this.outingForm = resp.data.result.projectExit;
                    this.outingData2 = resp.data.result.projectExitList
                }
            }).catch(e => {
                console.log('获取退出单 error: ', e);
            })
        },
        // 编辑退出单
        editForm() {
            this.controlEdit = !this.controlEdit;
        },
        // 保存退出单
        confirmSave() {
            this.outingForm.projectId = this.proId;
            this.outingForm.investBeforeId = this.$route.params.investProjectId;
            this.outingForm.handlerUserId = (this.outingForm.handlerUserId != undefined && this.outingForm.handlerUserId != '')
                ? this.outingForm.handlerUserId : JSON.parse(sessionStorage.getItem('userInfor')).id;

            this.outingForm.documentInfo = this.documentInfo;
            let data = {
                projectExit: this.outingForm,
                projectExitList: this.outingData2
            };

            console.log('保存退出单: ' + JSON.stringify(data));
            saveExit(this.outingForm, this.outingData2).then(resp => {
                if (resp.data.status == '200') {
                    this.getExitDetail();
                    this.controlEdit = true;
                }else{
                    this.$Message.error(resp.data.message);
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
        },
        uploadSuccess(documentInfo, dataName){
            this.$set(this.$data, dataName, documentInfo);
        },
        removeSucess(documentInfo, dataName){
            this.$set(this.$data, dataName, documentInfo);
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
