<template>
<div class="fund">
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</div>
</template>

<script type="text/ecmascript-6">
export default {

}
</script>

<style lang="less" scoped>
@import '../../common/styles/variable.less';
.fund {
    width: 100%;
    height: 100%;
    background: @color-base;
}
</style>
