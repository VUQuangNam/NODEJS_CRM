const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SQL);

const Customer = sequelize.define('customers', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
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
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: () => new Date()
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: () => new Date()
    }
});

module.exports = Customer;