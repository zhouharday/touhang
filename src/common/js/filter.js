import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (value, formatString) => {
    formatString = formatString || 'YYYY-MM-DD'
    return moment(value).format(formatString)
})

Vue.filter('toMoney', (num) => {
    num = parseFloat(num)
    num = num.toLocaleString()
    if (num.slice(-3) == '.00') {
        return num //返回的是字符串23,245.12保留2位小数
    } else {
        return num + '.00'
    }
})

Vue.filter('key2value', (value, options = []) => {
	let res='未知'
	options.forEach((item = {}) => {
		if(item.key == value){
			res = item.value;
		}
	});
	return res;
});