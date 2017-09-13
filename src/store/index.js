import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import login from './modules/login'
import register from './modules/register'
import system from './modules/system'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);
// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        login,
        system,
        register
    },
    // strict: debug,
    // plugins: debug ? [createLogger()] : []
})
