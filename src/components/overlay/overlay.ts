Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: 'observeShow'
    },
    zIndex: {
      type: Number,
      value: 1
    },
    lockScroll: {
      type: Boolean,
      value: true,
    },
    duration: {
      type: Number,
      value: 300
    },
    backgroundColor: {
      type: String,
      value: 'rgba(0, 0, 0, 0.6)'
    },
    customStyle: {
      type: String,
      value: ''
    },
    className: {
      type: String,
      value: ''
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onClick() {
      if (this.data.closeOnClickOverlay) {
        this.triggerEvent('click');
        this.setData({ show: false });
      }
    },

    observeShow(newVal: boolean) {
      if (newVal) {
        this.setData({ className: 'overlay-active' });
      } else {
        this.setData({ className: '' });
      }
    },
    // for prevent touchmove
    noop() { },
  }
});