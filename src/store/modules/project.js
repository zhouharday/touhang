import * as types from '../mutations-type'
import { getDicChildren } from '../../common/js/dictionary'
import { getDeptListByMid } from '../../api/project'

const state = {
    projectData: {},        // 项目详情信息
    projectTurnType: [],    // 项目融资轮次
    typeOptions: [],        // 项目类型
    industryOptions: [],    // 项目所属行业
    fromOptions: [],        // 项目来源
    addressOptions: [],     // 项目所在地
    departmentOptions: []   // 业务部门
}

const getters = {
    getProjectData: state => state.projectData,
    getProjectTurnType: state => state.projectTurnType,
    getTypeOptions: state => state.typeOptions,
    getIndustryOptions: state => state.industryOptions,
    getFromOptions: state => state.fromOptions,
    getAddressOptions: state => state.addressOptions,
    getDepartmentOptions: state => state.departmentOptions
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
    [types.GET_INDUSTRYOPTIONS](state, industryOptions) {
        state.industryOptions = industryOptions;
    },
    [types.GET_FROMOPTIONS](state, fromOptions) {
        state.fromOptions = fromOptions;
    },
    [types.GET_ADDRESSOPTIONS](state, addressOptions) {
        state.addressOptions = addressOptions;
    },
    [types.GET_DEPARTMENTOPTIONS](state, departmentOptions) {
        state.departmentOptions = departmentOptions;
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
    getIndustryOptions({commit, dispatch}) {
        return getDicChildren('208').
        then((res) => {
            if (res.status == '200') {
                commit(types.GET_INDUSTRYOPTIONS, res.data.result)
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
    getDepartmentOptions({commit, dispatch}) {
        return getDeptListByMid().
        then((res) => {
            if (res.status == '200') {
                commit(types.GET_DEPARTMENTOPTIONS, res.data.result)
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