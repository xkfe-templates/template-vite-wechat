Component({
  properties: {
    // 字体大小
    fontSize: {
      type: String,
      value: 'inherit'
    },
    // 字体颜色
    color: {
      type: String,
      value: 'inherit'
    },
    // 颜色类型
    type: {
      type: String,
      value: 'default', // 'default' / 'primary' / 'error' / 'warning' / 'success'
      observer: '_typeChange'
    },
    // 起始值
    startVal: {
      type: Number,
      value: 0,
      observer: '_startValChange'
    },
    // 结束值
    endVal: {
      type: Number,
      value: 0,
      observer: '_endValChange'
    },
    // 动画持续时间（毫秒）
    duration: {
      type: Number,
      value: 1000
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      value: true,
      observer: '_autoplayChange'
    },
    // 保留小数位数
    decimals: {
      type: Number,
      value: 0
    },
    // 自动设置小数位数
    autoDecimals: {
      type: Boolean,
      value: false,
      observer: '_autoDecimalsChange'
    },
    // 小数点符号
    decimal: {
      type: String,
      value: '.'
    },
    // 千位分隔符
    separator: {
      type: String,
      value: ''
    },
    // 前缀
    prefix: {
      type: String,
      value: ''
    },
    // 后缀
    suffix: {
      type: String,
      value: ''
    }
  },

  data: {
    displayValue: '0',
    typeColorMap: {
      primary: '#1989fa',
      error: '#ee0a24',
      warning: '#ff976a',
      success: '#07c160',
      default: '#27282D'
    } as Record<string, string>,
    computedColor: '',
    animationFrameId: null as number | null
  },

  lifetimes: {
    attached() {
      this._computeColor();
      if (this.data.autoplay) {
        this.start();
      } else {
        this.setData({
          displayValue: this._formatNumber(this.data.startVal)
        });
      }
    },
    detached() {
      // 组件卸载时清除动画
      if (this.data.animationFrameId) {
        clearTimeout(this.data.animationFrameId);
      }
    }
  },

  methods: {
    // 获取小数位数
    getDecimalPlaces(num: number): number {
      const numStr = num.toString();
      const decimalIndex = numStr.indexOf('.');
      return decimalIndex === -1 ? 0 : numStr.length - decimalIndex - 1;
    },

    // 开始动画
    start() {
      const { startVal, endVal, duration } = this.data;
      this._animate(startVal, endVal, duration);
    },

    // 重新开始动画
    restart() {
      if (this.data.animationFrameId) {
        clearTimeout(this.data.animationFrameId);
      }
      this.start();
    },

    // 格式化数字
    _formatNumber(num: number): string {
      const { decimals, decimal, separator, prefix, suffix } = this.data;

      // 处理小数位数
      let numStr = Number(num).toFixed(decimals);

      // 分割整数和小数部分
      let [integer, decimalPart] = numStr.split('.');

      // 添加千位分隔符
      if (separator) {
        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      }

      // 组合数字
      let result = integer;
      if (decimalPart && decimals > 0) {
        result += decimal + decimalPart;
      }

      // 添加前缀和后缀
      return prefix + result + suffix;
    },

    // 动画函数
    _animate(startVal: number, endVal: number, duration: number) {
      const startTime = Date.now();
      const self = this;

      function update() {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const currentVal = startVal + (endVal - startVal) * progress;

        self.setData({
          displayValue: self._formatNumber(currentVal)
        });

        if (progress < 1) {
          // 使用setTimeout替代requestAnimationFrame
          const frameId = setTimeout(update, 16); // 约60fps
          self.setData({ animationFrameId: frameId });
        } else {
          self.triggerEvent('finish');
        }
      }

      update();
      this.triggerEvent('loaded');
    },

    // 计算颜色
    _computeColor() {
      const { color, type, typeColorMap } = this.data;
      if (color !== 'inherit') {
        this.setData({ computedColor: color });
      } else {
        this.setData({ computedColor: typeColorMap[type] || typeColorMap.default });
      }
    },

    // 监听属性变化
    _typeChange() {
      this._computeColor();
    },

    _startValChange(newVal: number) {
      if (!this.data.autoplay) {
        this.setData({
          displayValue: this._formatNumber(newVal)
        });
      }
    },

    _endValChange(_newVal: number) {
      if (this.data.autoplay) {
        this.start();
      }
    },

    _autoplayChange(newVal: boolean) {
      if (newVal) {
        this.start();
      }
    },

    _autoDecimalsChange(newVal: boolean) {
      if (newVal) {
        const { startVal, endVal } = this.data;
        const startDecimals = this.getDecimalPlaces(startVal);
        const endDecimals = this.getDecimalPlaces(endVal);
        const maxDecimals = Math.max(startDecimals, endDecimals);

        this.setData({
          decimals: maxDecimals
        });
      }
    }
  }
});