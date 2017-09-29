<template>
    <div class="recordBox">
        <tabel-header :data="headerInfo_record" class="title"></tabel-header>
        <div class="recordForm">
            <Input v-model="value.recordText" type="textarea" :rows="5" placeholder="请输入文本内容..."></Input>
            <el-button type="danger" class="submit-btn" @click="submitRecord">提交</el-button>
        </div>
        <div class="recordArea">
            <Timeline>
                <TimelineItem v-for="(item,index) in recordList" :key="item.index" class="recordContent">
                    <b>{{item.year}}</b>
                    <div class="recordText">
                        <p>
                            <span>{{item.username}}</span>
                            <span>{{item.createDate}}</span>
                        </p>
                        <p>{{item.seedInfo}}</p>
                        <p>
                            <el-button type="text" class="delbtn" @click="delRecord(index, item)">删除</el-button>
                        </p>
                    </div>
                </TimelineItem>
            </Timeline>
        </div>
    </div>
</template>
<script>
// import { mapState } from 'vuex'
import tabelHeader from 'components/tabelHeader'
import { getRecords, addRecord, delRecord } from 'api/project';

const STATUS_NORMAL = 1; // 正常
const STATUS_DELETE = 2; // 删除

export default {
    // computed: mapState({
    //     userName(state) {
    //         state.login.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
    //         return state.login.userInfor;
    //     }
    // }),
    data() {
        return {
            userName: "",
            // sysDate: this.getSysDate(),
            headerInfo_record: {
                desc: '记录'
            },
            value: {
                sysDate: this.getSysDate(),
                recordText: '',
                year: '2017'
            },
            recordList: []
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.initInfo();
            this.getDatas();
        },
        getDatas() {
            // TODO: 1是否是对的
            getRecords(this.projectId, STATUS_NORMAL).then(resp => {
                let data = resp.data.result;
                this.recordList = this.handleDatas(data);
            }).catch(e => {
                console.log('getDatas exists error: ', e);
            })
        },
        handleDatas(data) {
            let _data = [];
            data.forEach(item => {
                let year = item.year;
                let date = item.date;
                date.forEach(_item => {
                    _item.year = year;
                    _data.push(_item);
                })
            });
            return _data;
        },
        initInfo() {
            let merchants = JSON.parse(window.sessionStorage.getItem('merchants') || '[]');
            let info = JSON.parse(sessionStorage.getItem('userInfor') || '{}');
            let href = window.location.href;
            let id = href.substr(href.lastIndexOf('/') + 1, href.length);

            this.$store.state.login.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
            this.userName = this.$store.state.login.userInfor.name;
            this.merchantId = merchants[0].id;
            this.addProjectUserId = info.id;
            this.projectId = id;
        },
        submitRecord() {
            let value = this.value;
            let data = this.getSysDate();
            let record = {
                projectId: this.projectId,
                seedUserId: this.addProjectUserId,
                merchantId: this.merchantId,
                seedInfo: value.recordText,
                recordType: 1 // TODO: 提交记录类型，此处为项目池记录，具体值未知
            };
            addRecord(record).then(resp => {
                //console.log('resp: ', resp);
                // TODO: 动态添加的话，需要返回当前保存的信息,目前暂时做刷新列表
                //this.recordList.push(value);
                this.resetInput();
                this.getDatas();
            }).catch(e => {
                console.log('addRecord exists error: ', e)
            });
        },
        resetInput() {
            this.value.recordText = '';
        },
        delRecord(index, item) {
            delRecord(item.id, STATUS_DELETE).then(resp => {
                console.log('del resp: ', resp);
                let data = resp.data;
                if (+data.status === 200) {
                    this.recordList.splice(index, 1);
                }
            }).catch(e => {
                console.log('delRecord exists error: ', e);
            });
        },
        getSysDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
                " " + date.getHours() + seperator2 + date.getMinutes() +
                seperator2 + date.getSeconds();
            return currentdate;
        }
    },
    components: {
        tabelHeader
    }
}

</script>
<style lang="less" scoped>
.title {
    color: #fff;
}

.recordBox {
    width: 100%;
    height: 100%;
    .recordForm {
        margin: 25px 0;
        overflow: hidden;
        .submit-btn {
            width: 10%;
            float: right;
            color: #fff;
            margin-top: 15px;
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
                width: 90%;
                height: 110px;
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
