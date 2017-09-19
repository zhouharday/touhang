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
                            <span>{{userName}}</span>
                            <span>{{item.sysDate}}</span>
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
import { mapState } from 'vuex'
import tabelHeader from 'components/tabelHeader'
export default {
    created() {
        this.$store.state.login.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
        this.userName = this.$store.state.login.userInfor.name;
    },
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
            recordList: [
                {
                    recordText: '拜访客户，进行相关数据收集',
                    year: '2017'
                }
            ]
        }
    },
    methods: {
        submitRecord() {
            console.log(this.value);
            this.getSysDate();
            this.recordList.push(this.value);

        },
        delRecord(index) {
            this.recordList.splice(index, 1);
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
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
            return currentdate;
        }
    },
    components: {
        tabelHeader
    }
}

</script>



<style  lang="less" scoped>
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
