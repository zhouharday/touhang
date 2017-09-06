import * as types from '../mutations-type'
const state = {
    title: '',
    url: '',
    name: ''
}

const getters = {
    name: state => state.name,
    url: state => state.url,
    title: state => state.title
}
const mutations = {
    [types.SET_URL](state, url) {
        state.url = url
    },
    [types.SET_NAME](state, name) {
        state.name = name
    },
    [types.SET_TITLE](state, title) {
        state.title = title
    }
}

export default {
  state,
  getters,
  mutations
}
