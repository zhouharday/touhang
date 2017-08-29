import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        TitleList: [],
        userInfor: [] //save user login infor
        // tabIndex: ''
    },
    // 将数据存储到本地
    setData(key, value) {
        localStorage[key] = JSON.stringify(value);
    },
    getData(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    },
    mutations: {
        addTab(state, targetName) {
            // console.log(targetName);
            let obj = {};
            obj.title = targetName.title;
            obj.path = targetName.url;
            obj.name = targetName.name;
            if (state.TitleList) {
                // alert(1);
                for (let i = 0; i < state.TitleList.length; i++) {
                    if (state.TitleList[i].name == targetName.name) {
                        return;
                    }
                }
            }
            state.TitleList.push(obj);
            // console.log(state.TitleList);
            window.sessionStorage.setItem('key', JSON.stringify(state.TitleList));
        },
        deleTab(state, obj) {
            // console.log(obj);
            state.TitleList.splice(obj.index, 1);
            window.sessionStorage.setItem('key', JSON.stringify(state.TitleList));
            if (obj.index == 0) {
                obj.self.$router.push({
                    name: 'homeContent'
                });
                return;
            }
            // obj.self.$router.push({ name: state.TitleList[obj.index - 1].name });
            // console.log(state.TitleList[obj.index - 1].name);
            // console.log(state.TitleList);

            obj.self.$router.push({
                path: state.TitleList[obj.index - 1].path
            });

        },
        changeData(state, data) { //操作异步方法改变state
            state.userInfor = data;
        }
    },
    actions: { //定义异步方法
        loginAPI({
            context,
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
                    // alert(data.data);
                    if (data.data.status == '156') {
                        //用户名或密码不正确
                        // alert('用户名或密码不正确');
                        console.log('用户名或密码不正确');
                        console.log(data.data);
                        return;
                    } else if (data.data.status == '200') { //登录成功
                        // alert('success');
                        state.textData = data.data;
                        commit('changeData', data.data);
                        userPwd.self.$router.push({
                            name: 'homeContent'
                        });
                        console.log(state.textData);
                    }
                    // console.log(data.data);
                })
                .catch(error => {
                    // alert(error);
                    console.log(error);
                })
        }
    }
})

export default store
