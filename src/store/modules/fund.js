import * as types from '../mutations-type'
import Service from '../../common/js/fetch'
import {getManagementType, FundInvestment, managementCompany, OrganizationType} from '../../api/fund'
const state = {
    getManType: JSON.stringify(sessionStorage.getItem('getManType')) || [],
    fundInvestment: [],
    managementCompany: [],
    OrgType: []
}

const getters = {
    getManType: state => state.getManType,
    fundInvestment: state => state.fundInvestment,
    managementCompany: state => state.managementCompany,
    OrgType: state => state.OrgType
}

const mutations = {
    [types.GET_MANTYPE](state, getManType) {
        state.getManType = getManType
    },
    [types.GET_FUNDINVESTMENT](state, fundInvestment) {
        state.fundInvestment = fundInvestment
    },
    [types.GET_MANAGEMENTCOMPANY](state, managementCompany) {
        state.managementCompany = managementCompany
    },
    [types.GET_ORGTYPE](state, OrgType) {
        state.OrgType = OrgType
    }
}

const actions = {
    getManageType({commit, dispatch}) {
        return getManagementType().then((res) => {
            if (res.status == '200') {
                console.log(res.data.result)
                commit(types.GET_MANTYPE, res.data.result)
                sessionStorage.setItem('getManType', JSON.stringify(res.data.result))
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getFundInvestment({commit, dispatch}) {
        return FundInvestment().then((res) => {
            if (res.status == '200') {
                console.log(res.data.result)
                commit(types.GET_FUNDINVESTMENT, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getManagementCompany({commit, dispatch}) {
        return managementCompany().then((res) => {
            if (res.status == '200') {
                console.log(res.data.result)
                commit(types.GET_MANAGEMENTCOMPANY, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getOrganizationType({commit, dispatch}) {
        return OrganizationType().then((res) => {
            if (res.status == '200') {
                console.log(res.data.result)
                commit(types.GET_ORGTYPE, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
