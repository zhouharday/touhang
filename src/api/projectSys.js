import service from 'common/js/fetch'

// 项目用户列表
export function getProjectUsers(params) {
	let { merchantId, userName, lockValue, dept_id } = params;
    const data = {
        merchantId, // :"1aeea800334a4d7a9d367914edb16250",
		userName, // :"",
		lockValue, // ":"",
		dept_id // ":""
    }
    return service({url: '/user/queryUserList', method: 'post', data})
}