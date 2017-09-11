export function changeDate(value) {
    var year = value.getFullYear()
    var month = value.getMonth() + 1
    var day = value.getDate()
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    return [year, month, day].join('-')
}
// 待测试
export function clearValue(obj) {
    Object.keys(obj).forEach((val, array) => {
        obj[val] = ''
    })
}
// 递归函数

// export function mune(arr) {
//     let newArr = []
//     arr.map((x) => {
//         if (x.pId == 0) {
//             newArr.push(x)
//         }
//         newArr.map((list) => {
//             if(list.id == x.pId) {
//
//             }
//         })
//     })
// }
