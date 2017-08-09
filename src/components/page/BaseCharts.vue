<template>
    <div>
    <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
        <el-tab-pane
        :key="item.name"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.name"
        >      
        </el-tab-pane>
    </el-tabs>
    <div class="head-page">
        <p class="headName">陕西深度网络有限公司</p>
        <el-button class="back" type="primary">返回</el-button>
        <el-button class="next" type="primary">下一步</el-button>
        <el-button class="load" type="primary">
          <i class="el-icon-star-on"></i>
        </el-button>
     </div>
    </div>   
</template>

<script>
    
    export default {
        data() {
          return {
            editableTabsValue: '2',
            editableTabs: [{
              title: 'Tab 1',
              name: '1',
              content: 'Tab 1 content'
            }, {
              title: 'Tab 2',
              name: '2',
              content: 'Tab 2 content'
            }],
            tabIndex: 2
          }
        },
        methods: {
          handleTabsEdit(targetName, action) {
            if (action === 'add') {
              let newTabName = ++this.tabIndex + '';
              this.editableTabs.push({
                title: 'New Tab',
                name: newTabName,
                content: 'New Tab content'
              });
              this.editableTabsValue = newTabName;
            }
            if (action === 'remove') {
              let tabs = this.editableTabs;
              let activeName = this.editableTabsValue;
              if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                  if (tab.name === targetName) {
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {activeName = nextTab.name;
                    }
                  }
                });
              }
              
              this.editableTabsValue = activeName;
              this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            }
          }
        }
      }
</script>

<style scoped>
    .head-page{
        width: 1166px;
        height: 64px;
        background: #2E363F;
        font: "微软雅黑";
        line-height: 64px;
        font-size: 20px; 
        color: #f1f3f7;  
        padding-left: 20px; 
    }
    .back,.next,.load{
        background: #f05e5e;
        border: none;
        border-radius: 30px;
        /*float: right;*/
    }
    .headName{
      width: 500px;
      height: 64px;
      display: inline-block;
    }

</style>