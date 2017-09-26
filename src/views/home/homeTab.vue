<template>
    <div class="navmenu">
        <ul>
            <router-link v-if="isShow.isVshowYe" to="/homeContent" tag="li" :class="{active:$route.name == 'homeContent'}">
                {{title}}
            </router-link>
            <!-- <a href="#homeContent">{{title}}</a>   -->
            <li v-for="(item,index) in ttaa" :key="item.index" @click="linkFun($event,index,item.path,item.name)" :class="{active:$route.name == item.name || $route.path == item.path}">
                <span>{{item.title}}</span>
                <Icon type="close" class="close"></Icon>
            </li>
        </ul>
    </div>
</template>

<style lang="less" scoped>
@import '../../common/styles/variable.less';
.navmenu {
    width: 100%;
    height: 35px;
    line-height: 35px;
    ul {
        overflow: hidden;
        display: flex;
        flex-wrap: nowrap;
        flex-shrink: 1;
        li {
            display: flex;
            flex-wrap: nowrap;
            flex-shrink: 1;
            padding-left: 20px;
            padding-right: 20px; // width: 80px;
            height: 35px;
            float: left;
            line-height: 35px;
            cursor: pointer;
            border-radius: 10px 11px 0 0;
            &.active {
                background-color: #fff;
                min-width:130px;
                box-sizing: border-box;
            }
            .ivu-icon{
                line-height: 35px;
            }
            .close {
                margin-left: 6px;
                font-size: @font-size-medium;
                color: @color-font;
                &:hover {
                    color: @color-theme-red;
                }
            }
        }
    }
}
</style>
<script>
import { mapState } from 'vuex'
export default {
    watch: {
        '$route'(to, from) {
            // 对路由变化作出响应...
            //   console.log(from,to);
        }
    },
    computed: {
        ...mapState({
            isShow: state => state.login.showOrHide,
            ttaa(state) {
                state.login.TitleList = JSON.parse(sessionStorage.getItem('key')) || [];
                return state.login.TitleList;
            },
        }),
    },
    data() {
        return {
            title: '首页',
        }
    },
    methods: {
        // linkFun($event, index, path, name) {
        linkFun($event, index, path) {
            // alert(2);
            if ($event.target.tagName == 'I') {
                this.$store.commit('deleTab', {
                    index: index,
                    self: this,
                });
                return;
            };
            this.$router.push({
                path: path
            });
            // this.$router.push({ name: name });
        }
    }
}
</script>
