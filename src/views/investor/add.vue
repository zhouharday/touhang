<template>
    <div class="add">
        <my-details></my-details>
    </div>
</template>

<script type="text/ecmascript-6">
import Details from 'views/fund/details'
export default {
    components:{
        myDetails: Details
    }
}
</script>

<style lang="less" scoped>
@import '../../common/styles/variable.less';
.add{
    width: 100%;
    height: 100%;
    background: @color-base;
}
</style>
