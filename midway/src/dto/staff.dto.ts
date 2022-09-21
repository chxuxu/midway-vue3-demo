import { Rule, RuleType } from '@midwayjs/validate';

export class UpdateStaffDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.number().required().max(1).min(0))
  sex: number;

  @Rule(RuleType.number().required().max(100))
  age: number;
}

export class InsertStaffDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.number().required().max(1).min(0))
  sex: number;

  @Rule(RuleType.number().required().max(100))
  age: number;

  @Rule(RuleType.string())
  email:string;
}
