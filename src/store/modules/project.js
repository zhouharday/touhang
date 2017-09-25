import * as types from '../mutations-type'

const state = {
	projectData: {}, 		// 项目详情信息
}

const getters = {
	getProjectData: state => state.projectData
}

const mutations = {
	[types.SET_PROJECT_DATA](state, projectData) {
		state.projectData = projectData;
	}
}

const actions = {
    setProjectData({commit, state}, projectData) {
    	commit(types.SET_PROJECT_DATA, projectData);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}