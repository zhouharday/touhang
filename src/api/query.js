import service from 'common/js/fetch'

// 项目阶段 statusNum == 203
export function getProjectStatus(statusNum) {
    const data = {
        dicParent: statusNum
    }
    return service({url: '/dictionaryController/select2Menu', method: 'post', data})
}
