const db = require(".");
const User = db.userInfo;
module.exports = (sequelize, Sequelize) => {
    const Record = sequelize.define("t_record", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user_uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            // primaryKey: true,
            unique: true,
            allowNull: false,
        },
        record_id: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: true,
            defaultValue: '',
        },
    });
    // User.hasMany(Record);
    // Record.belongsTo(User);
    return Record;
};