import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (value, formatString) => { // 年月日
    if(value && value != 'null') {
        formatString = formatString || 'YYYY-MM-DD'
        return moment(value).format(formatString)
    } else {
        return '————'
    }
})

Vue.filter('formatDateDetails', (value, formatString) => { // 年月日
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
    return moment(value).format(formatString)
})

Vue.filter('toMoney', (num) => {
    if (num === 'null' || num === null || num === '' || num === undefined) {
        return '————'
    } else {
        num = parseFloat(num).toFixed(2)
        num = Number(num.split('.')[0]).toLocaleString() + '.' + num.split('.')[1]
        return num //返回的是字符串23,245.12保留2位小数
    }
})

//根据key转换value，无匹配项返回原Key值
//value: ''
//options: [{key: '',value:'',...},
//			{key: '',value:'',...},...]
Vue.filter('key2value', (value, options = []) => {
    let res = '未知';
    if (value == null){
        return res;
    }
    options.forEach((item = {}) => {
        if (item.key == value) {
            res = item.value;
        }
    });
    return res;
});
