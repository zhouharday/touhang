<template>
<div class="cpdf">
    <div class="center">
        <div class="contor">
            <el-button id="prev" @click="closepdf">关闭</el-button>
        </div>
    </div>
    <iframe v-if="isshowpdf" :src="'../../../../static/js/pdf/web/viewer.html?file='+pdfurl" width="100%" height="100%" scrolling="no"></iframe>
</div>
</template>
<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
export default {
    props: {
        'pdfurl': {
            type: String,
            default: ''
        }
    },
    watch: {
        'pdfurl':function (to,from){
            if(to != from){
                this.transUrl = to.replace('http://47.90.120.190:8086', '/file');
                this.isshowpdf = true;
            }
        }
    },
    data() {
        return {
            isshowpdf: false,
            transUrl: ''
        }
    },
    methods: {
        closepdf() { //关闭PDF
            this.$emit('closepdf');
        }
    },
    mounted() {
    }
}
</script>

<style lang="less" scoped>
.cpdf {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    .center {
        text-align: center;
        height: 100%;
        overflow: auto;
        padding-top: 20px;
        .contor {
            position: absolute;
            right: 50px;
            top: 50px;
        }
    }
}

</style>
