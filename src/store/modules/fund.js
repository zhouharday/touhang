import * as types from '../mutations-type'
import {
    getManagementType,
    FundInvestment,
    managementCompany,
    OrganizationType,
    getMyFund,
    fundStage,
    // fundStatus,
    getAllOrgList
} from '../../api/fund'
const state = {
    getManType: [{
        dicName: '全部'
    }, {
        dicName: '受托管理'
    }, {
        dicName: '自我管理'
    }, {
        dicName: '顾问管理'
    }], // 管理类型
    fundInvestment: [],
    managementCompany: [],
    OrgType: [{
        dicName: '全部'
    }, {
        dicName: '契约型'
    }, {
        dicName: '合伙型'
    }, {
        dicName: '公司型'
    }], // 组织类型
    myFundList: {},
    // myFundDetails: {},
    fundStage: [{
        dicName: '全部'
    }], // 基金阶段
    // fundStatus: {},
    getOrgList: {}
}

const getters = {
    getManType: state => state.getManType,
    fundInvestment: state => state.fundInvestment,
    managementCompany: state => state.managementCompany,
    OrgType: state => state.OrgType,
    myFundList: state => state.myFundList,
    // myFundDetails: state => state.myFundDetails,
    fundStage: state => state.fundStage,
    // fundStatus: state => state.fundStatus,
    getOrgList: state => state.getOrgList
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
    // [types.GET_MYFUNDDETAILS](state, myFundDetails) {
    //     state.myFundDetails = myFundDetails
    // },
    [types.GET_FUNDSTAGE](state, fundStage) {
        state.fundStage = fundStage
    },
    // [types.GET_FUNDSTATUS](state, fundStatus) {
    //     state.fundStatus = fundStatus
    // },
    [types.GET_ALLORGLIST](state, getOrgList) {
        state.getOrgList = getOrgList
    }
}
const actions = {
    getManageType({commit, dispatch}) {
        return getManagementType().then((res) => {
            if (res.status == '200') {
                commit(types.GET_MANTYPE, res.data.result)
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
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getFundLists({commit, dispatch}) {
        return getMyFund().then((res) => {
            if (res.status == '200') {
                commit(types.GET_MYFUNDLIDT, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getFundStage({commit, dispatch}) {
        return fundStage(2).then((res) => {
            if (res.status == '200') {
                commit(types.GET_FUNDSTAGE, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    // getFundStatus({commit, dispatch}) {
    //     return fundStatus().then((res) => {
    //         if (res.status == '200') {
    //             commit(types.GET_FUNDSTATUS, res.data.result)
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // },
    getAllOrg({commit, dispatch}) {
        return getAllOrgList().then((res) => {
            if (res.status == '200') {
                commit(types.GET_ALLORGLIST, res.data.result)
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
