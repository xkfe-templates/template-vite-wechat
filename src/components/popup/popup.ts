Component({
  options: {
    multipleSlots: true,
  },

  properties: {
    show: {
      type: Boolean,
      value: false
    },
    zIndex: {
      type: Number,
      value: 100
    },
    overlay: {
      type: Boolean,
      value: true
    },
    position: {
      type: String,
      value: 'center'
    },
    duration: {
      type: Number,
      value: 300
    },
    round: {
      type: Boolean,
      value: false
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    closeable: {
      type: Boolean,
      value: false
    },
    overlayStyle: {
      type: String,
      value: ''
    },
    customStyle: {
      type: String,
      value: ''
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    },
    safeAreaInsetTop: {
      type: Boolean,
      value: true
    }
  },

  lifetimes: {
    attached() {
      this.addRoundClass();
    }
  },
  // observers: { },

  data: {
    roundClass: '',
    animateHide: false,
    hideTimer: null
  },

  methods: {
    noop() { },
    clearTimer() {
      if (this.data.hideTimer) {
        clearTimeout(this.data.hideTimer);
        this.data.hideTimer = null;
      }
    },
    addRoundClass() {
      if (this.data.round) {
        let roundClass = '';
        switch (this.data.position) {
          case 'center':
            roundClass = 'popup-round-center';
            break;
          case 'bottom':
            roundClass = 'popup-round-bottom';
        }
        this.setData({
          roundClass
        });
      }
    },
    hidePopup() {
      this.setData({ animateHide: true });
      // @ts-ignore
      this.hideTimer = setTimeout(() => {
        this.setData({ show: false, animateHide: false });
        this.triggerEvent('closed');
        this.clearTimer();
      }, this.data.duration);
    },

    onClickOverlay() {
      this.triggerEvent('click-overlay');

      if (this.data.closeOnClickOverlay) {
        this.hidePopup();
      }
    },
  }
});
