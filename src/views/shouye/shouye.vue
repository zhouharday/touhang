<template>
    <div class="navmenu">
        <ul>
            
                <!-- <span>{{title}}</span> -->
                
                <router-link to="/home/shouye" tag="li">
                     {{title}} 
                </router-link>
            
            <!-- <li v-for="item in titleList" :key="item.index">
                    <span>{{title}}</span>
                    <router-link :to="item.path">
                        <span>{{item.title}}</span>
                        <img src="">
                    </router-link>
                </li> -->
            <router-link tag="li" v-for="item in ttaa" :key="item.index" :to="item.path">
                <span>{{item.title}}</span>
                <img src="">
            </router-link>
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
    }
}
</script>
