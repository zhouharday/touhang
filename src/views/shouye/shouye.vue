<template>
    <div class="navmenu">
        <ul>
            
                <!-- <span>{{title}}</span> -->
                
                <router-link :to="{name:''}" tag="li">
                     {{title}} 
                </router-link>
            
            <!-- <li v-for="item in titleList" :key="item.index">
                    <span>{{title}}</span>
                    <router-link :to="item.path">
                        <span>{{item.title}}</span>
                        <img src="">
                    </router-link>
                </li> -->
            <li v-for="(item,index) in ttaa" :key="item.index" @click="linkFun($event,item.path,index)" :class="{active:$route.name == item.name}">
                <span>{{item.title}}</span>
                <img src="/static/img/close.png" >
            </li>
        </ul>
    </div>
</template>



<style lang="less" scoped>
.navmenu {
    width: 100%;
    height: 35px;
    line-height: 35px; // text-align: center;
    ul {
        overflow: hidden;
        li {
            padding-left: 20px;
            width: 100px;
            height: 35px;
            float: left;
            line-height: 35px; // text-align: center;
            border: 1px solid #ccc;
            &.active{
                background-color: red;
            }
        }
    }
}
</style>
<script>
export default {
    computed: {
        ttaa() {
            return this.$store.state.TitleList;
        }
    },
    data() {
        return {
            title: '首页'
        }
    },
    methods:{
        linkFun($event,path,index){
            
            if( $event.target.tagName == 'IMG' ){
             
                this.$store.commit('deleTab',{index: index,self: this });
                return;
            }

            this.$router.push({path:path});
        }
    }
}
</script>
