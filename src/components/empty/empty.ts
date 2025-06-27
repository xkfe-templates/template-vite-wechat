Component({
  properties: {
    image: {
      type: String,
      value: `/images/empty.png`
    },
    imageSize: {
      type: Number,
      value: 200
    },
    text: {
      type: String,
      value: "暂无数据"
    },
    textColor: {
      type: String,
      value: "#999"
    },
    textSize: {
      type: Number,
      value: 28
    },
    showButton: {
      type: Boolean,
      value: false
    },
    buttonText: {
      type: String,
      value: "重新加载"
    },
    buttonColor: {
      type: String,
      value: ""
    },
    buttonTextColor: {
      type: String,
      value: "#fff"
    },
    buttonTextSize: {
      type: Number,
      value: 28
    }
  },
  methods: {
    onButtonClick() {
      this.triggerEvent("click");
    }
  }
});
