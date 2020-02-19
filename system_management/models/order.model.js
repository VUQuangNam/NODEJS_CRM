const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SQL);

const Order = sequelize.define('orders', {
    note: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    status: DataTypes.ENUM('Đặt hàng', 'Hoàn thành', 'Hủy bỏ'),
    products: {
        type: DataTypes.JSON,
        isArray: true,
    },
    create_by: {
        type: DataTypes.JSON
    }
});

module.exports = Order;