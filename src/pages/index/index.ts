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
        path: '/subpackages/example/pages/image-plus/image-plus'
      },
      {
        name: 'count-to数字滚动',
        path: '/subpackages/example/pages/count-to/count-to'
      },
      {
        name: 'loadmore加载更多',
        path: '/subpackages/example/pages/loadmore/loadmore'
      },
      {
        name: 'empty空状态',
        path: '/subpackages/example/pages/empty/empty'
      },
      {
        name: 'overlay 遮罩层',
        path: '/subpackages/example/pages/overlay/overlay'
      },
      {
        name: 'popup 弹出层',
        path: '/subpackages/example/pages/popup/popup'
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
