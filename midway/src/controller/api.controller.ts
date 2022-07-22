import { Inject, Controller, Get, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/initdb')
  async initDB() {
    const res =await this.userService.initDB();
    return { code: 200, message: 'OK', result: res };
  }

  @Get('/login')
  async login(@Query('username') username,@Query('password') password) {
    const user =await this.userService.getUserByUsernameAndPassword(username,password);
    if(user){
      return { code: 200, message: 'OK', result: user };
    }else{
      return { code: 400, message: 'Fail', result: user };
    }
    
  }

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return {code: 200, message: 'OK', data: user };
  }
}
