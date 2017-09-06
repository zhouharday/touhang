<template>
    <div class="navmenu">
        <ul>
            <router-link to="/homeContent" tag="li" :class="{active:$route.name == 'homeContent'}">
                {{title}}
            </router-link>
            <!-- <a href="#homeContent">{{title}}</a>   -->
<<<<<<< HEAD
            <li v-for="(item,index) in ttaa" :key="item.index" @click="linkFun($event,item.path,index)" :class="{active:$route.name == item.name || $route.path == item.path}">
=======
            <li v-for="(item,index) in ttaa" :key="item.index" @click="linkFun($event,item.path,item.name,index)" :class="{active:$route.name == item.name || $route.path == item.path }">
>>>>>>> 80710da5d3c4d56eb0e43a9b82d45757645b16d8
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
        li {
            padding-left: 20px;
            padding-right: 20px; // width: 80px;
            height: 35px;
            float: left;
            line-height: 35px;
            cursor: pointer;
            border-radius: 10px 11px 0 0;
            &.active {
                background-color: #fff;
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
    computed: mapState({
        ttaa(state) {
            state.login.TitleList = JSON.parse(sessionStorage.getItem('key')) || [];
            return state.login.TitleList;
        }
    }),
    data() {
        return {
            title: '首页',
        }
    },
    methods: {
        linkFun($event, path, name, index) {
            // alert(2);
            if ($event.target.tagName == 'I') {
                this.$store.commit('deleTab', { index: index, self: this });
                return;
            };
            this.$router.push({ path: path });
            // this.$router.push({ name: name });
        }
    }
}
</script>
