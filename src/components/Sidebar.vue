<template>
    <div class="scllor">
        <div class="sidebar">
            <div class="portrait">
                <div class="portrait-top">
                    <img src="/static/img/默认头像.png">
                </div>
                <div class="user">
                    <div style="margin-top:55px;">
                        <div>你好， 大乔 !</div>
                        <div>Administor</div>
                    </div>
                </div>
            </div>
            <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router @open="handleOpen" @close="handleClose">
                <el-submenu index="1">
                    <template slot="title" style="height:50px;line-height:50px;" class="title">
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/office.png" />
                        <span>{{title_01}}</span>
                    </template>
                    <el-menu-item index="task" @click="addTab(title1,'/home/task','task')">{{title1}}</el-menu-item>
                    <!-- <el-menu-item index="schedule" @click="addTab(title2,'/home/schedule','schedule')">{{title2}}</el-menu-item> -->
                    <el-menu-item index="contacts" @click="addTab(title3,'/home/contacts','contacts')">{{title3}}</el-menu-item>
                    <el-menu-item index="messageShow" @click="addTab(title4,'/home/messageShow','messageShow')">{{title4}}</el-menu-item>
                </el-submenu>
                <div class="div_el-menu-itemel-submenu__title" @click="addTab(title_02,'/home/assistant','assistant')">
                    <!-- <i style="margin-right:7px;" class="el-icon-menu"></i>
                        领投助手 -->
                    <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/zhushou.png" />
                    <span index="assistant">{{title_02}}</span>
                    <!-- <router-link to="/home/assistant" index="assistant" @click="addTab(title_02,'/home/assistant','assistant')" >{{title_02}}</router-link> -->
                </div>
                <el-submenu index="3">
                    <template slot="title">
                        <!-- <i class="el-icon-date"></i>项目管理</template> -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/project.png" />
                        <span>{{title_03}}</span>
                    </template>
    
                    <el-menu-item index="projectPool" @click="addTab(title5,'/home/projectPool','projectPool')">{{title5}}</el-menu-item>
                    <el-menu-item index="">{{title6}}</el-menu-item>
                    <el-menu-item index="">{{title7}}</el-menu-item>
                    <el-menu-item index="">{{title8}}</el-menu-item>
                    <el-menu-item index="">{{title9}}</el-menu-item>
                    <el-menu-item index="">{{title10}}</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <!-- <i class="el-icon-star-on"></i>基金管理 -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/project_manger.png" />
                        <span>{{title_04}}</span>
                    </template>
                    <el-menu-item index="">{{title11}}</el-menu-item>
                    <el-menu-item index="">{{title12}}</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
    
                    <template slot="title">
                        <!-- <i class="el-icon-star-on"></i>投资者管理 -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/touzizhe.png" />
                        <span>{{title_05}}</span>
                    </template>
                    <el-menu-item index="">{{title13}}</el-menu-item>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
                        <!-- <i class="el-icon-star-on"></i>综合查询 -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/survey.png" />
                        <span>{{title_06}}</span>
                    </template>
                    <el-menu-item index="">{{title14}}</el-menu-item>
                    <el-menu-item index="">{{title15}}</el-menu-item>
                    <el-menu-item index="">{{title16}}</el-menu-item>
                    <el-menu-item index="">{{title17}}</el-menu-item>
                    <el-menu-item index="">{{title18}}</el-menu-item>
                </el-submenu>
                <!-- <el-submenu index="7">
                        <template slot="title">
                            <i class="el-icon-star-on"></i>统计分析</template>
                    </el-submenu> -->
                <div class="div_el-menu-itemel-submenu__title">
                    <!-- <i style="margin-right:7px;" class="el-icon-menu"></i>
                        统计分析 -->
                    <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/sys_analysis.png" />
                    <span>{{title_07}}</span>
                </div>
                <el-submenu index="8">
                    <template slot="title">
                        <!-- <i class="el-icon-star-on"></i>系统管理 -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/sys_mang.png" />
                        <span>{{title_08}}</span>
                    </template>
                    <el-menu-item index="">{{title19}}</el-menu-item>
                    <el-menu-item index="">{{title20}}</el-menu-item>
                    <el-menu-item index="">{{title21}}</el-menu-item>
                    <el-menu-item index="">{{title22}}</el-menu-item>
                    <el-menu-item index="">{{title23}}</el-menu-item>
                    <el-menu-item index="">{{title24}}</el-menu-item>
                    <el-menu-item index="">{{title25}}</el-menu-item>
                    <el-menu-item index="">{{title26}}</el-menu-item>
                </el-submenu>
                <el-submenu index="9">
                    <template slot="title">
                        <!-- <i class="el-icon-star-on"></i>平台管理 -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/wangluo.png" />
                        <span>{{title_09}}</span>
                    </template>
                    <el-menu-item index="">{{title27}}</el-menu-item>
                    <el-menu-item index="">{{title28}}</el-menu-item>
                    <el-menu-item index="">{{title29}}</el-menu-item>
                    <el-menu-item index="">{{title30}}</el-menu-item>
                    <el-menu-item index="">{{title31}}</el-menu-item>
                    <el-menu-item index="">{{title32}}</el-menu-item>
                    <el-menu-item index="">{{title33}}</el-menu-item>
                    <el-menu-item index="">{{title34}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { mapState} from 'vuex'
export default {
    computed: mapState({
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    }),    
    data() {
        return {
            title_01: '日常办公',
            title1: '任务',
            title2: '日程',
            title3: '通讯录',
            title4: '消息公告',
            title_02: '领投助手',
            title_03: '项目管理',
            title5: '项目池',
            title6: '投前项目',
            title7: '投后项目',
            title8: '退出项目',
            title9: '项目估值',
            title10: '估值查看',
            title_04: '基金管理',
            title11: '我的基金',
            title12: '合作机构',
            title_05: '投资者管理',
            title13: '我的投资者',
            title_06: '综合查询',
            title14: '项目库',
            title15: '基金库',
            title16: '投资者库',
            title17: '项目文档',
            title18: '基金文档',
            title_07: '统计分析',
            title_08: '系统管理',
            title19: '公司信息',
            title20: '部门管理',
            title21: '用户管理',
            title22: '角色权限',
            title23: '数据字典',
            title24: '业务权限',
            title25: '流程管理',
            title26: '流程设置',
            title_09: '平台管理',
            title27: '功能菜单',
            title28: '用户管理',
            title29: '角色权限',
            title30: '消息公告',
            title31: '客户管理',
            title32: '客户权限',
            title33: '领头助手',
            title34: '会员管理',         

        }
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        addTab(th,url,name) {
            // this.$router.push({ name: 'assistant' });
            this.$router.push({ name:name });
            this.$store.commit({type:'addTab', title:th,url:url,name:name} );
        }
    }
}
</script>

<style lang="sass" scoped>
.div_el-menu-itemel-submenu__title{
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: #bfcbd9;
    padding: 0 20px;
    cursor: pointer;
    position: relative;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
    white-space: nowrap;
    &:hover{
        background: #48576a;
    }
}
.scllor {
    width: 196px;
    height: 100%;
    overflow: hidden;
    position: fixed;
    
}

.el-menu-item,
.el-submenu__title {
    height: 50px;
    line-height: 50px;
}

.sidebar {
    display: block;
    position: absolute;
    width: 217px;
    left: 0;
    top: 0;
    bottom: 0;
    background: #2E363F;
    overflow: scroll;
    overflow-x: hidden;
}

.sidebar>ul {
    // height: 100%;
}

.portrait-top {
    width: 82px;
    height: 82px;
    border-radius: 50%;
    background: green;
    /*margin: auto;*/
    position: absolute;
    top: 32px;
    left: 62px;
    z-index: 111;
}

.portrait {
    background: #08122c;
    position: relative;
    height: 200px;
}

.user {
    width: 100%;
    height: 134px;
    /*background: red;*/
    background: #2E363F;
    position: absolute;
    bottom: -3px;
    text-align: center;
    font: 16px;
    color: #f1f3f7;
    /* line-height: 134px; */
}

.user-name {}

.user-id {}

.el-menu-vertical-demo {
    background: #2E363F;
}
</style>
