const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SQL);

const Product = sequelize.define('products', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    note: DataTypes.STRING,
    unit: {
        type: DataTypes.ENUM('Bộ', 'Đôi', 'Cái', 'Chiếc'),
        allowNull: false
    },
    create_by: DataTypes.JSONB
});

module.exports = Product;