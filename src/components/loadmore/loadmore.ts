Component({
  properties: {
    // 加载状态：loading/finished/error
    state: {
      type: String,
      value: "loading"
    },
    loadingText: {
      type: String,
      value: "加载中..."
    },
    finishedText: {
      type: String,
      value: "-没有更多了-"
    },
    errorText: {
      type: String,
      value: "加载失败，点击重试"
    }
  },
  methods: {
    handleReload() {
      if (this.data.state === "error") this.triggerEvent("reload");
    }
  }
});
