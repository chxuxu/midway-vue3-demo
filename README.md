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

  ## 样板类型-技术框架选型
  - 纯 Node.js 项目
  Midway 传统项目，纯 Node.js 研发，以 @midwayjs/koa 为代表的模块，最完整的支持后端项目，采用 依赖注入 + Class 为技术栈。
  我们一般在这个样板基础上扩展我们的技术架构。
  - Serverless 项目
  Midway 为 Serverless 场景单独开发的技术栈，以 @midwayjs/faas 为代表的的模块，使用轻量的方式接入不同的 Serverless 平台。
  - 一体化项目
  Midway 创新技术方案，采用前后端一体化开发方式，节省前后端联调时间，以 @midwayjs/hooks 为代表的的模块，使用 函数式 为主要编码范式。
  这种项目前后端融合在一起，如果代码管理规范没做好，后期会越来越乱，小项目还可以，大项目似乎不是很好的选择。
  ![代码截图](https://thumbnail0.baidupcs.com/thumbnail/9c27417fam0243b64fadba75ca7ff4f1?fid=3846711097-250528-439425033838317&time=1663639200&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-rs%2BkuEO7xJq5uopqfgsUpM40iUE%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=321792669795095517&dp-callid=0&file_type=0&size=c710_u400&quality=100&vuk=-&ft=video "一体化项目代码截图")

## Web 框架选择
使用命令行初始化工程时，需要选择框架类型，一般选择@midwayjs/koa,是Midway推荐也是默认的框架类型。可以获取更多的示例和帮助。

```
$ npm init midway
$ npm run dev
```

# typeorm
TypeORM 是一个ORM框架，它可以运行在 NodeJS、Browser、Cordova、PhoneGap、Ionic、React Native、Expo 和 Electron 平台上，可以与 TypeScript 和 JavaScript (ES5,ES6,ES7,ES8)一起使用。 它的目标是始终支持最新的 JavaScript 特性并提供额外的特性以帮助你开发任何使用数据库的（不管是只有几张表的小型应用还是拥有多数据库的大型企业应用）应用程序。

不同于现有的所有其他 JavaScript ORM 框架，TypeORM 支持 Active Record 和 Data Mapper 模式，这意味着你可以以最高效的方式编写高质量的、松耦合的、可扩展的、可维护的应用程序。

TypeORM 参考了很多其他优秀 ORM 的实现, 比如 Hibernate, Doctrine 和 Entity Framework。

# 参考：
https://midwayjs.org/docs/quickstart
https://typeorm.bootcss.com/