import instance from './instance';

/*获取列表*/
function isCollected(opts) {
  return instance({
    method: 'GET',
    url: '/isCollected',
    opts: opts
  });
}
function cancelCollect(opts) {
  return instance({
    method: 'GET',
    url: '/cancelCollect',
    opts: opts
  });
}
function getCollectList(opts) {
  return instance({
    method: 'GET',
    url: '/getCollectList',
    opts: opts
  });
}


export {
  isCollected,
  cancelCollect,
  getCollectList
};
