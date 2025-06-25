/**
 * 手机号验证
 * @param {string} phone 手机号
 * @returns {boolean} 是否合法
 */
export const validatePhone = (phone) => {
  return /^1[3-9]\d{9}$/.test(phone);
};

/**
 * 表单验证规则类型定义
 * @typedef {Object} ValidationRule
 * @property {boolean} [required] - 是否必填
 * @property {string} [message] - 错误提示信息
 * @property {Function} [validator] - 自定义验证函数，返回 true 表示验证通过，返回 false 或字符串表示验证失败
 */

/**
 * 表单验证结果类型定义
 * @typedef {Object} ValidationResult
 * @property {boolean} valid - 是否验证通过
 * @property {string} message - 错误提示信息
 * @property {string} [field] - 验证失败的字段名
 */

/**
 * 表单验证函数
 * @param {Object} form - 表单数据对象
 * @param {Object.<string, ValidationRule|ValidationRule[]>} rules - 验证规则配置
 * @param {string[]} fields - 需要校验的字段名，升级可以只校验部分字段
 * @returns {ValidationResult} 验证结果
 * 
 * @example
 * // 单个规则示例
 * const rules = {
 *   name: {
 *     required: true,
 *     message: '请输入姓名'
 *   }
 * };
 * 
 * // 多个规则示例
 * const rules = {
 *   phone: [
 *     {
 *       required: true,
 *       message: '请输入手机号'
 *     },
 *     {
 *       validator: validatePhone,
 *       message: '请输入正确的手机号'
 *     }
 *   ]
 * };
 * 
 * // 使用示例
 * const result = validateForm(formData, rules);
 * const result = validateForm(formData, rules, ['phone']);
 * if (!result.valid) {
 *   console.log(result.message); // 显示错误信息
 * }
 */
export const validateForm = (form, rules, fields) => {
  const fieldsToValidate = fields || Object.keys(rules);

  for (const field of fieldsToValidate) {
    const fieldRules = Array.isArray(rules[field]) ? rules[field] : [rules[field]];
    const value = form[field];

    for (const rule of fieldRules) {
      // 检查必填
      if (rule.required && !value) {
        return {
          valid: false,
          message: rule.message,
          field
        };
      }

      // 如果有值且存在验证器，则进行验证
      if (value && rule.validator) {
        const result = rule.validator(value);
        if (result !== true) {
          return {
            valid: false,
            message: rule.message,
            field
          };
        }
      }
    }
  }

  return {
    valid: true,
    message: '',
    field: ''
  };
};
