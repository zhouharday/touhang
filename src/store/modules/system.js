import * as types from '../mutations-type'

const state = {
    muen: ''
}

const getters = {
    muen: state => state.muen
}

const mutations = {
    [types.SET_MUNE](state, muen) {
        state.muen = muen
    }
}

export default {
  state,
  getters,
  mutations
}
