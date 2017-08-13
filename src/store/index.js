import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        TitleList: [],
        tabIndex: ''
    },
    mutations: {
        addTab(state, targetName) {
            // console.log(targetName);
            let obj = {};
            obj.title = targetName.title;
            obj.path = targetName.url;
            obj.name = targetName.name;
            for(let i=0;i<state.TitleList.length;i++){
                if(state.TitleList[i].name == targetName.name){
                    return;
                }
            }
            state.TitleList.push(obj);
            // let newTabName = ++this.tabIndex + '';
            // this.editableTabsValue2 = newTabName;
        },
        deleTab(state, obj) {

            state.TitleList.splice(obj.index, 1);
            if (obj.index == 0) {
                obj.self.$router.push({ name: 'redrive' });
                return;
            }
            console.log(obj.index)
            // console.log(state.TitleList);
            console.log(state.TitleList[obj.index - 1].name);

            obj.self.$router.push({ name: state.TitleList[obj.index - 1].name });
    
        }
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

export default store