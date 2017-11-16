<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import Vuex from 'vuex';
import store from './store';
import axios from 'axios';
import {mapState} from 'vuex';
export default {
    computed: {
        ...mapState({
            token: state => store.state.login.token = JSON.parse(sessionStorage.getItem('userInfor')).token || ''
        })
    }
}
</script>

<style lang="less">
    @import '../static/css/element-ui(源文件).css';
    @import '../static/css/iview.css';
    @import "../static/css/index.less";
    @import "../static/css/main.less";
    // @import "../static/css/zTreeStyle/zTreeStyle.css";
</style>
