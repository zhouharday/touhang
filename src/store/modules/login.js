import {
    Notification
} from 'element-ui'
// import request from 'superagent'
import * as types from '../mutations-type'
import loginBox from '../../components/loginBox.vue'
import loginCard from '../../components/loginCard.vue'

const state = {
    TitleList: [],
    userInfor: {} || JSON.parse(sessionStorage.getItem('userInfor')), //save user login infor
    merchants: [], //save 组织列表
    menus: [],
    logoSrc: {
        logo: '',
        merchantName: ''
    },
    CardBox: loginCard,
    showOrHide: {
        isVshowYe: true, //是否显示首页
        isShowSidebar: false, //是只否显示通讯录菜单列表
        // isShowSidebar: true,
    },
    approvelType: { //企业审核状态
        type: '',
        text: '',
        isLogged: false, //登录状态
    },
    loading: false,
    permissionCode: [], //客户端系统项目、基金按钮数据
    permissionCode_project: [], //项目按钮数据
    permissionCode_fund: [], //基金按钮数据
    projectPermissions: false, //是否存在项目权限按钮
    fundPermissions: false, //是否存在基金权限按钮
    fund: [],
    token: '',
    permissionStatus: false
    // token: '' || JSON.parse(sessionStorage.getItem('userInfor')).token
};

const mutations = {
    addTab(state, targetName) {
        if (!state.TitleList) {
            return;
        };
        let obj = {};
        obj.title = targetName.title;
        obj.path = targetName.url;
        obj.name = targetName.name;
        for (let i = 0; i < state.TitleList.length; i++) {
            if (state.TitleList[i].name == targetName.name) {
                return;
            }
        };
        state.TitleList.push(obj);
        window.sessionStorage.setItem('key', JSON.stringify(state.TitleList));
    },
    deleTab(state, obj) {
        state.TitleList.splice(obj.index, 1);
        window.sessionStorage.setItem('key', JSON.stringify(state.TitleList));
        if (obj.index == 0) {
            obj.self.$router.push({
                name: 'homeContent'
            });
            return;
        }
        obj.self.$router.push({
            path: state.TitleList[obj.index - 1].path
            // path: state.TitleList[obj.index - 1].name
        });
    },
    pushUserInfor(state, data) {
        state.userInfor = data.userInfo; //push merchants(组织列表) 数据到state
    },
    pushMerchants(state, data) {
        state.merchants = data.merchants; //push merchants(组织列表) 数据到state
    },
    changeLoginCard(state) {
        state.CardBox = loginCard;
    },
    saveApprovalStatus(state, approvelType) { //保存审核状态
        state.approvelType.type = approvelType.type;
        state.approvelType.text = approvelType.text;
        state.approvelType.isLogged = true;

    },
    showOrHide(state, isShouye) { //是否显示首页和通讯录菜单
        state.showOrHide.isVshowYe = isShouye.isVshowYe;
        state.showOrHide.isShowSidebar = isShouye.isShowSidebar;
    },
    Notification(state, msg) { //登录成功提示信息 Box
        Notification({
            title: msg.title,
            message: msg.message,
            type: msg.type
        })
    },
    getUserButton_permission(state, option) {
        option.this.$http
            .post(option.this.api + "/role/getUserButton", {
                "userId": state.userInfor.id,
                "merchantId": state.merchants[0].id
            })
            .then(res => {
                if (res.status == "200") {
                    if (res.data.state == "200") {
                        console.log('其他模块按钮权限数据');
                        console.log(res.data);

                    } else {
                        console.log(res.data.message);
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    },
    getPermissionButton_permission(state, permissList) { //获取客户端系统项目、基金按钮
        console.log(222);
        if (permissList.length == 0) {
            console.log('没有项目基金权限数据');
            return;
        };
        state.permissionCode = permissList; //保存所有权限按钮数据
        window.sessionStorage.setItem('permissionCode', JSON.stringify(state.permissionCode));
        // console.log(state.permissionCode);
        state.permissionCode_project = [];
        state.permissionCode_fund = [];
        state.permissionCode.map((item, index) => {
            if (state.permissionCode[index].permissionType == 0) { //项目按钮
                state.permissionCode_project.push(state.permissionCode[index].permissionCode);
                window.sessionStorage.setItem('permissionCode_project', JSON.stringify(state.permissionCode_project));
            };
            if (state.permissionCode[index].permissionType == 1) { //基金按钮
                state.permissionCode_fund.push(state.permissionCode[index].permissionCode);
                window.sessionStorage.setItem('permissionCode_fund', JSON.stringify(state.permissionCode_fund));
            };
        });
        console.log('项目按钮权限');
        console.log(state.permissionCode_project);
        console.log('基金按钮权限');
        console.log(state.permissionCode_fund);
        // console.log(res.data.message);
    },
    getPermissionButton(state, option) { //获取客户端系统项目、基金按钮
        option.this.$http
            .post(option.this.api + "/permission/getPermissionButton", {
                userId: state.userInfor.id,
                merchantId: state.merchants[0].id,
                typeId: option.typeId
            })
            .then(res => {
                if (res.status == "200") {
                    if (res.data.status == "200") {

                        // commit('getPermissionButton_permission', res.data.result);
                        if (res.data.result.length == 0) {
                            // alert('000');
                            console.log('没有项目基金权限数据');
                            return;
                        };
                        state.permissionCode = res.data.result; //保存所有权限按钮数据
                        window.sessionStorage.setItem('permissionCode', JSON.stringify(state.permissionCode));
                        // console.log(state.permissionCode);
                        state.permissionCode_project = [];
                        state.permissionCode_fund = [];
                        var authList = [];
                        state.permissionCode.map((item, index) => {
                            // if (state.permissionCode[index].permissionType == 0) { //项目按钮
                                authList.push(state.permissionCode[index].permissionCode);
                                // option.this.authList.push(state.permissionCode[index].permissionCode);
                                option.this.authList = authList;
                                option.this.authStatus = true;
                                // window.sessionStorage.setItem('permissionCode_project', JSON.stringify(state.permissionCode_project));
                            // };
                            // if (state.permissionCode[index].permissionType == 1) { //基金按钮
                                
                            //     state.permissionCode_fund.push(state.permissionCode[index].permissionCode);
                            //     window.sessionStorage.setItem('permissionCode_fund', JSON.stringify(state.permissionCode_fund));
                            // };
                        });
                        // option.this.$set(option.this.$data, 'authList', authList);
                        console.log('项目按钮权限');
                        console.log(state.permissionCode_project);
                        console.log('基金按钮权限');
                        console.log(state.permissionCode_fund);
                        state.permissionStatus = true;
                        // alert('111');
                        // console.log(res.data.message);
                    } else {
                        console.log(res.data.message);
                    }
                    
                    console.log('项目按钮权限更新了');
                }
            })
            .catch(error => {
                console.log(error);
            })
    },
    authToken(state, token) {
        state.token = token;
    }
};

const actions = {
    loginAPI({
        commit,
        state
    }, user) { //send login API
        user.self.$http.post(user.self.api + '/user/login', {
            number: user.name,
            pass: user.pwd
            // number: "010",
            // pass: "e10adc3949ba59abbe56e057f20f883e"
        }).then(data => {
            if (data.status == '403') {
                commit('Notification', {
                    title: '',
                    message: '请求超时',
                    type: 'error'
                });
                state.loading = false;
                return;
            } else if (data.data.status == '1015') {
                commit('Notification', {
                    title: '',
                    message: data.data.message,
                    type: 'warning'
                });
                state.loading = false;
                return;
            } else if (data.data.status == '156') { //用户名或密码不正确
                commit('Notification', {
                    title: '',
                    message: '用户名或密码不正确，请重新输入',
                    type: 'error'
                });
                state.loading = false;
                // this.$Message.error('用户名或密码不正确，请重新输入');
                return;
            } else if (data.status == '200') { //登录成功
                state.loading = false;
                console.log(data);
                if (data.data.result.userInfo.disables == '0') {
                    commit('Notification', {
                        title: '',
                        message: '该用户已被禁用',
                        type: 'warning'
                    });
                    return;
                };
                // alert('success');
                state.approvelType.isLogged = true;
                // console.log(user);
                commit('pushUserInfor', data.data.result);
                commit('authToken', state.userInfor.token);
                window.sessionStorage.setItem('userInfor', JSON.stringify(state.userInfor));
                window.sessionStorage.setItem('token', JSON.stringify(state.userInfor.token));
                // state.token = state.userInfor.token;
                console.log(state.token);
                // console.log(data.data);
                if (data.data.result.userInfo.isMerchant >= '1') { //有组织
                    commit('pushMerchants', data.data.result);
                    window.sessionStorage.setItem('merchants', JSON.stringify(state.merchants));
                    // console.log(state.merchants);
                    if (state.merchants.length == '1') { //只有一个组织
                        // console.log(state.merchants[0].type);
                        if (state.merchants[0].type == '0') { //审核中
                            commit('saveApprovalStatus', {
                                type: state.merchants[0].type,
                                text: '您的申请正在审核中,请您耐心等待~'
                            });
                            window.sessionStorage.setItem('saveApprovalStatus', JSON.stringify(state.approvelType));
                        } else if (state.merchants[0].type == '1') { //审核通过
                            commit('saveApprovalStatus', {
                                type: state.merchants[0].type,
                                text: '审核通过'
                            });
                            window.sessionStorage.setItem('saveApprovalStatus', JSON.stringify(state.approvelType));
                        } else if (state.merchants[0].type == '2') { //审核失败
                            // alert(state.merchants[0].type);
                            commit('saveApprovalStatus', {
                                type: state.merchants[0].type,
                                text: '太遗憾了,您的审核未通过,再接再厉哦~'
                            });
                            window.sessionStorage.setItem('saveApprovalStatus', JSON.stringify(state.approvelType));
                        } else if (state.merchants[0].type == '3') { //已注册但未开通试用权限
                            // alert(state.merchants[0].type);
                            commit('saveApprovalStatus', {
                                type: state.merchants[0].type,
                                text: '恭喜您注册成功,请您点击右上角申请开通使用权限~'
                            });
                            window.sessionStorage.setItem('saveApprovalStatus', JSON.stringify(state.approvelType));
                        };
                        if (state.merchants[0].type != '1') { //还未审核通过
                            commit('showOrHide', {
                                isVshowYe: 0,
                                isShowSidebar: 1
                            });
                            window.sessionStorage.setItem('showOrHide', JSON.stringify(state.showOrHide));
                            user.self.$router.push({ //只显示通讯录菜单列表
                                name: 'contacts'
                                // name: 'homeContent'
                            });
                            commit('Notification', {
                                title: '',
                                message: '登录成功',
                                type: 'success'
                            });
                        } else {
                            commit('showOrHide', {
                                isVshowYe: 1,
                                isShowSidebar: 1
                            });
                            window.sessionStorage.setItem('showOrHide', JSON.stringify(state.showOrHide));
                            user.self.$router.push({ //审核已通过
                                name: 'homeContent'
                            });
                            commit('Notification', {
                                title: '',
                                message: '登录成功',
                                type: 'success'
                            });
                        };
                        // console.log('um_id:' + state.merchants[0].um_id);
                        // console.log('//////////////////////////////////////////////////////////////////////////');
                        state.logoSrc.logo = data.data.result.merchants[0].logo; //企业logo
                        state.logoSrc.merchantName = data.data.result.merchants[0].merchant_name; //企业名字
                        window.sessionStorage.setItem('logoSrc', JSON.stringify(state.logoSrc));
                        // console.log(state.logoSrc);
                    } else if (state.merchants.length > '1') { //有多个组织列表
                        state.CardBox = loginBox;
                    } else if (state.merchants.length == '0') { //无组织列表
                        commit('Notification', {
                            title: '',
                            message: '无组织',
                            type: 'error'
                        });
                    };
                    state.loading = false;
                    // console.log(state.merchants.length);
                } else if (data.data.result.userInfo.isMerchant == '0') { //无组织(不存在这种情况)
                    user.self.$router.push({
                        name: 'homeContent'
                    });
                    state.loading = false;
                }
            }
        }).catch(error => {
            commit('Notification', {
                title: '',
                message: '服务器异常,请稍后再试',
                type: 'error'
            });
            state.loading = false;
            console.log(error);
        })
    }
}

export default {
    state,
    mutations,
    actions
}
