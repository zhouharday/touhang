import * as types from '../mutations-type'
import {getInvestorList, getProjectType, getIdType, getSubArea} from 'api/investor'
const state = {
    investorList: {},
    projectType: {}
}

const getters = {
    investorList: state => state.investorList,
    projectType: state => state.projectType
}

const mutations = {
    [types.GET_INVESTORLIST](state, investorList) {
        state.investorList = investorList
    },
    [types.GET_PROJECTTYPE](state, projectType) {
        state.projectType = projectType
    }
}

const actions = {
    getInvestor({commit, dispatch}) {
        return getInvestorList().then((response) => {
            if (response.status == '200') {
                commit(types.GET_INVESTORLIST, response.data.result)
            }
        }).catch(err => {
            console.log(response)
        })
    },
    getProType({commit, dispatch}) {
        return getProjectType().then((response) => {
            if(response.status == '200') {
                commit(types.GET_PROJECTTYPE, response.data.result)
            }
        }).catch(err => {
            console.log(response)
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
