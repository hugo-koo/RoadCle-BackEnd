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
            unique: false,
            allowNull: false,
        },
        record_id: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: true,
            defaultValue: '',
        },
        start_time: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        end_time: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
    });
    // User.hasMany(Record);
    // Record.belongsTo(User);
    return Record;
};