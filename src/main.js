import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题


Vue.use(ElementUI);

// import Vue from 'vue'
// import Vuex from './vuex'


Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        TitleList: [
            //     {
            //     title: '',
            //     path: '',
            // }
        ],
        tabIndex: ''
    },
    mutations: {
        addTab(state, targetName) {
            // console.log(targetName);
            let obj = {};
            obj.title = targetName.a;
            obj.path = targetName.b;
            // let newTabName = ++this.tabIndex + '';
            state.TitleList.push(obj);
            // this.editableTabsValue2 = newTabName;
        },
        // removeTab(targetName) {
        //     let tabs = this.editableTabs2;
        //     let activeName = this.editableTabsValue2;
        //     if (activeName === targetName) {
        //         tabs.forEach((tab, index) => {
        //             if (tab.name === targetName) {
        //                 let nextTab = tabs[index + 1] || tabs[index - 1];
        //                 if (nextTab) {
        //                     activeName = nextTab.name;
        //                 }
        //             }
        //         });
        //     }

        //     this.editableTabsValue2 = activeName;
        //     this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
        // }
    }
})


var vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');