Component({
  properties: {
    src: {
      type: String,
      observer() {
        this.setData({
          error: false,
          loading: true,
        });
      },
    },                    // 图片地址
    mode: {               // 图片填充模式
      type: String,
      value: 'scaleToFill'
    },
    webp: {
      type: Boolean,
      value: false,
    },
    showError: {
      type: Boolean,
      value: true,
    },
    showLoading: {
      type: Boolean,
      value: true,
    },
    width: {
      type: String,
      value: '100%',
    },        // 图片宽度
    height: {
      type: String,
      value: '100%',
    },       // 图片高度
    loadingBg: {
      type: String,
      value: '#f7f8fa',
    },
    errorBg: {
      type: String,
      value: '#f7f8fa',
    },
    round: Boolean,       // 是否圆形
    lazyLoad: Boolean,    // 是否懒加载
    useErrorSlot: Boolean,
    useLoadingSlot: Boolean,
    showMenuByLongpress: Boolean,
    preview: Boolean
  },

  data: {
    error: false,
    loading: true,
  },

  methods: {
    onLoad(event: WechatMiniprogram.CustomEvent) {
      this.setData({
        loading: false,
      });

      this.triggerEvent('load', event.detail)
    },
    onError(event: WechatMiniprogram.CustomEvent) {
      this.setData({
        loading: false,
        error: true,
      });

      this.triggerEvent('error', event.detail);
    },

    onClick(event: WechatMiniprogram.CustomEvent) {
      this.triggerEvent('click', event.detail);
    },

    onPreview() {
      if (!this.properties.preview) return;
      wx.previewImage({
        current: this.properties.src,
        urls: [this.properties.src],
      })
    }
  },
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  }
});
