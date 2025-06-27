/**
 * 手机号验证
 * @param {string} phone 手机号
 * @returns {boolean} 是否合法
 */
export const validatePhone = (phone: string) => {
  return /^1[3-9]\d{9}$/.test(phone);
};