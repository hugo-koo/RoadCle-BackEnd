module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "yu1002",
  /**数据库名 */
  DB: "d_roadcle",
  dialect: "mysql",
  pool: {
    max: 10, //最大连接数
    min: 0,
    acquire: 30000, //错误尝试时间
    idle: 10000 //空闲等待时间
  }
};