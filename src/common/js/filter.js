import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (value, formatString) => { // 年月日
    formatString = formatString || 'YYYY-MM-DD'
    return moment(value).format(formatString)
})

Vue.filter('formatDateDetails', (value, formatString) => { // 年月日
    formatString = formatString || 'YYYY-MM-DD, h:mm:ss'
    return moment(value).format(formatString)
})

Vue.filter('toMoney', (num) => {
    num = parseFloat(num).toFixed(2)
    num = Number(num.split('.')[0]).toLocaleString() + '.' +num.split('.')[1]
    return num //返回的是字符串23,245.12保留2位小数
})
