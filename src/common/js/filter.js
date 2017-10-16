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
    console.log(num)
    if (num === 'null' || num === null || num === '' || num === undefined) {
        return 0
    } else {
        num = parseFloat(num).toFixed(2)
        num = Number(num.split('.')[0]).toLocaleString() + '.' + num.split('.')[1]
        return num //返回的是字符串23,245.12保留2位小数
    }
})

Vue.filter('key2value', (value, options = []) => {
    let res = '未知'
    options.forEach((item = {}) => {
        if (item.key == value) {
            res = item.value;
        }
    });
    return res;
});
