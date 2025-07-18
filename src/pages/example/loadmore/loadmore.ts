Page({
  data: {
    state: 'loading'
  },
  onLoad() {
    this.timerFn()
  },
  timerFn() {
    setTimeout(() => {
      this.setData({
        state: 'error'
      })
    }, 3000)
  },
  handleReload() {
    this.setData({
      state: 'loading'
    }, () => {
      this.timerFn()
    })
  }
})