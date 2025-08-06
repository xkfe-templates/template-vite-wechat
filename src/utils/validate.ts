/**
 * 手机号验证
 * @param {string} phone 手机号
 * @returns {boolean} 是否合法
 */
export const validatePhone = (phone: string) => {
  return /^1[3-9]\d{9}$/.test(phone);
};

/**
 * 邮箱验证
 * @param {string} email 邮箱
 * @returns {boolean} 是否合法
 */
export const validateEmail = (email: string) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};
