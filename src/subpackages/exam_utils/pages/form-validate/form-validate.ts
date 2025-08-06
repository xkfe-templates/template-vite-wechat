import { validatePhone, validateEmail } from '@/utils/validate'
import { validateForm } from '../../utils/form-validate'

Page({
  data: {
    formData: {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    rules: {
      name: {
        required: true,
        message: '请输入姓名'
      },
      phone: [
        {
          required: true,
          message: '请输入手机号'
        },
        {
          validator: validatePhone,
          message: '请输入正确的手机号'
        }
      ],
      email: [
        {
          required: true,
          message: '请输入邮箱'
        },
        {
          validator: validateEmail,
          message: '请输入正确的邮箱'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码'
        }
      ],
      confirmPassword: [
        {
          required: true,
          message: '请输入确认密码'
        },
        {
          validator: (value: string, form: any) => value === form.password,
          message: '两次密码不一致'
        }
      ]
    }
  },
  onLoad() { },
  handleInput(e: WechatMiniprogram.CustomEvent) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  formSubmit(e: WechatMiniprogram.CustomEvent) {
    const { value } = e.detail
    console.log(value);
    const validateResult = validateForm(this.data.formData, this.data.rules);
    if (!validateResult.valid) {
      wx.showToast({
        title: validateResult.message,
        icon: 'none'
      });
      return;
    }
    wx.showModal({
      title: '提示',
      content: '验证通过✅',
      showCancel: false,
      success: () => { }
    })
  }
})
