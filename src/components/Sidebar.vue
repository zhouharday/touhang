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
                        <span>日常办公</span>
                    </template>
                    <el-menu-item index="/home/renwu" @click="addTab(title1,'/home/renwu','renwu')">{{title1}}</el-menu-item>
                    <el-menu-item index="/home/richeng" @click="addTab(title2,'/home/richeng','richeng')">{{title2}}</el-menu-item>
                    <el-menu-item index="1-3">通讯录</el-menu-item>
                    <el-menu-item index="1-4">消息公告</el-menu-item>
                </el-submenu>
                <div class="div_el-menu-itemel-submenu__title">
                    <!-- <i style="margin-right:7px;" class="el-icon-menu"></i>
                        领投助手 -->
                    <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/zhushou.png" />
                    <span>领投助手</span>
                </div>
                <el-submenu index="3">
                    <template slot="title">
                        <!-- <i class="el-icon-date"></i>项目管理</template> -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/project.png" />
                        <span>项目管理</span>
                    </template>
    
                    <el-menu-item index="">项目池</el-menu-item>
                    <el-menu-item index="">投前项目</el-menu-item>
                    <el-menu-item index="">投后项目</el-menu-item>
                    <el-menu-item index="">退出项目</el-menu-item>
                    <el-menu-item index="">项目估值</el-menu-item>
                    <el-menu-item index="">估值查看</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <!-- <i class="el-icon-star-on"></i>基金管理 -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/project_manger.png" />
                        <span>基金管理</span>
                    </template>
                    <el-menu-item index="">我的基金</el-menu-item>
                    <el-menu-item index="">合作机构</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
    
                    <template slot="title">
                        <!-- <i class="el-icon-star-on"></i>投资者管理 -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/touzizhe.png" />
                        <span>投资者管理</span>
                    </template>
                    <el-menu-item index="">我的投资者</el-menu-item>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
                        <!-- <i class="el-icon-star-on"></i>综合查询 -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/survey.png" />
                        <span>综合查询</span>
                    </template>
                    <el-menu-item index="">项目库</el-menu-item>
                    <el-menu-item index="">基金库</el-menu-item>
                    <el-menu-item index="">投资者库</el-menu-item>
                    <el-menu-item index="">项目文档</el-menu-item>
                    <el-menu-item index="">基金文档</el-menu-item>
                </el-submenu>
                <!-- <el-submenu index="7">
                        <template slot="title">
                            <i class="el-icon-star-on"></i>统计分析</template>
                    </el-submenu> -->
                <div class="div_el-menu-itemel-submenu__title">
                    <!-- <i style="margin-right:7px;" class="el-icon-menu"></i>
                        统计分析 -->
                    <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/sys_analysis.png" />
                    <span>统计分析</span>
                </div>
                <el-submenu index="8">
                    <template slot="title">
                        <!-- <i class="el-icon-star-on"></i>系统管理 -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/sys_mang.png" />
                        <span>系统管理</span>
                    </template>
                    <el-menu-item index="">公司信息</el-menu-item>
                    <el-menu-item index="">部门管理</el-menu-item>
                    <el-menu-item index="">用户管理</el-menu-item>
                    <el-menu-item index="">角色权限</el-menu-item>
                    <el-menu-item index="">数据字典</el-menu-item>
                    <el-menu-item index="">业务权限</el-menu-item>
                    <el-menu-item index="">流程管理</el-menu-item>
                    <el-menu-item index="">流程设置</el-menu-item>
                </el-submenu>
                <el-submenu index="9">
                    <template slot="title">
                        <!-- <i class="el-icon-star-on"></i>平台管理 -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/wangluo.png" />
                        <span>平台管理</span>
                    </template>
                    <el-menu-item index="">功能菜单</el-menu-item>
                    <el-menu-item index="">用户管理</el-menu-item>
                    <el-menu-item index="">角色权限</el-menu-item>
                    <el-menu-item index="">消息公告</el-menu-item>
                    <el-menu-item index="">客户管理</el-menu-item>
                    <el-menu-item index="">客户权限</el-menu-item>
                    <el-menu-item index="">领头助手</el-menu-item>
                    <el-menu-item index="">会员管理</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    data() {
        return {
            title1: '任务',
            title2: '日程'

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
            this.$store.commit({type: 'addTab', title: th,url:url,name:name} );
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
    width: 200px;
    height: 100%;
    overflow: hidden;
    position: absolute;
    
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
    height: 100%;
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
