import { Rule, RuleType } from '@midwayjs/validate';
// 必填字符串规则
export const requiredStringRule = RuleType.string().required();
// 页码校验规则,默认值为1，大于0
export const pageNoRule = RuleType.number().integer().default(1).greater(0);
// 单页显示内容数量校验规则,默认值为20，大于0
export const pageSizeRule = RuleType.number().integer().default(20).greater(0);
​
// 逗号间隔的 id 进行校验的规则扩展，起名为 stringArray
RuleType.extend(joi => ({
  base: joi.array(),
  type: 'stringArray',
  coerce: value => ({
    value: value.split ? value.split(',') : value,
  }),
}));