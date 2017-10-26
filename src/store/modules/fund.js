import * as types from '../mutations-type'
import {
    getManagementType,
    FundInvestment,
    managementCompany,
    OrganizationType,
    getMyFund,
    fundStage,
    getAllOrgList,
    getFundApprList
} from 'api/fund'
const state = {
    getManType: JSON.parse(sessionStorage.getItem('MANTYPE')) || [], // 管理类型
    fundInvestment: [],
    managementCompany: [],
    OrgType: JSON.parse(sessionStorage.getItem('ORGTYPE')) || [], // 组织类型
    myFundList: {},
    // myFundDetails: {},
    fundStage: [
        {
            dicName: '全部'
        }
    ], // 基金阶段
    getOrgList: {},
    setFundAppData: JSON.parse(sessionStorage.getItem('SET_FUNDAPPRDATA')) || [] // 基金估值图表数据
}

const getters = {
    getManType: state => state.getManType,
    fundInvestment: state => state.fundInvestment,
    managementCompany: state => state.managementCompany,
    OrgType: state => state.OrgType,
    myFundList: state => state.myFundList,
    fundStage: state => state.fundStage,
    getOrgList: state => state.getOrgList,
    setFundAppData: state => state.setFundAppData
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
    },
    [types.GET_MYFUNDLIDT](state, myFundList) {
        state.myFundList = myFundList
    },
    [types.GET_FUNDSTAGE](state, fundStage) {
        state.fundStage = fundStage
    },
    [types.GET_ALLORGLIST](state, getOrgList) {
        state.getOrgList = getOrgList
    },
    [types.SET_FUNDAPPRDATA](state, setFundAppData) {
        state.setFundAppData = setFundAppData
    }
}
const actions = {
    getManageType({commit, dispatch}) {
        return getManagementType().then((res) => {
            if (res.status == '200') {
                commit(types.GET_MANTYPE, res.data.result)
                window.sessionStorage.setItem('MANTYPE', JSON.stringify(res.data.result))
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getFundInvestment({commit, dispatch}) {
        return FundInvestment().then((res) => {
            if (res.status == '200') {
                commit(types.GET_FUNDINVESTMENT, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getManagementCompany({commit, dispatch}) {
        return managementCompany().then((res) => {
            if (res.status == '200') {
                commit(types.GET_MANAGEMENTCOMPANY, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getOrganizationType({commit, dispatch}) {
        return OrganizationType().then((res) => {
            if (res.status == '200') {
                commit(types.GET_ORGTYPE, res.data.result)
                window.sessionStorage.setItem('ORGTYPE', JSON.stringify(res.data.result))
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getFundLists({commit, dispatch}) {
        const LIST_DATA = null
        return getMyFund(1, 10, LIST_DATA, LIST_DATA, LIST_DATA, LIST_DATA, LIST_DATA).then((res) => {
            if (res.status == '200') {
                commit(types.GET_MYFUNDLIDT, res.data.result)
            }
        })
    },
    getFundStage({commit, dispatch}) {
        return fundStage(2).then((res) => {
            if (res.status == '200') {
                commit(types.GET_FUNDSTAGE, res.data.result)
            }
        })
    },
    getAllOrg({commit, dispatch}) {
        return getAllOrgList().then((res) => {
            if (res.status == '200') {
                commit(types.GET_ALLORGLIST, res.data.result)
            }
        })
    },
    getFundAppraisementList({commit, dispatch}, fundId) {
        return getFundApprList(fundId).then((res) => {
            if(res.status === 200) {
                console.log(res)
                // appraisementDate: "2017-10-26 16:47:32"
                // appraisementValue:"150000"
                commit(types.SET_FUNDAPPRDATA, res.data.result)
                sessionStorage.setItem('SET_FUNDAPPRDATA', JSON.stringify(res.data.result))
            }
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
