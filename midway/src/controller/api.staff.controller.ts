import { Inject, Controller, Get,Post, Query,Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { StaffService } from '../service/staff.service';
import { StaffEntity } from '../entity/staff.entity';
import {InsertStaffDTO} from "../dto/staff.dto"

interface IListParams{
  pageNum:number;
  pageSize:number;
}

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

  // @Get('/login')
  // async login(@Query('username') username,@Query('password') password) {
  //   const user =await this.userService.getUserByUsernameAndPassword(username,password);
  //   if(user){
  //     return { code: 200, message: 'OK', result: user };
  //   }else{
  //     return { code: 400, message: 'Fail', result: user };
  //   }
    
  // }

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
