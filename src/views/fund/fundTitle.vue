<template>
<div class="fundTitle">
    <div class="title">
        <div class="desc">
            <span class="defaultcolor">{{data.desc}}</span>
        </div>
        <div class="btn" v-if="edit">
            <el-button class="btnwrapper" @click="editFormData" v-if="editOrPre">
                <Icon type="edit"></Icon>
                <span class="explain">编辑</span>
            </el-button>
            <el-button class="btnwrapper" @click="preservation" v-else="!editOrPre">
                <Icon type="upload"></Icon>
                <span class="explain">保存</span>
            </el-button>
        </div>
    </div>

</div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        data: {
            type: Object,
            default: () => {}
        },
        edit: {
            type: Boolean,
            default: true
        },
        editOrPre: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        editFormData() {
            this.$emit('add')
        },
        preservation() {
            this.$emit('confirm')
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/mixin.less";
.fundTitle {
    .title();
}
</style>
