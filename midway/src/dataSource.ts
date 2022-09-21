import "reflect-metadata";
const { DataSource } = require("typeorm");
const UserEntity = require("./entity/user.entity");
const dataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  //port: 3306,
  username: "root",
  password: "1357920",
  database: "testdb",
  entities: [UserEntity],
});
dataSource.initialize()
  .then((n) => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
});
function init(){
  if(!dataSource.isInitialized){
    return dataSource.initialize();
  }
  return ()=>new Promise(dataSource);
}
export default {
  init,dataSource
};