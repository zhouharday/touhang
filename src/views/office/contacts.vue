<template>
    <section>
        <!-- 这是通讯录内容 -->
        <div class="contacts_list">
            <!-- 联系人list -->
            <div class="contacts_L">
                <div>

                    <div v-for="( item, index) in contacts_list" :key="item.index" @click="active(index,item)" :class="{'bag':ind === index}">
                        <ul>
                            <li>
                                <div>
                                    <img :src="item.src" alt="">
                                </div>
                                <div>
                                    <div>
                                        {{item.name}}
                                    </div>
                                    <div>
                                        {{item.name_bot}}
                                    </div>
                                </div>
                                <div>{{item.time}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="contacts_R">
                <el-row>
                    <div class="contacts_R_header">
                        <el-col :span="24">
                            <div class="grid-content bg-purple">
                                <div class="fl">
                                    <div><img :src="srcContent.src" alt=""></div>
                                    <div>
                                        <div>{{srcContent.name}}</div>
                                        <div>{{srcContent.title}}</div>
                                    </div>
                                </div>
                                <div>
                                    <el-button style="color:#fff;" type="text" @click="open">申请开通系统试用</el-button>
                                </div>
                            </div>
                        </el-col>
                    </div>
                </el-row>
                <el-row>
                    <div class="contacts_R_content">
                        <el-col :span="24">       
                        </el-col>
                    </div>
                </el-row>
                <el-row>
                    <div class="contacts_R_content">
                        <el-col :span="24">       
                        </el-col>
                    </div>
                </el-row>
            </div>
        </div>
    </section>
</template>

<style lang="less" scoped>
section {
    height: 93%;
}

.contacts_list {
    // background: #ffffff;
    height: 103%;
    overflow: hidden;
    .contacts_L {
        width: 20%;
        height: 100%;
        float: left;
        overflow: hidden;
        >div {
            float: left;
            width: 105%;
            height: 100%;
            overflow: scroll;
            border-right: 1px solid #ccc;
            background: #ffffff;
            overflow-x: hidden;
            >div {
                // overflow-y: scroll;
                width: 100%; // height: 100%;
                padding: 10px;
                >ul {
                    >li {
                        position: relative;
                        width: 100%;
                        height: 77px;
                        >div {
                            float: left;
                        }
                        >div:nth-child(1) {
                            border-radius: 50%;
                            margin-top: 15.5px;
                            margin-right: 15px;
                            >img {
                                width: 46px;
                                height: 46px;
                                display: inline-block;
                                // float: left;
                            }
                        }
                        >div:nth-child(2) {
                            >div:nth-child(1) {
                                position: absolute;
                                top: 13px;
                            }
                            >div:nth-child(2) {
                                position: absolute;
                                top: 40px;
                            }
                        }
                        >div:nth-child(3) {
                            position: absolute;
                            right: 23px;
                            top: 14px;
                        }
                    }
                }
            }
        }
    }
    .contacts_R {
        float: left;
        width: 80%;
        height: 60px; // border-bottom: 1px solid #ccc;
        // padding: 10px;
        box-sizing: border-box;
        position: relative;
        .contacts_R_header {
            width: 100%;
            height: 60px;
            padding: 10px;
            background: #ffffff;
            margin-bottom: 1px;
            .bg-purple {
                .fl {
                    >div {
                        float: left;
                    }
                }
                >div {
                    float: left;
                    >div {
                        // float: left;
                        img {
                            width: 46px;
                            height: 46px;
                            margin-right: 10px;
                        }
                    }
                }
                >div:nth-child(2) {
                    >button{
                        
                    }
                    position: absolute;
                    right: 13.5px;
                    top: 13.5px;
                    width: 135px;
                    height: 33px;
                    line-height: 33px;
                    text-align: center;
                    background: #f05e5e;
                    color: #ffffff;
                    border-radius: 15px;
                    font-size: 10px;
                    cursor: pointer;
                }
            }
        }
        .contacts_R_content {
            background: #ffffff;
            height: 600px;
        }
    }
}

.bag {
    background: #dee0e5;
}
</style>

<script>
export default {
    data() {
        return {
            ind: '',
            contacts_list: [
                {
                    src: "/static/img/my_tuxiang.png",
                    name: "张哲",
                    name_bot: "最新版昂",
                    time: "17:05"
                },
            ],
            srcContent: {
                src: "",
                name: "",
                title: "聚乐新能源集团-研发部总监"
            }
        }
    },
    methods: {
        active(index,item) {
            // console.log(item);
            this.ind = index;
            this.srcContent.src = item.src;
            this.srcContent.name = item.name;
            // this.srcContent.title = item.src;

        },
        open() {
            this.$alert('您好,我们已经收到您的试用申请,会尽快为提供优质的服务', '', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `action: ${action}`
                    });
                }
            });
        }
    },
}
</script>
