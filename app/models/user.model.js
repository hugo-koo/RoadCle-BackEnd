const db = require(".");
const Record = db.record;
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("t_user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      // primaryKey: true,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      defaultValue: 'psw',
      allowNull: false
    },
  });
  return User;
};