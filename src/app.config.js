export default {
  pages: [
    'pages/Login/index',
    'pages/Register/index',
    'pages/index/index',
    'pages/Subscribe/index',
    'pages/User/index',
    'pages/Detail/index',
    'pages/Collection/index',

  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#999',
    selectedColor: '#333',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/home.png',
        selectedIconPath: 'assets/homefill.png',
      },
      {
        pagePath: 'pages/Subscribe/index',
        text: '个性化',
        iconPath: 'assets/demand.png',
        selectedIconPath: 'assets/demandfill.png',
      },
      {
        pagePath: 'pages/User/index',
        text: '我的',
        iconPath: 'assets/people.png',
        selectedIconPath: 'assets/peoplefill.png',
      },
    ],
  },
}
