<template>
    <div class="scllor">
        <div class="sidebar">
            <div class="portrait">
                <div class="portrait-top">
                    <img src="/static/img/默认头像.png">
                </div>
                <div class="user">
                    <div style="margin-top:55px;">
                        <div>你好,{{userName.name}} !</div>
                        <div>Administor</div>
                    </div>
                </div>
            </div>
            <div v-if="showOrHide.isShowSidebar">
                <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router @open="handleOpen" @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title" style="height:50px;line-height:50px;" class="title">
                            <img style="margin-top: 18px;display: block;float: left; margin-right: 7px;" src="/static/img/office.png" />
                            <span>{{title_01}}</span>
                        </template>
                        <el-menu-item index="contacts" @click="addTab(title3,'/home/contacts','contacts')">{{title3}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
            <el-menu v-if="!showOrHide.isShowSidebar" :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router @open="handleOpen" @close="handleClose">
                <el-submenu index="1">
                    <template slot="title" style="height:50px;line-height:50px;" class="title">
                        <img style="margin-top: 18px;display: block;float: left;
                                                                                                    margin-right: 7px;" src="/static/img/office.png" />
                        <span>{{title_01}}</span>
                    </template>
                    <el-menu-item index="task" @click="addTab(title1,'/home/task','task')">{{title1}}</el-menu-item>
                    <!-- <el-menu-item index="schedule" @click="addTab(title2,'/home/schedule','schedule')">{{title2}}</el-menu-item> -->
                    <el-menu-item index="contacts" @click="addTab(title3,'/home/contacts','contacts')">{{title3}}</el-menu-item>
                    <el-menu-item index="messageShow" @click="addTab(title4,'/home/messageShow','messageShow')">{{title4}}</el-menu-item>
                </el-submenu>
                <div class="div_el-menu-itemel-submenu__title" @click="addTab(title_02,'/home/assistant','assistant')">
                    <!-- <i style="margin-right:7px;" class="el-icon-menu"></i> -->
                    <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/zhushou.png" />
                    <span index="assistant">{{title_02}}</span>
                    <!-- <router-link to="/home/assistant" index="assistant" @click="addTab(title_02,'/home/assistant','assistant')">{{title_02}}</router-link> -->
                </div>
                <el-submenu index="3">
                    <template slot="title">
                        <!-- <i class="el-icon-date"></i>项目管理</template> -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/project.png" />
                        <span>{{title_03}}</span>
                    </template>
                    <el-menu-item index="projectPool" @click="addTab(title5,'/home/projectPool','projectPool')">{{title5}}</el-menu-item>
                    <el-menu-item index="preProject" @click="addTab(title6,'/home/preProject','preProject')">{{title6}}</el-menu-item>
                    <el-menu-item index="aftProject" @click="addTab(title7,'/home/aftProject','aftProject')">{{title7}}</el-menu-item>
                    <!-- <el-menu-item index="projectOut" @click="addTab(title8,'/home/projectOut','projectOut')">{{title8}}</el-menu-item> -->
                    <el-menu-item index="projectValuation" @click="addTab(title9,'/home/projectValuation','projectValuation')">{{title9}}</el-menu-item>
                    <el-menu-item index="valuationView" @click="addTab(title10,'/home/valuationView','valuationView')">{{title10}}</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <!-- <i class="el-icon-star-on"></i>基金管理 -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/project_manger.png" />
                        <span>{{title_04}}</span>
                    </template>
                    <el-menu-item index="myfund" @click="addTab(title11,'/home/myfund','myfund')">{{title11}}</el-menu-item>
                    <el-menu-item index="cooperative" @click="addTab(title12,'/home/cooperative','cooperative')">{{title12}}</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <!-- <i class="el-icon-star-on"></i>投资者管理 -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/touzizhe.png" />
                        <span>{{title_05}}</span>
                    </template>
                    <el-menu-item index="investor" @click="addTab(title13,'/home/investor','investor')">{{title13}}</el-menu-item>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
                        <!-- <i class="el-icon-star-on"></i>综合查询 -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/survey.png" />
                        <span>{{title_06}}</span>
                    </template>
                    <el-menu-item index="proLibrary" @click="addTab(title14, '/home/proLibrary', 'proLibrary')">{{title14}}</el-menu-item>
                    <el-menu-item index="fundLibrary" @click="addTab(title15, '/home/fundLibrary', 'fundLibrary')">{{title15}}</el-menu-item>
                    <el-menu-item index="investorLibrary" @click="addTab(title16, '/home/investorLibrary', 'investorLibrary')">{{title16}}</el-menu-item>
                    <el-menu-item index="projectsDoc" @click="addTab(title17, '/home/projectsDoc', 'projectsDoc')">{{title17}}</el-menu-item>
                    <el-menu-item index="fundDoc" @click="addTab(title18, '/home/fundDoc', 'fundDoc')">{{title18}}</el-menu-item>
                </el-submenu>
                <el-submenu index="7">
                    <template slot="title">
                        <!-- <i class="el-icon-star-on"></i>统计分析 -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/sys_mang.png" />
                        <span>{{title_07}}</span>
                    </template>
                    <el-menu-item index="fundedForm" @click="addTab(title_07_1, '/home/fundedForm', 'fundedForm')">{{title_07_1}}</el-menu-item>
                    <el-menu-item index="projectInfor" @click="addTab(title_07_2, '/home/projectInfor', 'projectInfor')">{{title_07_2}}</el-menu-item>
                    <!-- <el-menu-item index="">{{title21}}</el-menu-item> -->
                    <el-menu-item index="fundInFormation" @click="addTab(title_07_3, '/home/fundInFormation', 'fundInFormation')">{{title_07_3}}</el-menu-item>
                    <el-menu-item index="invesTment" @click="addTab(title_07_4, '/home/invesTment', 'invesTment')">{{title_07_4}}</el-menu-item>
                    <!-- <el-menu-item index="">{{title24}}</el-menu-item> -->
                    <el-menu-item index="statisticalAnalysis" @click="addTab(title_07_5, '/home/statisticalAnalysis', 'statisticalAnalysis')">{{title_07_5}}</el-menu-item>
                </el-submenu>
                <el-submenu index="8">
                    <template slot="title">
                        <!-- <i class="el-icon-star-on"></i>系统管理 -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/sys_mang.png" />
                        <span>{{title_08}}</span>
                    </template>
                    <el-menu-item index="companyInfo" @click="addTab(title19, '/home/companyInfo', 'companyInfo')">
                        {{title19}}
                    </el-menu-item>
                    <el-menu-item index="department" @click="addTab(title20, '/home/department', 'department')">
                        {{title20}}
                    </el-menu-item>
                    <el-menu-item index="subscriber" @click="addTab(title21, '/home/subscriber', 'subscriber')">
                        {{title21}}
                    </el-menu-item>
                    <el-menu-item index="dictionary" @click="addTab(title23, '/home/dictionary', 'dictionary')">
                        {{title23}}
                    </el-menu-item>
                    <el-menu-item index="role" @click="addTab(title22, '/home/role', 'role')">
                        {{title22}}
                    </el-menu-item>
                    <el-menu-item index="business" @click="addTab(title24, '/home/business', 'business')">
                        {{title24}}
                    </el-menu-item>
                    <el-menu-item index="fundAuthority" @click="addTab(title35, '/home/fundAuthority', 'fundAuthority')">
                        {{title35}}
                    </el-menu-item>
                    <el-menu-item index="process" @click="addTab(title25, '/home/process', 'process')">
                        {{title25}}
                    </el-menu-item>
                    <el-menu-item index="processSetting" @click="addTab(title26, '/home/processSetting', 'processSetting')">
                        {{title26}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
            <!-- <el-row>
                                                                                            <el-col :span="24" v-for="(menuItem,index) in theModel" :key="index">
                                                                                                <my-tree :model="menuItem"></my-tree>
                                                                                            </el-col>
                                                                                        </el-row> -->
            <!-- <ul id="zTree" class="ztree"></ul> -->
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import jq from "../../static/js/zTree/jquery-1.4.4.min.js";
import zTree from "../../static/js/zTree/jquery.ztree.core";
import { getNodes } from 'common/js/config';
import myTree from 'components/treeMenu';
export default {
    components: { jq, zTree, getNodes, myTree },
    beforeCreate() {
        // alert(111);
        // this.$store.state.login.merchants = JSON.parse(sessionStorage.getItem('merchants')) || {};
        // console.log(this.$store.state.login.merchants[0].um_id);
        // this.$http.post('api/user/findResourceByUid', { //请求用户权限列表数据
        //     // this.$http.post('api/user/findResourceByMid', { //请求用户权限列表数据
        //     // "merchantId": this.$store.state.login.merchants[0].id //用户、机构中间id
        //     "um_id": this.$store.state.login.merchants[0].um_id //用户、机构中间id
        // })
        //     .then(Response => {
        //         // console.log(this.$store.state.login.merchants[0].um_id);
        //         if (Response.data.status == '200') {
        //             console.log(Response.data.result);
        //             // this.theModel = Response.data.result;
        //             // console.log(Response.data.result);
        //             // this.theModel = getNodes(Response.data.result);
        //             //  console.log(nodes);
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    },
    created() {
        // alert(222)
        // this.$store.state.login.merchants = JSON.parse(sessionStorage.getItem('merchants')) || {};
        // // console.log(this.$store.state.login.merchants[0].um_id);
        // this.$http.post('api/user/findResourceByUid', { //请求用户权限列表数据
        // // this.$http.post('api/user/findResourceByMid', { //请求用户权限列表数据
        //     // "merchantId": this.$store.state.login.merchants[0].id //用户、机构中间id
        //     "um_id": this.$store.state.login.merchants[0].um_id //用户、机构中间id
        // })
        //     .then(Response => {
        //         // console.log(this.$store.state.login.merchants[0].um_id);
        //         if (Response.data.status == '200') {
        //             this.menus = Response.data.result;
        //             // let nodes = getNodes(this.menus);
        //             // console.log(nodes);
        //             // alert(1);
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

        // this.$store.state.login.merchants = JSON.parse(sessionStorage.getItem('merchants')) || {};
        // // console.log(this.$store.state.login.merchants[0].um_id);
        // this.$http.post('api/user/findResourceByUid', { //请求用户权限列表数据
        //     "um_id": this.$store.state.login.merchants[0].um_id //用户、机构中间id
        // })
        // .then(Response => {
        //     console.log(this.$store.state.login.merchants[0].um_id);
        //     if (Response.data.status == '200') {
        //         this.menus = Response.data.result;
        //         console.log(this.menus);
        //         // alert(1);
        //     }
        // })
        // .catch(error => {
        //     console.log(error);
        // });
    },
    mounted() {
    },
    computed: {
        onRoutes(state) {
            // alert(111);
            return this.$route.path.replace('/', '');
        },
        userName(state) {
            // alert(222);
            this.$store.state.login.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
            return this.$store.state.login.userInfor;
        },
        um_id(state) {
            // alert(333);
            this.$store.state.login.logoSrc = JSON.parse(sessionStorage.getItem('merchants')) || {};
            return this.$store.state.login.merchants;
        },
        showOrHide() {
            if (JSON.parse(sessionStorage.getItem('showOrHide')) == null) {
                alert(111);
                this.$store.state.login.showOrHide.isVshowYe = 1;
                this.$store.state.login.showOrHide.isShowSidebar = 0;
                return this.$store.state.login.showOrHide;
            } else {
                // this.$store.state.login.showOrHide = JSON.parse(sessionStorage.getItem('showOrHide')) || {};
                console.log(this.$store.state.login.showOrHide);
                return this.$store.state.login.showOrHide;
            }
        }
    },
    data() {
        return {

            theModel: [],
            setting: {
                view: {
                    showLine: false,
                    showIcon: false,
                    selectedMulti: false,
                    dblClickExpand: false,
                    // addDiyDom: this.addDiyDom
                },
                data: {
                    key: {
                        // url: 'url'
                    },
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "pId",
                        rootPId: 0
                    },
                },
                callback: {
                    beforeClick: this.zTreeBeforeClick
                }
            },
            zNodes: [
                {
                    "open": true,
                    "id": 1,  // 菜单id
                    "pId": 0,
                    "name": "一级菜单", //菜单标题
                    "common": "0",        //是否为公共
                    "icon": "/static/img/office.png",  //对应图标
                    "sort": 6,     //排序
                    "parentId": "0", //父id
                    "type": "0",    //按钮类型
                    "code": "userinfo,userupdate",//标识
                    "url": null,     //类型
                    "description": null,   //描述
                    "status": "0",   //状态
                    "createDate": null,
                    "merchantId": "11",   //商户id
                    "versionRecord": 1502260340000
                },
                {
                    // "open": true,
                    "id": 11,  // 菜单id
                    "pId": 1,
                    "name": "子菜单", //菜单标题
                    // "url": "/home/task",     //类型
                    "path": "/home/task",     //类型
                    "common": "0",        //是否为公共
                    "icon": null,  //对应图标
                    "sort": 6,     //排序
                    "parentId": "0", //父id
                    "type": "0", //按钮类型
                    "code": "userinfo,userupdate",//标识
                    "target": "_self",
                    "onClick": "addTab()",
                    "description": null,   //描述
                    "status": "0",   //状态
                    "createDate": null,
                    "merchantId": "11", //商户id
                    "versionRecord": 1502260340000
                },
                {
                    // "open": true,
                    "id": 2, // 菜单id
                    "pId": 0,
                    "name": "一级菜单", //菜单标题
                    "common": "0",        //是否为公共
                    "icon": null,  //对应图标
                    "sort": 6,     //排序
                    "parentId": "0", //父id
                    "type": "0", //按钮类型
                    "code": "userinfo,userupdate", //标识
                    "url": null, //类型
                    "description": null, //描述
                    "status": "0", //状态
                    "createDate": null,
                    "merchantId": "11", //商户id
                    "versionRecord": 1502260340000
                },
                {
                    // "open": true,
                    "id": 21, // 菜单id
                    "pId": 2,
                    "name": "子菜单", //菜单标题
                    // "url": "/home/projectPool",     //类型
                    "path": "/home/projectPool", //类型
                    "target": "_self",
                    "common": "0", //是否为公共
                    "icon": null, //对应图标
                    "sort": 6, //排序
                    "parentId": "0", //父id
                    "type": "0", //按钮类型
                    "code": "userinfo,userupdate", //标识
                    "description": null, //描述
                    "status": "0", //状态
                    "createDate": null,
                    "merchantId": "11", //商户id
                    "versionRecord": 1502260340000
                }
            ],
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
            title_07_1: '出资统计表',
            title_07_2: '项目信息统计表',
            title_07_3: '基金信息统计表',
            title_07_4: '项目投资统计表',
            title_07_5: '统计分析图',
            title_08: '系统管理',
            title19: '公司信息',
            title20: '部门管理',
            title21: '用户管理',
            title23: '数据字典',
            title22: '企业权限',
            title24: '业务权限',
            title35: '基金权限',
            title25: '流程管理',
            title26: '流程设置',
            title_09: '平台管理',
            title27: '功能菜单',
            title28: '角色管理',
            title29: '用户列表',
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
        zTreeBeforeClick(treeId, treeNode, clickFlag) {
            // alert(1);
            // if (treeNode.level == 0) {
            //     var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            //     zTree.expandNode(treeNode);
            //     return false;
            // }
            // return true;
            // if (treeNode.hasOwnProperty('path')) {
            //     // alert(222);
            //     let title = treeNode.name;
            //     let url = treeNode.path;
            //     let name = url.substring(6);
            //     // console.log(title);
            //     // console.log(url);
            //     // console.log(name);
            //     this.addTab(title, url, name);
            // }
            // return (treeNode.id !== 1);
        },
        addTab(th, url, name) {
            this.$router.push({
                name: name
            })
            this.$store.commit({
                type: 'addTab',
                title: th,
                url: url,
                name: name
            })
            // alert(222)
        }
    }
}
</script>

<style lang="less" scoped>
.ztree * {
    font-size: 10pt;
    font-family: "Microsoft Yahei", Verdana, Simsun, "Segoe UI Web Light", "Segoe UI Light", "Segoe UI Web Regular", "Segoe UI", "Segoe UI Symbol", "Helvetica Neue", Arial;
}

.ztree li ul {
    margin: 0;
    padding: 0;
}

.ztree li {
    line-height: 30px;
}

.ztree li a {
    width: 200px;
    height: 30px;
    padding-top: 0;
}
.ztree li a:hover {
    text-decoration: none;
    background-color: #E7E7E7;
}

.ztree li a span.button.switch {
    visibility: hidden;
}

.ztree.showIcon li a span.button.switch {
    visibility: visible;
}

.ztree li a.curSelectedNode {
    background-color: #D4D4D4;
    border: 0;
    height: 30px;
}

.ztree li span {
    line-height: 30px;
}

.ztree li span.button {
    margin-top: -7px;
}

.ztree li span.button.switch {
    width: 16px;
    height: 16px;
}

.ztree li a.level0 span {
    font-size: 150%;
    font-weight: bold;
}

.ztree li span.button.switch.level0 {
    width: 20px;
    height: 20px;
}

.ztree li span.button.switch.level1 {
    width: 20px;
    height: 20px;
}

.ztree li span.button.noline_open {
    background-position: 0 0;
}

.ztree li span.button.noline_close {
    background-position: -18px 0;
}

.ztree li span.button.noline_open.level0 {
    background-position: 0 -18px;
}

.ztree li span.button.noline_close.level0 {
    background-position: -18px -18px;
}

.div_el-menu-itemel-submenu__title {
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: #bfcbd9;
    padding: 0 20px;
    cursor: pointer;
    position: relative;
    transition: border-color 0.3s, background-color 0.3s, color 0.3s;
    box-sizing: border-box;
    white-space: nowrap;
    &:hover {
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
    width: 213px;
    left: 0;
    top: 0;
    bottom: 0;
    background: #2E363F;
    overflow: scroll;
    overflow-x: hidden;
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

.el-menu-vertical-demo {
    background: #2E363F;
}
</style>
