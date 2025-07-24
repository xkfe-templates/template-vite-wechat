Page({
  data: {
    showPopupCenter: false,
    showPopup: false,
    position: 'center',
    safeAreaInsetBottom: true,
    closeOnClickOverlay: true
  },
  onLoad() {
  },
  handleShowPopup() {
    this.setData({
      showPopupCenter: true,
    })
  },
  handleShowPopupPosition(e: WechatMiniprogram.CustomEvent) {
    this.setData({
      closeOnClickOverlay: true
    }, () => {
      this.setData({
        showPopup: true,
        position: e.currentTarget.dataset.position
      })
    })
  },
  handleDisableOverlay() {
    this.setData({
      closeOnClickOverlay: false
    }, () => {
      this.setData({
        showPopup: true,
        position: 'bottom',
      })
    })
  },
  handleClosePopup() {
    this.selectComponent('#popup').hidePopup();
  },
})