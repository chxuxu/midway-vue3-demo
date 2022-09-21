
//import { InjectEntityModel } from '@midwayjs/orm';
import db from "../dataSource";
const waitDbInit=function(){
  return new Promise(async (resolve)=>{
    if(db.dataSource.isInitialized){
      resolve(true);
    }else{
      await db.dataSource.initialize();
      resolve(true);
    }
  });
};
const UserEntity = require("../entity/user.entity");

class UserModel {
  // @InjectEntityModel(UserEntity)
  // userRepo:Repository<UserEntity>;
 userRepository=null;
  constructor() {
    this.userRepository = db.dataSource.getRepository(UserEntity)
  }

  async initDatabase(){
    await waitDbInit();
    let res=await db.dataSource.synchronize();
    return res;
  }
  async getUserByUserNameAndPassword(username, password): Promise<typeof UserEntity> {
    await waitDbInit();
    const user = await this.userRepository.findOneBy({
      username,password
    });
    return user;
  }
}

export default UserModel;