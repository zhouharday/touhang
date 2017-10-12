import * as types from '../mutations-type'
import { getDicChildren, getDicChildrenII } from '../../common/js/dictionary'
import { getDeptListByMid } from '../../api/project'
import { getAllNormalFund } from '../../api/investor'

const state = {
    projectData: {},        // 项目详情信息
    projectTurnType: [],    // 项目融资轮次
    typeOptions: [],        // 项目类型
    typeOptionsII: [],      // 项目类型 （含全部）
    industryOptions: [],    // 项目所属行业
    industryOptionsII: [],  // 项目所属行业 （含全部）
    fromOptions: [],        // 项目来源
    addressOptions: [],     // 项目所在地
    stageOptionsII: [],     // 项目阶段
    departmentOptions: [],  // 业务部门
    costSortOptions: [],    // 项目费用类型
    myFundOptions: []       // 项目中可签约基金列表(本商户)
}

const getters = {
    getProjectData: state => state.projectData,
    getProjectTurnType: state => state.projectTurnType,

    getTypeOptions: state => state.typeOptions,
    getTypeOptionsII: state => state.typeOptionsII,

    getIndustryOptions: state => state.industryOptions,
    getIndustryOptionsII: state => state.industryOptionsII,

    getFromOptions: state => state.fromOptions,
    getAddressOptions: state => state.addressOptions,
    getStageOptionsII: state => state.stageOptionsII,
    getDepartmentOptions: state => state.departmentOptions,

    getCostSortOptions: state => state.costSortOptions,
    getMyFundOptions: state => state.myFundOptions
}

const mutations = {
	[types.GET_PROJECT_DATA](state, projectData) {
		state.projectData = projectData;
	},
    [types.GET_PROJECTTURNTYPE](state, projectTurnType) {
        state.projectTurnType = projectTurnType;
    },
    [types.GET_TYPEOPTIONS](state, typeOptions) {
        state.typeOptions = typeOptions;
    },
    [types.GET_TYPEOPTIONSII](state, typeOptionsII) {
        state.typeOptionsII = typeOptionsII;
    },
    [types.GET_INDUSTRYOPTIONS](state, industryOptions) {
        state.industryOptions = industryOptions;
    },
    [types.GET_INDUSTRYOPTIONSII](state, industryOptionsII) {
        state.industryOptionsII = industryOptionsII;
    },
    [types.GET_FROMOPTIONS](state, fromOptions) {
        state.fromOptions = fromOptions;
    },
    [types.GET_ADDRESSOPTIONS](state, addressOptions) {
        state.addressOptions = addressOptions;
    },
    [types.GET_STAGEOPTIONSII](state, stageOptionsII) {
        state.stageOptionsII = stageOptionsII;
    },
    [types.GET_DEPARTMENTOPTIONS](state, departmentOptions) {
        state.departmentOptions = departmentOptions;
    },
    [types.GET_COSTSORTOPTIONS](state, costSortOptions) {
        state.costSortOptions = costSortOptions;
    },
    [types.GET_MYFUNDOPTIONS](state, myFundOptions) {
        state.myFundOptions = myFundOptions;
    }

}

const actions = {
    getProjectData({commit, state}, projectData) {
    	commit(types.GET_PROJECT_DATA, projectData);
    },
    getProjectTurnType({commit, dispatch}) {
        return getDicChildren('2').
        then((res) => {
            if (res.status == '200') {
                commit(types.GET_PROJECTTURNTYPE, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getTypeOptions({commit, dispatch}) {
        return getDicChildren('202').
        then((res) => {
            if (res.status == '200') {
                commit(types.GET_TYPEOPTIONS, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getTypeOptionsII({commit, dispatch}) {
        return getDicChildrenII('202').
        then((res) => {
            if (res.status == '200') {
                commit(types.GET_TYPEOPTIONSII, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getIndustryOptions({commit, dispatch}) {
        return getDicChildren('1').
        then((res) => {
            if (res.status == '200') {
                commit(types.GET_INDUSTRYOPTIONS, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getIndustryOptionsII({commit, dispatch}) {
        return getDicChildrenII('1').
        then((res) => {
            if (res.status == '200') {
                commit(types.GET_INDUSTRYOPTIONSII, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getFromOptions({commit, dispatch}) {
        return getDicChildren('207').
        then((res) => {
            if (res.status == '200') {
                commit(types.GET_FROMOPTIONS, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getAddressOptions({commit, dispatch}) {
        return getDicChildren('3').
        then((res) => {
            if (res.status == '200') {
                commit(types.GET_ADDRESSOPTIONS, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getStageOptionsII({commit, dispatch}) {
        return getDicChildrenII('203').
        then((res) => {
            if (res.status == '200') {
                commit(types.GET_STAGEOPTIONSII, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getDepartmentOptions({commit, dispatch}) {
        return getDeptListByMid().
        then((res) => {
            if (res.status == '200') {
                commit(types.GET_DEPARTMENTOPTIONS, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getCostSortOptions({commit, dispatch}) {
        return getDicChildren('212').
        then((res) => {
            if (res.status == '200') {
                commit(types.GET_COSTSORTOPTIONS, res.data.result)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getMyFundOptions({commit, dispatch}) {
        return getAllNormalFund().
        then((res) => {
            if (res.status == '200') {
                commit(types.GET_MYFUNDOPTIONS, res.data.result)
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