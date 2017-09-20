import * as types from '../mutations-type'
import {getInvestorList, getProjectType, getInvestorType, getIdType, getSubArea} from 'api/investor'
const state = {
    investorList: {},
    projectType: {},
    investorType: {},
    idType: {},
    subArea: {},
    investorDetails: {}
}

const getters = {
    investorList: state => state.investorList,
    projectType: state => state.projectType,
    investorType: state => state.investorType,
    idType: state => state.idType,
    subArea: state => state.subArea,
    investorDetails: state => state.investorDetails
}

const mutations = {
    [types.GET_INVESTORLIST](state, investorList) {
        state.investorList = investorList
    },
    [types.GET_PROJECTTYPE](state, projectType) {
        state.projectType = projectType
    },
    [types.GET_INVESTORTYPE](state, investorType) {
        state.investorType = investorType
    },
    [types.GET_IDTYPE](state, idType) {
        state.idType = idType
    },
    [types.GET_SUBAREA](state, subArea) {
        state.subArea = subArea
    },
    [types.GET_INVDETAILS](state, investorDetails) {
        state.investorDetails = investorDetails
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
    },
    getInvType({commit, dispatch}) {
        return getInvestorType().then((res) => {
            if(res.status == '200') {
                commit(types.GET_INVESTORTYPE, res.data.result)
            }
        }).catch(err => {
            console.log(res)
        })
    },
    getId({commit, dispatch}) {
        return getIdType().then((res) => {
            if(res.status == '200') {
                commit(types.GET_IDTYPE, res.data.result)
            }
        }).catch(err => {
            console.log(res)
        })
    },
    getArea({commit, dispatch}) {
        return getSubArea().then((res) => {
            if(res.status == '200') {
                commit(types.GET_SUBAREA, res.data.result)
            }
        }).catch(err => {
            console.log(res)
        })
    },
    getInvDetails({commit, dispatch}, list) {
        commit(types.GET_INVDETAILS, list)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
