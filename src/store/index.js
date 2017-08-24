import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        TitleList: [],
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
            console.log(obj);
            state.TitleList.splice(obj.index, 1);
            window.sessionStorage.setItem('key', JSON.stringify(state.TitleList));
            if (obj.index == 0) {
                obj.self.$router.push({ name: 'homeContent' });
                return;
            }
            // obj.self.$router.push({ name: state.TitleList[obj.index - 1].name });
            console.log(state.TitleList[obj.index - 1].name);
            console.log(state.TitleList);

            obj.self.$router.push({ path: state.TitleList[obj.index - 1].path });

        }
    }
})

export default store