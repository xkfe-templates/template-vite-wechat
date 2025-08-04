import type { App } from 'weapp-vite/json'

type TabbarList = Required<App>['tabBar']

const tabbar: TabbarList = {
  color: '#373737',
  selectedColor: '#34B167',
  backgroundColor: '#ffffff',
  list: [
    {
      pagePath: 'pages/index/index',
      text: '首页',
      iconPath: "/images/tabbar/components.png",
      selectedIconPath: "/images/tabbar/components-selected.png"
    },
    {
      pagePath: 'pages/utils/utils',
      text: 'utils',
      iconPath: "/images/tabbar/fn.png",
      selectedIconPath: "/images/tabbar/fn-selected.png"
    },
    {
      pagePath: 'pages/mine/mine',
      text: '我的',
      iconPath: "/images/tabbar/mine.png",
      selectedIconPath: "/images/tabbar/mine-selected.png"
    },
  ]
}

export default tabbar
