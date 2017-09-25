<template>
<div class="deleteReminders">
    <Modal v-model="deleteReminders" width="360">
        <p slot="header">
            <span>确认删除</span>
        </p>
        <div style="text-align:center">
            <p>是否确认删除该条记录？</p>
        </div>
        <div slot="footer" class="bottom">
            <Button type="ghost" @click="cancelHandler($event)">取消</Button>
            <Button type="error" :loading="modal_loading" @click="delHandler($event)">删除</Button>
        </div>
    </Modal>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        deleteReminders: {
            type: Boolean,
            default: false
        },
        modal_loading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        cancelHandler() {
            this.$emit('cancel', event)
        },
        delHandler(event) {
            this.$emit('del', event)
        }
    }
}
</script>

<style lang="less" scoped>
@import "../common/styles/variable.less";
.deleteReminders {
    width: 360px;
    border-radius: 10px;
    .ivu-modal-footer{
        border: none;
        .bottom{
            text-align: center
        }
    }
}
</style>
