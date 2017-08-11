import Vue from 'vue'
import Vuex from './vuex'


Vue.use(vuex);
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
            console.log(targetName);
            let obj = {};
            obj.title = targetName.a;
            obj.path = targetName.b;
            // let newTabName = ++this.tabIndex + '';
            this.TitleList.push(obj);
            // this.editableTabsValue2 = newTabName;
        },
        removeTab(targetName) {
            let tabs = this.editableTabs2;
            let activeName = this.editableTabsValue2;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
            }

            this.editableTabsValue2 = activeName;
            this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
        }
    }
})