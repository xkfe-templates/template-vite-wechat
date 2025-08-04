import { defineAppJson } from 'weapp-vite/json'
import tabbar from './tabbar'

export default defineAppJson({
  "$schema": "https://vite.icebreaker.top/app.json",
  pages: [
    'pages/index/index',
    'pages/utils/utils',
    'pages/mine/mine',
  ],
  subpackages: [
    {
      root: 'subpackages/example',
      name: 'example',
      pages: [
        'pages/image-plus/image-plus',
        'pages/count-to/count-to',
        'pages/loadmore/loadmore',
        'pages/empty/empty',
        'pages/overlay/overlay',
        'pages/popup/popup',
      ]
    },
    {
      root: 'subpackages/exam_utils',
      name: 'exam_utils',
      pages: [
        'pages/request/request',
        'pages/form-validate/form-validate',
        'pages/encrypt/encrypt',
      ]
    }
  ],
  preloadRule: {},
  __usePrivacyCheck__: true,
  window: {
    navigationBarTitleText: '小程序模板',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#34B167',
  },
  style: 'v2',
  componentFramework: 'glass-easel',
  sitemapLocation: 'sitemap.json',
  lazyCodeLoading: 'requiredComponents',
  plugins: {},
  tabBar: {
    custom: true,
    ...tabbar
  },
})
