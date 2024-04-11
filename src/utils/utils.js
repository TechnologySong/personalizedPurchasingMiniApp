import Taro from '@tarojs/taro';
import { isNaN, isNil, isFinite } from 'lodash';
import dayjs from 'dayjs';







/**
 * 金额区间格式化
 * @param money
 */
const getMoneyText = (money, placeholder = '不限金额') => {
  if (!money) return placeholder;
  if (money.length === 0){
    return placeholder;
  }
  let moneyText = '金额';
  if (money[0] === 0 && money[0] === money[1] || money[0] === undefined || money[1] === undefined) {
    moneyText = '不限金额';
  } else if (money[0] === 1000 && money[0] === money[1]) {
    moneyText = '1000万元以上';
  } else {
    moneyText = `${money[0] === 0 ? 0 : `${money[0]}万元`}~${money[1]}万元`;
  }
  return moneyText;
};

/**
 * 格式化时间
 *
 * @param {(string | number)} [time] 时间戳
 * @param {string} [format='YYYY-MM-DD HH:mm:ss'] 格式化，默认 YYYY-MM-DD HH:mm:ss
 * @returns
 */
function formatDate(time, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!time) return '--';
  return dayjs(time).format(format);
}

/**
 * 格式化金额
 * @param {(number | string)} value
 * @param {string} [prefix='￥'] 前缀
 * @param {number} [decimals=2] 保留几位小数
 * @returns
 */
function formatCurrency(value, prefix = '￥', decimals = 2) {
  if (isNaN(Number(value)) || isNil(value)) return value;
  value = String(value).replace(/[^0-9+-Ee.]/g, '');
  const n = !isFinite(+value) ? 0 : +value;
  const prec = !isFinite(+decimals) ? 2 : Math.abs(decimals);
  let s = [];
  const toFixedFix = function (num, pre) {
    var k = Math.pow(10, pre);
    return '' + Math.ceil(num * k) / k;
  };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  const re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1,$2');
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return (prefix || '') + s.join('.');
}




export {
  formatDate,
  formatCurrency,
  getMoneyText,
};
