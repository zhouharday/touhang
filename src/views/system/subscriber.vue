<template>
<div class="subscriber">
    <el-row :gutter="20">
        <!-- 树形控件 -->
        <el-col :span="6">
            <el-tree :data="structure" :props="defaultProps" accordion :default-expand-all="true" class="tree" @node-click="handleNodeClick">
            </el-tree>
        </el-col>
        <!-- table页面 -->
        <el-col :span="18">
            <div class="title">
                <div class="filter">
                    <el-input placeholder="请输入搜索内容" icon="search" v-model="input2" :on-icon-click="handleIconClick">
                    </el-input>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="btn"></div>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            structure: [{
                label: '双子金服基金公司',
                children: [{
                    label: '市场部',
                    children: [{
                        label: 'a小组'
                    }, {
                        label: 'b小组'
                    }]
                }, {
                    label: '人事部'
                }, {
                    label: '开发部',
                    children: [{
                        label: '前端组'
                    }, {
                        label: '后台组'
                    }, {
                        label: 'UI组'
                    }]
                }]
            }, {
                label: '深度网络科技有限公司',
                children: [{
                    label: '市场部',
                    children: [{
                        label: 'a小组'
                    }, {
                        label: 'b小组'
                    }]
                }, {
                    label: '人事部'
                }, {
                    label: '开发部',
                    children: [{
                        label: '前端组'
                    }, {
                        label: '后台组'
                    }, {
                        label: 'UI组'
                    }]
                }]
            }],
            options: [{
                value: '所有',
                label: '所有'
            }, {
                value: '锁定',
                label: '锁定'
            }, {
                value: '启用',
                label: '启用'
            }],
            value: ''
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/mixin.less";
.subscriber {
    .base-style();
    .tree {
        &:hover {
            box-shadow: 0 2px 7px rgba(0,0,0,.15);
            border-color: transparent;
        }
    }
    .title {
        width: 100%;
        height: 42px;
        padding-bottom: 12px;
    }
}
</style>
