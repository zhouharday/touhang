<template>
    <div class="c_left">
        <h1>{{ title }}</h1>
        <div id="month">
            <div class="title">
                <div class="date">
                    <i class="el-icon-d-arrow-left i1" @click="backyear"></i>
                    <i class="el-icon-arrow-left i2" @click="backmounth"></i>
                    <span>{{date.year}}年{{date.month+1}}月</span>
                    <i class="el-icon-arrow-right i3" @click="nextmounth"></i>
                    <i class="el-icon-d-arrow-right i4" @click="nextyear"></i>
                </div>
                <div class="week_title">
                    <span class="actives">Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span class="actives">Sat</span>
                </div>
                <div>
                    <span class="monthDateSpan">
                        <span v-for="(list,index) in monthDate" :key="list.index" @click="clickDate(index,list.day)">
                            <span @mouseover="getDate(list.have,list.time)" :class="{active:list.have,click:clickN==index,actives:list.week == 0 || list.week == 6,after: date}">
                                {{list.day}}
                            </span>
                        </span>
                        <div class="haveDate" v-show="have">
                            <div v-for="(item,index) in spanScheduleTitle" :key="item">
                                <p>{{item.startTime}}&nbsp;&nbsp;{{item.scheduleTitle}}</p>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </div>
        <!-- 添加日程模态框 -->
        <div class="scheduleBox">
            <el-dialog :title="checkTime" :visible.sync="scheduleDialog" :before-close="handleClose">
                <el-form :model="scheduleForm" label-position="top">
                    <el-row>
                        <el-col>
                            <el-form-item label="主题：" prop="theme">
                                <el-input placeholder="请输入日程主题" v-model="scheduleForm.title"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="时间：" prop="time">
                                <el-time-select v-model="scheduleForm.time" :picker-options="{ start: '08:30',step: '00:15',end: '18:30'}" placeholder="选择时间" style="width:100%">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <i style="width:100%;height:1px;border-bottom: 1px solid #f05e5e"></i>
                        </el-col>
                    </el-row>
                </el-form>
                <p style="border-bottom: 1px solid #f05e5e;margin-top:80px;"></p>
                <div slot="footer" class="dialog-footer">
                    <el-button type="default" @click="scheduleDialog = false">取消</el-button>
                    <el-button type="danger" @click="getScheduleListBtn">保存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    props: ["title", "monthDate"],
    computed: {
        user() {
            this.$store.state.login.merchants = JSON.parse(sessionStorage.getItem('merchants')) || {};
            this.$store.state.login.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
            return {
                merchants: this.$store.state.login.merchants,
                userInfor: this.$store.state.login.userInfor
            }
        }
    },
    created: function() {
        this.creattimetmp(new Date());
        // this.getData();
    },
    data: function() {
        return {
            spanScheduleTitle: [],
            have: false,
            objarr: [],
            arr: [],
            obj: {},
            dateMoveOver: false,
            getScheduleList: {},
            scheduleDialog: false,
            checkTime: '添加日程',
            scheduleForm: {
                title: '',
                time: ''
            },
            //左边日期
            date: {
                year: new Date().getFullYear(),
                month: new Date().getMonth()
            },
            //判断左边日期 是否可点击
            clickN: null,
            //需要返回的日期
            changeDate: "",
        }
    },
    methods: {
        //上一年
        backyear: function() {
            var self = this;
            self.date.year--;
            self.creattimetmp(+new Date(self.date.year, self.date.month, 1));
            this.changeDate = "";
            this.clickN = null;
            this.$emit("changetime", self.changeDate)
        },
        //下一年
        nextyear: function() {
            var self = this;
            self.date.year++;
            self.creattimetmp(+new Date(self.date.year, self.date.month, 1));
            this.changeDate = "";
            this.clickN = null;
            this.$emit("changetime", self.changeDate)
        },
        //上一个月
        backmounth: function() {
            var self = this;
            self.date.month--;
            if (self.date.month < 0) {
                self.date.month = 11;
                self.date.year--;
            }
            self.creattimetmp(+new Date(self.date.year, self.date.month, 1));
            this.changeDate = "";
            this.clickN = null;
            this.$emit("changetime", self.changeDate)
        },
        //下一个月
        nextmounth: function() {
            var self = this;
            self.date.month++;
            if (self.date.month > 11) {
                self.date.month = 0;
                self.date.year++;
            };
            self.creattimetmp(+new Date(self.date.year, self.date.month, 1));
            this.changeDate = "";
            this.clickN = null;
            this.$emit("changetime", self.changeDate)
        },
        creattimetmp: function(datas) {
            datas = datas ? datas : new Date();
            var date = new Date(datas)

            var year = date.getFullYear();
            var month = date.getMonth();
            var startDay = new Date(year, month, 1); //取当年当月中的第一天

            month++;
            if (month > 11) {
                year++;
                month = 0;
            }
            var new_date = new Date(year, month, 1); //取下月中的第一天

            var endDay = (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期

            var week = startDay.getDay();//获取 当月第一天的星期

            week = week == 0 ? 7 : week;


            var x = 1;//日历
            var arr = [];//

            var len = 35;//根据当月起始星期 以及天数判断多少容器
            if (week > 5 && endDay > 30) {
                len = 42;
            } else if (week > 6 && endDay >= 30) {
                len = 42;
            } else {
                len = 35;
            }

            for (var i = 0; i <= len; i++) {//循环容器
                if (i < week) {//如果小于起始星期 插入空数据
                    arr.push({
                        item: {},
                        empt: true
                    });
                } else if (x > endDay) {//如果大于起始星期 插入空数据
                    arr.push({
                        item: {},
                        empt: true
                    });
                } else {
                    var obj = {};//存放每天日期
                    obj.day = x;
                    month = month < 10 ? ("0" + parseInt(month)) : parseInt(month);
                    x = x < 10 ? ("0" + parseInt(x)) : parseInt(x);
                    obj.day = x;
                    obj.month = month;
                    obj.year = year;
                    obj.item = [];
                    obj.week = new Date(year, month - 1, x).getDay();
                    obj.empt = true;
                    obj.have = false;
                    obj.time = year + '-' + month + '-' + x;
                    arr.push(obj);
                    x++;
                }

            }
            // console.log(arr);
            this.objarr = arr;
            this.$emit("readyfun", arr, this.date);
        },
        getDate(have, time) { //moveOver Date
            if (!have) {
                this.have = false;
                return;
            };
            if (this.scheduleDialog) {
                this.have = false;
                return;
            };
            // this.$emit("readyfun", this.objarr, this.date);
            let self = this;
            var arr = [];
            const h = this.$createElement;
            // this.spanScheduleTitle = [];
            this.monthDate.map(item => {
                // item.item = [];
                if (time == item.time) {
                    console.log(item);
                    setTimeout(function() {
                        self.have = true;
                        this.spanScheduleTitle = [];
                    }, 2000);
                    this.spanScheduleTitle = [];
                    this.spanScheduleTitle = item.item;
                    console.log(this.spanScheduleTitle);
                    item.item.forEach(ele => {
                        // this.$msgbox({
                        //     title: '任务详情',
                        //     message: h('p', null, [
                        //         h('span', null, ele.startTime + ' '),
                        //         h('i', { style: 'color: teal' }, ele.scheduleTitle)
                        //     ]),
                        // });
                    });
                }
            });
        },
        //点击日期
        clickDate: function(index, n) {
            this.have = false;
            let new_scheduleForm = {
                title: '',
                time: ''
            };
            this.scheduleForm = new_scheduleForm;
            if (!n) {
                return;
            };
            var self = this;
            this.clickN = index;
            this.changeDate = this.date.year + "-" + (this.date.month + 1) + "-" + n;
            this.$emit("changetime", self.changeDate);
            this.checkTime = this.changeDate;
            this.scheduleDialog = !this.scheduleDialog;
            // this.have = !this.have;
        },

        getScheduleListBtn() {
            this.scheduleForm.time = this.checkTime + " " + this.scheduleForm.time;
            this.addSchedule();
            this.scheduleDialog = false;
            this.have = false;
        },
        addSchedule(title, time) { //添加日程 api
            this.$http.post(this.api + '/work/addSchedule', {
                "userId": this.user.userInfor.id,
                "scheduleTitle": this.scheduleForm.title,
                "startTime": this.scheduleForm.time,
                "merchantId": this.user.merchants[0].id
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {
                            // this.getData();
                            // console.log(res.data);
                            this.$emit("readyfun", this.objarr, this.date);
                            this.$route.push({name : 'homeContent'});
                            // this.getData();
                            this.$Message.success(res.data.message);
                        } else if (res.data.status == '403') {
                            this.$Message.error(res.data.message);
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error("请求超时");
                    console.log('请求超时');
                })
        },
         getData() { //获取日程列表 api
            this.$http.post(this.api + '/work/getScheduleList', {
                "userId": this.user.userInfor.id,
                "merchantId": this.user.merchants[0].id
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {
                            console.log('*******************************')
                            console.log(res.data)
                            // console.log(this.monthDate)
                            res.data.result.forEach(item => {
                                this.monthDate.map(list => {
                                    if (item.startTime.split(" ")[0] == list.time) {
                                        list.have = true;
                                        list.item.push(item);
                                    }
                                })
                            })
                        } else if (res.data.status == '403') {
                            this.$Message.error(res.data.message);
                        } else if (res.data.status == '49999') {
                            this.$Message.error(res.data.message);
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error("请求超时");
                })
        },
    }
}
</script>
<style scoped lang="less">
.monthDateSpan {
    position: relative;
    overflow: hidden;
    .haveDate {
        border-radius: 10px;
        z-index: 999;
        padding: 10px;
        position: absolute;
        width: 300px;
        height: auto;
        background: #faf;
    }
}
</style>
