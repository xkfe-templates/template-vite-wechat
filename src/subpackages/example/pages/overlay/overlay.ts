Page({
  data: {
    showOverlay: false,
    isSlot: false
  },
  onLoad() {
  },
  handleShowOverlay() {
    this.setData({
      showOverlay: true,
      isSlot: false
    })
  },
  handleShowSlot() {
    this.setData({
      showOverlay: true,
      isSlot: true
    })
  }
})