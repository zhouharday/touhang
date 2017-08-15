<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
             <v-shouye></v-shouye>
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<style lang="less" scoped>

</style>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vShouye from '../views/home/homeTab.vue';

export default {
    components: {
        vHead, vSidebar, vShouye
    },
    data() {
        return {
        
        }
    }
}

</script>