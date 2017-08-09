<template>  
    <div class="sidebar">
        <div class="portrait">
            <div class="portrait-top">
                <img src="/static/img/默认头像.png">
            </div>
            <div class="user">
                <p class="user-name">
                    赵李琛
                </p>
                <p class="user-id">
                    admin
                </p>
            </div>
        </div>
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-menu"></i>日常办公</template>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>领投助手</template>
                <el-menu-item index="invest-behind">投资者管理</el-menu-item>
                <el-menu-item index="fund">投资管理</el-menu-item>
                <el-menu-item index="fund">资金管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-date"></i>项目管理</template>
                <el-menu-item index="baseform">基金设立</el-menu-item>
                <el-menu-item index="vueeditor">基金管理</el-menu-item>
                <el-menu-item index="vueeditor">基金资金</el-menu-item>
                <el-menu-item index="markdown">基金退出</el-menu-item>
                <el-menu-item index="upload">合作机构</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-star-on"></i>投资者管理</template>
                <el-menu-item index="basecharts">基础图表</el-menu-item>
                <el-menu-item index="mixcharts">混合图表</el-menu-item>
            </el-submenu>
             <el-submenu index="5">

                <template slot="title"><i class="el-icon-star-on"></i>综合查询</template>
                <el-menu-item index="basecharts">项目管理</el-menu-item>
                <el-menu-item index="mixcharts">项目资金</el-menu-item>
                <el-menu-item index="mixcharts">标的公司</el-menu-item>
                <el-menu-item index="mixcharts">项目估值</el-menu-item>
                <el-menu-item index="mixcharts">项目审批流程</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title"><i class="el-icon-star-on"></i>系统管理</template>
                <el-menu-item index="basecharts">公司信息</el-menu-item>
                <el-menu-item index="mixcharts">部门管理</el-menu-item>
                <el-menu-item index="mixcharts">用户管理</el-menu-item>
                <el-menu-item index="mixcharts">角色权限</el-menu-item>
                <el-menu-item index="mixcharts">数据字典</el-menu-item>
                <el-menu-item index="mixcharts">业务权限</el-menu-item>
                <el-menu-item index="mixcharts">流程管理</el-menu-item>
                <el-menu-item index="mixcharts">流程设置</el-menu-item>
            </el-submenu>
            <el-submenu index="7">
                <template slot="title"><i class="el-icon-star-on"></i>平台管理</template>
                <el-menu-item index="basecharts">领投助手-列表</el-menu-item>
                <el-menu-item index="mixcharts">混合图表</el-menu-item>
            </el-submenu>
            <el-submenu index="8">
                <template slot="title"><i class="el-icon-star-on"></i>注册与登录</template>
                <el-menu-item index="basecharts">登录</el-menu-item>
                <el-menu-item index="mixcharts">注册</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 196px;
        left: 0;
        top: 0;
        bottom:0;
        background: #2E363F;

    }
    .sidebar > ul {
        height:100%;
    }
    .portrait-top{
        width: 82px;
        height: 82px;
        border-radius: 50%;
        background: green;
        /*margin: auto;*/
        position: absolute;
        top: 32px;
        left: 49px;
    }
    .portrait{
        background: #2a3142;
        position: relative;
        height: 200px;
    }
    .user{
        width: 196px;
        height: 80px;
        /*background: red;*/
        background: #2E363F;
        position: absolute;
        bottom: 0;
        text-align: center;
        font: 16px;
        color: #f1f3f7;
    }
    .user-name{
        height: 40px;
        /*background: yellow;*/
        line-height: 40px;
    }
    .user-id{
        width: 100%;
        height: 40px;
        line-height: 20px;
    }
    .el-menu-vertical-demo{
        background: #2E363F;
    }

</style>
