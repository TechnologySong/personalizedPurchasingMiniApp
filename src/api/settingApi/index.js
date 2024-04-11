import instance from './instance';

/*获取列表*/
function getUserSetting(opts) {
  return instance({
    method: 'GET',
    url: '/getUserSetting',
    opts: opts
  });
}
function setSetting(opts) {
  return instance({
    method: 'GET',
    url: '/setSetting',
    opts: opts
  });
}


export {
  getUserSetting,
  setSetting,
};
