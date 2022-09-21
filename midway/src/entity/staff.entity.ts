const { Entity, Column, PrimaryGeneratedColumn }=require("typeorm");

@Entity("")
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

//module.exports=StaffEntity;
