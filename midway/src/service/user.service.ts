import { Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import UserLoginDTO from "../dto/user.dto";

import UserModel from "../model/user.model";
@Provide()
export class UserService {

  async initDB(){
    let um=new UserModel();
    return await um.initDatabase();
  }
  async getUserByUsernameAndPassword(username:string,password:string){
    let user=new UserLoginDTO();
    user.usrename=username;
    user.password=password;
    if(user.usrename&&user.password){
      let um=new UserModel();
      let uuu=await um.getUserByUserNameAndPassword(username,password);
      return uuu;
    }
    return null;
  }
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}
