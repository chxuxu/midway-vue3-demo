import { MidwayConfig } from '@midwayjs/core';
import{ StaffEntity} from "../entity/staff.entity";
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1658308693430_9761',
  koa: {
    port: 6001,
  },
  typeorm: {
    dataSource: {
      default: {
        /**
         * 单数据库实例
         */
        type: 'mysql',
        host: "127.0.0.1",
        //port: 3306,
        username: "root",
        password: "1357920",
        database: "testdb",
        synchronize: false,     // 如果第一次使用，不存在表，有同步的需求可以写 true
        logging: false,
        // 配置实体模型
        entities: [StaffEntity],
      }
    }
  },
} as MidwayConfig;
