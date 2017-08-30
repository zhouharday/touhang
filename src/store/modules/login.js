import request from 'superagent'

import loginBox from '../../components/loginBox.vue'
import loginCard from '../../components/loginCard.vue'



const state = {
    TitleList: [],
    userInfor: {}, //save user login infor
    merchants: [], //save 组织列表
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
    changeData(state, data) { //操作异步方法改变state
        state.userInfor = data; //保存userInfor(用户信息) 数据到state
    },
    changeLogo(state,data){
        state.merchants = data; //merchants(组织列表) 数据到state
    }
}

const actions = {
    loginAPI({
        commit,
        state
    }, userPwd) { //send login API
        // console.log(userPwd);
        userPwd.self.$http.post('api/user/login', {
                // number: userPwd.name,
                // pass: userPwd.pwd
                number: "xiaowen",
                pass: "e10adc3949ba59abbe56e057f20f883e"
            })
            .then(data => {
                if (data.data.status == '156') {
                    alert('用户名或密码不正确');
                    console.log('用户名或密码不正确');
                    // console.log(data.data);
                    return;
                } else if (data.data.status == '200') { //登录成功
                    // alert('success');
                    commit('changeLogo', data.data.result.merchants);
                    state.userInfor = data.data.result.userInfo;
                    console.log(state.merchants);
                    if (data.data.result.userInfo.isMerchant == '1') { //有组织
                        

                        // console.log(state.loginCard);
                    } else if (data.data.result.userInfo.isMerchant == '0') { //无组织


                        userPwd.self.$router.push({
                            name: 'homeContent'
                        });
                    }
                    // console.log(data.data.result.userInfo.isMerchant);
                    // commit('changeData', data.data);
                    // userPwd.self.$router.push({
                    //     name: 'homeContent'
                    // });
                }
                // console.log(data.data);
            })
            .catch(error => {
                // alert(error);
                console.log(error);
            })
    }
}





export default {
    state,
    mutations,
    actions
}
