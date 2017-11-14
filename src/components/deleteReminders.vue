<template>
    <div class="deleteReminders">
        <Modal v-model="deleteReminders" width="360">
            <p slot="header">
                <span>{{message_title}}</span>
            </p>
            <div style="text-align:center">
                <p>{{message}}</p>
            </div>
            <div slot="footer" class="bottom">
                <Button type="ghost" @click="cancelHandler($event)">取消</Button>
                <Button type="error" :loading="modal_loading" @click="delHandler($event)">{{btnText}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props: {
        deleteReminders: {
            type: Boolean,
            default: false
        },
        modal_loading: {
            type: Boolean,
            default: false
        },
        message_title: {
            type: String,
            default: '确认删除'
        },
        message: {
            type: String,
            default: '是否确认删除该条记录？'
        },
        btnText: {
            type: String,
            default: '删除'
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
    .ivu-modal-footer {
        border: none;
        .bottom {
            text-align: center
        }
    }
}
</style>
