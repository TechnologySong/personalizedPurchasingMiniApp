import Taro from '@tarojs/taro';
import includes from 'lodash/includes';

import { tabbarPages, normalPages, Pages } from '../config/router.js';

/**
 * object专querystring
 * @param params 参数对象
 */
function createSearchParamsPath(params) {
  if (!params) {
    return '';
  }
  const pathArr = [];
  let isFirstKey = true;
  Object.keys(params).map(key => {
    if (params[key]) {
      if (isFirstKey) {
        isFirstKey = false;
        pathArr.push(`?${key}=${params[key]}`);
      } else {
        pathArr.push(`&${key}=${params[key]}`);
      }
    }
  });
  return pathArr.join('');
}

const pushTo = (targetUrl, params) => {
  const queryString = createSearchParamsPath(params);
  let url = targetUrl;
  if (includes(tabbarPages, url)) {
    url += queryString;
    Taro.switchTab({ url });
  } else if (includes(normalPages, url)) {
    url += queryString;
    Taro.navigateTo({
      url,
    });
  }
};

const replaceTo = (targetUrl, params) => {
  const queryString = createSearchParamsPath(params);
  let url = targetUrl;
  if (includes(tabbarPages, url)) {
    url += queryString;
    Taro.switchTab({ url });
  } else if (includes(normalPages, url)) {
    url += queryString;
    Taro.redirectTo({
      url,
    });
  }
};

export { Pages, pushTo, replaceTo };
