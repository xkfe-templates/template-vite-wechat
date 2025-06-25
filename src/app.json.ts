import { defineAppJson } from 'weapp-vite/json'

export default defineAppJson({
  "$schema": "https://vite.icebreaker.top/app.json",
  pages: [
    'pages/index/index',
    'pages/mine/mine',
  ],
  subpackages: [],
  preloadRule: {},
  window: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '小程序模板',
    navigationBarBackgroundColor: '#ffffff',
  },
  style: 'v2',
  componentFramework: 'glass-easel',
  sitemapLocation: 'sitemap.json',
  lazyCodeLoading: 'requiredComponents',
  plugins: {},
  tabBar: {
    color: '#373737',
    selectedColor: '#1758DE',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: '',
        selectedIconPath: '',
      },
      {
        pagePath: 'pages/mine/mine',
        text: '我的',
        iconPath: '',
        selectedIconPath: '',
      },

    ],
  },
})
