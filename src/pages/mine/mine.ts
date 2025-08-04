import app from '@/utils/getApp'

Page({
  data: {
    imageHost: app.globalData.imageHost,
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  },
})
