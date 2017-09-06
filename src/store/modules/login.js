import { Notification } from 'element-ui'
// import request from 'superagent'
import * as types from '../mutations-type'
import loginBox from '../../components/loginBox.vue'
import loginCard from '../../components/loginCard.vue'

const state = {
    TitleList: [],
    userInfor: {}, //save user login infor
    merchants: [], //save 组织列表
    menus: [],
    logoSrc: {
        logo: '',
        merchantName: ''
    },
    CardBox: loginCard
}
// const mutations = {
//     [types.SET_TITLELIST](state, targetName) {
//         state.TitleList = targetName
//     }
// }
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
    }, userPwd) { //send login API
        // console.log(userPwd);
        // userPwd.self.$http.post('http://localhost:8080/api/user/login', {
        userPwd.self.$http.post('api/user/login', {
            // number: userPwd.name,
            // pass: userPwd.pwd
            number: "010",
            pass: "e10adc3949ba59abbe56e057f20f883e"
        }).then(data => {
            // alert(1);
            if (data.data.status == '403') {
                alert(data.data.message);
            } else if (data.data.status == '156') { //用户名或密码不正确
                alert(data.data.message);
                console.log(data.data.status);
                console.log(data.data.message);
                return;
            } else if (data.data.status == '200') { //登录成功
                // alert('success');
                commit('pushUserInfor', data.data.result);
                window.sessionStorage.setItem('userInfor', JSON.stringify(state.userInfor));
                console.log(state.userInfor);
                console.log(data.data);
                if (data.data.result.userInfo.isMerchant >= '1') { //有组织
                    commit('pushMerchants', data.data.result);
                    window.sessionStorage.setItem('merchants', JSON.stringify(state.merchants));
                    // console.log(state.merchants);
                    if (state.merchants.length == '1') { //只有一个组织
                        console.log('um_id:' + state.merchants[0].um_id);
                        console.log('//////////////////////////////////////////////////////////////////////////');
                        state.logoSrc.logo = data.data.result.merchants[0].logo;
                        state.logoSrc.merchantName = data.data.result.merchants[0].merchant_name;
                        window.sessionStorage.setItem('logoSrc', JSON.stringify(state.logoSrc));
                        // console.log(state.logoSrc);
                        userPwd.self.$router.push({
                            name: 'homeContent'
                        });
                        // userPwd.self.$http.post('api/user/findResourceByUid', { //请求用户权限列表数据
                        //     "um_id": state.merchants[0].um_id //用户、机构中间id
                        // }).then(Response => {
                        //     state.menus = Response.data.result;
                        //     console.log(state.menus);
                        //     if (Response.data.status == '200') {
                        //         // alert(1);
                        //         userPwd.self.$router.push({
                        //             name: 'homeContent'
                        //         });
                        //         commit('Notification', {
                        //             title: '',
                        //             message: '登录成功',
                        //             type: 'success'
                        //         });
                        //     }
                        // }).catch(error => {
                        //     commit('Notification', {
                        //         title: '',
                        //         message: '服务器异常,请稍后再试',
                        //         type: 'error'
                        //     });
                        // });
                    } else if (state.merchants.length > '1') { //有多个组织列表
                        state.CardBox = loginBox;

                    }
                    // console.log(state.merchants.length);

                } else if (data.data.result.userInfo.isMerchant == '0') { //无组织(不存在这种情况)
                    userPwd.self.$router.push({
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
