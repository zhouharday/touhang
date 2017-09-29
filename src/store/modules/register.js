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
    },
    no: '', //云项目添加到项目池所用 NO 字段
    // isVshowYe: true, //是否显示首页
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
