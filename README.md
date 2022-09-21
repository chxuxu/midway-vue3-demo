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
## 控制器即路由
像EGG这样的框架，路由和控制器还是分开的，midway将他们结合在一起控制器即路由，代码如下：
```
import { Controller, Get, Post } from '@midwayjs/decorator';
@Controller('/')
export class HomeController {

  @Inject()
  userService: UserService;

  @Get('/')
  @Get('/home')
  async home() {
    return 'Hello Midwayjs!';
  }
  @Post('/update')
  async updateData() {
    return 'This is a post method'
  }

  @Get('/getuser')
  async getUser(@Query('id') uid) {
    const user = await this.userService.getUser(uid);
    return {success: true, message: 'OK', data: user};
  }
}
```
再看下JAVA代码：
```
/**
 * 工单路由
 */
@Controller
@PageCorpServiceCheck(needService = {CorpServiceCode.WORKSHEET_TOTAL})
@RequestMapping(value = "/worksheet", produces = {"application/json;charset=UTF-8"})
public class PageWorksheetController {
    private Logger logger = LoggerFactory.getLogger(PageWorksheetController.class);

    @Autowired
    SettingFacade settingFacade;
    @RequestMapping(value = {"/chat/wait/",
            "/chat/",
            "/chat/detail"})
    @PageCorpServiceCheck(needService = {CorpServiceCode.WORKSHEET_TOTAL})
    @PageStaffRightCheck(needRight = StaffRightCode.WORKSHEET)
    public String getChatPage(Model model, HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
      .....
    }
}

```
代码看起来是不是很像？
同样有Controller装饰器，
同样由主次路由路径 
同样有服务注入

## 服务和注入
在业务中，只有控制器（Controller）的代码是不够的，一般来说会有一些业务逻辑被抽象到一个特定的逻辑单元中，我们一般称为服务（Service）。
在EGG里，一般吧所有服务都放到一个目录下，不管某个控制器需要不需要，都塞给它了。midway是需要的时候，注入对应的服务，也不用实例化操作。
除了一个 @Provide 装饰器外，整个服务的结构和普通的 Class 一模一样，这样就行了。
用注入替代了 实例化。

## Application 和 Context
内容和EGG，KOA 差不多，但获取方式简单方便多了。
```
import { Inject,App, Controller, Get } from '@midwayjs/decorator';
import { Context,Application } from '@midwayjs/koa';

@Controller('/')
export class HomeController {

  @App()
  app: Application;

  @Inject()
  ctx: Context;

  @Get('/')
  async home() {
    // this.ctx.query
  }
}
```
## 扩展机制
组件是 Midway 的扩展机制，可以将复用的业务代码，或者逻辑，抽象的公共的能力开发成组件，使得这些代码能够在所有的 Midway 场景下复用。
## 中间件
Web 中间件是在控制器调用 之前 和 之后（部分）调用的函数。 中间件函数可以访问请求和响应对象。做一些预处理货兜底工作。
## 异常处理
Midway 提供了一个内置的异常处理器，负责处理应用程序中所有未处理的异常。当您的应用程序代码抛出一个异常处理时，该处理器就会捕获该异常，然后等待用户处理。

## 拦截器
经常有全局统一处理逻辑的需求，比如统一处理错误，转换格式等等，虽然在 Web 场景有 Web 中间件来处理，但是在其他场景下，无法使用这个能力。
Midway 设计了一套通用的方法拦截器（切面），用于在不同场景中，统一编写逻辑。比如全局的权限判断。

# typeorm
TypeORM 是一个ORM框架，它可以运行在 NodeJS、Browser、Cordova、PhoneGap、Ionic、React Native、Expo 和 Electron 平台上，可以与 TypeScript 和 JavaScript (ES5,ES6,ES7,ES8)一起使用。 它的目标是始终支持最新的 JavaScript 特性并提供额外的特性以帮助你开发任何使用数据库的（不管是只有几张表的小型应用还是拥有多数据库的大型企业应用）应用程序。

不同于现有的所有其他 JavaScript ORM 框架，TypeORM 支持 Active Record 和 Data Mapper 模式，这意味着你可以以最高效的方式编写高质量的、松耦合的、可扩展的、可维护的应用程序。

TypeORM 参考了很多其他优秀 ORM 的实现, 比如 Hibernate, Doctrine 和 Entity Framework。

## 实体

实体是一个映射到数据库表（或使用 MongoDB 时的集合）的类。例如：
```
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    isActive: boolean;
}
```
每个实体都必须在连接选项中注册

还有其他一些构造实体的高级方式，为了提高代码复用性。

## 关系
目前主流的几个数据库都是关系型数据库，比如 mssql,mysql,oracle 等。
合理设计好关系，可以让保证数据完整性同时，每个数据表字段不会那么多。typeorm支持了对 一下关系的构建：
- 一对一 使用 @OneToOne
- 多对一 使用 @ManyToOne
- 一对多 使用 @OneToMany
- 多对多 使用 @ManyToMany

后面对最常用也最简单的一对一关系举例实现。

## EntityManager
EntityManager 就像放一个实体存储库的集合的地方。
可以通过getManager（）或Connection访问实体管理器。
可以管理（insert, update, delete, load 等）任何实体。
需要在一个业务逻辑中对不同实体进行操作时使用。

### 执行原始 SQL 查询
这对熟悉SQL语法的同学非常有用，可能效率更高，但要注意注入安全防范。
```
const rawData = await manager.query(`SELECT * FROM USERS`);
```

## Repository
Repository就像EntityManager一样，但其操作仅限于具体实体。
可以通过getRepository（Entity），Connection＃getRepository或EntityManager＃getRepository访问存储库。
当要对某个特定实体进行各种操作时用它。

## find 
所有Repository和EntityManager的find方法都接受可用于查询所需数据的特殊选项，构建复杂的查询语句，而无需使用QueryBuilder。

## QueryBuilder
QueryBuilder 是 TypeORM 最强大的功能之一 ，它允许你使用优雅便捷的语法构建 SQL 查询，执行并获得自动转换的实体。
有3种方法可以创建Query Builder：

- 使用 connection:
```
import { getConnection } from "typeorm";

const user = await getConnection()
  .createQueryBuilder()
  .select("user")
  .from(User, "user")
  .where("user.id = :id", { id: 1 })
  .getOne();
```
- 使用 entity manager:
```
import { getManager } from "typeorm";

const user = await getManager()
  .createQueryBuilder(User, "user")
  .where("user.id = :id", { id: 1 })
  .getOne();
```
- 使用 repository:
```
import { getRepository } from "typeorm";

const user = await getRepository(User)
  .createQueryBuilder("user")
  .where("user.id = :id", { id: 1 })
  .getOne();
```
## 其他
不仅可以用SelectQueryBuilder 构建查询语句，也可以用它构建插入，删除，更新语句。
InsertQueryBuilder 
UpdateQueryBuilder 
DeleteQueryBuilder 
RelationQueryBuilder 

## 链接数据库
常见方法：
```
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Photo } from "./entity/Photo";

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
  database: "test",
  entities: [Photo],
  //synchronize: true,
  logging: false
})
  .then(connection => {
    // 这里可以写实体操作相关的代码
  })
  .catch(error => console.log(error));
```

# 综合实例-使用midway+typeorm搭建 WEB服务器

## 01-准备工作
在midway应用基础上，安装以下包：
```
$ npm i @midwayjs/typeorm@3 typeorm mysql2 --save
```
在 src/configuration.ts 引入 orm 组件
```
import { Configuration } from '@midwayjs/decorator';
import * as orm from '@midwayjs/typeorm';
import { join } from 'path';
@Configuration({
  imports: [
    // ...
    orm                                                         // 加载 typeorm 组件
  ],
  importConfigs: [
    join(__dirname, './config')
  ]
})
export class MainConfiguration {
}
```
## 02-配置数据库
我们这里选择的是mysql
在mysql里创建好数据库-testdb
在src/config/config.default.ts 配置默认数据库链接
```
export default {
  ...
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
        password: "********",
        database: "testdb",
        synchronize: false,     // 如果第一次使用，不存在表，有同步的需求可以写 true
        logging: false,
        // 配置实体模型
        entities: [StaffEntity],
      }
    }
  },
} as MidwayConfig;
```
entities - 要加载并用于此连接的实体。接受要加载的实体类和目录路径。目录支持 glob 模式。示例：entities: [Post, Category, "entity/*.js", "modules/**/entity/*.js"]。了解有关entities的更多信息。

## 03-服务开发
### 1.实体层
实体类编写相当于表结构设计，这比直接创建表结构方便，安全，后期还可以作为系统初始化时运行脚本的依赖。
代码如下：
```
@Entity("tableName")
export class StaffEntity {
  @PrimaryGeneratedColumn({
    type:'int',name:'id',comment:'自增ID'
  })
  id: number;
  @Column('varchar',{name:'name',comment:'姓名',length:64})
  name: string;
  @Column('int',{name:'sex',comment:'性别'})
  sex: number;
  @Column('int',{name:'age',comment:'年龄'})
  age: number;
  @Column('varchar',{name:'email',comment:'邮箱',length:100})
  email: string;
}
```
@Entity 装饰器里的参数是表明，以上代码如果不传表名，最终表名为：staff_entity。
实体类装饰器参数确定后，不能随意修改，否则执行SQL语句会找不到对应表名，一定要修改，也要同时修改表名。
@Column 里面的 name值，表示字段名，也不能随意修改。

### 2.模型层
此层也叫数据操作层-dal,一般是对数据库的颗粒化操作，业务简单的话会感觉多此一举，但是需要对不同表进行操作以完成一个复杂业务逻辑时，就体现出其价值。
```
@Provide()
export class StaffModel {
  @InjectEntityModel(StaffEntity)
  staffRepository: Repository<StaffEntity>;
  //初始化数据表，entities
  async initTable() {
    let manager=this.staffRepository.manager;
    let conn=manager.connection;
    const result = await conn.synchronize(false);//不删除已存在的表
    console.log('initTable= ', result);
    return result;
  }

  // save
  async insert(staff:StaffEntity) {
    const staffResult = await this.staffRepository.save(staff);
    console.log('staff= ', staffResult);
    return staffResult;
  }
}
```

### 3.服务层
此层用于处理业务逻辑，调用模型层的方法万层复杂的业务逻辑。供控制器层使用。
```
@Provide()
export class StaffService {

  @Inject()
  staffModel: StaffModel;

  async initTable() {
    const result = this.staffModel.initTable();
    return result;
  }
  async deleteStaff(id) {
    const staffResult = this.staffModel.delete(id);
    return staffResult;
  }

  async findStaff(pageNum,pageSize,params) {
    const staffResult = this.staffModel.find(pageNum,pageSize,params);
    return staffResult;
  }
}
```
以上代码实现了，增，查，删除操作。
### 4.DTO
Data Transfer Object（数据传输对象）DTO 是一组需要跨进程或网络边界传输的聚合数据的简单容器。
它不应该包含业务逻辑，并将其行为限制为诸如内部一致性检查和基本验证之类的活动。
在这里结合@midwayjs/validate用于对用户传递过来的参数进行兜底检查验证。
```
import { Rule, RuleType } from '@midwayjs/validate';
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
```
这个类属于一个 PlainObject ，也不需要被依赖注入管理，我们不需要提供 @Provide 装饰器。

### 5.控制器和路由
在src/controller目录下，增加一个文件，api.staff.controller.ts
代码如下：
```

@Controller('/api/staff')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  staffService: StaffService;

  @Get('/initTable')
  async initTable() {
    const res = this.staffService.initTable();
    return { code: 200, message: 'OK', result: res };
  }

  @Post('/insert')
  @Validate()
  async insertStaff(@Body() staffBody: InsertStaffDTO) {
    let staff = new StaffEntity();
    staff.name = staffBody.name;
    staff.sex = staffBody.sex;
    staff.age = staffBody.age;
    staff.email =staffBody.email;
    const user = await this.staffService.insertStaff(staff);
    return {code: 200, message: 'OK', data: user };
  }

  @Get('/delete')
  async deleteStaff(@Query() staffQuery) {
    const result = await this.staffService.deleteStaff(+staffQuery.id);
    return {code: 200, message: 'OK', data: result };
  }
  
  @Get('/list')
  async findStaff(@Query() staffQuery:IListParams) {
    const result = await this.staffService.findStaff(+staffQuery.pageNum,+staffQuery.pageSize,{});
    return {code: 200, message: 'OK', data: result };
  }
}
```

自此，我们就完成了以下接口的编写：
/api/staff/initTable
/api/staff/insert
/api/staff/delete
/api/staff/list

## 在VUE3中使用接口
...........................

## 待优化
- 利用midway提供的 中间件，过滤器，拦截器，优化代码架构，提高服务的强壮性。
- 优化架构利用TS的强类型约定，前后台使用相同的类型，比如前端传参和后端接收参数都用同一个interface类型约定。
- 权限认证

## 后话
-- 各种变成语言似乎在趋同发展，比如:
 java,c#,ts 的泛型
 angular2,vue3,react-router6 的路由设计(都使用了占位嵌入)
 MVC路由设计都使用了装饰器和注入，比如java,midway,angular2(前端)

# 参考：
https://midwayjs.org/docs/quickstart
https://typeorm.bootcss.com/