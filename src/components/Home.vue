<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
            <v-shouye v-if="isShow.isVshowYe"></v-shouye>
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
import vShouye from '../views/home/homeTab.vue';
export default {
    components: {
        vHead, vSidebar, vShouye
    },
    computed: {
        ...mapState({
            isShow: state => state.login.showOrHide
        })
    },
    data() {
        return {
            showOrHide: {
                isVshowYe: 0
            }
        }
    }
}

</script>