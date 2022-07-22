import { createApp, close } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { UserService } from '../../src/service/user.service';

describe('test/service/user.test.ts', () => {

  it('should GET /', async () => {
    // create app
    const app = await createApp<Framework>();

    // 根据依赖注入 class 获取实例（推荐）
    const userService = await app.getApplicationContext().getAsync<UserService>(UserService);
    // 根据依赖注入 Id 获取实例
    //const userService = await app.getApplicationContext().getAsync<UserService>('userService');
    // 传入 class 忽略泛型也能正确推导
    //const userService = await app.getApplicationContext().getAsync(UserService);
    const result=await userService.getUserByUsernameAndPassword("aaa","111");
    expect(result).not.toBe(null);
    const result1=await userService.getUserByUsernameAndPassword("aaa","aaa");
    expect(result1).toBe(null);
    // close app
    await close(app);
  });

});