import * as types from "../mutations-type"
import {getProjectStatus} from "../../api/query"
const state = {
    getProStatus: []
}

const mutations = {
    [types.GET_PROJECTSTATUS](state, getProStatus) {
        state.getProStatus = getProStatus
    }
}

const getters = {
    getProStatus: state => state.getProStatus
}

const actions = {
    getStatus({commit, dispatch}) {
        return getProjectStatus(203).then((res) => {
            if(res.status == '200') {
                commit(types.GET_PROJECTSTATUS, res.data.result)
                // console.log(res)
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
