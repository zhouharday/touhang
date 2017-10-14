<template>
    <div class="eventBox">
        <el-form :model="eventForm" label-width="80px" class="eventForm">
            <el-form-item label="汇报事项">
                <el-select v-model="eventForm.event" placeholder="请选择汇报事项" style="width: 100%;">
                    <el-option v-for="item in eventOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="事项日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="eventForm.date" style="width:100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="事项内容">
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="eventForm.content">
                </el-input>
            </el-form-item>
            <el-form-item label="相关文档">
                <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52"></Icon>
                        <p>点击或将文件拖拽到这里上传</p>
                    </div>
                </Upload>
            </el-form-item>
            <el-button type="danger" class="submit-btn" @click="submitRecord">提交</el-button>
        </el-form>
        <div class="recordArea">
            <Timeline>
                <TimelineItem v-for="(item,index) in recordList" :key="item.index" class="recordContent">
                    <b>{{item.year}}</b>
                    <div class="recordText">
                        <p>
                            <span>{{item.event}}</span>
                            <span style="margin-right:50px">{{item.date}}</span>
                            <span>{{item.doc}}</span>
                            <el-button type="text" class="delbtn" @click="delRecord(index)">删除</el-button>
                        </p>
                        <p>{{item.recordText}}</p>
                        <p style="text-align:right">
                            <span>{{item.userName}}</span>
                            <span>{{item.eventTime}}</span>
                        </p>
                    </div>
                </TimelineItem>
            </Timeline>
        </div>
    </div>
</template>

<script>
import {
    getEventList, addEvent, delEvent
} from 'api/projectAfter';
export default {
    props: {
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
                event: '',
                date: '',
                content: ''
            },
            eventOptions: [
                 { //汇报事项列表
                    value: '选项1',
                    label: '上市进展'
                }, {
                    value: '选项2',
                    label: '重大股东会决议'
                },
                {
                    value: '选项3',
                    label: '重大董事会决议'
                }, {
                    value: '选项4',
                    label: '重大监事会决议'
                }, {
                    value: '选项5',
                    label: '重大投资事项'
                },
                {
                    value: '选项6',
                    label: '重大筹融资事项'
                }, {
                    value: '选项7',
                    label: '对赌执行情况'
                },
                {
                    value: '选项8',
                    label: '股权变更'
                }, {
                    value: '选项9',
                    label: '其他'
                }
            ],
            recordList: [
                {
                    userName: '张三',
                    event: '重大筹融资事项',
                    date: '2018-9-9',
                    recordText: '拜访客户，进行相关数据收集',
                    doc:'AAAAAA.doc',
                    year: '2017',
                    eventTime: '2018-5-9 12:25'
                },
                {
                    userName: '张三',
                    event: '重大董事事项',
                    date: '2018-9-9 ',
                    recordText: '拜访客户，进行相关数据收集',
                    doc:'AAAAAA.doc',
                    year: '2017',
                    eventTime: '2018-5-9 12:25'
                },
                {
                    userName: '张三',
                    event: '重大股东事项',
                    date: '2018-9-9 ',
                    recordText: '拜访客户，进行相关数据收集',
                    doc:'AAAAAA.doc',
                    year: '2016',
                    eventTime: '2018-5-9 12:25'
                }
            ]
        }
    },
    created() {
        init();
    },
    methods: {
        init(){
            //查询重大事项列表
            getEventList(this.projectId).then(resp => {
                if(resp.data.status == '200'){
                    this.recordList = resp.data.result || [];
                }else{
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('查询重大事项列表 error: ', e);
            });
        },
        submitRecord() {
            console.log(this.value);
            this.recordList.push(this.value);

        },
        delRecord(index) {
            this.recordList.splice(index, 1);
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
