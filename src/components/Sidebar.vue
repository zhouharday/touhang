<template>
    <div class="scllor">
        <div class="sidebar">
            <div class="portrait">
                <div class="portrait-top">
                    <img src="/static/img/defultImg.png" @click="jumpPersonal()">
                </div>
                <div class="user">
                    <div style="margin-top:55px;">
                        <div>你好,{{userName.name}} !</div>
                        <!--<div>Administor</div>-->
                    </div>
                </div>
            </div>
            <div v-if="showOrHide.isShowSidebar && showOrHide.isVshowYe == 0">
                <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router @open="handleOpen" @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title" style="height:50px;line-height:50px;" class="title">
                            <img style="margin-top: 18px;display: block;float: left; margin-right: 7px;" src="/static/img/office.png" />
                            <span>{{title_01}}</span>
                        </template>
                        <el-menu-item index="/home/contacts" @click="addTab(title2,'/home/contacts','contacts')">{{title2}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
<!-- 菜单 -->
            <el-menu v-show="!isShow" :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router @open="handleOpen" @close="handleClose">
                <el-submenu index="1">
                    <template slot="title" style="height:50px;line-height:50px;" class="title">
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/office.png" />
                        <span>{{title_01}}</span>
                    </template>
                    <el-menu-item index="task" @click="addTab(title1,'/home/task','task')">{{title1}}</el-menu-item>
                    <el-menu-item index="contacts" @click="addTab(title2,'/home/contacts','contacts')">{{title2}}</el-menu-item>
                    <el-menu-item index="messageShow" @click="addTab(title3,'/home/messageShow','messageShow')">{{title3}}</el-menu-item>
                </el-submenu>
                <div class="div_el-menu-itemel-submenu__title" @click="addTab(title_02,'/home/assistant','assistant')">
                    <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/zhushou.png" />
                    <span index="assistant">{{title_02}}</span>
                </div>
                <el-submenu index="3">
                    <template slot="title">
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/project.png" />
                        <span>{{title_03}}</span>
                    </template>
                    <el-menu-item index="projectPool" @click="addTab(title5,'/home/projectPool','projectPool')">{{title5}}</el-menu-item>
                    <el-menu-item index="preProject" @click="addTab(title6,'/home/preProject','preProject')">{{title6}}</el-menu-item>
                    <el-menu-item index="aftProject" @click="addTab(title7,'/home/aftProject','aftProject')">{{title7}}</el-menu-item>
                    <el-menu-item index="projectValuation" @click="addTab(title9,'/home/projectValuation','projectValuation')">{{title9}}</el-menu-item>
                    <el-menu-item index="valuationView" @click="addTab(title10,'/home/valuationView','valuationView')">{{title10}}</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/project_manger.png" />
                        <span>{{title_04}}</span>
                    </template>
                    <el-menu-item index="myfund" @click="addTab(title11,'/home/myfund','myfund')">{{title11}}</el-menu-item>
                    <el-menu-item index="cooperative" @click="addTab(title12,'/home/cooperative','cooperative')">{{title12}}</el-menu-item>
                    <el-menu-item index="manageCompany" @click="addTab(title37,'/home/manageCompany','manageCompany')">{{title37}}</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/touzizhe.png" />
                        <span>{{title_05}}</span>
                    </template>
                    <el-menu-item index="investor" @click="addTab(title13,'/home/investor','investor')">{{title13}}</el-menu-item>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
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
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/sys_mang.png" />
                        <span>{{title_07}}</span>
                    </template>
                    <el-menu-item index="fundedForm" @click="addTab(title_07_1, '/home/fundedForm', 'fundedForm')">{{title_07_1}}</el-menu-item>
                    <el-menu-item index="projectInfor" @click="addTab(title_07_2, '/home/projectInfor', 'projectInfor')">{{title_07_2}}</el-menu-item>
                    <el-menu-item index="fundInFormation" @click="addTab(title_07_3, '/home/fundInFormation', 'fundInFormation')">{{title_07_3}}</el-menu-item>
                    <el-menu-item index="invesTment" @click="addTab(title_07_4, '/home/invesTment', 'invesTment')">{{title_07_4}}</el-menu-item>
                    <el-menu-item index="statisticalAnalysis" @click="addTab(title_07_5, '/home/statisticalAnalysis', 'statisticalAnalysis')">{{title_07_5}}</el-menu-item>
                </el-submenu>
                <el-submenu index="8">
                    <template slot="title">
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
                    <el-menu-item index="configuration" @click="addTab(title36, '/home/configuration', 'configuration')">
                        {{title36}}
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
            <!-- 菜单列表 Start -->
            <el-menu v-show="showOrHide.isShowSidebar && showOrHide.isVshowYe && isShow" :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened @open="handleOpen" @close="handleClose">
              <el-submenu :index="index" v-for="(item,index) in menus" :key="item">
                    <template slot="title" style="height:50px;line-height:50px;" class="title">
                        <img style="margin-top:18px;display:block;float:left;margin-right:7px;" :src="menusImg[index].src" />
                        <span v-if="item.children.length !== 0">{{item.menuName}}</span>
                        <span style="display: block;" :index="item.url" @click="addTab(item.menuName,'/home/' + item.url, item.url)" v-if="item.children.length == 0">{{item.menuName}}</span>
                    </template>
                    <el-menu-item v-for="(item,index) in item.children" :key="item" :index="item.url" @click="addTab(item.menuName,'/home/' + item.url, item.url)">{{item.menuName}}</el-menu-item>
                </el-submenu>
            </el-menu>
            <!-- <div index='2' v-if="item.children.length == 0" v-show="showOrHide.isShowSidebar && showOrHide.isVshowYe && isShow" v-for="(item,index) in menus" :key="item" class="div_el-menu-itemel-submenu__title" @click="addTab(item.menuName,'/home/' + item.url, item.url)">
                <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/zhushou.png" />
                <span index="assistant">{{item.menuName}}</span>
            </div> -->
            <!-- 菜单列表 End -->
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getNodes } from "common/js/config";
import myTree from "components/treeMenu";
export default {
  components: { getNodes, myTree },
  created() {
    this.findResourceByUid();
  },
  computed: {
    user() {
      this.$store.state.login.merchants =
        JSON.parse(sessionStorage.getItem("merchants")) || {};
      this.$store.state.login.userInfor =
        JSON.parse(sessionStorage.getItem("userInfor")) || {};
      return {
        merchants: this.$store.state.login.merchants,
        userInfor: this.$store.state.login.userInfor
      };
    },
    onRoutes(state) {
      return this.$route.path.replace("/", "");
    },
    userName(state) {
      this.$store.state.login.userInfor =
        JSON.parse(sessionStorage.getItem("userInfor")) || {};
      return this.$store.state.login.userInfor;
    },
    um_id(state) {
      this.$store.state.login.logoSrc =
        JSON.parse(sessionStorage.getItem("merchants")) || {};
      return this.$store.state.login.merchants;
    },
    showOrHide() {
      if (JSON.parse(sessionStorage.getItem("showOrHide")) == null) {
        this.$store.state.login.showOrHide.isVshowYe = 1;
        this.$store.state.login.showOrHide.isShowSidebar = 0;
        return this.$store.state.login.showOrHide;
      } else {
        this.$store.state.login.showOrHide =
          JSON.parse(sessionStorage.getItem("showOrHide")) || {};
        return this.$store.state.login.showOrHide;
      }
    }
  },
  data() {
    return {
      menusImg: [
        //菜单图标
        { src: "/static/img/office.png" },
        { src: "/static/img/zhushou.png" },
        { src: "/static/img/project.png" },
        { src: "/static/img/project_manger.png" },
        { src: "/static/img/touzizhe.png" },
        { src: "/static/img/survey.png" },
        { src: "/static/img/sys_analysis.png" },
        { src: "/static/img/sys_mang.png" }
      ],
      menus: [],
      isShow: true,
      // isShow: false,
      theModel: [],
      setting: {
        view: {
          showLine: false,
          showIcon: false,
          selectedMulti: false,
          dblClickExpand: false
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
          }
        },
        callback: {
          beforeClick: this.zTreeBeforeClick
        }
      },
      zNodes: [
        {
          open: true,
          id: 1, // 菜单id
          pId: 0,
          name: "一级菜单", //菜单标题
          common: "0", //是否为公共
          icon: "/static/img/office.png", //对应图标
          sort: 6, //排序
          parentId: "0", //父id
          type: "0", //按钮类型
          code: "userinfo,userupdate", //标识
          url: null, //类型
          description: null, //描述
          status: "0", //状态
          createDate: null,
          merchantId: "11", //商户id
          versionRecord: 1502260340000
        },
        {
          // "open": true,
          id: 11, // 菜单id
          pId: 1,
          name: "子菜单", //菜单标题
          // "url": "/home/task",     //类型
          path: "/home/task", //类型
          common: "0", //是否为公共
          icon: null, //对应图标
          sort: 6, //排序
          parentId: "0", //父id
          type: "0", //按钮类型
          code: "userinfo,userupdate", //标识
          target: "_self",
          onClick: "addTab()",
          description: null, //描述
          status: "0", //状态
          createDate: null,
          merchantId: "11", //商户id
          versionRecord: 1502260340000
        },
        {
          // "open": true,
          id: 2, // 菜单id
          pId: 0,
          name: "一级菜单", //菜单标题
          common: "0", //是否为公共
          icon: null, //对应图标
          sort: 6, //排序
          parentId: "0", //父id
          type: "0", //按钮类型
          code: "userinfo,userupdate", //标识
          url: null, //类型
          description: null, //描述
          status: "0", //状态
          createDate: null,
          merchantId: "11", //商户id
          versionRecord: 1502260340000
        },
        {
          // "open": true,
          id: 21, // 菜单id
          pId: 2,
          name: "子菜单", //菜单标题
          // "url": "/home/projectPool",     //类型
          path: "/home/projectPool", //类型
          target: "_self",
          common: "0", //是否为公共
          icon: null, //对应图标
          sort: 6, //排序
          parentId: "0", //父id
          type: "0", //按钮类型
          code: "userinfo,userupdate", //标识
          description: null, //描述
          status: "0", //状态
          createDate: null,
          merchantId: "11", //商户id
          versionRecord: 1502260340000
        }
      ],
      title_01: "日常办公",
      title1: "任务",
      title2: "通讯录",
      title3: "消息公告",
      title4: "个人中心",
      title_02: "云项目",
      title_03: "项目管理",
      title5: "项目池",
      title6: "投资项目",
      title7: "投后项目",
      title8: "退出项目",
      title9: "项目估值",
      title10: "估值查看",
      title_04: "基金管理",
      title11: "我的基金",
      title12: "合作机构",
      title37: "基金管理人",
      title_05: "投资者管理",
      title13: "我的投资者",
      title_06: "综合查询",
      title14: "项目库",
      title15: "基金库",
      title16: "投资者库",
      title17: "项目文档",
      title18: "基金文档",
      title_07: "统计分析",
      title_07_1: "出资统计表",
      title_07_2: "项目信息统计表",
      title_07_3: "基金信息统计表",
      title_07_4: "项目投资统计表",
      title_07_5: "统计分析图",
      title_08: "系统管理",
      title19: "公司信息",
      title20: "部门管理",
      title21: "用户管理",
      title22: "企业权限",
      // title23: '数据字典',
      title24: "项目权限",
      title25: "流程管理",
      title26: "流程设置",
      title35: "基金权限",
      title36: "业务配置",
      title_09: "平台管理",
      title27: "功能菜单",
      title28: "角色管理",
      title29: "用户列表",
      title30: "消息公告",
      title31: "客户管理",
      title32: "客户权限",
      title33: "领头助手",
      title34: "会员管理"
    };
  },
  methods: {
    findResourceByUid() {
      this.$http
        .post(this.api + "/user/findResourceByUid", {
          //请求用户权限列表数据
          um_id: this.user.merchants[0].um_id //用户、机构中间id
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log(res.data.result);
              this.menus = res.data.result;
              // this.theModel = getNodes(res.data.result);
              // this.theModel = res.data.result;
              this.$Message.success(res.data.message);
            } else {
              this.$Message.success(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
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
    // 跳转至个人中心
    jumpPersonal() {
      this.addTab("个人中心", "/home/personal", "personal");
      this.$router.push({ name: "personal" });
    },
    addTab(th, url, name) {
      this.$router.push({
        name: name
      });
      // this.$router.push({
      //     path: url
      // });
      this.$store.commit({
        type: "addTab",
        title: th,
        url: url,
        name: name
      });
      // alert(222)
    },
    isShowsss() {
      return (this.isShow = false);
    }
  }
};
</script>

<style lang="less" scoped>
.ztree * {
  font-size: 10pt;
  font-family: "Microsoft Yahei", Verdana, Simsun, "Segoe UI Web Light",
    "Segoe UI Light", "Segoe UI Web Regular", "Segoe UI", "Segoe UI Symbol",
    "Helvetica Neue", Arial;
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
  background-color: #e7e7e7;
}

.ztree li a span.button.switch {
  visibility: hidden;
}

.ztree.showIcon li a span.button.switch {
  visibility: visible;
}

.ztree li a.curSelectedNode {
  background-color: #d4d4d4;
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
  background: #2e363f;
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
  background: #2e363f;
  position: absolute;
  bottom: -3px;
  text-align: center;
  font: 16px;
  color: #f1f3f7;
  /* line-height: 134px; */
}

.el-menu-vertical-demo {
  background: #2e363f;
  width: 100%;
}
</style>
