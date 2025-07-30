/**
 * 表单验证规则类型定义
 */
export interface ValidationRule {
  /** 是否必填 */
  required?: boolean;
  /** 错误提示信息 */
  message?: string;
  /** 自定义验证函数，返回 true 表示验证通过，返回 false 或字符串表示验证失败 */
  validator?: (value: any) => boolean | string;
}

/**
 * 表单验证结果类型定义
 */
export interface ValidationResult {
  /** 是否验证通过 */
  valid: boolean;
  /** 错误提示信息 */
  message: string;
  /** 验证失败的字段名 */
  field?: string;
}

/**
 * 表单验证规则配置类型
 */
export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule | ValidationRule[];
};

/**
 * 表单验证函数
 * @param form - 表单数据对象
 * @param rules - 验证规则配置，key 必须与 form 的字段对应
 * @param fields - 需要校验的字段名，可选，如果不传则校验所有字段
 * @returns 验证结果
 *
 * @example
 * 定义表单类型
 * interface UserForm {
 *   name: string;
 *   phone: string;
 *   email: string;
 * }
 *
 * 单个规则示例
 * const rules: ValidationRules<UserForm> = {
 *   name: {
 *     required: true,
 *     message: '请输入姓名'
 *   }
 * };
 *
 * 多个规则示例
 * const rules: ValidationRules<UserForm> = {
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
 * 使用示例
 * const formData: UserForm = { name: '', phone: '', email: '' };
 * const result = validateForm(formData, rules);
 * const result = validateForm(formData, rules, ['phone']);
 * if (!result.valid) {
 *   console.log(result.message); // 显示错误信息
 * }
 */
export const validateForm = <T extends Record<string, any>>(
  form: T,
  rules: ValidationRules<T>,
  fields?: (keyof T)[]
): ValidationResult => {
  const fieldsToValidate = fields || (Object.keys(rules) as (keyof T)[]);

  for (const field of fieldsToValidate) {
    const fieldRules = Array.isArray(rules[field]) ? rules[field] : [rules[field]];
    const value = form[field];

    for (const rule of fieldRules) {
      // 检查必填
      if (rule?.required && !value) {
        return {
          valid: false,
          message: rule.message || `${String(field)} 是必填项`,
          field: String(field)
        };
      }

      // 如果有值且存在验证器，则进行验证
      if (value && rule?.validator) {
        const result = rule.validator(value);
        if (result !== true) {
          return {
            valid: false,
            message: rule.message || `${String(field)} 验证失败`,
            field: String(field)
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
