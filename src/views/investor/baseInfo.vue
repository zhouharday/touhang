<template>
<div class="baseInfo">
    <tableHeader :theme="theme" :data="dataTitle"></tableHeader>
    <div class="form_wrapper">
        <investor-form :investorForm="baseInfo"></investor-form>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
import investorForm from 'components/investorForm'
export default {
    data() {
        return {
            theme: '#495060',
            dataTitle: {
                desc: '基本信息',
                btnGroup: [{
                    explain: '编辑'
                }]
            },
            formLabelWidth: '120px',
            investorTypeId: [],
            investmentManager: [{
                dicName: JSON.parse(sessionStorage.getItem('userInfor')).name,
                id: JSON.parse(sessionStorage.getItem('userInfor')).id
            }],
            baseInfo: {}
        }
    },
    methods: {
        onCancel() {
            alert('取消')
        },
        onSubmit() {
            alert('确定')
        }
    },
    components: {
        tableHeader,
        investorForm
    }
}
</script>

<style lang="less" scoped>
@import '../../common/styles/variable.less';
@import '../../common/styles/mixin.less';
.baseInfo {
    .base-style();
    .form_wrapper {
        padding: 24px 0;
        .changeWid {
            width: 120px;
        }
    }
}
</style>
