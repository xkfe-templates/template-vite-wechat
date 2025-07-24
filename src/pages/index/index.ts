import app from '@/utils/getApp'
import packageJson from '../../../package.json'

Page({
  data: {
    projectName: packageJson.name,
    projectVersion: packageJson.version,
    projectDesc: packageJson.description,

    exampleComponentList: [
      {
        name: 'image-plus图片懒加载',
        path: '/pages/example/image-plus/image-plus'
      },
      {
        name: 'count-to数字滚动',
        path: '/pages/example/count-to/count-to'
      },
      {
        name: 'loadmore加载更多',
        path: '/pages/example/loadmore/loadmore'
      },
      {
        name: 'empty空状态',
        path: '/pages/example/empty/empty'
      },
      {
        name: 'overlay 遮罩层',
        path: '/pages/example/overlay/overlay'
      },
      {
        name: 'popup 弹出层',
        path: '/pages/example/popup/popup'
      }
    ]
  },
  onLoad() {
    console.log('imageHost', app.globalData.imageHost)
  },
  handleExamplePage(e: WechatMiniprogram.CustomEvent) {
    const { path } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  }
})
