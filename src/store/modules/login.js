import {
    Notification
} from 'element-ui'
// import request from 'superagent'
import * as types from '../mutations-type'
import loginBox from '../../components/loginBox.vue'
import loginCard from '../../components/loginCard.vue'

const state = {
    TitleList: [],
    userInfor: {}, //save user login infor
    merchants: [], //save 组织列表
    isLogged: false, //登录状态
    menus: [],
    logoSrc: {
        logo: '',
        merchantName: ''
    },
    CardBox: loginCard,
    showOrHide: {
        isVshowYe: true, //是否显示首页
        isShowSidebar: false, //是否只显示通讯录菜单列表
        // isShowSidebar: true,
    },
    approvelType: { //企业审核状态
        type: '',
        text: ''
    },
}

const mutations = {
    addTab(state, targetName) {
        let obj = {};
        obj.title = targetName.title;
        obj.path = targetName.url;
        obj.name = targetName.name;
        if (state.TitleList) {
            for (let i = 0; i < state.TitleList.length; i++) {
                if (state.TitleList[i].name == targetName.name) {
                    return;
                }
            }
        }
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
    }
}

const actions = {
    loginAPI({
        commit,
        state
    }, user) { //send login API
        // console.log(user);
        user.self.$http.post('api/user/login', {
            number: user.name,
            pass: user.pwd
            // number: "010",
            // pass: "e10adc3949ba59abbe56e057f20f883e"
        }).then(data => {
            // alert(1);
            if (data.data.status == '403') {
                alert(data.data.message);
            } else if (data.data.status == '156') { //用户名或密码不正确
                alert(data.data.message);
                console.log(data.data.message);
                return;
            } else if (data.data.status == '200') { //登录成功
                // alert('success');
                state.isLogged = true;
                console.log(user);
                commit('pushUserInfor', data.data.result);
                window.sessionStorage.setItem('userInfor', JSON.stringify(state.userInfor));
                console.log(state.userInfor);
                // console.log(data.data);
                if (data.data.result.userInfo.isMerchant >= '1') { //有组织
                    commit('pushMerchants', data.data.result);
                    window.sessionStorage.setItem('merchants', JSON.stringify(state.merchants));
                    console.log(state.merchants);
                    if (state.merchants.length == '1') { //只有一个组织
                        console.log(state.merchants[0].type);

                        if (state.merchants[0].type == '0') { //审核中
                            commit('saveApprovalStatus', { type: state.merchants[0].type, text: '您的申请正在审核中,请您耐心等待~' });
                            window.sessionStorage.setItem('saveApprovalStatus', JSON.stringify(state.approvelType));

                        } else if (state.merchants[0].type == '1') { //审核通过

                            commit('saveApprovalStatus', { type: state.merchants[0].type, text: '审核通过' });
                            window.sessionStorage.setItem('saveApprovalStatus', JSON.stringify(state.approvelType));

                        } else if (state.merchants[0].type == '2') { //审核失败
                            // alert(state.merchants[0].type);
                            commit('saveApprovalStatus', { type: state.merchants[0].type, text: '太遗憾了,您的审核未通过,再接再厉哦~' });
                            window.sessionStorage.setItem('saveApprovalStatus', JSON.stringify(state.approvelType));

                        } else if (state.merchants[0].type == '3') { //已注册但未开通试用权限
                            // alert(state.merchants[0].type);
                            commit('saveApprovalStatus', { type: state.merchants[0].type, text: '恭喜您注册成功,请您点击右上角申请开通使用权限~' });
                            window.sessionStorage.setItem('saveApprovalStatus', JSON.stringify(state.approvelType));
                        };
                        if (state.merchants[0].type != '1') { //还未审核通过
                            commit('showOrHide', { isVshowYe: 0, isShowSidebar: 1 });
                            window.sessionStorage.setItem('showOrHide', JSON.stringify(state.showOrHide));
                            user.self.$router.push({ //只显示通讯录菜单列表
                                name: 'contacts'
                            });
                            commit('Notification', {
                                title: '',
                                message: '登录成功',
                                type: 'success'
                            });
                        } else {
                            user.self.$router.push({ //审核已通过
                                name: 'homeContent'
                            });
                            commit('Notification', {
                                title: '',
                                message: '登录成功',
                                type: 'success'
                            });
                        }
                        // console.log('um_id:' + state.merchants[0].um_id);
                        console.log('//////////////////////////////////////////////////////////////////////////');
                        state.logoSrc.logo = data.data.result.merchants[0].logo; //企业logo
                        state.logoSrc.merchantName = data.data.result.merchants[0].merchant_name; //企业名字
                        window.sessionStorage.setItem('logoSrc', JSON.stringify(state.logoSrc));
                        // console.log(state.logoSrc);
                    } else if (state.merchants.length > '1') { //有多个组织列表
                        state.CardBox = loginBox;
                    }
                    // console.log(state.merchants.length);

                } else if (data.data.result.userInfo.isMerchant == '0') { //无组织(不存在这种情况)
                    user.self.$router.push({
                        name: 'homeContent'
                    });
                }
            }
        }).catch(error => {
            commit('Notification', {
                title: '',
                message: '服务器异常,请稍后再试',
                type: 'error'
            });
            console.log(error);
        }) 
    }
}
export default {
    state,
    mutations,
    actions
}
