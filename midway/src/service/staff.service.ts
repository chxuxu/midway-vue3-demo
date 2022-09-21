import { Provide,Inject } from '@midwayjs/decorator';
import { StaffEntity } from '../entity/staff.entity';
import { StaffModel } from '../model/staff.model';

@Provide()
export class StaffService {

  @Inject()
  staffModel: StaffModel;

  async initTable() {
    const result = this.staffModel.initTable();
    return result;
  }
  // save
  async insertStaff(staff:StaffEntity) {
    const staffResult = this.staffModel.insert(staff);
    return staffResult;
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