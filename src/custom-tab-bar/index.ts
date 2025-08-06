import tabbar from "@/tabbar";

const deviceInfo = wx.getDeviceInfo()
Component({
  data: {
    ...tabbar,
    hide: false,
    selected: 0,
  },
  methods: {
    async switchTab(e: WechatMiniprogram.TouchEvent) {
      const { path, index, isSubPages } = e.currentTarget.dataset
      if (isSubPages) {
        wx.navigateTo({ url: `/${path}` })
        return;
      }
      if (deviceInfo.platform !== "devtools") {
        wx.vibrateShort({
          type: 'medium'
        })
      }
      await wx.switchTab({ url: `/${path}` })
      this.setData({
        selected: index,
      })
    }
  }
})
