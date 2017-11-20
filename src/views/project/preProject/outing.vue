<template>
    <section class="outing">
        <el-form :model="outingForm" ref="outingForm" label-width="120px">
            <el-row>
                <el-col>
                    <el-form-item label="标题">
                        <el-input v-model="outingForm.exitTitle" auto-complete="off" :disabled="controlEdit"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="退出类型" prop="exitType" :rules="exitTypeRule">
                        <el-select v-model="outingForm.exitType" placeholder="请选择退出类型" :disabled="controlEdit" style="width:100%;">
                            <el-option v-for="item in outingSortOptions" :key="item.id" :label="item.dicName" :value="item.id" :disabled="controlEdit">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="退出金额（元）" prop="exitAmount">
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
                    <el-form-item label="经办日期" prop="exitDate" :rules="exitDateRule">
                        <el-date-picker type="date" @input="setExitDate" :editable="false" placeholder="选择日期" v-model="outingForm.exitDate" :disabled="controlEdit" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-table :data="outingForm.outingData2" border>
                <el-table-column label="基金名称" prop="fundName" align="center">
                </el-table-column>
                <el-table-column label="投资金额（元）" prop="investAmount" align="center">
                </el-table-column>
                <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                </el-table-column>
                <el-table-column label="回款金额（元）" prop="exitAmount" align="center">
                    <template scope="scope">
                        <el-form-item prop="exitAmount" :rules="amountRule" label-width="0px" height="100%">
                            <el-input v-model.number="scope.row.exitAmount" @input="sumExit" placeholder="请输入回款金额" :disabled="controlEdit"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        
        <el-row>
            <el-col style="margin-top:10px; text-align: center">
                <el-button v-if="checkProjectAuth('GL-XMTC-BJ')" type="default" v-show="isShow" @click="editForm">编 辑</el-button>
                <el-button v-if="checkProjectAuth('GL-XMTC-BJ')" type="danger" v-show="isShow" @click="confirmSave">保 存</el-button>
            </el-col>
        </el-row>
    </section>
</template>


<script>
import { mapGetters } from 'vuex'
import { getDicChildren } from 'common/js/dictionary'
import uploadFiles from 'components/uploadFiles'
import { changeDate, checkProjectAuth } from 'common/js/config'

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
        },
        isInTeam: {
            type: Boolean,
            default: false
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
                exitDate: ''
            },
            exitTypeRule: [
                { required: true, message: '请选择退出类型', trigger: 'blur' }
            ],
            exitDateRule: [
                { required: true, message: '请选择日期', trigger: 'blur' }
            ],
            amountRule:[
                { type: 'number', message: '回款金额必须是数字', trigger: 'blur, change' }
            ],
            outingData2: [],
            documentInfo:[]
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
        checkProjectAuth(code){
            return checkProjectAuth(code) && this.isInTeam;
        },
        init() {
            this.getExitDetail();
        },
        //获取退出单
        getExitDetail() {
            getExitDetail(this.proId).then(resp => {
                if (resp.data.status === '200') {
                    this.outingForm = resp.data.result.projectExit;
                    this.outingForm.exitDate = this.outingForm.exitDate ? this.outingForm.exitDate : changeDate(new Date());
                    let documentInfo = resp.data.result.projectExit.documentInfo;
                    if(documentInfo != null){
                        documentInfo.forEach(item => {
                            item.name = item.name == null ? item.fileName : item.name;
                            item.url = item.url == null ? item.filePath : item.url;
                        });
                    }
                    this.$set(this.$data.outingForm,'documentInfo',documentInfo);
                    let exitList = resp.data.result.projectExitList;
                    exitList.forEach((item)=>{
                        item.exitAmount = parseFloat((parseFloat(item.exitAmount) || 0.0).toFixed(2));
                    });
                    this.outingForm.outingData2 = exitList;
                    this.sumExit();
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
            this.$refs["outingForm"].validate((valid) => {
                if (valid) {
                    this.outingForm.projectId = this.proId;
                    this.outingForm.investBeforeId = this.$route.params.investProjectId;
                    this.outingForm.handlerUserId = (this.outingForm.handlerUserId != undefined && this.outingForm.handlerUserId != '')
                        ? this.outingForm.handlerUserId : JSON.parse(sessionStorage.getItem('userInfor')).id;

                    // this.outingForm.documentInfo = this.documentInfo;
                    let data = {
                        projectExit: this.outingForm,
                        projectExitList: this.outingForm.outingData2
                    };

                    // console.log('保存退出单: ' + JSON.stringify(data));
                    saveExit(this.outingForm, this.outingForm.outingData2).then(resp => {
                        if (resp.data.status == '200') {
                            // this.getExitDetail();
                            this.controlEdit = true;
                        }else{
                            this.$Message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('保存退出单 error: ', e);
                    })
                }
            });
        },
        sumExit() {
            let sum = 0.0;
            for (let i = 0; i < this.outingForm.outingData2.length; i++) {
                sum += parseFloat(this.outingForm.outingData2[i].exitAmount );
            }
            // this.outingForm.exitAmount = sum;
            this.$set(this.$data.outingForm, 'exitAmount', sum);
        },
        setExitDate(val) {
            this.$set(this.$data.outingForm, 'exitDate', '' + val);
        },
        uploadSuccess(documentInfo, dataName){
            this.$set(this.$data.outingForm, dataName, documentInfo);
        },
        removeSucess(documentInfo, dataName){
            this.$set(this.$data.outingForm, dataName, documentInfo);
        }
    }
}
</script>

<style lang="less" scoped>
.outing {
    width: 70%;
    margin: 0 auto;
    padding: 20px 10px;
    border: 2px solid #dfe6ec;
    border-radius: 10px;
    // display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
