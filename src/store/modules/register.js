import {
    Notification
} from 'element-ui'
// import request from 'superagent'
import * as types from '../mutations-type'

const state = {
    register: {
        "validationCode": "", //验证码 必须
        "merchantName": "", //企业名称 必须
        "industry": "", //行业id
        "province": "", //省份id
        "contactUser": "", //联系人姓名
        "contactPhone": "" //联系电话 必须
    }
}

const mutations = {

}

const actions = {

}


export default {
    state,
    mutations,
    actions
}
