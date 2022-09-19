# midway
  Midway 是阿里巴巴 - 淘宝前端架构团队，基于渐进式理念研发的 Node.js 框架，通过自研的依赖注入容器，搭配各种上层模块，组合出适用于不同场景的解决方案。基于TypeScript 开发，结合了面向对象（OOP + Class + IoC）与函数式（FP + Function + Hooks）两种编程范式，并在此之上支持了 Web / 全栈 / 微服务 / RPC / Socket /Serverless 等多种场景，致力于为用户提供简单、易用、可靠的 Node.js 服务端研发体验。

## 为什么选择midway
- Midway 框架是在内部已经使用 5 年以上的 Node.js 框架，有着长期投入和持续维护的团队做后盾
- 已经在每年的大促场景经过考验，稳定性无须担心
- 丰富的组件和扩展能力，例如数据库，缓存，定时任务，进程模型，部署以及 Web，Socket 甚至 Serverless 等新场景的支持
- 一体化调用方案可以方便快捷和前端页面协同开发
- 良好的 TypeScript 定义支持

## 多编程范式
  ### 面向对象+丰富的装饰器
  ```
  // src/controller/home.ts
  import { Controller, Get } from '@midwayjs/decorator';
  import { Context } from '@midwayjs/koa';
  @Controller('/')
  export class HomeController {
    @Inject()
    ctx: Context
    @Get('/')
    async home() {
      return {
        message: 'Hello Midwayjs!',
        query: this.ctx.ip
      }
    }
  }
  ```

  ### 函数式
  ```
  import { useContext } from '@midwayjs/hooks'
  import { Context } from '@midwayjs/koa';
  export default async function home () {
    const ctx = useContext<Context>()
    return {
      message: 'Hello Midwayjs!',
      query: ctx.ip
    }
  }
  ```