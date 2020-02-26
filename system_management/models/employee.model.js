const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SQL);

const Employee = sequelize.define('employees', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        len: 10
    },

    email: {
        type: DataTypes.STRING,
        isEmail: true
    },
    age: DataTypes.INTEGER,
    birthday: DataTypes.DATE,
    address: DataTypes.STRING,
    gender: DataTypes.ENUM('male', 'female'),
    roles: DataTypes.JSONB,
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: () => new Date()
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: () => new Date()
    }
});

module.exports = Employee;