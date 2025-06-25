import { validatePhone } from '@/utils/validate';



Page({
  data: {
    items: [
      {
        name: '张三',
        age: 18,
        gender: '男',
      },
    ],
  },
  onLoad() {
    const phone = '13800138000'
    const isValid = validatePhone(phone)
    console.log(isValid)
  },
})
