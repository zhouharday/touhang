import service from 'common/js/fetch'
//数据字典获取行业 /dictionaryController/select2Menu
export function selectMenu(num) {
    const data = {
        dicParent: num,
        identification: 'a'
    }
    return service({url: '/dictionaryController/select2Menu', method: 'post', data})
}
