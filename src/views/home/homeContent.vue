<template>
    <section>
        <!-- 这是首页内容 -->
        <div>
            <div class="homeContent_top">
                <div>这是日期内容</div>
                <div>
                    <div>
                        <img src="/static/img/Notice.png" />
                        <span>{{RecentNotice}}</span>
                    </div>
                    <ul class="notice_ul">
                        <li v-for="( item,index ) in messageShow" :key="item.index">
                            <div>{{item.noRead}}</div>
                            <div>{{item.data}}</div>
                            <span>{{item.noticeMessage}}</span>
                        </li>
                    </ul>
                </div>
            </div>
    
            <div class="homeContent_botm">
                <div></div>
                <div></div>
            </div>
        </div>
    </section>
</template>

<style lang="less" scoped>
.homeContent_top {
    overflow: hidden;
    >div {
        width: 586px;
        height: 362px;
        background: #fff;
        padding: 16px 24px;
        float: left;
    }
    >div:nth-child(1) {
        margin-right: 24px;
    }
    >div:nth-child(2) {
        // float: left;
        >div {
            position: relative;
            >img {
                position: absolute;
                width: 20px;
                height: 20px;
            }
            >span {
                margin-left: 30px;
            }
        }
    }
    .notice_ul {
        font-size: 14px;
        overflow: hidden;
        height: 273px;
        li {
            margin-top: 16px;
            height: 50px;
            position: relative;
            >div:nth-child(1) {
                width: 52px;
                height: 24px;
                border-radius: 10px;
                background: #f05e5e;
                line-height: 24px;
                text-align: center;
                color: #fff;
                float: left;
                cursor: pointer;
            }
            >div:nth-child(2) {
                position: absolute;
                top: 26px;
                // left: 3px;
                width: 52px;
                height: 24px;
                line-height: 24px;
                text-align: center;
            }
            >span {
                display: block;
                margin-left: 70px;
            }
        }
    }
}

.homeContent_botm {
    overflow: hidden;
    margin-top: 10px;
    >div {
        // width: 586px;
        height: 416px;
        background: #fff;
        padding: 16px 24px;
        float: left;
    }
    >div:nth-child(1) {
        width: 876px;
        margin-right: 24px; // margin-top: 24px;
    }
    >div:nth-child(2) {
        width: 294px;
    }
}
</style>

<script>
export default {
    data() {
        return {
            RecentNotice: "最近通知",
            messageShow: [
                {
                    noRead: "未读",
                    data: "08-23",
                    noticeMessage: "由于公司大楼机电维修停电一天，公司与 2017-08-24~2017-08-25放假两天，2017-08-28正常上班。"
                },
                {
                    noRead: "未读",
                    data: "08-23",
                    noticeMessage: "由于公司大楼机电维修停电一天，公司与 2017-08-24~2017-08-25放假两天，2017-08-28正常上班。"
                },
                {
                    noRead: "未读",
                    data: "08-23",
                    noticeMessage: "由于公司大楼机电维修停电一天，公司与 2017-08-24~2017-08-25放假两天，2017-08-28正常上班。"
                },
                {
                    noRead: "未读",
                    data: "08-23",
                    noticeMessage: "由于公司大楼机电维修停电一天，公司与 2017-08-24~2017-08-25放假两天，2017-08-28正常上班。"
                }
            ],
        }
    }
}
</script>

