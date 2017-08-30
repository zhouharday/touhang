<template>
    <div class="loginCard">
        <div>请确认登录管理后台的企业</div>
        <el-carousel :interval="0" type="card" height="200px" :autoplay='false'>
            <el-carousel-item v-for="item in merchant" :key="item">
                <h3 @click="loginCards(item.um_id)"><img :src="item.logo" alt=""></h3>
                <div class="loginCard_title">{{item.merchant_name}}</div>
            </el-carousel-item>
        </el-carousel>
        <div @click="goBacka($event)">返回</div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        // Getting Vuex State from store/modules/login
        ...mapState({
            merchant: state => state.login.merchants,
        })
    },
    methods: {
        goBacka() {
            this.$store.commit('goBack');
        }
    }
}
</script>