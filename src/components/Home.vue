<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
<<<<<<< HEAD
            <v-shouye v-if="isShow.isVshowYe"></v-shouye>
=======
            <v-Tab></v-Tab>
>>>>>>> 7b8bba345062f540d397d6c6995427c9a674c54b
            <transition name="bounce">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<style lang="less" scoped>
.bounce-enter-active {
    animation: bounce-in .3s;
}

.bounce-leave-active {
    animation: bounce-in .3s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    } //   50% {
    //     transform: scale(.5);
    //   }
    100% {
        transform: scale(1);
    }
}
</style>

<script>
import { mapState } from 'vuex'
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import VTab from '../views/home/homeTab.vue';
export default {
    components: {
        vHead, vSidebar, VTab
    },
    computed: {
        ...mapState({
            isShow: state => state.login.showOrHide
        })
    },
    data() {
        return {
           
        }
    }
}

</script>