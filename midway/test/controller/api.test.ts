import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework,Application } from '@midwayjs/koa';

describe('test/controller/api.test.ts', () => {

  let app: Application;

  beforeAll(async () => {
    // 只创建一次 app，可以复用
    try {
      // 由于Jest在BeforeAll阶段的error会忽略，所以需要包一层catch
      // refs: https://github.com/facebook/jest/issues/8688
      app = await createApp<Framework>();
    } catch(err) {
        console.error('test beforeAll error', err);
      throw err;
    }
  });

  afterAll(async () => {
    // close app
    await close(app);
  });

  it('should POST /api/get_user', async () => {
    // create app
    //const app = await createApp<Framework>();

    // make request
    const result = await createHttpRequest(app).get('/api/get_user').query({ uid: 123 });

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.message).toBe('OK');

    // close app
    //await close(app);
  // });

  // it('should get /api/login', async () => {
    // create app
    //const app = await createApp<Framework>();
    // make request
    const resultLogin = await createHttpRequest(app).get('/api/login').query({ username: "aaa",password:"aaa" });
    // use expect by jest
    console.log(resultLogin.status);
    expect(resultLogin.status).toBe(200);
    expect(resultLogin.body.code).toBe(400);

    // close app
    //await close(app);
  });

});


