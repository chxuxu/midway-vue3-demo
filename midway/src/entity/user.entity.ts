const { Entity, Column, PrimaryGeneratedColumn }=require("typeorm");

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({
    type:'int',name:'id',comment:'用户自增ID'
  })
  id: number;

  @Column('varchar',{name:'username',comment:'用户名',length:64})
  username: string;

  @Column('varchar',{name:'password',comment:'密码',length:64})
  password: string;
}

module.exports=UserEntity;
