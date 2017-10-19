<template>
    <div class="eventBox">
        <el-form :model="eventForm" rules="rules1" :ref="eventForm" label-width="80px" class="eventForm">
            <el-form-item label="汇报事项" prop="issuesType">
                <el-select v-model="eventForm.issuesType" placeholder="请选择汇报事项" style="width: 100%;">
                    <el-option v-for="item in eventOptions" :key="item.key" :label="item.value" :value="item.key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="事项日期" prop="issuesDate">
                <el-date-picker type="date" placeholder="选择日期" v-model="eventForm.issuesDate" style="width:100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="事项内容" prop="issuesContent">
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="eventForm.issuesContent">
                </el-input>
            </el-form-item>
            <el-form-item label="相关文档">
                <Upload multiple type="drag" v-model="eventForm.documentInfo" action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52"></Icon>
                        <p>点击或将文件拖拽到这里上传</p>
                    </div>
                </Upload>
            </el-form-item>
            <el-button type="danger" class="submit-btn" @click="submitEvent">提交</el-button>
        </el-form>
        <div class="recordArea">
            <Timeline>
                <TimelineItem v-for="(item,index) in recordList" :key="item.index" class="recordContent">
                    <b>{{item.year}}</b>
                    <div class="recordText">
                        <p>
                            <span>{{item.issuesType | key2value(eventOptions, item.issuesType)}}</span>
                            <span style="margin-right:50px">{{item.issuesDate | formatDate}}</span>
                            <span>{{item.doc}}</span>
                            <el-button type="text" class="delbtn" @click="delEvent(item.id)">删除</el-button>
                        </p>
                        <p>{{item.issuesContent}}</p>
                        <p style="text-align:right">
                            <span>{{item.addUserName}}</span>
                            <span>{{item.createDate}}</span>
                        </p>
                    </div>
                </TimelineItem>
            </Timeline>
        </div>
    </div>
</template>

<script>
import '../../../common/js/filter'
import { changeDate } from '../../../common/js/config'
import {
    getEventList, addEvent, delEvent
} from 'api/projectAfter';
export default {
    props: {
        tabs: {
            type: Object,
            default: {}
        },
        projectId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            value: {
                text: ''
            },
            eventForm: {
                issuesType: '',
                issuesDate: '',
                issuesContent: ''
            },
            rules1: {
                issuesType: [
                    { required: true, message: '请选择汇报事项', trigger: 'blur' }
                ],
                issuesDate: [
                    { type: "date", required: true, message: '请选择事项日期', trigger: 'blur' }
                ],
                issuesContent: [
                    { required: true, message: '请输入事项内容', trigger: 'blur' }
                ]
            },
            recordList: [],
            eventOptions: [
                { //汇报事项列表
                    key: '1',
                    value: '上市进展'
                }, {
                    key: '2',
                    value: '重大股东会决议'
                },
                {
                    key: '3',
                    value: '重大董事会决议'
                }, {
                    key: '4',
                    value: '重大监事会决议'
                }, {
                    key: '5',
                    value: '重大投资事项'
                },
                {
                    key: '6',
                    value: '重大筹融资事项'
                }, {
                    key: '7',
                    value: '对赌执行情况'
                },
                {
                    key: '8',
                    value: '股权变更'
                }, {
                    key: '9',
                    value: '其他'
                }
            ]
        }
    },
    created() {
        // this.init();
    },
    watch: {
        'tabs':function (to,from){
            if(to.tabList[6]){
                this.init();
            }
        }
    },
    methods: {
        init() {
            this.getEventList();
        },
        getEventList() {
            //查询重大事项列表
            getEventList(this.projectId).then(resp => {
                if (resp.data.status == '200') {
                    let data = resp.data.result;
                    this.recordList=this.handleDatas(data);
                    this.recordList.push();
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('查询重大事项列表 error: ', e);
            });
        },
        handleDatas(data = []) {
            let _data = data;
            _data.forEach(item => {
                let date = new Date(item.issuesDate);
                item.year = date.getFullYear();
            });
            return _data;
        },
        //添加重大事件
        submitEvent() {
            let params = {
                projectId: this.projectId,
                issuesType: this.eventForm.issuesType,
                issuesDate: changeDate(this.eventForm.issuesDate),
                issuesContent: this.eventForm.issuesContent,
                documentInfo: []
            };
            addEvent(params).then(resp => {
                if (resp.data.status == '200') {
                    this.getEventList();
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('添加重大事件 error: ', e)
            });
        },
        //删除重大事件
        delEvent(id) {
            delEvent(id).then(resp => {
                if (resp.data.status == '200') {
                    this.getEventList();
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('删除重大事件 error: ', e);
            })
        }

    }
}

</script>

<style  lang="less" scoped>
.title {
    color: #fff;
}

.eventBox {
    width: 100%;
    height: 100%;
    .eventForm {
        padding: 0 50px;
        margin: 25px 0;
        .submit-btn {
            margin-left: 40%;
            width: 20%;
            color: #fff;
            margin-top: 5px;
        }
    }
    .recordArea {
        padding: 30px 120px;
        .recordContent {
            position: relative;
            b {
                position: absolute;
                top: -10px;
                left: -40px;
            }
            .recordText {
                position: relative;
                width: 95%;
                height: 120px;
                display: inline-block;
                font-size: 14px;
                vertical-align: middle;
                background: #eef0f4;
                margin-left: 30px;
                padding: 18px 50px;
                text-align: left;
                border-radius: 10px;
                &::before {
                    content: '';
                    width: 0;
                    height: 0;
                    position: absolute;
                    top: 40px;
                    left: -19px;
                    border-bottom: 20px solid #eef0f4;
                    border-left: 20px solid transparent;
                }
                p {
                    margin-bottom: 5px;
                    span {
                        margin-right: 20px;
                    }
                    .delbtn {
                        float: right;
                    }
                }
            }
        }
    }
}
</style>
