import { generateShortUUID, rsaEncrypt, rsaDecrypt, aesEncrypt, aesDecrypt, encryptInfo } from '@/utils/encrypt'

Page({
  data: {
    inputValue: '比较是偷走幸福的小偷，偷走了你对自己的专注!',
    aesEncryptKey: generateShortUUID(),
    resultEncrypt: '',
    resultDecrypt: '',
  },
  resetResult() {
    this.setData({
      resultEncrypt: '',
      resultDecrypt: '',
    })
  },
  emptyValidate(value: string, title: string = '请输入要加密的内容'): Promise<string> {
    return new Promise((resolve) => {
      if (!value) {
        wx.showToast({
          title,
          icon: 'none',
        })
        return
      }
      resolve(value)
    })
  },
  handleInput(e: WechatMiniprogram.CustomEvent) {
    this.setData({
      inputValue: e.detail.value,
    })
  },
  rsaEncrypt() {
    this.emptyValidate(this.data.inputValue).then((value) => {
      this.resetResult();
      const result = rsaEncrypt(value)
      if (result && typeof result === 'string') {
        this.setData({
          resultEncrypt: result,
        })
      } else {
        wx.showToast({
          title: '加密失败',
          icon: 'none',
        })
      }
    })
  },
  rsaDecrypt() {
    if (!this.data.resultEncrypt) {
      wx.showToast({
        title: '请先加密',
        icon: 'none',
      })
      return
    }
    const result = rsaDecrypt(this.data.resultEncrypt, encryptInfo.privateKey)
    if (!result) {
      wx.showToast({
        title: '解密失败',
        icon: 'none',
      })
      return
    }
    this.setData({
      resultDecrypt: result,
    })
  },
  aesEncrypt() {
    this.emptyValidate(this.data.inputValue).then((value) => {
      this.resetResult();
      const result = aesEncrypt(value, this.data.aesEncryptKey)
      if (!result) {
        wx.showToast({
          title: '加密失败',
          icon: 'none',
        })
        return
      }
      this.setData({
        resultEncrypt: result,
      })
    })
  },
  aesDecrypt() {
    const { resultEncrypt, aesEncryptKey } = this.data
    if (!resultEncrypt) {
      wx.showToast({
        title: '请先加密',
        icon: 'none',
      })
      return
    }
    const result = aesDecrypt(resultEncrypt, aesEncryptKey)
    if (!result) {
      wx.showToast({
        title: '解密失败',
        icon: 'none',
      })
      return
    }
    this.setData({
      resultDecrypt: result,
    })
  },
})