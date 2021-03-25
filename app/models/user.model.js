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
    online: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nickname: {
      type: Sequelize.STRING,
      defaultValue: 'Whitout nickname',
      allowNull: false
    },
    sex: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
    birthdate: {
      type: Sequelize.DATEONLY, //DATE for MySQL / sqlite
      defaultValue: Sequelize.NOW,
      allowNull: true
    },
    remark: {
      type: Sequelize.STRING,
      allowNull: true
    },
    telephone: {
      type: Sequelize.STRING,
      allowNull: true
    },
    platform: {
      type: Sequelize.STRING,
      defaultValue: 'Android',
      allowNull: false
    }
  });
  return User;
};