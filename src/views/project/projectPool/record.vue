<template>
    <div class="recordBox">
        <div class="recordForm">
            <div class="top">
                <Input v-model="value" type="textarea" :rows="3" placeholder="请输入..."></Input>
            </div>
            <div class="bottom">
                <el-button type="danger" class="submit-btn" @click="submitRecord">提交</el-button>
            </div>
        </div>
        <div class="recordArea">
            <Timeline>
                <TimelineItem v-for="(item,index) in recordList" :key="item.index" class="recordContent">
                    <b>{{item.year}}</b>
                    <div class="recordText">
                        <p>
                            <span>{{item.userName}}</span>
                            <span>{{item.date}}</span>
                            <span>{{item.fileName}}</span>
                        </p>
                        <p>{{item.recordText}}</p>
                        <p>
                            <el-button type="text" class="delbtn" @click="delRecord(index)">删除</el-button>
                        </p>
                    </div>
                </TimelineItem>
            </Timeline>
        </div>
    </div>
</template>




<script type="text/ecmascript-6">
export default {
    data() {
        return {
            value: '',
            recordList: [
                {
                    userName: '张三',
                    date: '2018-5-9 12:25',
                    fileName: 'AAAAAAAA.doc',
                    recordText: '拜访客户，进行相关数据收集',
                    year: '2017'
                },
                {
                    userName: '张三',
                    date: '2018-5-9 12:25',
                    fileName: '',
                    recordText: '拜访客户，进行相关数据收集',
                    year: '2017'
                },
                {
                    userName: '张三',
                    date: '2018-5-9 12:25',
                    fileName: '',
                    recordText: '拜访客户，进行相关数据收集',
                    year: '2016'
                }
            ]
        }
    },
    methods: {
        submitRecord() {
            console.log(this.value);
            this.recordList.push(this.value);

        },
        delRecord(index) {
            this.recordList.splice(index,1);
        }

    }
}

</script>



<style  lang="less" scoped>
.recordBox {
    width: 100%;
    height: 100%;
    .recordForm {
        margin: 30px 0;
        .top {
            height: 95px;
            padding: 10px 20px;
            background: #2a3142;
        }
        .bottom {
            .submit-btn {
                width: 100%;
                height: 40px;
                color: #fff;
                font-size: 20px;
            }
        }
    }
    .recordArea {
        padding: 40px 100px;
        .recordContent {
            position: relative;
            b {
                position: absolute;
                top: -10px;
                left: -40px;
            }
            .recordText {
                position: relative;
                width: 90%;
                height: 110px;
                display: inline-block;
                font-size: 14px;
                vertical-align: middle;
                background: #eef0f4;
                margin-left: 30px;
                padding: 18px 80px;
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
