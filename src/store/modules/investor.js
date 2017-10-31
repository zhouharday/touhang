import * as types from '../mutations-type'
import {getInvestorList, getProjectType, getIdType, getSubArea} from 'api/investor'
const state = {
    investorList: {},
    projectType: {},
    investorName: '',
    agreement: [] // 投资协议
}

const getters = {
    investorList: state => state.investorList,
    projectType: state => state.projectType,
    investorName: state => state.investorName,
    agreement: state => state.agreement
}

const mutations = {
    [types.GET_INVESTORLIST](state, investorList) {
        state.investorList = investorList
    },
    [types.GET_PROJECTTYPE](state, projectType) {
        state.projectType = projectType
    },
    [types.GET_INVESTORNAME](state, investorName) {
        state.investorName = investorName
    },
    [types.GET_AGREEMENT](state, agreement) {
        state.agreement = agreement
    }
}

const actions = {
    getInvestor({commit, dispatch}) {
        return getInvestorList().then((response) => {
            if (response.status == '200') {
                // console.log(response.data.result)
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
    },
    getAgreementInfo({commit}, dataInfo) {
        commit(types.GET_AGREEMENT, dataInfo)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
