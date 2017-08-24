<template>
    <div class="navmenu">
        <ul>
            <router-link to="homeContent" tag="li" :class="{active:$route.name == 'homeContent'}">
                {{title}}
            </router-link>
              <!-- <a href="#homeContent">{{title}}</a>   -->
            <li v-for="(item,index) in ttaa" :key="item.index" @click="linkFun($event,item.path,index)" :class="{active:$route.name == item.name || $route.path == item.path }">
                <span>{{item.title}}</span>
                <img src="/static/img/close.png">
            </li>
        </ul>
    </div>
</template>

<style lang="less" scoped>
.navmenu {
    width: 100%;
    height: 35px;
    line-height: 35px;
    ul {
        overflow: hidden;
        li {
            position: relative;
            padding-left: 20px;
            padding-right: 20px;
            // width: 80px;
            height: 35px;
            float: left;
            line-height: 35px;
            cursor: pointer;
            border-radius: 10px 11px 0 0;
            &.active {
                background-color: #fff;
            }
            >img {
                position: absolute;
                top: 9px;
                right: 0;
            }
        }
    }
}
</style>
<script>
import { mapState } from 'vuex'
export default {
    watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    //   console.log(from,to);
    }
  },
    computed: mapState({
        ttaa( state ) {
            // let localData = sessionStorage.getItem('key');
            // alert(null);
            // console.log( sessionStorage.getItem('key') );
            // if ( state.TitleList == '' ) {
                // return JSON.parse(sessionStorage.getItem('key'));
            // }
             state.TitleList = JSON.parse(sessionStorage.getItem('key')) || [];
            // return localData;
            // this.$store.commit( 'addTab',localData )//同步操作
            // return JSON.parse(sessionStorage.getItem('key'));
            return this.$store.state.TitleList;
        }
    }),
    data() {
        return {
            title: '首页',
            // ttaa: this.$store.state.TitleList
        }
    },
    methods: {
        linkFun($event, path, index) {
            if ($event.target.tagName == 'IMG') {
                this.$store.commit('deleTab', { index: index, self: this });
                return;
            }
            this.$router.push({ path: path });
        }
    }
}
</script>
