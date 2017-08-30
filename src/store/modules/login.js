import request from 'superagent'

import loginBox from '../../components/loginBox.vue'
import loginCard from '../../components/loginCard.vue'

const state = {
    TitleList: [],
    userInfor: {}, //save user login infor
    merchants: [], //save 组织列表
    CardBox: loginCard,
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
                number: "xiaowen",
                pass: "e10adc3949ba59abbe56e057f20f883e"
            })
            .then(data => {
                // alert(1);
                if (data.data.status == '500') {
                    // alert(1);
                } else if (data.data.status == '156') {
                    alert('用户名或密码不正确');
                    console.log('用户名或密码不正确');
                    // console.log(data.data);
                    return;
                } else if (data.data.status == '200') { //登录成功
                    // alert('success');
                    commit('pushUserInfor', data.data.result);
                    console.log(state.userInfor);
                    if (data.data.result.userInfo.isMerchant >= '1') { //有组织
                        commit('pushMerchants', data.data.result);
                        if (state.merchants.length == '1') {
                            userPwd.self.$router.push({
                                name: 'homeContent'
                            });
                        } else if (state.merchants.length > '1') {
                            state.CardBox = loginBox;

                        }
                        console.log(state.merchants);
                        console.log(state.merchants.length);

                        // console.log(state.loginCard);
                    } else if (data.data.result.userInfo.isMerchant == '0') { //无组织

                        userPwd.self.$router.push({
                            name: 'homeContent'
                        });
                    }
                }
            })
            .catch(error => {
                alert('服务器异常，请稍后再试');
                console.log(error);
            })
    }
}





export default {
    state,
    mutations,
    actions
}
