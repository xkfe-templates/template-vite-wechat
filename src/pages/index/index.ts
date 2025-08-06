import app from '@/utils/getApp'
import packageJson from '../../../package.json'

Page({
  data: {
    projectName: packageJson.name,
    projectVersion: packageJson.version,
    projectDesc: packageJson.description,

    exampleComponentList: [
      {
        name: 'image-plus 图片懒加载',
        path: '/subpackages/example/pages/image-plus/image-plus'
      },
      {
        name: 'count-to 数字滚动',
        path: '/subpackages/example/pages/count-to/count-to'
      },
      {
        name: 'loadmore 加载更多',
        path: '/subpackages/example/pages/loadmore/loadmore'
      },
      {
        name: 'empty 空状态',
        path: '/subpackages/example/pages/empty/empty'
      },
      {
        name: 'overlay 遮罩层',
        path: '/subpackages/example/pages/overlay/overlay'
      },
      {
        name: 'popup 弹出层',
        showPopup: true,
        path: '/subpackages/example/pages/popup/popup'
      }
    ],
    planList: [
      {
        name: 'skeleton 骨架屏',
        path: ''
      },
      {
        name: 'index-bar 索引栏',
        path: ''
      },
    ],
    showPopup: false
  },
  onShareAppMessage() { },
  onLoad() {
    console.log('imageHost', app.globalData.imageHost)
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },
  handleExamplePage(e: WechatMiniprogram.CustomEvent) {
    const { path } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  },
  openPopup() {
    this.setData({ showPopup: true })
  },
  handlePlan() {
    wx.showModal({
      title: '提示',
      content: '敬请期待⌛️',
      showCancel: false,
      success: () => { }
    })
  }
})
