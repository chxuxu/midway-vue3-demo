import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import{ StaffEntity} from "../entity/staff.entity";

@Provide()
export class StaffModel {

  @InjectEntityModel(StaffEntity)
  staffRepository: Repository<StaffEntity>;

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

  async delete(id:number) {
    const result = await this.staffRepository.delete({id});
    console.log('delete= ', result);
    return result;
  }

  async find(pageNum,pageSize,params) {
    const staffResult = await this.staffRepository.createQueryBuilder("staff")
    //.leftJoinAndSelect("user.photos", "photo")
    .skip((pageNum-1)*pageSize)
    .take(pageSize)
    .getMany();
    console.log('staff= ', staffResult);
    return staffResult;
  }
}