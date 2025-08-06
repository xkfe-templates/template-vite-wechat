import app from '@/utils/getApp'

Page({
  data: {
    imageHost: app.globalData.imageHost,
  },
  onShareAppMessage() { },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  },
})
