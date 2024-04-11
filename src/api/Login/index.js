import instance from './instance';

/*获取列表*/
function login(opts) {
  return instance({
    method: 'GET',
    url: '/login',
    opts: opts
  });
}

function register(opts) {
  return instance({
    method: 'post',
    url: '/register',
    opts: opts
  });
}


export {
  login,
  register
};
