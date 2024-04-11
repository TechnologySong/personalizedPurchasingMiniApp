import instance from './instance';

/*获取列表*/
function getNoticeList(opts) {
  return instance({
    method: 'POST',
    url: '/getNoticeList',
    opts: opts
  });
}
function getNoticeDetail(opts) {
  return instance({
    method: 'GET',
    url: '/getNoticeDetail',
    opts: opts
  });
}


export {
  getNoticeList,
  getNoticeDetail
};
