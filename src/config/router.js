export const Pages = {
  /******** tabbar路由 ********/
  /** 首页 */
  INDEX : '/pages/index/index',
  /** 订阅 */
  SUBSCRIBE : '/pages/Subscribe/index',
  /** 收藏 */
  COLLECTION : '/pages/Collection/index',
  /** 我的（用户中心） */
  USER : '/pages/User/index',
  /******** 普通路由 ********/
  /** 公告详情 */
  DETAIL : '/pages/Detail/index',
  /** 登录 */
  LOGIN : '/pages/Login/index',
  /** 绑定手机 */
  SET_MOBILE :'/pages/SetMobile/index',
  REGISTER : '/pages/Register/index',

}

export const tabbarPages = [Pages.INDEX, Pages.SUBSCRIBE , Pages.USER ];

export const normalPages = [
  Pages.DETAIL,
  Pages.LOGIN,
  Pages.SET_MOBILE,
  Pages.COLLECTION,
  Pages.REGISTER,
];

// export const pages: string[] = [...tabbarPages, ...normalPages];
