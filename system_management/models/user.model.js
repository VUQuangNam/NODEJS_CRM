const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DB_SQL);

const User = sequelize.define("User", {
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
    age: DataTypes.INTEGER,
}, {
    tableName: 'users'
});

module.exports = User;