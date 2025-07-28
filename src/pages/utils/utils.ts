Page({
  data: {
    utilsList: [
      {
        name: 'request网络请求',
        path: '/pages/exam_utils/request/request',
      },
      {
        name: '表单验证',
        path: '/pages/exam_utils/form-validate/form-validate',
      },
      {
        name: '微信隐私授权',
        /**
         * 1. 需要在微信公众平台设置隐私保护指引
         * 2. 需要先在 app.json 中配置 __usePrivacyCheck__: true
         * 3. 调用 wx.requirePrivacyAuthorize 方法
         */
        fn: () => {
          wx.requirePrivacyAuthorize({
            success: (res) => {
              console.log(res)
            },
          })
        },
      },
      {
        name: '数据加密',
        path: '/pages/exam_utils/encrypt/encrypt',
      },
    ],
  },
  handleExamplePage(e: WechatMiniprogram.TouchEvent) {
    const { path, index } = e.currentTarget.dataset
    const item = this.data.utilsList[index];
    if (item.fn && typeof item.fn === 'function') {
      item.fn.call(this); // 调用函数，并确保正确的this指向
    } else {
      wx.navigateTo({ url: path })
    }
  },
})